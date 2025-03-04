import { Breadcrumb, Card } from "antd"

const PostingRegulation = () => {
  return (
    <Card className="bg-white p-7 ">
        <header className="mb-3">
        <Breadcrumb>
            <Breadcrumb.Item>
            <a href="/">Trang chủ</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
            <span>Quy định đăng tin</span>
            </Breadcrumb.Item>
        </Breadcrumb> 
            <h1 className="text-3xl font-semibold mt-5">Quy định đăng tin</h1>
        </header>
        <div className="leading-8 text-base">
            <h3 className="text-xl font-semibold mt-4 mb-4">A. QUY ĐỊNH CHUNG:</h3>
            <p>- Không sử dụng bất kỳ thiết bị, phần mềm, quy trình, phương tiện để can thiệp hay cố gắng can thiệp vào hoạt động đúng đắn trên RoomGo.</p>
            <p>- Không được đăng ký tài khoản và khai báo những thông tin giả mạo; nick gây hiểu nhầm với những thành viên khác</p>
            <p>- Không được phép đăng tin liên quan đến các vấn đề mà Pháp luật Việt Nam không cho phép.</p>
            <p>- Không được đăng những bài viết, thông tin có nội dung vi phạm pháp luật; đả kích, bôi nhọ, chỉ trích hay bàn luận về chính trị, tôn giáo, phản động, kỳ thị văn hóa, dân tộc, cũng như vi phạm khác liên quan đến thuần phong mỹ tục của dân tộc Việt Nam.</p>
            <p>- Không được xâm phạm quyền lợi, uy tín, đời tư của các cá nhân hay thành viên khác, không được dùng ngôn từ tục tĩu, thóa mạ trong các thông tin tham gia.</p>
            <p>- Không được lợi dụng website để tuyên truyền, đề xướng, lôi kéo với những nội dung không lành mạnh.</p>
            <p>- Phải dùng ngôn từ trong sáng, rõ ràng, đúng chính tả.</p>
            <h3 className="text-xl font-semibold mt-4 mb-4">B. QUY ĐỊNH VỀ TIN ĐĂNG (CÁC TRƯỜNG HỢP TIN ĐĂNG KHÔNG ĐƯỢC DUYỆT)</h3>
            <p>
                <strong>1.</strong>&nbsp;Tiêu đề và nội dung tin đăng bằng tiếng Việt, có dấu, chữ thường, chỉ viết hoa đầu câu và danh từ riêng, đúng chính tả, câu văn mạch lạc, rõ ràng, không chèn các ký tự đặc biệt, không dùng dấu gạch dưới ( _ ) để ngắt câu hay đặt ở đầu câu.&nbsp;
                <strong>Lưu ý: tin đăng tiêu đề/nội dung IN HOA, sẽ không được duyệt hiển thị.</strong>
            </p>
            <p>
                <strong>2.</strong>&nbsp;Giữa các đoạn văn cách nhau không quá 1 hàng ký tự, không để khoảng trống,&nbsp;
                <strong>không dùng dấu chấm dấu phẩy các ký tự đặc biệt liên tiếp tạo thành dòng</strong>, không để từ khóa bên dưới nội dung mô tả của tin đăng.
            </p>
            <p>
                <strong>3.</strong>&nbsp;Tin đăng không chứa các từ ngữ dung tục, nhạy cảm không phù hợp thuần phong mỹ tục, không đăng thông tin hoặc đề cập đến các chính trị gia, người nổi tiếng.</p>
            <p><strong>4.</strong>&nbsp;Website chỉ duyệt các tin đăng về cho thuê thuộc các chuyên mục: 
            <strong>cho thuê phòng trọ, cho thuê nhà, cho thuê căn hộ/chung cư, cho thuê mặt bằng, ở ghép</strong>. Không được đăng các tin cho thuê ngoài các chuyên mục nêu trên.&nbsp;Mỗi tin đăng chỉ được đăng tin về cho thuê, không đăng đồng thời cả bán và cho thuê.</p>
            <p><strong>5.</strong>&nbsp;Không đăng tin trùng dưới bất kỳ hình thức tin đăng nào, tin trùng sẽ bị hạ.</p>
            <p>+ Một&nbsp;căn (sản phẩm cho thuê)&nbsp;cho thuê cùng giá, cùng diện tích, đăng lặp lại dù nội dung có khác nhau =&gt;&nbsp;Không duyệt tin.</p>
            <p>+ Một căn (sản phẩm cho thuê) khác giá, khác diện tích, khác địa chỉ mà đăng trùng nội dung =&gt; Không duyệt tin.</p>
            <p>+ Một căn (sản phẩm cho thuê) xác định tại một địa chỉ nhưng cố tình đăng phủ nhiều khu vực đường, phường, quận/huyện khác nhau (mặc dù soạn nội dung tin khác nhau) =&gt; Không duyệt tin.&nbsp;</p>
            <p>+ Các căn (sản phẩm cho thuê) khác nhau nhưng đăng cùng một hình ảnh =&gt; Không duyệt tin.</p>
            <p>+ Hình ảnh sai thực tế, để hình người, chân dung... =&gt; Không duyệt tin.</p>
            <p><strong>6.</strong>&nbsp;Tin đăng phải điền&nbsp;<strong>đầy đủ, chính xác địa chỉ: số nhà, tên đường, tên phường, quận/huyện</strong>.&nbsp;<strong>Những tin đăng điền thiếu hoặc không chính xác địa chỉ có thể không được duyệt hiển thị</strong>.&nbsp;</p>
            <p><strong>7.</strong>&nbsp;Thông tin giá cho thuê căn (sản phẩm cho thuê) trong nội dung tin đăng và ô nhập mức giá phải đúng với giá thực tế cho thuê.&nbsp;</p>
            <p><strong>8.</strong>&nbsp;Tin đăng cho thuê căn (sản phẩm cho thuê) phải điền đầy đủ các thông tin tại các trường thông tin ở giao diện đăng tin theo nội dung tin đăng.</p>
            <p><strong>9.</strong>&nbsp;Quý khách tuyệt đối không sao chép nội dung quảng cáo từ các nhà quảng cáo khác. Trong trường hợp RoomGo&nbsp;nhận được khiếu nại của khách hàng và xác định được tin đăng của Quý khách là tin sao chép nội dung, tin đăng của Quý khách có thể bị xóa hoặc chỉnh sửa lại nội dung mà không cần thông báo trước.</p>
            <p><strong>10.</strong> Tin đăng khi hết hạn nếu khách hàng không gia hạn lại sau thời gian nhất định hệ thống sẽ tự động xóa đi.</p>
            <h3 className="text-xl font-semibold mt-4 mb-4">C. QUY ĐỊNH VỀ TÀI KHOẢN:</h3>
            <p>- Tại RoomGo, chúng tôi rất quan tâm đến vấn đề minh bạch thông tin, vì vậy tài khoản phải cung cấp thông tin thật của người sử dụng (họ tên, số điện thoại...).</p>
            <p>- Số điện thoại sử dụng của tài khoản sẽ được xác thực trước khi đăng tin</p>
            <p>- Tài khoản sẽ được đánh dấu "đã xác thực" sau khi ban quản trị website nhận được thông tin cung cấp từ chủ tài khoản (bao gồm chứng minh nhân dân, bằng lái hoặc các thông tin liên quan).</p>
            <p><strong>NHỮNG LÝ DO KHIẾN TÀI KHOẢN BỊ KHÓA</strong></p>
            <p>- Tạo nhiều tài khoản ảo: cố tình tạo nhiều tài khoản để lách quy định giới hạn tin đăng trên mỗi tài khoản.</p>
            <p>- Đăng tin không đúng sự thật: cố ý cung cấp nội dung sai, giả mạo so với giao dịch thực tế (bao gồm thông tin về bất động sản, giá, hình ảnh, địa chỉ...) và hướng khách hàng đến 1 giao dịch khác, điều này làm ảnh hưởng rất lớn đến lòng tin, uy tín của website RoomGo đối với người dùng. Nếu bất động sản đã giao dịch xong, xin vui lòng cập nhật lại trạng thái của bất động sản (đã bán, đã cho thuê).</p>
            <p>- Đăng nội dung trùng lặp: cùng 1 bất động sản nhưng đăng nhiều lần, gây trùng lặp nội dung trên website. Nếu muốn đưa tin đăng lên cao, vui lòng sử dụng tính năng UP TOP</p>
            <p>- Sử dụng phần mềm UP TOP tự động được cung cấp bởi bên thứ 3 ngoài kiểm soát của RoomGo, khiến máy chủ quá tải gây ảnh hưởng tốc độ website. Nếu có nhu cầu UP TOP tự động vui lòng sử dụng tính năng được cung cấp bởi RoomGo để website hoạt động ổn định.</p>
            <h3 className="text-xl font-semibold mt-4 mb-4">D. QUY ĐỊNH VỀ CHI PHÍ:</h3><p>- Mỗi tài khoản đăng ký lần đầu tiên được tặng 1 tin miễn phí có hạn sử dụng trong vòng 7 ngày kể từ lúc đăng ký, bạn sẽ trả phí nếu muốn sử dụng tiếp dịch vụ đăng tin thường, VIP, UP TOP, hoặc các dịch vụ có phí khác.</p>
            <p>- Giúp giao dịch cho thuê diễn ra nhanh chóng cũng là 1 trong những mục tiêu của RoomGo, vì vậy phí trả cho số ngày mua dịch vụ sẽ không được hoàn lại khi giao dịch đã thành công sớm hơn.</p>
            <p>- Tham khảo&nbsp;<a href="https://phongtro123.com/upload/quang-cao/bang-gia-dang-tin.php" target="_blank" rel="noopener">bảng giá dịch vụ</a>&nbsp;được cung cấp chi tiết&nbsp;<a href="https://phongtro123.com/upload/quang-cao/bang-gia-dang-tin.php" target="_blank" rel="noopener">tại đây</a></p>
        </div>
    </Card>
  )
}

export default PostingRegulation
