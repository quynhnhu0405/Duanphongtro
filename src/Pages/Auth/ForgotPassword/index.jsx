import { ArrowRightOutlined } from "@ant-design/icons";
import { Card } from "antd";

const ForgotPassword = () => {
  return (
    <div className="w-[600px] m-auto mt-15 h-full">
      <Card className="bg-white !p-7 ">
        <div className="border-b border-gray-300 mb-6">
          <p className="text-2xl font-black text-center !text-black pb-4 ">Khôi phục mật khẩu</p>
        </div>
        <div className="mt-5">
          <p className="text-lg mb-4 text-gray-500">Nhập SĐT của bạn để nhận mã đặt lại mật khẩu</p>
          <div className="relative w-full">
            <input
              type="text"
              id="phone"
              className="peer w-full border border-gray-300 rounded-2xl p-3 pt-5 outline-none  focus:border-blue-300"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="absolute left-3 bg-unset transition-all text-black
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                peer-focus:top-1 peer-focus:text-xs peer-focus:pt-1
                peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Số điện thoại
            </label>
          </div>
          <button className="w-full mt-5 mb-3 bg-red-500 text-white p-2 font-black text-lg rounded-3xl hover:bg-red-600">
          Tiếp tục <ArrowRightOutlined className="ml-3"/>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
