import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Tag, message, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";

const PaymentManagementPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      message.error("Lỗi khi tải dữ liệu thanh toán");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setLoading(true);

      // Update payment status
      await axios.patch(`http://localhost:5000/api/payments/${id}`, {
        status: newStatus,
      });

      // If payment is completed, also update the post status to 'waiting' for admin approval
      if (newStatus === "completed") {
        const payment = payments.find((p) => p._id === id);
        if (payment && payment.PostId) {
          // Update the post status to waiting for admin approval
          await axios.patch(
            `http://localhost:5000/api/posts/${
              payment.PostId._id || payment.PostId
            }`,
            {
              status: "waiting",
            }
          );
          message.success(
            "Đã xác nhận thanh toán và cập nhật trạng thái bài đăng"
          );
        } else {
          message.success(
            "Đã xác nhận thanh toán, nhưng không tìm thấy bài đăng tương ứng"
          );
        }
      } else if (newStatus === "failed" || newStatus === "pending") {
        // If payment failed or pending, update post status to unpaid
        const payment = payments.find((p) => p._id === id);
        if (payment && payment.PostId) {
          await axios.patch(
            `http://localhost:5000/api/posts/${
              payment.PostId._id || payment.PostId
            }`,
            {
              status: "unpaid",
            }
          );
          message.success(
            `Đã cập nhật trạng thái thanh toán thành ${
              newStatus === "failed" ? "Thất bại" : "Đang chờ"
            }`
          );
        }
      }

      // Refresh the payment list
      fetchPayments();
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (payment) => {
    setCurrentPayment(payment);
    setStatus(payment.status);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async () => {
    if (!currentPayment) return;
    await handleStatusUpdate(currentPayment._id, status);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Mã thanh toán",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Chủ bài đăng",
      dataIndex: ["landlordId", "name"],
      key: "landlordName",
      render: (name) => name || "Không xác định",
    },
    {
      title: "Bài đăng",
      dataIndex: ["PostId", "title"],
      key: "postTitle",
      render: (title) => title || "Không có tiêu đề",
    },
    {
      title: "Thanh toán",
      dataIndex: "total",
      key: "total",
      render: (total) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(total),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "completed"
            ? "green"
            : status === "unpaid"
            ? "red"
            : "blue";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => openModal(record)}>
                Cập nhật trạng thái
              </Menu.Item>
              <Menu.Item
                key="complete"
                onClick={() => handleStatusUpdate(record._id, "completed")}
              >
                Xác nhận thanh toán
              </Menu.Item>
              <Menu.Item
                key="reject"
                onClick={() => handleStatusUpdate(record._id, "unpaid")}
              >
                Chưa thanh toán
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

  return (
    <div style={{ padding: "24px" }}>
      <Table
        columns={columns}
        dataSource={payments}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
        loading={loading}
        scroll={{ x: 1200 }}
      />

      <Modal
        title="Cập nhật trạng thái thanh toán"
        open={isModalVisible}
        onOk={handleUpdateStatus}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loading}
      >
        {currentPayment && (
          <div>
            <p>
              Bài đăng: {currentPayment.postId?.title || "Không có tiêu đề"}
            </p>
            <p>
              Chủ bài đăng:{" "}
              {currentPayment.landlordId?.name || "Không xác định"}
            </p>
            <p>
              Số tiền:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(currentPayment.total)}
            </p>

            <div style={{ marginTop: 16 }}>
              <span style={{ marginRight: 8 }}>Trạng thái:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ padding: "4px 8px" }}
              >
                <option value="pending">Đang chờ</option>
                <option value="completed">Hoàn thành</option>
                <option value="failed">Chưa thanh toán</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentManagementPage;
