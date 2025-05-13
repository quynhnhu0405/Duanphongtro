import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../../Utils/AuthContext";
import { authService } from "../../../Utils/api";
import { CheckCircleFilled } from "@ant-design/icons";

const ForgotPasswordAccount = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Gửi mã OTP về email
  const handleSendOtp = async () => {
    setError("");
    if (!user?.email) {
      setError("Không tìm thấy email của bạn!");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgotPassword({ email: user.email });
      message.success(response.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra khi gửi mã OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Xác nhận mã OTP
  const handleConfirmOtp = async () => {
    if (!otp) {
      setError("Vui lòng nhập mã OTP!");
      return;
    }

    // Gửi mã OTP để xác minh (nếu có API xác thực riêng, bạn có thể gọi tại đây)
    setStep(3);
    setError("");
  };

  // Đổi mật khẩu mới
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và nhập lại mật khẩu không khớp!");
      return;
    }

    // Validate password mạnh
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, thường, số và ký tự đặc biệt."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.resetPassword({
        email: user.email,
        otp,
        newPassword,
      });

      message.success(response.data.message);
      message.success({
        content: "Đặt lại mật khẩu thành công!",
        duration: 3,
        icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
      });
      setTimeout(() => {
        navigate("/quan-ly/quan-ly-tai-khoan");
      }, 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Đổi mật khẩu thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-6">Quên mật khẩu</h2>

      {error && (
        <div
          className={`mb-4 p-3 rounded-lg text-center ${
            error.includes("thành công")
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {error}
        </div>
      )}

      {/* Bước 1: Gửi mã OTP */}
      {step === 1 && (
        <div>
          <p className="mb-4">
            Mã xác thực sẽ được gửi đến email <strong>{user?.email}</strong>.
          </p>
          <Button
            type="primary"
            onClick={handleSendOtp}
            block
            loading={loading}
            className="!text-base !p-5 !rounded-xl !bg-green-600"
          >
            Gửi mã
          </Button>
        </div>
      )}

      {/* Bước 2: Nhập OTP */}
      {step === 2 && (
        <div>
          <p className="mb-4">
            Nhập mã OTP đã được gửi đến email <strong>{user?.email}</strong>.
          </p>
          <Input
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4 !p-2 rounded-2xl !text-[15px]"
            maxLength={6}
          />
          <Button
            type="primary"
            onClick={handleConfirmOtp}
            block
            loading={loading}
            className="!text-base !p-5 !rounded-xl !bg-green-600 mt-5"
          >
            Xác nhận mã OTP
          </Button>
        </div>
      )}

      {/* Bước 3: Nhập mật khẩu mới */}
      {step === 3 && (
        <div>
          <p className="mb-4">Vui lòng nhập mật khẩu mới.</p>
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4 !p-2 rounded-2xl !text-[15px]"
          />
          <Input.Password
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 !p-2 rounded-2xl !text-[15px]"
          />
          <Button
            type="primary"
            onClick={handleResetPassword}
            block
            loading={loading}
            className="mt-5 !text-base !p-5 !rounded-xl !bg-green-600"
          >
            Đổi mật khẩu
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordAccount;
