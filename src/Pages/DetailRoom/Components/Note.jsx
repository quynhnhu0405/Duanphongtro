import { ExclamationCircleFilled } from "@ant-design/icons";


const Note = () => {
  return (
    <div className="bg-yellow-50 border border-amber-200 mt-3 p-4 rounded-2xl">
      <h1 className="text-sm font-bold text-amber-900"> <ExclamationCircleFilled className="mr-3" style={{color:"red"}}/> Lưu ý:</h1>
      <p className="text-sm text-amber-800">
        Chỉ đặt khi cọc xác định được chủ nhà và có thỏa thuận biên nhận rõ
        ràng. Kiểm tra mọi điều khoản và yêu cầu liệt kê tất cả chi phí hàng
        tháng vào hợp đồng.
      </p>
      <p className="text-sm text-amber-800">
        Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo.
        Nếu bạn thấy rằng tin đăng này không đúng hoặc có dấu hiệu lừa đảo, hãy
        phản ánh với chúng tôi.
      </p>
    </div>
  );
};

export default Note;
