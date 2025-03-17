import { Col, Layout, Row } from "antd";

const ManageFooter = () => {
  return (
    <Layout.Footer className="max-w-[1000px] m-auto !mt-15">
      <div className="policy">
        <Row className="justify-between">
          <Col xs={24} sm={24} md={8} lg={8}>
            <h3 className="font-bold mb-2 text-base">VỀ ROOMGO</h3>
            <ul className="space-y-1 !text-black">
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
              <li>
                <a href="/lien-he">Liên hệ</a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <h3 className="font-bold mb-2 text-base">DÀNH CHO KHÁCH HÀNG</h3>
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
            <h3 className="font-bold mb-2 text-base">PHƯƠNG THỨC THANH TOÁN</h3>
            <div className="flex">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/MoMo_Logo.png/1024px-MoMo_Logo.png"
                className="w-6 h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png"
                className="w-6 h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png"
                className="w-6 h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/64/JCB_logo.svg"
                className="w-6 h-6"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/1007/1007914.png"
                className="w-6 h-6"
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
        <p>Giấy phép kinh doanh số 0313588502 cấp ngày 24/12/2015.</p>
      </div>
    </Layout.Footer>
  );
};

export default ManageFooter;
