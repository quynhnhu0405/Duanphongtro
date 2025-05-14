import { Breadcrumb, Card } from "antd";

const Introduce = () => {
  return (
    <Card className="bg-white p-7 ">
      <header className="mb-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Giới thiệu</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="text-3xl font-semibold mt-5">Giới thiệu</h1>
      </header>
      <div className=" text-base leading-8">
        <p className=" mb-3">
          Với mong muốn xây dựng một trang web thật <strong>PRO</strong>
          &nbsp;chuyên cung cấp thông tin nhà trọ phòng trọ cho mọi người, khi
          mà ngày nay nhu cầu nhà trọ phòng trọ ngày càng tăng ở các thành phố
          lớn nhất là <strong>Hà Nội</strong> và{" "}
          <strong>TP. Hồ Chí Minh.</strong>
        </p>
        <p className=" mb-3">
          Đối với cách tiếp cận thông tin truyền thống đã không được truyền đến
          mọi người một cách kịp thời đúng lúc.
        </p>
        <p className=" mb-3">
          Chính vì nắm bắt được tình hình thực tế đó mà chúng tôi đã thành lập
          website <strong>RoomGo</strong>&nbsp;với mong muốn trở thành
          một kênh truyền thông phổ biến nhà trọ, phòng trọ hữu ích cho mọi
          người.
        </p>
        <p className=" mb-3">
          Nếu trước đây việc cho thuê nhà, cho thuê phòng trọ đều dán giấy đăng
          quảng cáo ở các nơi công cộng rất là mất vẽ mỹ quang đô thị. Thì ngày
          nay các bạn có thể đăng tin trên đây rất tiện lợi, với phương tiện
          truyền thông được phổ biến rộng rãi tin đăng của bạn sẽ được hàng ngàn
          người biết đến.
        </p>
        <p className=" mb-3">
          Website ra đời sẽ góp phần giải quyết được các vấn đề thuê trọ hiện
          nay, và giúp mọi người tìm kiếm nhà trọ, chỗ ở phù hợp và dễ dàng. Hy
          vọng <strong>RoomGo</strong>&nbsp;sẽ là địa chỉ quen thuộc
          cho mọi người.
        </p>
        <p className=" mb-3">
          Website với giao diện thân thiện dễ sử dụng và hướng đến người dùng,
          các chuyên mục được phân chia rất rõ ràng và tim kiếm tin đăng rất chi
          tiết.
        </p>
        <p className=" mb-3">
          - Bạn có thể tìm phòng trọ nhà trọ, tìm người ở ghép, tìm nhà cho thuê
          theo:
        </p>
        <p className=" mb-3">+ Tỉnh thành như Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng...</p>
        <p className=" mb-3">+ Quận huyện, chuyên mục, theo giá, theo diện tích.</p>
        <p className=" mb-3">
          - Đăng tin cho thuê phòng trọ, nhà trọ, nhà nguyên căn, cho thuê căn
          hộ chung cư với đầy đủ tính năng
        </p>
        <p className=" mb-3">+&nbsp;Chức năng quản lý bài viết cho mỗi thành viên</p>
        <p className=" mb-3">+&nbsp;Chức năng đăng tin lên top cho người đăng tin</p>
        <p className=" mb-3">
          + Chức năng xóa, sửa, hạ tin đăng nhưng vẫn còn lưu trên hệ thống
          vv...
        </p>
        <p className=" mb-3">
          <strong>Các dịch vụ chính:</strong>
        </p>
        <p className=" mb-3">
          - Đăng thông tin quảng cáo cho thuê phòng trọ, nhà trọ, thuê nhà
          nguyên căn, cho thuê căn hộ, tìm người ở ghép...
        </p>
        <p className=" mb-3">- Đăng banner quảng cáo.</p>
        <p className=" mb-3">
          - Dịch vụ chụp ảnh tận nhà, miễn phí hoàn toàn cho chủ nhà trọ, phòng
          trọ, nhà &nbsp;nguyên căn.
        </p>
        <p className=" mb-3">
          Chúng tôi luôn cố gắng đem lại những thông tin nhanh chóng và chính
          xác cho mọi người. Rất mong nhận được sự ủng hộ giúp đỡ của mọi người
          cùng nhau xây dựng một kênh thông tin truyền thông về nhà trọ.
        </p>
        <p className=" mb-3">
          <strong>Thông tin về website:</strong>
        </p>
        <p className=" mb-3">- Website RoomGo trực thuộc Công ty TNHH</p>
        <p className=" mb-3">
          - Website:&nbsp;
          <a href="https://roomgo.netlify.app/">https://roomgo.netlify.app/</a>
          &nbsp;
        </p>
        <p className=" mb-3">
          - Địa chỉ: Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí
          Thọ, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt
          Nam.&nbsp;
        </p>
        <p className=" mb-3">- Số điện thoại: 0917332055</p>
        <p className=" mb-3">- Email: cskh.roomgo@gmail.com</p>
        <p className=" mb-3">
          <strong>Kênh thông tin phòng trọ số 1 Việt Nam</strong>
        </p>
      </div>
    </Card>
  );
};

export default Introduce;
