import React, { useState } from 'react';
import { Input, Select, Button, Table, Tag, Dropdown, Menu, Popconfirm, message, Modal, Form } from 'antd';
import { SearchOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const AccountManagementPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Dữ liệu mẫu danh sách tài khoản
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', phone: '0123456789', role: 'admin', status: 'active' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', phone: '0987654321', role: 'user', status: 'active' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', phone: '0369852147', role: 'user', status: 'locked' },
  ]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Hàm xử lý lọc theo vai trò
  const handleFilterRole = (value) => {
    setFilterRole(value);
  };

  // Hàm xử lý lọc theo trạng thái
  const handleFilterStatus = (value) => {
    setFilterStatus(value);
  };

  // Hàm xử lý khóa/mở tài khoản
  const toggleAccountStatus = (id) => {
    setAccounts(accounts.map(account =>
      account.id === id
        ? { ...account, status: account.status === 'active' ? 'locked' : 'active' }
        : account
    ));
    message.success(`Tài khoản đã được ${accounts.find(account => account.id === id).status === 'active' ? 'khóa' : 'mở khóa'}`);
  };

  // Hàm xử lý xóa tài khoản
  const handleDelete = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
    message.error('Tài khoản đã bị xóa');
  };

  // Hàm mở modal thêm tài khoản
  const showAddAccountModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Hàm xử lý thêm tài khoản
  const handleAddAccount = (values) => {
    const newAccount = {
      id: accounts.length + 1, // Tạo ID mới
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: 'admin', // Mặc định là admin
      status: 'active', // Mặc định là hoạt động
    };
    setAccounts([...accounts, newAccount]);
    message.success('Thêm tài khoản thành công');
    setIsModalVisible(false);
    form.resetFields();
  };

  // Cột cho bảng tài khoản
  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'blue' : 'green'}>
          {role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Hoạt động' : 'Bị khóa'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="toggleStatus" onClick={() => toggleAccountStatus(record.id)}>
                {record.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
              </Menu.Item>
              <Menu.Item key="edit">
                <a href={`/accounts/edit/${record.id}`}>Chỉnh sửa</a>
              </Menu.Item>
              <Menu.Item key="delete">
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa tài khoản này?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <span style={{ color: 'red' }}>Xóa</span>
                </Popconfirm>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Lọc dữ liệu theo tìm kiếm, vai trò và trạng thái
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchText.toLowerCase()) ||
      account.email.toLowerCase().includes(searchText.toLowerCase()) ||
      account.phone.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = filterRole === 'all' || account.role === filterRole;
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div style={{ padding: '24px' }}>
      {/* Thanh tìm kiếm và lọc */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <Input
          placeholder="Tìm kiếm theo tên, email, số điện thoại"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '300px' }}
        />
        <Select
          defaultValue="all"
          style={{ width: '150px' }}
          onChange={handleFilterRole}
        >
          <Option value="all">Tất cả vai trò</Option>
          <Option value="admin">Quản trị viên</Option>
          <Option value="user">Người dùng</Option>
        </Select>
        <Select
          defaultValue="all"
          style={{ width: '150px' }}
          onChange={handleFilterStatus}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="active">Hoạt động</Option>
          <Option value="locked">Bị khóa</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddAccountModal}>
          Thêm tài khoản
        </Button>
      </div>

      {/* Bảng danh sách tài khoản */}
      <Table
        dataSource={filteredAccounts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal thêm tài khoản */}
      <Modal
        title="Thêm tài khoản"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddAccount}>
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountManagementPage;