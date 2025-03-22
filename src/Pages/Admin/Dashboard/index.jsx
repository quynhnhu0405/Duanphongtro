import React from 'react';
import { Card, Row, Col, Table, List, Avatar } from 'antd';
import {
  FileTextOutlined,
  UserOutlined,
  DollarOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const quickStats = [
    { title: 'Tổng số tin đăng', value: 120, icon: <FileTextOutlined />, color: 'text-blue-500' },
    { title: 'Tổng số người dùng', value: 350, icon: <UserOutlined />, color: 'text-green-500' },
    { title: 'Doanh thu', value: '50,000,000 VND', icon: <DollarOutlined />, color: 'text-red-500' },
  ];

  const viewData = [
    { month: 'Tháng 1', revue: 400 },
    { month: 'Tháng 2', revue: 300 },
    { month: 'Tháng 3', revue: 200 },
    { month: 'Tháng 4', revue: 500 },
    { month: 'Tháng 5', revue: 700 },
    { month: 'Tháng 6', revue: 600 },
  ];

  const recentPosts = [
    { id: 1, title: 'Phòng trọ đẹp tại Hà Nội', date: '2023-10-01', status: 'Đã duyệt' },
    { id: 2, title: 'Cho thuê phòng trọ giá rẻ', date: '2023-10-02', status: 'Chờ duyệt' },
    { id: 3, title: 'Phòng trọ full nội thất', date: '2023-10-03', status: 'Đã duyệt' },
  ];

  const recentActivities = [
    { id: 1, description: 'Tin đăng mới từ Nguyễn Văn A', time: '2 giờ trước' },
    { id: 2, description: 'Người dùng mới đăng ký: Trần Thị B', time: '5 giờ trước' },
    { id: 3, description: 'Tin đăng "Phòng trọ đẹp" đã được duyệt', time: '1 ngày trước' },
  ];

  const revenueByCategory = [
    { category: 'Phòng trọ', posts: 80, revenue: '30,000,000 VND' },
    { category: 'Căn hộ', posts: 30, revenue: '15,000,000 VND' },
    { category: 'Ở ghép', posts: 10, revenue: '5,000,000 VND' },
  ];

  const postColumns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Ngày đăng', dataIndex: 'date', key: 'date' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
  ];

  const revenueColumns = [
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    { title: 'Số bài đăng', dataIndex: 'posts', key: 'posts' },
    { title: 'Doanh thu', dataIndex: 'revenue', key: 'revenue' },
  ];

  return (
    <div className="p-6">
      <Row gutter={[16, 16]} >
        {quickStats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card className="shadow-lg rounded-lg">
              <div className="flex items-center">
                <div className={`text-4xl ${stat.color} mr-4`}>{stat.icon}</div>
                <div>
                  <div className="text-lg font-semibold">{stat.value}</div>
                  <div className="text-gray-500">{stat.title}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="Doanh thu theo tháng" className="!mt-9 shadow-lg rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={viewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revue" stroke="#1890ff" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Thống kê doanh thu theo danh mục" className="!mt-9 shadow-lg rounded-lg">
        <Table dataSource={revenueByCategory} columns={revenueColumns} rowKey="category" pagination={false} />
      </Card>

      <Card title="Tin đăng mới nhất" className="!mt-9 shadow-lg rounded-lg">
        <Table dataSource={recentPosts} columns={postColumns} rowKey="id" pagination={false} />
      </Card>

      <Card title="Hoạt động gần đây" className="!mt-9 shadow-lg rounded-lg">
        <List
          dataSource={recentActivities}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<BellOutlined />} />}
                title={item.description}
                description={item.time}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;