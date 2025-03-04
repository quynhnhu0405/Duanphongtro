import { Breadcrumb, Card } from "antd";

const TermsOfUse = () => {
  return (
    <Card className="bg-white p-7 ">
      <header className="mb-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Quy định sử dụng</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="text-3xl font-semibold mt-5">Quy định sử dụng</h1>
      </header>
      <div className=" text-base leading-8">
          <p className="mb-3">
            <strong>
              Trước khi bạn đăng tin lên website. xin vui lòng đọc kỹ các quy
              định sau đây:
            </strong>
          </p>
          <p className="mb-3">
            1. Không được đăng ký tài khoản và khai báo những thông tin giả mạo,
            đặt tên tài khoản phản cảm, thô tục
          </p>
          <p className="mb-3">
            2. Không được phép đăng tin liên quan đến các vấn đề mà pháp luật
            Việt Nam không cho phép.
          </p>
          <p className="mb-3">
            3. Không được đăng những bài viết, thông tin có nội dung vi phạm
            pháp luật: đả kích, bôi nhọ, chỉ trích hay bàn luận về chính trị,
            tôn giáo, phản động, kỳ thị văn hóa, dân tộc, cũng như vi phạm khác
            liên quan đến thuần phong mỹ tục của dân tộc Việt Nam.
          </p>
          <p className="mb-3">
            4. Tiêu đề và nội dung của tin đăng phải dùng tiếng Việt có dấu.
            Không được sử dụng từ ngữ thô tục, mất văn hoá.
          </p>
          <p className="mb-3">
            5. Tin đăng phải có địa chỉ liên lạc cụ thể không được cho địa chỉ
            sai. hay dùng thông tin địa chỉ của người khác
          </p>
          <p className="mb-3">
            6. Các bài viết không có nội dung hoặc nội dung không liên quan đến
            chuyên mục. Những bài viết này sẽ bị xóa mà không cần báo trước.
          </p>
          <p className="mb-3">
            7. Không tạo nhiều tài khoản để đăng tin, nếu chúng tôi phát hiện sẽ
            xóa và ban toàn bộ nick.
          </p>
          <p className="mb-3">
            8. Không được đăng quá nhiều tin trong ngày và không đăng tin có
            tiêu đề, nội dung tương tự nhau.
          </p>
          <p className="mb-3">
            9. Khi phát hiện tin đăng không đúng sự thật, hay chỗ cho thuê là
            dịch vụ hay cò nhà trọ, bạn vui lòng thông báo cho Ban quản trị biết
            để chúng tôi kịp thời xử lý.
          </p>
          <p className="mb-3">
            10. Những trường hợp cố tình spam, vi phạm nội quy nhiều lần thì
            chúng tôi sẽ cấm không cho bạn đăng tin và tất cả mọi tin đăng của
            bạn sẽ không được hiển thị trên <strong>RoomGo</strong>
          </p>
          <p className="mb-3">
            11. Lưu ý thành viên phải chọn đúng khu vực ví dụ:{" "}
              Hồ Chí Minh
            , Hà Nội và
            chọn đúng chuyên mục như: Cho thuê phòng trọ hoặc cho thuê căn hộ,
            tìm người ở ghép..
          </p>
          <p className="mb-3">
            12.&nbsp;Tin đăng khi hết hạn nếu khách hàng không gia hạn lại sau
            thời gian nhất định hệ thống sẽ tự động xóa đi.
          </p>
          <p className="mb-3">
            <strong>
              Tất cả các tin đăng sai phạm quy định trên sẽ bị xóa mà không cần
              thông báo trước.
            </strong>
          </p>
          <p className="mb-3">
            <strong>
              Chúng tôi không chịu trách nhiệm về nội dung các bài đăng trên
              website.
            </strong>
          </p>
        </div>
    </Card>
  );
};

export default TermsOfUse;
