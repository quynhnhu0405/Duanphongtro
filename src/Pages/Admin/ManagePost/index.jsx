import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Table, Tag, Dropdown, Menu, Popconfirm, message, Modal, Image, Space } from 'antd';
import { SearchOutlined, MoreOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from 'axios';

const { Option } = Select;

const PostManagementPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [landlords, setLandlords] = useState({});


  // Fetch posts from API
  const checkPostExpiry = (post) => {
    const now = dayjs();
    const expiryDate = dayjs(post.expiryDate);
    return now.isAfter(expiryDate) ? 'expired' : post.status;
  };

  // Fetch posts từ API
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      
      // Kiểm tra và xử lý response.data
      const postsData = Array.isArray(response?.data) ? response.data : [];
      
      // Cập nhật trạng thái bài đăng
      const postsWithUpdatedStatus = postsData.map(post => ({
        ...post,
        status: checkPostExpiry(post)
      }));
      
      setPosts(postsWithUpdatedStatus);
    } catch (error) {
      console.error('Error fetching posts:', error);
      message.error('Không thể tải danh sách bài đăng');
    } finally {
      setLoading(false);
    }
  };
  
  // Gọi API kiểm tra bài đăng hết hạn khi component mount
  useEffect(() => {
    fetchPosts();
    
    // Kiểm tra mỗi giờ
    const interval = setInterval(() => {
      axios.patch('http://localhost:5000/api/posts/check-expired-posts')
        .then(() => fetchPosts()) // Refresh data sau khi kiểm tra
        .catch(error => {
          console.error('Error checking expired posts:', error);
          message.error('Cập nhật trạng thái thất bại');
        });
    }, 60 * 60 * 1000); // 1 giờ
    
    return () => clearInterval(interval);
  }, []); // Empty dependency array
  const fetchLandlord = async (landlordId) => {
    try {
      // Kiểm tra nếu đã fetch thông tin này rồi
      if (landlords[landlordId]) return;
      
      const response = await axios.get(`http://localhost:5000/api/users/user/${landlordId}`);
      setLandlords(prev => ({
        ...prev,
        [landlordId]: response.data
      }));
    } catch (error) {
      console.error("Lỗi lấy dữ liệu chủ nhà:", error);
    }
  };
  // Hàm cập nhật trạng thái
  const updatePostStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${id}`,
        { status: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (response.status === 200) {
        // Cập nhật lại danh sách sau khi thay đổi
        await fetchPosts();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi cập nhật:", {
        message: error.message,
        response: error.response?.data
      });
      message.error(error.response?.data?.message || 'Cập nhật thất bại');
      return false;
    }
  };

  // Hàm xử lý duyệt tin đăng - ĐÃ SỬA CHÍNH TẢ 'available'
  const handleApprove = async (id) => {
    const success = await updatePostStatus(id, 'available');
    if (success) {
      message.success('Tin đăng đã được duyệt');
    }
  };

  // Hàm xử lý không duyệt tin đăng
  const handleReject = async (id) => {
    const success = await updatePostStatus(id, 'rejected');
    if (success) {
      message.warning('Tin đăng đã không được duyệt');
    }
  };

  // Hàm xử lý xóa tin đăng
  const handleDelete = async (id) => {
    const success = await updatePostStatus(id, 'deleted');
    if (success) {
      message.error('Tin đăng đã bị xóa');
    }
  };
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Hàm xử lý lọc theo trạng thái
  const handleFilter = (value) => {
    setFilterStatus(value);
  };
  // Hàm kiểm tra còn hạn hay hết hạn

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showDetailModal = async (post) => {
    setSelectedPost(post);
    await fetchLandlord(post.landlordId); // Fetch thông tin landlord khi mở modal
    setIsModalVisible(true);
  };
  // Cột cho bảng tin đăng
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: 'Diện tích',
      dataIndex: 'area',
      key: 'area',
      render: (area) => `${area} m²`,
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      render: (_, record) => (
        <span>{`${record.location.street}, ${record.location.ward}, ${record.location.district}, ${record.location.province}`}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status, record) => {
        const actualStatus = checkPostExpiry(record);
        const colorMap = {
          available: 'green',
          expired: 'red',
          waiting: 'orange',
          rejected: 'gray'
        };
        return (
          <Tag color={colorMap[actualStatus]}>
            {actualStatus === 'available' ? 'Đang hiển thị' : 
             actualStatus === 'expired' ? 'Hết hạn' : 
             actualStatus === 'waiting' ? 'Chờ duyệt' : 'Không duyệt'}
          </Tag>
        );
      }
    },
    {
      title: 'Thời hạn',
      dataIndex: 'expiryDate',
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
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
              <Menu.Item key="approve" onClick={() => handleApprove(record._id)}>
                Duyệt
              </Menu.Item>
              <Menu.Item key="reject" onClick={() => handleReject(record._id)}>
                Không duyệt
              </Menu.Item>
              <Menu.Item key="delete">
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa tin đăng này?"
                  onConfirm={() => handleDelete(record._id)}
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
    <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
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
          <Option value="available">Đang hiển thị</Option>
          <Option value="approved">Đã duyệt</Option>
          <Option value="rejected">Không duyệt</Option>
          <Option value="deleted">Đã xóa</Option>
        </Select>
      </div>

      {/* Bảng danh sách tin đăng */}
      <Table
        dataSource={filteredPosts}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        loading={loading}
      />

      {/* Modal xem chi tiết */}
      <Modal
        title="Chi tiết tin đăng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedPost && (
          <div>
            <h2>{selectedPost.title}</h2>
            <p><strong>Chủ bài đăng:</strong> {landlords[selectedPost.landlordId]?.name || 'Không có thông tin'}</p>
            <p><strong>Liên hệ</strong>: {landlords[selectedPost.landlordId]?.phone || 'Không có thông tin'}</p>
            <p><strong>Mô tả:</strong> {selectedPost.description}</p>
            <p><strong>Giá:</strong> {selectedPost.price.toLocaleString()} VND</p>
            <p><strong>Diện tích:</strong> {selectedPost.area} m²</p>
            <p><strong>Địa chỉ:</strong> {selectedPost.location.street}, {selectedPost.location.ward}, {selectedPost.location.district}, {selectedPost.location.province}</p>
            
            {selectedPost.utilityDetails && selectedPost.utilityDetails.length > 0 && (
              <>
                <p><strong>Tiện ích:</strong></p>
                <Space wrap>
                  {selectedPost.utilityDetails.map(utility => (
                    <Tag key={utility._id}>{utility.name}</Tag>
                  ))}
                </Space>
              </>
            )}
            
            {selectedPost.images && selectedPost.images.length > 0 && (
              <>
                <p style={{ marginTop: 16 }}><strong>Hình ảnh:</strong></p>
                <Image.PreviewGroup>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedPost.images.map((image, index) => (
                      <Image 
                        key={index} 
                        src={image} 
                        width={200} 
                        style={{ borderRadius: '4px' }}
                      />
                    ))}
                  </div>
                </Image.PreviewGroup>
              </>
            )}
            
            <div style={{ marginTop: 16 }}>
              <p><strong>Gói đang đăng:</strong> {selectedPost.packageDetails?.name || 'Không có'}</p>
              <p><strong>Ngày đăng:</strong> {dayjs(selectedPost.createdAt).format('DD/MM/YYYY HH:mm')}</p>
              <p><strong>Cập nhật lần cuối:</strong> {dayjs(selectedPost.updatedAt).format('DD/MM/YYYY HH:mm')}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PostManagementPage;