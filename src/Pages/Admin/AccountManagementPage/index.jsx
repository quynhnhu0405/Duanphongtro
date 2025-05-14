import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Button,
  Table,
  Tag,
  Dropdown,
  Menu,
  Popconfirm,
  message,
  Modal,
  Form,
  Avatar,
  Descriptions,
  Divider,
  Card,
  Statistic,
  Space,
  Image,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  PlusOutlined,
  UserOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { userService } from "../../../Utils/api";

const { Option } = Select;

const AccountManagementPage = () => {
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStats, setUserStats] = useState({ postCount: 0, revenue: 0 });
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await userService.getAllUsers();
        setAccounts(response.data);
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Không thể tải danh sách tài khoản",
        });
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch user stats when selected user changes
  useEffect(() => {
    if (selectedUser) {
      const fetchUserStats = async () => {
        setDetailLoading(true);
        try {
          const response = await userService.getUserStats(selectedUser._id);
          setUserStats(response.data);
          console.log("User Stats:", response.data);
        } catch (error) {
          console.error("Error fetching user stats:", error);
        } finally {
          setDetailLoading(false);
        }
      };
      fetchUserStats();
    }
  }, [selectedUser]);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Handle role filter
  const handleFilterRole = (value) => {
    setFilterRole(value);
  };

  // Handle status filter
  const handleFilterStatus = (value) => {
    setFilterStatus(value);
  };

  // Toggle account status (lock/unlock)
  const toggleAccountStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "locked" : "active";
      await userService.updateStatus(id, newStatus);
      setAccounts(
        accounts.map((account) =>
          account._id === id ? { ...account, status: newStatus } : account
        )
      );
      messageApi.open({
        type: "success",
        content: `Tài khoản đã được ${
          newStatus === "active" ? "mở khóa" : "khóa"
        }`,
      });
      message.success();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Không thể cập nhật trạng thái tài khoản",
      });
      console.error("Error updating account status:", error);
    }
  };

  // Delete account
  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      setAccounts(accounts.filter((account) => account._id !== id));
      messageApi.open({
        type: "success",
        content: "Tài khoản đã được xóa thành công",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Không thể xóa tài khoản",
      });
      console.error("Error deleting account:", error);
    }
  };

  // Show add account modal
  const showAddAccountModal = () => {
    setIsModalVisible(true);
  };

  // Show user detail modal
  const showUserDetail = (user) => {
    setSelectedUser(user);
    setIsDetailModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Close detail modal
  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
  };

  // Add new account
  const handleAddAccount = async (values) => {
    try {
      const response = await userService.createUser({
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password,
        role: values.role || "user",
        status: "active",
      });

      setAccounts([...accounts, response.data.user]);
      messageApi.open({
        type: "success",
        content: "Tạo tài khoản thanh cong",
      });
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response?.data?.message || "Không thể tạo tài khoản",
      });
      console.error("Error creating account:", error);
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Table columns
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <div className="flex items-center">
          <Avatar src={avatar || "/defaul-avt.png"} />
        </div>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "blue" : "green"}>
          {role === "admin" ? "Quản trị viên" : "Người dùng"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Hoạt động" : "Bị khóa"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="toggleStatus"
                icon={
                  record.status === "active" ? (
                    <LockOutlined />
                  ) : (
                    <UnlockOutlined />
                  )
                }
                onClick={() => toggleAccountStatus(record._id, record.status)}
              >
                {record.status === "active"
                  ? "Khóa tài khoản"
                  : "Mở khóa tài khoản"}
              </Menu.Item>
              <Menu.Item
                key="detail"
                icon={<UserOutlined />}
                onClick={() => showUserDetail(record)}
              >
                Xem chi tiết
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa tài khoản này?"
                  onConfirm={() => handleDelete(record._id)}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <span>Xóa</span>
                </Popconfirm>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Filter accounts based on search and filters
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      account.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      account.phone?.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = filterRole === "all" || account.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || account.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}
      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
        <Input
          placeholder="Tìm kiếm theo tên, số điện thoại"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
        <Select
          defaultValue="all"
          style={{ width: 150 }}
          onChange={handleFilterRole}
          placeholder="Lọc theo vai trò"
        >
          <Option value="all">Tất cả vai trò</Option>
          <Option value="admin">Quản trị viên</Option>
          <Option value="user">Người dùng</Option>
        </Select>
        <Select
          defaultValue="all"
          style={{ width: 150 }}
          onChange={handleFilterStatus}
          placeholder="Lọc theo trạng thái"
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="active">Hoạt động</Option>
          <Option value="locked">Bị khóa</Option>
        </Select>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showAddAccountModal}
        >
          Thêm tài khoản
        </Button>
      </div>

      {/* Accounts table */}
      <Table
        dataSource={filteredAccounts}
        columns={columns}
        rowKey="_id"
        pagination={{
          pageSize: 10,
        }}
        loading={loading}
        scroll={{ x: 1200 }}
      />
      {/* Add account modal */}
      <Modal
        title="Thêm tài khoản mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleAddAccount}
          layout="vertical"
          initialValues={{ role: "user" }}
        >
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng" },
              { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
            ]}
          >
            <Input placeholder="Nhập tên người dùng" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" />
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
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                message:
                  "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <Form.Item label="Vai trò" name="role">
            <Select>
              <Option value="user">Người dùng</Option>
              <Option value="admin">Quản trị viên</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* User detail modal */}
      <Modal
        title="Thông tin chi tiết tài khoản"
        visible={isDetailModalVisible}
        onCancel={handleDetailCancel}
        footer={[
          <Button key="close" onClick={handleDetailCancel}>
            Đóng
          </Button>,
        ]}
        width={700}
      >
        {selectedUser && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Avatar
                size={64}
                src={selectedUser.avatar || null}
                icon={<UserOutlined />}
              />
              <div style={{ marginLeft: 16 }}>
                <h2>{selectedUser.name}</h2>
                <p>{selectedUser.email}</p>
              </div>
            </div>

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Số điện thoại">
                {selectedUser.phone || "Chưa cập nhật"}
              </Descriptions.Item>
              <Descriptions.Item label="Vai trò">
                <Tag color={selectedUser.role === "admin" ? "blue" : "green"}>
                  {selectedUser.role === "admin"
                    ? "Quản trị viên"
                    : "Người dùng"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={selectedUser.status === "active" ? "green" : "red"}>
                  {selectedUser.status === "active" ? "Hoạt động" : "Bị khóa"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {dayjs(selectedUser.createdAt).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item label="Cập nhật lần cuối">
                {dayjs(selectedUser.updatedAt).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Thống kê</Divider>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              <Card>
                <Statistic
                  title="Số bài đăng"
                  value={userStats.postCount}
                  loading={detailLoading}
                />
              </Card>
              <Card>
                <Statistic
                  title="Tổng doanh thu"
                  value={userStats.revenue}
                  formatter={(value) => formatCurrency(value)}
                  loading={detailLoading}
                />
              </Card>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AccountManagementPage;
