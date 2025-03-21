import React, { useState } from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router";

const ForgotPasswordAccount = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("0123456789");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Xử lý khi nhấn nút "Gửi mã"
  const handleSendOtp = () => {
    setError("");
    setStep(2);
  };

  // Xử lý khi nhấn nút "Xác nhận mã OTP"
  const handleConfirmOtp = () => {
    if (!otp) {
      setError("Vui lòng nhập mã OTP!");
      return;
    }
    // Giả lập kiểm tra mã OTP
    if (otp === "123456") {
      setError("");
      setStep(3);
    } else {
      setError("Mã OTP không hợp lệ!");
    }
  };
  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và nhập lại mật khẩu không khớp!");
      return;
    }
    setError("");
    setError("");

    setTimeout(() => {
      setError("Đổi mật khẩu thành công!");
      setTimeout(() => {
        navigate("/quan-ly/quan-ly-tai-khoan"); // Thay bằng trang bạn muốn điều hướng
      }, 700);
    }, 100);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-6">Quên mật khẩu</h2>

      {/* Hiển thị thông báo lỗi */}
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
            Mã sẽ gửi về số điện thoại <strong>{phoneNumber}</strong>.
          </p>
          <Button
            type="primary"
            onClick={handleSendOtp}
            block
            className="!text-base !p-5 !rounded-xl !bg-green-600"
          >
            Gửi mã
          </Button>
        </div>
      )}

      {/* Bước 2: Nhập mã OTP */}
      {step === 2 && (
        <div>
          <p className="mb-4">
            Vui lòng nhập mã OTP đã gửi đến số điện thoại{" "}
            <strong>{phoneNumber}</strong>.
          </p>
          <Input
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4 !p-2 rounded-2xl !text-[15px]"
          />
          <Button
            type="primary"
            onClick={handleConfirmOtp}
            block
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
