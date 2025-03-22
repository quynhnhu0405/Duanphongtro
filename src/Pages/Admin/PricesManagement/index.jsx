import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const PriceManagementPage = () => {
  const [prices, setPrices] = useState([
    {
      key: '1',
      type: 'Tin VIP Nổi Bật ★★★★',
      daily: '30.000đ',
      weekly: '190.000đ',
      monthly: '800.000đ',
    },
    {
      key: '2',
      type: 'Tin VIP 1 ★★★',
      daily: '20.000đ',
      weekly: '153.000đ',
      monthly: '540.000đ',
    },
    {
      key: '3',
      type: 'Tin VIP 2 ★★★',
      daily: '10.000đ',
      weekly: '63.000đ',
      monthly: '240.000đ',
    },
    {
      key: '4',
      type: 'Tin thường',
      daily: '2.000đ',
      weekly: '12.000đ',
      monthly: '48.000đ',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [form] = Form.useForm();

  // Hàm mở modal chỉnh sửa giá
  const showEditModal = (price) => {
    setEditingPrice(price);
    form.setFieldsValue(price);
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingPrice(null);
  };

  // Hàm xử lý lưu thay đổi giá
  const handleSave = (values) => {
    const updatedPrices = prices.map((price) =>
      price.key === editingPrice.key ? { ...price, ...values } : price
    );
    setPrices(updatedPrices);
    message.success('Cập nhật giá thành công');
    setIsModalVisible(false);
    form.resetFields();
  };

  // Cột cho bảng giá
  const columns = [
    {
      title: 'Loại tin',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Giá ngày',
      dataIndex: 'daily',
      key: 'daily',
    },
    {
      title: 'Giá tuần',
      dataIndex: 'weekly',
      key: 'weekly',
    },
    {
      title: 'Giá tháng',
      dataIndex: 'monthly',
      key: 'monthly',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => showEditModal(record)}
        >
          Chỉnh sửa
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Bảng giá */}
      <Table
        dataSource={prices}
        columns={columns}
        pagination={false}
      />

      {/* Modal chỉnh sửa giá */}
      <Modal
        title="Chỉnh sửa giá"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSave}>
          <Form.Item
            label="Loại tin"
            name="type"
            rules={[{ required: true, message: 'Vui lòng nhập loại tin' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Giá ngày"
            name="daily"
            rules={[{ required: true, message: 'Vui lòng nhập giá 1 ngày' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá tuần"
            name="weekly"
            rules={[{ required: true, message: 'Vui lòng nhập giá 1 tuần' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá tháng"
            name="monthly"
            rules={[{ required: true, message: 'Vui lòng nhập giá 1 tháng' }]}
          >
            <Input />
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

export default PriceManagementPage;