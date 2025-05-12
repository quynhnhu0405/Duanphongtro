import React, { useState, useEffect } from "react";
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
  Image,
  Space,
} from "antd";
import { SearchOutlined, MoreOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import { postService, userService } from "../../../Utils/api";

const { Option } = Select;

const PostManagementPage = () => {
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [landlords, setLandlords] = useState({});

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    try {
       const response = await postService.getAll();
      setPosts(response.data);
    } catch (error) {
      message.error("Không thể tải danh sách bài đăng");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchLandlord = async (landlordId) => {
    try {
      // Kiểm tra nếu đã fetch thông tin này rồi
      if (landlords[landlordId]) return;

      const response = await userService.getUser(landlordId);
      setLandlords((prev) => ({
        ...prev,
        [landlordId]: response.data,
      }));
    } catch (error) {
      console.error("Lỗi lấy dữ liệu chủ nhà:", error);
    }
  };
  // Hàm cập nhật trạng thái
  const updatePostStatus = async (id, newStatus) => {
    try {
      const response = await postService.updatePostStatus(id, newStatus);
      if (response.status === 200) {
        await fetchPosts();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi cập nhật:", {
        message: error.message,
        response: error.response?.data,
      });
      message.error(error.response?.data?.message || "Cập nhật thất bại");
      return false;
    }
  };
  // Hàm xử lý duyệt tin đăng'available'
  const handleApprove = async (id) => {
    const success = await updatePostStatus(id, "available");
    if (success) {
      message.success("Tin đăng đã được duyệt");
    }
  };

  // Hàm xử lý không duyệt tin đăng
  const handleReject = async (id) => {
    const success = await updatePostStatus(id, "rejected");
    if (success) {
      message.warning("Tin đăng đã không được duyệt");
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await postService.hiddenPost(id);
      if (response.status === 200) {
        message.success("Tin đăng đã được ẩn.");
        await fetchPosts(); // Cập nhật lại danh sách bài đăng
      } else {
        message.error("Không thể ẩn tin đăng.");
      }
    } catch (error) {
      console.error("Lỗi khi ẩn tin đăng:", error);
      message.error("Có lỗi xảy ra khi ẩn tin đăng.");
    }
  };
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Hàm xử lý lọc theo trạng thái
  const handleFilter = (value) => {
    setFilterStatus(value);
  };

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
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 250,
      ellipsis: true
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Diện tích",
      dataIndex: "area",
      key: "area",
      width: 100,
      ellipsis: true,
      render: (area) => `${area} m²`,
    },
    {
      title: "Địa chỉ",
      key: "address",
      width: 250,
      ellipsis: true,
      render: (_, record) => (
        <span>{`${record.location.street}, ${record.location.ward}, ${record.location.district}, ${record.location.province}`}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        const colorMap = {
          available: "green",
          expired: "red",
          waiting: "orange",
          unpaid: "gray",
          rejected: "red",
        };
        return (
          <Tag color={colorMap[status]}>
            {status === "unpaid"
              ? "Chưa thanh toán"
              : status === "available"
              ? "Đang hiển thị"
              : status === "expired"
              ? "Hết hạn"
              : status === "waiting"
              ? "Chờ duyệt"
              : "Không duyệt"}
          </Tag>
        );
      },
    },
    {
      title: "Thời hạn",
      dataIndex: "expiryDate",
      width: 200,
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Ẩn bài",
      key: "isVisible",
      render: (_, record) => {
        return record.isVisible === false ? <Tag color="red">Đã ẩn</Tag> : null;
      },
    },
    {
      title: "Chi tiết",
      key: "detail",
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
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="approve"
                onClick={() => handleApprove(record._id)}
              >
                Duyệt
              </Menu.Item>
              <Menu.Item key="reject" onClick={() => handleReject(record._id)}>
                Không duyệt
              </Menu.Item>
              <Menu.Item key="delete">
                <Popconfirm
                  title="Bạn có chắc chắn muốn ẩn tin đăng này?"
                  onConfirm={() => handleDelete(record._id)}
                  okText="Ẩn"
                  cancelText="Hủy"
                >
                  <div style={{ color: "red" }}>Ẩn</div>
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

  // Lọc dữ liệu theo trạng thái và tìm kiếm
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
        <Input
          placeholder="Tìm kiếm theo tiêu đề"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "300px" }}
        />
        <Select
          defaultValue="all"
          style={{ width: "200px" }}
          onChange={handleFilter}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="available">Đang hiển thị</Option>
          <Option value="waiting">Chờ duyệt</Option>
          <Option value="rejected">Không duyệt</Option>
          <Option value="unpaid">Chưa thanh toán</Option>
          <Option value="expired">Hết hạn</Option>
        </Select>
      </div>

      {/* Bảng danh sách tin đăng */}
      <Table
        dataSource={filteredPosts}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        loading={loading}
        scroll={{ x: 1500 }}
        
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
            <p>
              <strong>Chủ bài đăng:</strong>{" "}
              {landlords[selectedPost.landlordId]?.name || "Không có thông tin"}
            </p>
            <p>
              <strong>Liên hệ</strong>:{" "}
              {landlords[selectedPost.landlordId]?.phone ||
                "Không có thông tin"}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedPost.description}
            </p>
            <p>
              <strong>Giá:</strong> {selectedPost.price.toLocaleString()} VND
            </p>
            <p>
              <strong>Diện tích:</strong> {selectedPost.area} m²
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedPost.location.street},{" "}
              {selectedPost.location.ward}, {selectedPost.location.district},{" "}
              {selectedPost.location.province}
            </p>

            {selectedPost.utilityDetails &&
              selectedPost.utilityDetails.length > 0 && (
                <>
                  <p>
                    <strong>Tiện ích:</strong>
                  </p>
                  <Space wrap>
                    {selectedPost.utilityDetails.map((utility) => (
                      <Tag key={utility._id}>{utility.name}</Tag>
                    ))}
                  </Space>
                </>
              )}
            {selectedPost.images && selectedPost.images.length > 0 && (
              <>
                <p style={{ marginTop: 16 }}>
                  <strong>Hình ảnh:</strong>
                </p>
                <Image.PreviewGroup>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {selectedPost.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        width={200}
                        style={{ borderRadius: "4px" }}
                      />
                    ))}
                  </div>
                </Image.PreviewGroup>
              </>
            )}

            <div style={{ marginTop: 16 }}>
              <p>
                <strong>Gói đang đăng:</strong>{" "}
                {selectedPost.packageDetails?.name || "Không có"}
              </p>
              <p>
                <strong>Ngày đăng:</strong>{" "}
                {dayjs(selectedPost.createdAt).format("DD/MM/YYYY HH:mm")}
              </p>
              <p>
                <strong>Cập nhật lần cuối:</strong>{" "}
                {dayjs(selectedPost.updatedAt).format("DD/MM/YYYY HH:mm")}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PostManagementPage;
