import { FacebookOutlined, YoutubeOutlined, TwitterOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const DefaultFooter = () => {
  return (
        <Layout.Footer className="footer">
          <div className="policy">
            <div>
              <h3 className="font-bold mb-2">VỀ ROOMGO</h3>
              <ul className="space-y-1">
                <li><a>Giới thiệu</a></li>
                <li><a>Quy chế hoạt động</a></li>
                <li><a>Quy định sử dụng</a></li>
                <li><a>Chính sách bảo mật</a></li>
                <li><a>Liên hệ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">DÀNH CHO KHÁCH HÀNG</h3>
              <ul className="space-y-1">
                <li><a>Câu hỏi thường gặp</a></li>
                <li><a>Hướng dẫn đăng tin</a></li>
                <li><a>Bảng giá dịch vụ</a></li>
                <li><a>Quy định đăng tin</a></li>
                <li><a>Giải quyết khiếu nại</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">PHƯƠNG THỨC THANH TOÁN</h3>
              <div style={{ display: "flex"}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/MoMo_Logo.png/1024px-MoMo_Logo.png" className="w-12 h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" className="w-12 h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" className="w-12 h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/JCB_logo.svg" className="w-12 h-8" />
                <img src="https://cdn-icons-png.flaticon.com/512/1007/1007914.png" className="w-12 h-8" />
              </div>
            </div>
          </div>
          <div className="infomation-company">
            <h3 className="font-bold mb-2">CÔNG TY TNHH LBKCORP</h3>
            <p>
              Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ, TP. Thủ Đức, TP. Hồ Chí Minh, Việt Nam.
            </p>
            <p>
              Tổng đài CSKH: <span className="text-red-500">0909 316 890</span> - Email: cskh.phongtro123@gmail.com
            </p>
            <p>Giấy phép kinh doanh số 0313588502 cấp ngày 24/12/2015.</p>
          </div>
        </Layout.Footer>
  );
};

export default DefaultFooter;
