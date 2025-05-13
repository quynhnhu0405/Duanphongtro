import React, { useEffect, useState } from "react";
import { Avatar, Button, Modal, Form, Input, Upload, message } from "antd";
import { ExclamationCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../../../Utils/AuthContext";
import { postService, userService } from "../../../Utils/api";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [post, setPost] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  console.log("user", user);
  useEffect(() => {
    postService
      .getPostByUserId(user._id)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.error("Lỗi API:", error));
  }, [user._id]);
  console.log("post", post);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await userService.getMyProfile(); 
        updateUser(response.data); 
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
  
    fetchUserInfo();
  
    postService
      .getPostByUserId(user.id)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.error("Lỗi API:", error));
  }, []);
  const handleEditProfile = () => {
    setIsModalVisible(true);
    setAvatarPreview(user.avatar || "");
    form.setFieldsValue({
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Bạn chỉ có thể tải lên file ảnh!");
      return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    setAvatarFile(file);
    return false; // Prevent automatic upload
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("avatar", avatarPreview);

      const response = await userService.updateProfile(user.id, formData);
      message.success("Cập nhật thành công!");
      setIsModalVisible(false);
      setIsSuccessModalVisible(true);
      // Update user in context
      updateUser({
        ...user,
        name: values.name,
        phone: values.phone,
        avatar: response.data.avatar || user.avatar,
      });

      // Reset states
      setAvatarFile(null);
      setAvatarPreview("");
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err);
      message.error("Cập nhật thất bại!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="w-fit m-auto p-2 border border-black rounded-full">
        <Avatar
          src={user?.avatar || "/defaul-avt.png"}
          className="!w-[120px] !h-[120px]"
        />
      </div>
      <div className="text-center mt-6">
        <h2 className="text-xl font-bold mb-3">{user?.name}</h2>
        <p className="text-gray-600 text-base mb-3">{user?.phone}</p>
        <p className="text-gray-600 text-base mb-3">{user?.email}</p>
        <p className="text-gray-600 text-base">Số tin đăng: {post.count}</p>
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
          layout="vertical"
          initialValues={{
            name: user.name,
            phone: user.phone,
            email: user.email,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Avatar">
            <Upload
              beforeUpload={beforeUpload}
              showUploadList={false}
              accept="image/*"
            >
              <div className="flex items-center space-x-4">
                <Avatar
                  src={avatarPreview || user?.avatar || "/defaul-avt.png"}
                  alt="Avatar"
                  className="!w-16 !h-16 rounded-full object-cover"
                />
                <Button icon={<UploadOutlined />} className="!ml-6">Tải lên avatar mới</Button>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên" },
              { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
            ]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <p className="-mt-4 mb-4 text-xs text-red-500 flex items-center">
            <ExclamationCircleTwoTone twoToneColor="#eb2f96" className="mr-2" />
            (Lưu ý: đổi sđt sẽ đổi luôn sđt đăng nhập tài khoản và hiển thị lên
            bài đăng)
          </p>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thành công"
        visible={isSuccessModalVisible}
        onCancel={() => setIsSuccessModalVisible(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setIsSuccessModalVisible(false)}
          >
            OK
          </Button>,
        ]}
      >
        <div className="text-center py-4">
          <p className="text-green-500 text-lg mb-4">
            Cập nhật thông tin thành công!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
