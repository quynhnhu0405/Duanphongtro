import React, { useState } from 'react';
import { Input, Select, Button, Table, Tag, Dropdown, Menu, Popconfirm, message, Modal, Form } from 'antd';
import { SearchOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const CategoryManagementPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);

  // Dữ liệu mẫu danh sách danh mục
  const [categories, setCategories] = useState([
    { id: 1, name: 'Phòng trọ', postCount: 120, createdAt: '2023-10-01', status: 'active' },
    { id: 2, name: 'Căn hộ', postCount: 80, createdAt: '2023-10-02', status: 'inactive' },
    { id: 3, name: 'Ở ghép', postCount: 50, createdAt: '2023-10-03', status: 'active' },
  ]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Hàm xử lý lọc theo trạng thái
  const handleFilterStatus = (value) => {
    setFilterStatus(value);
  };

  // Hàm mở modal thêm/chỉnh sửa danh mục
  const showModal = (category = null) => {
    setEditingCategory(category);
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCategory(null);
  };

  // Hàm xử lý thêm/chỉnh sửa danh mục
  const handleSave = (values) => {
    if (editingCategory) {
      // Chỉnh sửa danh mục
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id ? { ...cat, ...values } : cat
      ));
      message.success('Cập nhật danh mục thành công');
    } else {
      // Thêm danh mục mới
      const newCategory = {
        id: categories.length + 1,
        postCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active',
        ...values,
      };
      setCategories([...categories, newCategory]);
      message.success('Thêm danh mục thành công');
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Hàm xử lý xóa danh mục
  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    message.error('Danh mục đã bị xóa');
  };

  // Cột cho bảng danh mục
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng tin đăng',
      dataIndex: 'postCount',
      key: 'postCount',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
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
              <Menu.Item key="edit" onClick={() => showModal(record)}>
                Chỉnh sửa
              </Menu.Item>
              <Menu.Item key="delete">
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa danh mục này?"
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

  // Lọc dữ liệu theo tìm kiếm và trạng thái
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || category.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '24px' }}>
      {/* Thanh tìm kiếm và lọc */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <Input
          placeholder="Tìm kiếm theo tên danh mục"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '300px' }}
        />
        <Select
          defaultValue="all"
          style={{ width: '150px' }}
          onChange={handleFilterStatus}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="active">Hoạt động</Option>
          <Option value="inactive">Không hoạt động</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Thêm danh mục
        </Button>
      </div>

      {/* Bảng danh sách danh mục */}
      <Table
        dataSource={filteredCategories}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal thêm/chỉnh sửa danh mục */}
      <Modal
        title={editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSave}>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select>
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Không hoạt động</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCategory ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagementPage;