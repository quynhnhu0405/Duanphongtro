import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  return (
    <div className="w-[600px] m-auto mt-15 h-full">
      <Card className="bg-white !p-7 ">
        <div className="flex justify-between !text-black border-b border-gray-300 mb-6">
          <a
            href="/dang-nhap"
            className="text-2xl w-1/2 text-center !text-black  "
            placeholder=" "
          >
            Đăng nhập
          </a>
          <a
            href="/tao-tai-khoan-moi"
            className="text-2xl w-1/2 text-center !text-black border-b-3  font-black border-red-600 pb-4"
          >
            Tạo tài khoản mới
          </a>
        </div>
        <div className="mt-15">
          <div className="relative w-full">
            <input
              type="text"
              id="name"
              className="peer w-full border border-gray-300 rounded-2xl p-3 pt-5 outline-none  focus:border-blue-300"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="absolute left-3 bg-unset transition-all text-black
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                peer-focus:top-1 peer-focus:text-xs peer-focus:pt-1
                peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Họ và tên
            </label>
          </div>
          <div className="relative w-full mt-5">
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
          <div className="relative w-full mt-5">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="peer w-full border border-gray-300 rounded-2xl p-3 pt-5 outline-none  focus:border-blue-300"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute left-3 bg-unset transition-all  text-black
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                peer-focus:top-1 peer-focus:text-xs peer-focus:pt-1
                peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Mật khẩu
            </label>
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
            >
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </button>
          </div>
          <button className="w-full mt-5 mb-3 bg-red-500 text-white p-2 font-black text-lg rounded-3xl hover:bg-red-600">
            Tạo tài khoản
          </button>
          <p className="text-xs mt-3">
            Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các{" "}
            <a href="/quy-dinh-su-dung">quy định sử dụng</a> cũng như{" "}
            <a href="/chinh-sach-bao-mat">chính sách bảo mật</a> của chúng tôi
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
