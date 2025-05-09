import { Card, Checkbox } from "antd";
import { useState } from "react";

const MethodPayment = () => {
  const [selectedMethod, setSelectedMethod] = useState("momo"); // State để lưu phương thức thanh toán được chọn

  // Xử lý khi người dùng thay đổi phương thức thanh toán
  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value); // Cập nhật phương thức được chọn
  };
  return (
    <div className="mr-1 mb-6">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-md">
        <div className="text-xl font-black mb-7">
          Chọn phương thức thanh toán
        </div>
        <div
          className={`mb-4 p-4 border rounded-2xl transition-all ${
            selectedMethod === "momo"
              ? "border-blue-600 bg-blue-100"
              : "border-gray-300 bg-white"
          }`}
        >
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="momo"
              checked={selectedMethod === "momo"}
              onChange={handleMethodChange}
              className="form-radio w-5 h-5 text-blue-600 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between w-full">
              <span className="text-gray-700">Thanh toán qua Momo</span>
              <img src="public/momo.png" alt="" className="w-7 h-7" />
            </div>
          </label>
        </div>
        <div  className={`mb-4 p-4 border rounded-2xl transition-all ${
            selectedMethod === "bank"
              ? "border-blue-600 bg-blue-100"
              : "border-gray-300 bg-white"
          }`}>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="bank"
              checked={selectedMethod === "bank"}
              onChange={handleMethodChange}
              className="form-radio h-5 w-5 text-blue-600 rounded-full focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-between w-full">
              <span className="text-gray-700">Thanh toán qua Ngân hàng</span>{" "}
              <img src="public/bank.png" alt="" className="w-7 h-7" />
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default MethodPayment;
