import { Col, Layout, Row } from "antd";

const DefaultFooter = () => {
  return (
    <Layout.Footer className="footer">
      <div className="policy">
        <Row className="justify-between">
          <Col xs={24} sm={24} md={8} lg={8}>
            <h3 className="font-bold mb-2 text-lg">VỀ ROOMGO</h3>
            <ul className="space-y-1">
              <li>
                <a href="/gioi-thieu">Giới thiệu</a>
              </li>
              <li>
                <a href="/quy-che-hoat-dong">Quy chế hoạt động</a>
              </li>
              <li>
                <a href="/quy-dinh-su-dung">Quy định sử dụng</a>
              </li>
              <li>
                <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <h3 className="font-bold mb-2 text-lg">DÀNH CHO KHÁCH HÀNG</h3>
            <ul className="space-y-1">
              <li>
                <a href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</a>
              </li>
              <li>
                <a href="/huong-dan-dang-tin">Hướng dẫn đăng tin</a>
              </li>
              <li>
                <a href="/bang-gia-dich-vu">Bảng giá dịch vụ</a>
              </li>
              <li>
                <a href="/quy-dinh-dang-tin">Quy định đăng tin</a>
              </li>
              <li>
                <a href="/giai-quyet-khieu-nai">Giải quyết khiếu nại</a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <h3 className="font-bold mb-2 text-lg">PHƯƠNG THỨC THANH TOÁN</h3>
            <div style={{ display: "flex" }}>
              <img
                src="momo.png"
                className="w-12 h-8"
              />
              <img
                src="bank.png"
                className="w-12 h-8"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="infomation-company text-base">
        <h3 className="font-bold mb-2">CÔNG TY TNHH LBKCORP</h3>
        <p>
          Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ, TP. Thủ
          Đức, TP. Hồ Chí Minh, Việt Nam.
        </p>
        <p>
          Tổng đài CSKH: <span className="text-red-500">0785 604 557</span> -
          Email: cskh.roomgo@gmail.com
        </p>
      </div>
    </Layout.Footer>
  );
};

export default DefaultFooter;
