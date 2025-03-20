import { Button, Col, Row } from "antd";
import SelectPackage from "./Component/SelectPackage";
import Bill from "./Component/Bill";
import { useState } from "react";
import MethodPayment from "./Component/MethodPayment";

const Payment = () => {
  const [selectedPackage, setSelectedPackage] = useState("4"); // Loại tin đăng
  const [packageType, setPackageType] = useState("day"); // Gói thời gian
  const [totalDays, setTotalDays] = useState("1 ngày"); // Số ngày đăng tin
  const [pricePerDay, setPricePerDay] = useState(2000); // Đơn giá

  return (
    <div>
      <div className="fixed w-full z-30 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.3)] top-[60px] pt-5 pb-5 pl-15">
        <h1 className="text-2xl font-bold">Thanh toán dịch vụ đăng tin</h1>
      </div>
      <div className="max-w-[1000px] m-auto mt-25">
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
            />
            <MethodPayment />
          </Col>
          <Col lg={8} md={8} sm={24}>
            <Bill
              selectedPackage={selectedPackage}
              packageType={packageType}
              totalDays={totalDays}
              pricePerDay={pricePerDay}
            />
          </Col>
        </Row>
        <Button
          className="w-full mt-5 !font-bold !text-base !p-5 !bg-red-600 !rounded-3xl"
          type="primary"
          danger
        >
          Thanh Toán
        </Button>
      </div>
    </div>
  );
};

export default Payment;
