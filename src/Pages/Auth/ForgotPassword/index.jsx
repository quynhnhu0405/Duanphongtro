import React, { useState } from "react";
import { ArrowRightOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Card, Input, Button, message, Modal } from "antd";
import { useNavigate } from "react-router";
import { authService } from "../../../Utils/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập mã OTP, 3: Đổi mật khẩu
  const [email, setEmail] = useState(""); // Email
  const [otp, setOtp] = useState(""); // Mã OTP
  const [newPassword, setNewPassword] = useState(""); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Nhập lại mật khẩu mới
  const [error, setError] = useState(""); // Thông báo lỗi
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Xử lý khi nhấn nút "Tiếp tục" ở bước 1
  const handleSendOtp = async () => {
    if (!email) {
      setError("Vui lòng nhập email!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ!");
      return;
    }

    setError(""); // Xóa thông báo lỗi
    setLoading(true);

    try {
      const response = await authService.forgotPassword({ email });
      message.success(response.data.message);
      setStep(2); // Chuyển sang bước nhập mã OTP
    } catch (error) {
      setError(error.response?.data?.message || "Có lỗi xảy ra khi gửi mã xác thực");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi nhấn nút "Tiếp tục" ở bước 2
  const handleConfirmOtp = () => {
    if (!otp) {
      setError("Vui lòng nhập mã OTP!");
      return;
    }
    setError(""); // Xóa thông báo lỗi
    setStep(3); // Chuyển sang bước đổi mật khẩu
  };

  // Xử lý khi nhấn nút "Đổi mật khẩu" ở bước 3
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và nhập lại mật khẩu không khớp!");
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt");
      return;
    }

    setError(""); // Xóa thông báo lỗi
    setLoading(true);

    try {
      const response = await authService.resetPassword({
        email,
        otp,
        newPassword
      });
      message.success(response.data.message);
      setShowSuccessModal(true);
      message.success({
        content: 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới.',
        duration: 3,
        icon: <CheckCircleFilled style={{ color: '#52c41a' }} />
      });
    } catch (error) {
      setError(error.response?.data?.message || "Có lỗi xảy ra khi đặt lại mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalOk = () => {
    setShowSuccessModal(false);
    navigate("/dang-nhap");
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
          <div className="mb-4 p-3 rounded-lg text-center bg-red-100 text-red-600">
            {error}
          </div>
        )}

        {/* Bước 1: Nhập email */}
        {step === 1 && (
          <div>
            <p className="text-lg mb-4 text-gray-500">
              Nhập email của bạn để nhận mã đặt lại mật khẩu
            </p>
            <div className="relative w-full">
              <Input
                type="email"
                id="email"
                className="mb-4 !p-2 rounded-2xl !text-[15px]"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              className="w-full mt-5 mb-3 !text-base !p-5 !rounded-xl !bg-green-600 !font-black"
              type="primary"
              onClick={handleSendOtp}
              loading={loading}
            >
              Tiếp tục <ArrowRightOutlined className="ml-3" />
            </Button>
          </div>
        )}

        {/* Bước 2: Nhập mã OTP */}
        {step === 2 && (
          <div>
            <p className="text-lg mb-4 text-gray-500">
              Nhập mã OTP đã gửi đến email <strong>{email}</strong>
            </p>
            <div className="relative w-full">
              <Input
                type="text"
                id="otp"
                className="mb-4 !p-2 rounded-2xl !text-[15px]"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
            <Button
              type="primary"
              className="w-full mt-5 mb-3 !text-base !p-5 !rounded-xl !bg-green-600 !font-black"
              onClick={handleConfirmOtp}
              loading={loading}
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
              loading={loading}
            >
              Đổi mật khẩu <ArrowRightOutlined className="ml-3" />
            </Button>
          </div>
        )}
      </Card>

      <Modal
        title={
          <div className="flex items-center justify-center">
            <CheckCircleFilled style={{ color: '#52c41a', fontSize: '24px', marginRight: '8px' }} />
            <span className="text-xl font-semibold">Đặt lại mật khẩu thành công!</span>
          </div>
        }
        open={showSuccessModal}
        onOk={handleSuccessModalOk}
        okText="Đăng nhập ngay"
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
      >
        <div className="text-center py-4">
          <p className="text-lg mb-2">Mật khẩu của bạn đã được đặt lại thành công.</p>
          <p className="text-gray-600">Vui lòng đăng nhập lại với mật khẩu mới của bạn.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;