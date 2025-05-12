import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Tag } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { categoryService, paymentService, postService, userService } from "../../../Utils/api";

const DashboardPage = () => {
  const [countPost, setCountPost] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [revenueByCategory, setRevenueByCategory] = useState(0);
  const [latestPosts, setLatestPosts] = useState([]);



  useEffect(() => {
    const fetchCountPost = async () => {
      try {
        const res = await postService.countAll();
        setCountPost(res.data.total);
      } catch (err) {
        console.error("Lỗi khi lấy số bài đăng:", err);
      }
    };
    fetchCountPost();
  }, []);


  useEffect(() => {
    const fetchCountUser = async () => {
      try {
        const res = await userService.countAll();
        setCountUser(res.data.total);
      } catch (err) {
        console.error("Lỗi khi lấy số người dùng:", err);
      }
    };
    fetchCountUser();
  }, []);


  useEffect(() => {
    const fetchTotalPayment = async () => {
      try {
        const res = await paymentService.getTotalCompleted();
        setTotalPayment(res.data.total);
      } catch (err) {
        console.error("Lỗi khi lấy doanh thu:", err);
      }
    };
    fetchTotalPayment();
  }, []);

  useEffect(() => {
    const fetchRevenueByCategory = async () => {
      try {
        const res = await categoryService.getAll();
        const formatted = res.data.map((item) => ({
          ...item,
          totalRevenue: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.totalRevenue),
        }));
        setRevenueByCategory(formatted);
      } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo danh mục:", err);
      }
    };
    fetchRevenueByCategory();
  }, []);


  const quickStats = [
    {
      title: "Tổng số tin đăng",
      value: countPost,
      icon: <FileTextOutlined />,
      color: "text-blue-500",
    },
    {
      title: "Tổng số người dùng",
      value: countUser,
      icon: <UserOutlined />,
      color: "text-green-500",
    },
    {
      title: "Doanh thu",
      value: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(totalPayment),
      key: "totalPayment",
      icon: <DollarOutlined />,
      color: "text-red-500",
    },
  ];

  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const res = await paymentService.getMonthlyRevenue();
        setRevenueData(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu doanh thu:", err);
      }
    };
    fetchMonthlyRevenue();
  }, []);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await postService.getLatestPosts();
        setLatestPosts(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy bài đăng mới:", err);
      }
    };
    fetchLatestPosts();
  }, []);
  const postColumns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a
          href={`/posts/${record._id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Danh mục",
      key: "category",
      render: (_, record) => record.category?.name || "Không xác định",
    },
    {
      title: "Người đăng",
      key: "landlord",
      render: (_, record) => record.landlordId?.name || "Không xác định",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const actualStatus = record.status;
        const colorMap = {
          available: "green",
          expired: "red",
          waiting: "orange",
          rejected: "gray",
        };
        return (
          <Tag color={colorMap[actualStatus]}>
            {actualStatus === "available"
              ? "Đang hiển thị"
              : actualStatus === "expired"
              ? "Hết hạn"
              : actualStatus === "waiting"
              ? "Chờ duyệt"
              : "Không duyệt"}
          </Tag>
        );
      },
    },
  ];

  const revenueColumns = [
    { title: "Danh mục", dataIndex: "name", key: "name" },
    { title: "Số bài đăng", dataIndex: "postCount", key: "postCount" },
    { title: "Doanh thu", dataIndex: "totalRevenue", key: "totalRevenue" },
  ];

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
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

      <Card
        title="Doanh thu 6 tháng gần nhất"
        className="!mt-9 shadow-lg rounded-lg" // Removed pl-10 from Card
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={revenueData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Added margin to provide space for labels
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month" // or use "label" if you've formatted your data on the backend/front-end
              tick={{ fill: "#666" }}
              axisLine={{ stroke: "#d9d9d9" }}
              padding={{ left: 10, right: 10 }} // Add padding so labels aren't clipped
            />
            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  maximumFractionDigits: 0,
                }).format(value)
              }
              tick={{ fill: "#666" }}
              axisLine={{ stroke: "#d9d9d9" }}
            />
            <Tooltip
              formatter={(value) => [
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(value),
                "Doanh thu",
              ]}
              labelFormatter={(label) => `Thời gian: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Doanh thu"
              stroke="#1890ff"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "#1890ff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card
        title="Thống kê doanh thu theo danh mục"
        className="!mt-9 shadow-lg rounded-lg"
      >
        <Table
          dataSource={revenueByCategory}
          columns={revenueColumns}
          rowKey="category"
          pagination={false}
        />
      </Card>

      <Card title="Tin đăng mới nhất" className="!mt-9 shadow-lg rounded-lg">
        <Table
          dataSource={latestPosts}
          columns={postColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
