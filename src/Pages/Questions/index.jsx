import { Breadcrumb, Card } from "antd";

const content = `
<p><strong>1. Đăng tin quảng cáo trên <strong>RoomGo</strong> có hiệu quả không?</strong></p>
          <p>Hiện tại <strong><strong>RoomGo</strong></strong> đang đứng đầu các từ khóa về: phòng trọ, nhà nguyên căn, cho thuê căn hộ, mặt bằng, ở ghép với 300.000 lượt truy cập/tháng và hơn 2.000.000 lượt xem/tháng.&nbsp;</p>
          <p>Với lượt truy cập mõi ngày tăng thêm, <strong><strong>RoomGo</strong></strong> là kênh đăng tin quảng cáo về cho thuê rất hiệu quả.&nbsp;</p>
          <p><strong>2. Làm thế nào để đăng tin lên website <strong>RoomGo</strong>?</strong></p><p>Để có thể đăng tin lên <strong><strong>RoomGo</strong></strong> trước hết bạn cần đăng ký tài khoản tại website, truy cập vào website <strong><strong>RoomGo</strong>&nbsp;</strong>và kích vào chữ <strong>"đăng ký"&nbsp;</strong>sau đó điền các thông tin như: Họ tên, số điện thoại, mật khẩu (Lưu ý: bạn cần nhập chính xác số điện thoại bạn cần khách hàng gọi đến, mật khẩu thì nên tạo dễ nhớ và ghi lại, để sau này bạn có thể đăng nhập để đăng tin, chỉnh sửa nội dung vv...)</p><p>Nếu bạn truy cập trên máy tính (laptop) thì nút <strong>"đăng ký"</strong> nằm ở góc trên, bên phải màn hình:</p></p><p>Còn nếu bạn truy cập trên điện thoại, nút <strong>"đăng ký"</strong> nằm ở phía dưới cùng màn hình:</p><p style="text-align: center;"></p><p><strong>3. Vào đâu để xem lại tin đã đăng, chỉnh sửa hoặc ẩn tin đã đăng?</strong></p><p>Sau khi đã đăng nhập và đăng tin thành công, bạn có thể vào phần <strong>"Quản lý tài khoản"</strong> tìm mục <strong>"Quản lý tin đăng"</strong>, bạn sẽ thấy tất cả các tin đã đăng tại đây.&nbsp;</p><p>Và bạn nhìn bên phải của các tin đã đăng, bạn sẽ thấy nút <strong>"Sửa"</strong> và <strong>"Ẩn tin đăng",&nbsp;</strong>bấm vào để thực hiện các thao tác mong muốn.&nbsp;</p><p style="text-align: center;"></p><p><strong>4. Đăng tin tại <strong>RoomGo</strong> có mất phí không?</strong></p><p>Hiện tại, nếu bạn đăng ký lần đầu tiên, website sẽ tặng bạn <strong>10.000 đồng</strong> vào tài khoản, bạn có thể đăng 1 tin thường hiển thị 5 ngày.&nbsp;</p><p>Bạn có thể tham khảo thêm báo giá đăng tin tại đường link sau:&nbsp;<strong><a href="https://phongtro123.com/upload/quang-cao/bang-gia-dang-tin.php">https://phongtro123.com/upload/quang-cao/bang-gia-dang-tin.php</a></strong></p><p><strong>5. Nạp tiền vào tài khoản bằng cách nào?</strong></p><p>Để nạp tiền, bạn tìm đến nút <a href="https://phongtro123.com/nap-tien-vao-tai-khoan"><strong>Nạp tiền</strong></a> trên màn hình, hiện <strong>RoomGo</strong> có các hình thức thanh toán sau:&nbsp;</p><p>a) Chuyển khoản trực tiếp vào các số tài khoản tại <strong>RoomGo</strong> thông qua internet banking hoặc chuyển khoản thông thường.</p><p>b) Thanh toán bằng thẻ ngân hàng nội địa (Lưu ý, thẻ ngân hàng nội địa phải đăng ký giao dịch online tại ngân hàng phát hành thẻ)</p><p>c) Thanh toán bằng thẻ tính dụng quốc tế/Visa</p><p>d) Thanh toán qua ví điện tử Momo cho số điện thoại 0917.686.101</p><p>e) Thanh toán qua Zalo Pay cho số điện thoại 0917.686.101&nbsp;</p><p>f) Thanh toán trực tiếp tại đỉa chỉ văn phòng (Lầu 7, Số 150 Trần Não, Kp2, Phường Bình An, Quận 2, TP. Hồ Chí Minh)</p><p>Link nạp tiền:&nbsp;<strong><a href="https://phongtro123.com/nap-tien-vao-tai-khoan">https://phongtro123.com/nap-tien-vao-tai-khoan</a></strong></p>
      `;

const Questions = () => {
  return (
    <Card className="bg-white p-7 ">
      <header className="mb-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Chính sách bảo mật</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="text-3xl font-semibold mt-5">Chính sách bảo mật</h1>
      </header>
      <div className=" text-base leading-8">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Card>
  );
};

export default Questions;
