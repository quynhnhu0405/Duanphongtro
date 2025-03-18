import { Col, Row } from "antd";
import SelectPackage from "./Component/SelectPackage";
import Bill from "./Component/Bill";
import { useState } from "react";

const Payment = () => {
  const [selectedPackage, setSelectedPackage] = useState("5"); // Loại tin đăng
  const [packageType, setPackageType] = useState("day"); // Gói thời gian
  const [totalDays, setTotalDays] = useState(3); // Số ngày đăng tin
  const [pricePerDay, setPricePerDay] = useState(10000); // Đơn giá
  return (
    <div>
      <div className="fixed w-full z-30 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.3)] top-[60px] pt-5 pb-5 pl-15">
        <h1 className="text-2xl font-bold">Thanh toán dịch vụ đăng tin</h1>
      </div>
      <div className="max-w-[1000px] m-auto mt-25">
        <Row>
          <Col lg={16} md={16} sm={24}>
            <SelectPackage
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              packageType={packageType}
              setPackageType={setPackageType}
              totalDays={totalDays}
              setTotalDays={setTotalDays}
              setPricePerDay={setPricePerDay}
            />
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
      </div>
    </div>
  );
};

export default Payment;
