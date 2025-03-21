import React, { useState } from "react";
import { Avatar, Button, Modal, Form, Input, Upload, message } from "antd";
import { ExclamationCircleTwoTone, UploadOutlined } from "@ant-design/icons";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn A",
    phone: "0123456789",
    postCount: 10,
    avatar: "https://random.imagecdn.app/500/150",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEditProfile = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      name: userInfo.name,
      phone: userInfo.phone,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    setUserInfo((prev) => ({
      ...prev,
      name: values.name,
      phone: values.phone,
      avatar: values.avatar || prev.avatar,
    }));
    message.success("Cập nhật thông tin thành công!");
    setIsModalVisible(false);
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      // Giả sử API trả về URL của ảnh đã tải lên
      const imageUrl = info.file.response.url;
      setUserInfo((prev) => ({ ...prev, avatar: imageUrl }));
      message.success("Tải lên avatar thành công!");
    } else if (info.file.status === "error") {
      message.error("Tải lên avatar thất bại!");
    }
  };

  // Custom request để giả lập việc tải lên ảnh
  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok"); // Giả lập thành công
    }, 1000);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="w-fit m-auto p-2 border border-black rounded-full">
        <Avatar src={userInfo.avatar} className="!w-[120px] !h-[120px]" />
      </div>
      <div className="text-center mt-6">
        <h2 className="text-xl font-bold mb-3">{userInfo.name}</h2>
        <p className="text-gray-600 text-base mb-3">{userInfo.phone}</p>
        <p className="text-gray-600 text-base">
          Số tin đăng: {userInfo.postCount}
        </p>
      </div>
      <div className="mt-5 w-fit m-auto mb-3">
        <Button
          type="primary"
          className="!text-base !p-5 !rounded-xl !bg-green-600"
          onClick={handleEditProfile}
        >
          Chỉnh sửa thông tin
        </Button>
      </div>

      <Modal
        title="Chỉnh sửa thông tin"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={{ name: userInfo.name, phone: userInfo.phone }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item label="Avatar">
            <Upload
              name="avatar"
              listType="picture"
              showUploadList={false}
              customRequest={customRequest}
              onChange={handleUpload}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={userInfo.avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <Button icon={<UploadOutlined />}>Tải lên avatar mới</Button>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên" className="!p-2 rounded-2xl !text-base" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^\d{10}$/,
                message: "Số điện thoại phải có 10 chữ số!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" className="!p-2 rounded-2xl !text-[15px]"/>
          </Form.Item>
          <p className="-mt-4 mb-4 text-xs text-red-500 flex items-center">
            <ExclamationCircleTwoTone twoToneColor="#eb2f96" className="mr-2" />
            (Lưu ý: đổi sđt sẽ đổi luôn sđt đăng nhập tài khoản và hiển thị lên
            bài đăng)
          </p>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="!text-[15px] !p-5 !rounded-xl !bg-green-600">
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
