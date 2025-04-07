import { Button, Col, message, Row, Modal, QRCode, Space, Steps } from "antd";
import SelectPackage from "./Component/SelectPackage";
import Bill from "./Component/Bill";
import { useEffect, useState } from "react";
import MethodPayment from "./Component/MethodPayment";
import { useLocation, useNavigate } from "react-router";
import { postService } from "../../../Utils/api";

const { Step } = Steps;

const Payment = () => {
  const [selectedPackage, setSelectedPackage] = useState("4");
  const [packageType, setPackageType] = useState("day");
  const [totalDays, setTotalDays] = useState("1 ngày");
  const [pricePerDay, setPricePerDay] = useState(2000);
  const [paymentData, setPaymentData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const location = useLocation();
  const handlePayment = async () => {
    if (!paymentData) {
      message.error("Vui lòng chọn gói đăng tin");
      return;
    }

    try {
      setIsSubmitting(true);

      // Tạo mã QR tạm thời (trong thực tế sẽ nhận từ API thanh toán)
      const transactionId = `TRX-${Date.now()}`;
      setQrValue(
        `https://payment-gateway.com/pay?amount=${paymentData.totalPrice}&id=${transactionId}`
      );

      // Chuyển sang bước 2
      setCurrentStep(1);
    } catch (error) {
      console.error("Payment error:", error);
      message.error("Có lỗi khi tạo mã thanh toán");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
      if (location.state?.postData) {
        setPostData(location.state.postData);
      }
    }, [location.state]);
  const handlePaymentConfirmation = async () => {
    try {
      setIsSubmitting(true);

      // Format package data according to the new schema
      const packageData = {
        id: paymentData.package?.[0], // Package ID reference
        period: packageType, // "day", "week", or "month"
        quantity: getQuantityFromTotalDays(totalDays),
      };
      // Gọi API xác nhận thanh toán
      let response;
      if (postData._id) {
        // For existing posts - renew
        response = await postService.renewPost(postData._id,{
          postId: paymentData.id,
          package: [packageData], // Send as array of package objects
          expiryDate: paymentData.expiryDate,
        });

        message.success(
          "Gia hạn tin thành công! Thanh toán đang chờ xác nhận."
        );
      } else {
        // Create post with updated package structure and total price
        const postDataWithPackage = {
          ...paymentData,
          package: [packageData], // Send as array of package objects
        };

        response = await postService.createPost(postDataWithPackage);
        console.log(response.data);
        message.success("Tạo tin thành công! Thanh toán đang chờ xác nhận.");

        message.success(
          "Đăng tin mới thành công! Thanh toán đang chờ xác nhận."
        );
      }

      setPaymentConfirmed(true);
      setTimeout(() => {
        navigate("/quan-ly/danh-sach-tin-dang");
      }, 1500);
    } catch (error) {
      console.error("Payment confirmation error:", error);
      message.error(error.message || "Xác nhận thanh toán thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to convert totalDays string to quantity number
  const getQuantityFromTotalDays = (totalDays) => {
    const [value] = totalDays.split(" ");
    return parseInt(value, 10);
  };

  const steps = [
    {
      title: "Chọn gói đăng tin",
      content: (
        <>
          <Row>
            <Col lg={16} md={16} sm={24} className="pr-3">
              <SelectPackage
                selectedPackage={selectedPackage}
                setSelectedPackage={setSelectedPackage}
                packageType={packageType}
                setPackageType={setPackageType}
                totalDays={totalDays}
                setTotalDays={setTotalDays}
                pricePerDay={pricePerDay}
                setPricePerDay={setPricePerDay}
                onDataReady={setPaymentData}
              />
              <MethodPayment />
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Bill
                selectedPackage={selectedPackage}
                packageType={packageType}
                totalDays={totalDays}
                pricePerDay={pricePerDay}
                postData={paymentData}
              />
            </Col>
          </Row>
          <Button
            className="w-full mt-5 !font-bold !text-base !p-5 !bg-red-600 !rounded-3xl"
            type="primary"
            danger
            onClick={handlePayment}
            loading={isSubmitting}
            disabled={!paymentData || isSubmitting}
          >
            Thanh Toán Ngay
          </Button>
        </>
      ),
    },
    {
      title: "Quét mã thanh toán",
      content: (
        <div className="flex flex-col items-center justify-center p-8 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.3)]">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold mb-2">Quét mã để thanh toán</h2>
            <p className="text-gray-600">
              Số tiền: {paymentData?.totalPrice?.toLocaleString()} VNĐ
            </p>
          </div>

          <QRCode
            value={qrValue || "https://example.com/payment"}
            size={256}
            className="!mb-10"
          />

          <Space>
            <Button
              type="default"
              size="large"
              onClick={() => setCurrentStep(0)} // Quay lại bước 1
            >
              Quay lại
            </Button>
            <Button
              type="primary"
              size="large"
              className="!bg-green-500"
              onClick={handlePaymentConfirmation}
              loading={isSubmitting}
            >
              Xác nhận đã thanh toán
            </Button>
          </Space>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="fixed w-full z-30 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.3)] top-[60px] pt-5 pb-5 pl-15">
        <h1 className="text-2xl font-bold">Thanh toán dịch vụ đăng tin</h1>
      </div>

      <div className="max-w-[1000px] m-auto mt-25">
        <Steps current={currentStep} className="!mb-8 !w-1/2 !m-auto">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div>{steps[currentStep].content}</div>

        <Modal
          title="Thành công"
          visible={paymentConfirmed}
          footer={null}
          closable={false}
        >
          <div className="text-center py-4">
            <p className="text-green-500 text-lg mb-4">
              Thông tin đã được gửi thành công!
            </p>
            <p>Thanh toán của bạn đang chờ xác nhận từ quản trị viên.</p>
            <p>Bạn sẽ được chuyển về trang quản lý tin đăng...</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Payment;