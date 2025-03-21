
import { Form, Input, Button, message } from "antd";
import { useLocation, useNavigate } from "react-router";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
const location = useLocation();
  const handleChangePassword = (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    // Kiểm tra mật khẩu mới và nhập lại mật khẩu mới có khớp nhau không
    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu mới và nhập lại mật khẩu không khớp!");
      return;
    }

    // Gọi API đổi mật khẩu ở đây (giả lập)
    console.log("Mật khẩu cũ:", oldPassword);
    console.log("Mật khẩu mới:", newPassword);

    // Thông báo thành công và quay về trang quản lý tài khoản
    message.success("Đổi mật khẩu thành công!");
    navigate("/quan-ly/quan-ly-tai-khoan");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-6">Đổi mật khẩu</h2>
      <Form form={form} onFinish={handleChangePassword} layout="vertical">
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu cũ" className="!p-2 rounded-2xl !text-[15px]"/>
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" className="!p-2 rounded-2xl !text-[15px]"/>
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu mới"
          name="confirmPassword"
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu mới!" },
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu mới" className="!p-2 rounded-2xl !text-[15px]"/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="!text-base !p-5 !rounded-xl !bg-green-600">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>

      {/* Link quên mật khẩu */}
      <div className="text-center mt-4">
        <Button
          type="link"
          onClick={() => navigate(location.pathname + "/quen-mat-khau")}
          className="!p-0"
        >
          Quên mật khẩu?
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;