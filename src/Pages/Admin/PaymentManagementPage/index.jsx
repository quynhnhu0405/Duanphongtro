import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Tag, message, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";
import { paymentService, postService } from "../../../Utils/api";

const PaymentManagementPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [status, setStatus] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getAll();
      setPayments(response.data);
    } catch {
      messageApi.open({
        type: "error",
        content: "Lỗi khi tải dữ liệu thanh toán",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
  try {
    setLoading(true);

    // Cập nhật trạng thái thanh toán thông qua paymentService
    await paymentService.updateStatus(id, newStatus);

    const payment = payments.find((p) => p._id === id);
    const postId = payment?.PostId?._id || payment?.PostId;

    if (!postId) {
      messageApi.open({
        type: "success",
        content: "Đã xác nhận thanh toán, nhưng không tìm thấy bài đăng tương ứng",
      });
      return;
    }

    let postStatus = "";
    let successMessage = "";

    if (newStatus === "completed") {
      postStatus = "waiting";
      successMessage = "Đã xác nhận thanh toán và chờ duyệt bài đăng";
    } else if (newStatus === "failed" || newStatus === "pending") {
      postStatus = "unpaid";
      successMessage = `Đã cập nhật trạng thái thanh toán: ${newStatus}`;
    }

    if (postStatus) {
      await postService.updatePostStatus(postId, postStatus);
      messageApi.open({
        type: "success",
        content: successMessage,
      });
    }

    fetchPayments();
  } catch (error) {
    messageApi.open({
      type: "error",
      content: "Cập nhật trạng thái thất bại",
    });
    console.error("Lỗi cập nhật trạng thái:", error);
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
      key: "status",
      render: (_, record) => {
        switch (record.status) {
          case "completed":
            return <Tag color="green">Đã thanh toán</Tag>;
          case "unpaid":
            return <Tag color="red">Chưa thanh toán</Tag>;
          default:
            return <Tag color="gray">Chờ xác nhận</Tag>;
        }
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
      {contextHolder}
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