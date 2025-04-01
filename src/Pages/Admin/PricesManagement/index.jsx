import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const PriceManagementPage = () => {
  const [prices, setPrices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/packages');
      const dataWithKeys = response.data.map(item => ({
        ...item,
        key: item._id || Math.random().toString(36).substr(2, 9)
      }));
      setPrices(dataWithKeys);
    } catch (error) {
      console.error('Error fetching prices:', error);
      message.error('Lỗi khi tải dữ liệu giá');
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = (price) => {
    setEditingPrice(price);
    form.setFieldsValue({
      name: price.name,
      priceday: price.priceday,
      priceweek: price.priceweek,
      pricemonth: price.pricemonth
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingPrice(null);
  };

  const handleSave = async (values) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:5000/api/packages/${editingPrice._id}`, {
        priceday: values.priceday,
        priceweek: values.priceweek,
        pricemonth: values.pricemonth
      });
      
      message.success('Cập nhật giá thành công');
      fetchPrices();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating price:', error);
      message.error('Cập nhật giá thất bại');
    } finally {
      setLoading(false);
    }
  };
  
  const columns = [
    {
      title: 'Loại tin',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá ngày',
      dataIndex: 'priceday',
      key: 'priceday',
      render: (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value),
    },
    {
      title: 'Giá tuần',
      dataIndex: 'priceweek',
      key: 'priceweek',
      render: (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value),
    },
    {
      title: 'Giá tháng',
      dataIndex: 'pricemonth',
      key: 'pricemonth',
      render: (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value),
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
      <Table
        dataSource={prices}
        columns={columns}
        pagination={false}
        loading={loading}
      />

      <Modal
        title="Chỉnh sửa giá"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item
            label="Loại tin"
            name="name"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Giá ngày (VND)"
            name="priceday"
            rules={[
              { required: true, message: 'Vui lòng nhập giá ngày' },
              { pattern: /^[0-9]+$/, message: 'Vui lòng nhập số' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá tuần (VND)"
            name="priceweek"
            rules={[
              { required: true, message: 'Vui lòng nhập giá tuần' },
              { pattern: /^[0-9]+$/, message: 'Vui lòng nhập số' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá tháng (VND)"
            name="pricemonth"
            rules={[
              { required: true, message: 'Vui lòng nhập giá tháng' },
              { pattern: /^[0-9]+$/, message: 'Vui lòng nhập số' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PriceManagementPage;