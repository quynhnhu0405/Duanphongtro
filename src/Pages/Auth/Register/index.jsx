import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, message } from "antd";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { authService } from "../../../Utils/api";
import { useAuth } from "../../../Utils/AuthContext";
import { validatePassword } from "../../../Utils/validation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const { errors } = validatePassword(newPassword);
    setPasswordErrors(errors);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !phone || !password) {
      messageApi.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // Validate phone number (VN format)
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone)) {
      messageApi.error("Số điện thoại không hợp lệ");
      return;
    }

    // Validate password
    const { isValid, errors } = validatePassword(password);
    if (!isValid) {
      setPasswordErrors(errors);
      messageApi.error("Mật khẩu không đáp ứng yêu cầu");
      return;
    }

    setLoading(true);
    setIsSuccess(false);

    try {
      const response = await authService.register({ name, phone, password });

      // Use the login function from AuthContext
      login(response.data.user, response.data.token);

      // Hiển thị thông báo thành công
      setIsSuccess(true);
      await messageApi.open({
        type: 'success',
        content: 'Tạo tài khoản thành công!',
        duration: 2,
      });
      
      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      if (error.response) {
        messageApi.error(error.response.data.message || "Đăng ký thất bại");
      } else {
        messageApi.error("Đăng ký thất bại, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[600px] m-auto mt-15 h-full">
      {contextHolder}
      <Card className="bg-white !p-7">
        <div className="border-b border-gray-300 mb-6">
          <p className="text-2xl font-black text-center !text-black pb-4">
            Đăng ký tài khoản
          </p>
        </div>

        {/* Hiển thị thông báo thành công */}
        {isSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-lg text-center">
            <p className="font-semibold">Tài khoản đã được tạo thành công!</p>
            <p className="text-sm mt-1">Đang chuyển hướng về trang chủ...</p>
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="relative w-full">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full border border-gray-300 rounded-2xl p-3 pt-5 outline-none focus:border-blue-300"
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
              onChange={handlePasswordChange}
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

          {/* Hiển thị các yêu cầu mật khẩu */}
          {passwordErrors.length > 0 && (
            <div className="mt-2 text-sm text-red-500">
              <p className="font-semibold mb-1">Mật khẩu phải đáp ứng các yêu cầu sau:</p>
              <ul className="list-disc pl-5">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-5 mb-3 bg-red-500 text-white p-2 font-black text-lg rounded-3xl hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Tạo tài khoản"}
          </button>

          <p className="text-center">
            Đã có tài khoản?{" "}
            <Link to="/dang-nhap" className="text-red-500 hover:text-red-600">
              Đăng nhập
            </Link>
          </p>

          <p className="text-xs mt-3">
            Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các{" "}
            <Link to="/quy-dinh-su-dung">quy định sử dụng</Link> cũng như{" "}
            <Link to="/chinh-sach-bao-mat">chính sách bảo mật</Link> của chúng tôi
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;
