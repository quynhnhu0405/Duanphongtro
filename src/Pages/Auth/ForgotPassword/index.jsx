import React, { useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, Input, Button } from "antd";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Nhập SĐT, 2: Nhập mã OTP, 3: Đổi mật khẩu
  const [phoneNumber, setPhoneNumber] = useState(""); // Số điện thoại
  const [otp, setOtp] = useState(""); // Mã OTP
  const [newPassword, setNewPassword] = useState(""); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Nhập lại mật khẩu mới
  const [error, setError] = useState(""); // Thông báo lỗi

  // Xử lý khi nhấn nút "Tiếp tục" ở bước 1
  const handleSendOtp = () => {
    if (!phoneNumber) {
      setError("Vui lòng nhập số điện thoại!");
      return;
    }
    setError(""); // Xóa thông báo lỗi
    // Giả lập gửi mã OTP
    setStep(2); // Chuyển sang bước nhập mã OTP
  };

  // Xử lý khi nhấn nút "Tiếp tục" ở bước 2
  const handleConfirmOtp = () => {
    if (!otp) {
      setError("Vui lòng nhập mã OTP!");
      return;
    }
    // Giả lập kiểm tra mã OTP
    if (otp === "123456") {
      setError(""); // Xóa thông báo lỗi
      setStep(3); // Chuyển sang bước đổi mật khẩu
    } else {
      setError("Mã OTP không hợp lệ!");
    }
  };

  // Xử lý khi nhấn nút "Đổi mật khẩu" ở bước 3
  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và nhập lại mật khẩu không khớp!");
      return;
    }
    setError(""); // Xóa thông báo lỗi
    // Giả lập đổi mật khẩu
    console.log("Mật khẩu mới:", newPassword);
    navigate("/dang-nhap"); // Quay về trang đăng nhập
  };

  return (
    <div className="w-[600px] m-auto mt-15 h-full">
      <Card className="bg-white !p-7">
        <div className="border-b border-gray-300 mb-6">
          <p className="text-2xl font-black text-center !text-black pb-4">
            Khôi phục mật khẩu
          </p>
        </div>

        {/* Hiển thị thông báo lỗi */}
        {error && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              error.includes("thành công") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {error}
          </div>
        )}

        {/* Bước 1: Nhập số điện thoại */}
        {step === 1 && (
          <div>
            <p className="text-lg mb-4 text-gray-500">
              Nhập SĐT của bạn để nhận mã đặt lại mật khẩu
            </p>
            <div className="relative w-full">
              <Input
                type="text"
                id="phone"
                className="mb-4 !p-2 rounded-2xl !text-[15px]"
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Button
              className="w-full mt-5 mb-3 !text-base !p-5 !rounded-xl !bg-green-600 !font-black"
              type="primary"
              onClick={handleSendOtp}
            >
              Tiếp tục <ArrowRightOutlined className="ml-3" />
            </Button>
          </div>
        )}

        {/* Bước 2: Nhập mã OTP */}
        {step === 2 && (
          <div>
            <p className="text-lg mb-4 text-gray-500">
              Nhập mã OTP đã gửi đến số điện thoại{" "}
              <strong>{phoneNumber}</strong>
            </p>
            <div className="relative w-full">
              <Input
                type="text"
                id="otp"
                className="mb-4 !p-2 rounded-2xl !text-[15px]"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <Button
              type="primary"
              className="w-full mt-5 mb-3 !text-base !p-5 !rounded-xl !bg-green-600 !font-black"
              onClick={handleConfirmOtp}
            >
              Tiếp tục <ArrowRightOutlined className="ml-3" />
            </Button>
          </div>
        )}

        {/* Bước 3: Đổi mật khẩu */}
        {step === 3 && (
          <div>
            <p className="text-lg mb-4 text-gray-500">Nhập mật khẩu mới</p>
            <div className="relative w-full mb-4">
              <Input.Password
                className="mb-4 !p-2 rounded-2xl !text-[15px]"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-4">
              <Input.Password
                className="mb-4 !p-2 rounded-2xl !text-[15px]"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              type="primary"
              className="w-full mt-5 mb-3 !text-base !p-5 !rounded-xl !bg-green-600 !font-black"
              onClick={handleResetPassword}
            >
              Đổi mật khẩu <ArrowRightOutlined className="ml-3" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;