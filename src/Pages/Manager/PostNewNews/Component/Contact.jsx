import { Card, Col, Row } from "antd";


const Contact = () => {
  return (
    <div className="!mt-6 ">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-[0_1px_5px_rgba(0,0,0,0.3)] !p-4">
        <div className="text-xl font-black mb-3">Thông tin liên hệ</div>
        <Row>
            <Col lg={12} md={12} sm={24} xs={24} className="pr-3">
            <h3 className="text-base">Họ Tên</h3>
            <button className="w-full border border-gray-300 rounded-xl p-2 text-[15px] text-left mt-3">Nguyen Van A</button>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="pl-3">
            <h3 className="text-base">Số điện thoại</h3>
            <button className="w-full border border-gray-300 rounded-xl p-2 text-[15px] text-left mt-3">0963767987</button>
            </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Contact;
