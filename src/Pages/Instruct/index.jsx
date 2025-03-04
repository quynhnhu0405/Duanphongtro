import { Breadcrumb, Card } from "antd";
const content =`<h2 class="text-xl mb-3 font-semibold">Hướng dẫn đăng tin</h2>
          <p class="mb-3">Chào bạn, sau đây là hướng dẫn sử dụng cho thành viên website phongtro123.com.</p>
          <p class="mb-3">Nếu bạn chưa có tài khoản, hãy <a href="https://phongtro123.com/dang-ky-tai-khoan">đăng ký tại đây</a> trước khi bắt đầu đăng tin mới.</p>
          <p class="mb-3">Nếu đã có tài khoản, sau khi <a href="https://phongtro123.com/dang-nhap-tai-khoan">đăng nhập</a> vào website, bạn bấm vào nút <a href="https://phongtro123.com/quan-ly/dang-tin-moi.html">ĐĂNG TIN</a> để bắt đầu.</p>
          <p class="mb-3">Khi đăng tin các bạn đọc kỹ mô tả từng bước, nhập đầy đủ và chính xác nội dung cho tin đăng, đặc biệt là mục Giá và Diện tích. Những tin có nội dung hình ảnh rõ ràng, đầy đủ sẽ có tỉ lệ xem cao hơn 50%.</p>
          <h2 class="text-xl mb-3 font-semibold">Lưu ý khi đăng tin:</h2>
          <p class="mb-3">+ Điền đầy đủ các thông tin bắt buộc vào các ô nhập liệu trong phần đăng tin.</p>
          <p class="mb-3">+ Phần giá cho thuê, vui lòng nhập chính xác 1 giá duy nhất (Không nhập giá từ ....đến ....) và chọn đúng đơn vị giá là triệu/tháng hoặc nghìn/tháng. Ví dụ bạn cho thuê 3 triệu/tháng thì bạn nhập đủ như sau 3000000 (1 số 3 và 6 số 0)</p>
          <p class="mb-3">+ Diện tích nhập đúng 1 diện tích duy nhất (Không nhập diện tích từ ....đến ....)</p>
          <p>+ Sau khi nhập đầy đủ các thông tin, bấm ĐĂNG TIN NGAY và chờ vài giây để tin bạn hiển thị trên website, nếu đăng tin thành công hệ thống sẽ báo bạn đã đăng tin thành công, nếu hệ thống cảnh báo màu đỏ, các ô chọn màu bị sai, vui lòng nhập lại cho chính xác và bấm ĐĂNG TIN NGAY lại.</p><br>
          <h2 class="text-xl mb-3 font-semibold">Hướng dẫn nạp tiền</h2>
          <p class="mb-3">Sau khi "Đăng nhập" quý khách nhấp chọn vào phần Quản lý tài khoản và chọn <a href="https://phongtro123.com/quan-ly/nap-tien.html">Nạp Tiền</a></p>
          <p class="mb-3">Quý khách có thể chọn các hình thức thanh toán sau: </p>
          <ul>
            <li>Chuyển khoản trực tiếp vào các số tài khoản tại Phongtro123.com thông qua internet banking hoặc chuyển khoản thông thường.</li>
            <li>Thanh toán bằng thẻ ngân hàng nội địa (Lưu ý, thẻ ngân hàng nội địa phải đăng ký giao dịch online tại ngân hàng phát hành thẻ)</li>
            <li>Thanh toán bằng thẻ tính dụng quốc tế/Visa</li><li>Thanh toán ví MoMo cho số điện thoại 0917.686.101</li>
            <li>Thanh toán qua Zalo Pay cho số điện thoại 0917.686.101</li><li>Thanh toán trực tiếp tại đỉa chỉ văn phòng (Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam)</li>
        </ul>
            <p>Link nạp tiền: <a href="https://phongtro123.com/quan-ly/nap-tien.html">https://phongtro123.com/quan-ly/nap-tien.html</a></p><br>
            <h2 class="text-xl mb-3 font-semibold">Hướng dẫn quản lý tin rao</h2>
            <p class="mb-3">Đăng nhập tài khoản, sau đó nhấp vào phần Quản lý tài khoản, chọn <a href="https://phongtro123.com/quan-ly/tin-dang.html">Quản lý tin đăng</a> để quản lý các tin đã đăng trên hệ thống.</p>
            <p class="mb-3">+ <strong>Đẩy tin</strong>: có nghĩa là làm mới tin, đưa tin lên đầu ở từng mục, bạn đang đăng tin thường, thì up lên top sẽ ở đầu danh sách tin thường, bạn đang đăng tin VIP thì ở đầu danh sách tin VIP (Vip có 2 loại VIP VÀNG và SUPPER VIP)</p>
            <p class="mb-3">+ <strong>Nâng cấp VIP</strong>: là chức năng giúp thay đổi vị trí hiện thị của tin đăng lên vị trí cao hơn tiếp cận được nhiều người xem hơn.</p>
            <p class="mb-3">+ <strong>Sửa</strong>: có nghĩa là bạn có thể sửa lại tin bạn đã đăng như nội dung, tiêu đề, hoặc giá vvv...</p>
            <p class="mb-3">+ <strong>Đã cho thuê</strong>: chức năng này rất hay, khi bấm vào tin đăng của bạn sẽ ko còn hiện trên mục tìm kiếm, người khác sẽ không thấy tin đăng của bạn, nhưng tin vẫn còn lưu trên website, khi nào bạn cần đăng lại thì có thể &nbsp;nhấp vào để tin hiển thị lại.</p>
            <p class="mb-3">+ <strong>Xoá</strong>: có nghĩa là bạn sẽ xoá bỏ vĩnh viễn tin đăng của mình.</p>`
const InstructPost = () => {
  return (
    <Card className="bg-white p-7 ">
      <header className="mb-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Hướng dẫn đăng tin</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="text-3xl font-semibold mt-5">Hướng dẫn đăng tin</h1>
      </header>
      <div className=" text-base leading-8">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Card>
  );
};

export default InstructPost;
