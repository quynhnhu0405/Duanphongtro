import { ExclamationCircleFilled } from "@ant-design/icons";


const NoteFeaturedPackage = () => {
  return (
    <div>
      <div className="bg-yellow-50 border border-amber-200 mt-3 p-4 rounded-lg">
        <h1 className="text-sm font-bold text-amber-900 mb-2">
          {" "}
          <ExclamationCircleFilled
            className="mr-3"
            style={{ color: "red" }}
          />{" "}
          Tin VIP Nổi Bật ⭐️⭐️⭐️⭐️
        </h1>

        <p className="text-sm text-black">
          <span className="text-orange-600 font-black">TIÊU ĐỀ IN HOA MÀU CAM</span>, gắn biểu tượng 4 ngôi sao màu vàng và hiển thị
          to và nhiều hình hơn các tin khác. Nằm trên tất cả các tin khác, được
          hưởng nhiều ưu tiên và hiệu quả giao dịch cao nhất.
        </p>
      </div>
    </div>
  );
};

export default NoteFeaturedPackage;
