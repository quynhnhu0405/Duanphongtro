import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router";
import { userService } from "../../../Utils/api";
import { useState } from "react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  
  const handleChangePassword = async (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    // Kiểm tra mật khẩu mới và nhập lại mật khẩu mới có khớp nhau không
    if (newPassword !== confirmPassword) {
      messageApi.open({
        type: "error",
        content: "Mật khẩu mới và nhập lại mật khẩu không khớp!",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Gọi API đổi mật khẩu
      await userService.changePassword({
        oldPassword,
        newPassword,
      });

      messageApi.open({
        type: "success",
        content: "Đổi mật khẩu thành công!",
        duration: 3,
      });
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đổi mật khẩu thất bại. Vui lòng thử lại sau.";

      messageApi.open({
        type: "error",
        content: errorMessage,
        duration: 2,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      {contextHolder}
      <h2 className="text-xl font-bold mb-6">Đổi mật khẩu</h2>

      <Form form={form} onFinish={handleChangePassword} layout="vertical">
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu cũ"
            className="!p-3 rounded-lg !text-base"
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
            className="!p-3 rounded-lg !text-base"
          />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu mới"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu mới!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Nhập lại mật khẩu mới"
            className="!p-3 rounded-lg !text-base"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="!h-12 !rounded-lg !text-base !font-medium"
            loading={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Đổi mật khẩu"}
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-4">
        <Button
          type="link"
          onClick={() => navigate("/quan-ly/quan-ly-tai-khoan/quen-mat-khau")}
          className="!p-0 !text-gray-600"
        >
          Quên mật khẩu?
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
