import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, message } from "antd";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { authService } from "../../../Utils/api";
import { useAuth } from "../../../Utils/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !password) {
      message.error("Vui lòng nhập số điện thoại và mật khẩu");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login({ phone, password });

      // Use the login function from AuthContext
      login(response.data.user, response.data.token);

      message.success("Đăng nhập thành công");

      // Chuyển hướng đến trang chủ
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      message.error(
        error.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[600px] m-auto mt-15 h-full">
      <Card className="bg-white !p-7 ">
        <div className="flex justify-between !text-black border-b border-gray-300 mb-6">
          <Link
            to="/dang-nhap"
            className="text-2xl font-black w-1/2 text-center !text-black border-b-3 border-red-600 pb-4 "
            placeholder=" "
          >
            Đăng nhập
          </Link>
          <Link
            to="/tao-tai-khoan-moi"
            className="text-2xl w-1/2 text-center !text-black"
          >
            Tạo tài khoản mới
          </Link>
        </div>
        <form onSubmit={handleLogin} className="mt-15">
          <div className="relative w-full">
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="peer w-full border border-gray-300 rounded-2xl p-3 pt-5 outline-none focus:border-blue-300"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full border border-gray-300 rounded-2xl p-3 pt-5 outline-none focus:border-blue-300"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute left-3 bg-unset transition-all text-black
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
          <button
            type="submit"
            className="w-full mt-5 mb-3 bg-red-500 text-white p-2 font-black text-lg rounded-3xl hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
          <Link to="/quen-mat-khau" className="underline text-sm">
            Bạn quên mật khẩu ?
          </Link>
          <p className="text-xs mt-3">
            Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các{" "}
            <Link to="/quy-dinh-su-dung">quy định sử dụng</Link> cũng như{" "}
            <Link to="/chinh-sach-bao-mat">chính sách bảo mật</Link> của chúng
            tôi
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
