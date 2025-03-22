import React, { useState } from 'react';
import { Input, Select, Button, Table, Tag, Dropdown, Menu, Popconfirm, message, Modal, Image } from 'antd';
import { SearchOutlined, MoreOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'; // Thư viện xử lý ngày tháng

const { Option } = Select;

const PostManagementPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Dữ liệu mẫu danh sách tin đăng
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Phòng trọ đẹp tại Hà Nội',
      author: 'Nguyễn Văn A',
      date: '2023-10-01',
      status: 'Đã duyệt',
      payment: 'paid', // Trạng thái thanh toán
      description: 'Phòng trọ đẹp, full nội thất, gần trung tâm thành phố.',
      images: ['https://via.placeholder.com/150'],
      expiryDate: '2023-11-01', // Ngày hết hạn
    },
    {
      id: 2,
      title: 'Cho thuê phòng trọ giá rẻ',
      author: 'Trần Thị B',
      date: '2023-10-02',
      status: 'Không duyệt',
      payment: 'unpaid', // Trạng thái thanh toán
      description: 'Phòng trọ giá rẻ, phù hợp cho sinh viên.',
      images: ['https://via.placeholder.com/150'],
      expiryDate: '2023-10-15', // Ngày hết hạn
    },
    {
      id: 3,
      title: 'Phòng trọ full nội thất',
      author: 'Lê Văn C',
      date: '2023-10-03',
      status: 'Đã xóa',
      payment: 'paid', // Trạng thái thanh toán
      description: 'Phòng trọ cao cấp, đầy đủ tiện nghi.',
      images: ['https://via.placeholder.com/150'],
      expiryDate: '2023-10-20', // Ngày hết hạn
    },
  ]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Hàm xử lý lọc theo trạng thái
  const handleFilter = (value) => {
    setFilterStatus(value);
  };

  // Hàm xử lý duyệt tin đăng
  const handleApprove = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: 'Đã duyệt' } : post));
    message.success('Tin đăng đã được duyệt');
  };

  // Hàm xử lý không duyệt tin đăng
  const handleReject = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: 'Không duyệt' } : post));
    message.warning('Tin đăng đã không được duyệt');
  };

  // Hàm xử lý xóa tin đăng
  const handleDelete = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: 'Đã xóa' } : post));
    message.error('Tin đăng đã bị xóa');
  };

  // Hàm kiểm tra còn hạn hay hết hạn
  const checkExpiry = (expiryDate) => {
    const today = dayjs();
    const expiry = dayjs(expiryDate);
    return today.isBefore(expiry) ? 'Còn hạn' : 'Hết hạn';
  };

  // Hàm mở modal xem chi tiết
  const showDetailModal = (post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Cột cho bảng tin đăng
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Người đăng',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'Đã duyệt':
            color = 'green';
            break;
          case 'Không duyệt':
            color = 'orange';
            break;
          case 'Đã xóa':
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Thanh toán',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment) => (
        <Tag color={payment === 'paid' ? 'green' : 'red'}>
          {payment === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </Tag>
      ),
    },
    {
      title: 'Hạn tin',
      key: 'expiry',
      render: (_, record) => {
        const status = checkExpiry(record.expiryDate);
        return <Tag color={status === 'Còn hạn' ? 'blue' : 'red'}>{status}</Tag>;
      },
    },
    {
      title: 'Chi tiết',
      key: 'detail',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showDetailModal(record)}
        >
          Xem chi tiết
        </Button>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="approve" onClick={() => handleApprove(record.id)}>
                Duyệt
              </Menu.Item>
              <Menu.Item key="reject" onClick={() => handleReject(record.id)}>
                Không duyệt
              </Menu.Item>
              <Menu.Item key="delete">
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa tin đăng này?"
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

  // Lọc dữ liệu theo trạng thái và tìm kiếm
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '24px' }}>
      {/* Thanh tìm kiếm và lọc */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <Input
          placeholder="Tìm kiếm theo tiêu đề"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '300px' }}
        />
        <Select
          defaultValue="all"
          style={{ width: '200px' }}
          onChange={handleFilter}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="Đã duyệt">Đã duyệt</Option>
          <Option value="Không duyệt">Không duyệt</Option>
          <Option value="Đã xóa">Đã xóa</Option>
        </Select>
      </div>

      {/* Bảng danh sách tin đăng */}
      <Table
        dataSource={filteredPosts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal xem chi tiết */}
      <Modal
        title="Chi tiết tin đăng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedPost && (
          <div>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.description}</p>
            <Image.PreviewGroup>
              {selectedPost.images.map((image, index) => (
                <Image key={index} src={image} width={200} />
              ))}
            </Image.PreviewGroup>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PostManagementPage;