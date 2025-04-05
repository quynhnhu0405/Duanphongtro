import { Button, Modal, Image, Tag } from "antd";
import React from "react";
import CardFeature from "../../Component/CardFeature";
import CardVip1 from "../../Component/CardVip1";
import CardVip2 from "../../Component/CardVip2";
import CardRegular from "../../Component/CardRegular";
import dayjs from "dayjs";

const ModalDetail = ({ isModalOpen, handleOk, selectedPost, handleCancel, handleDelete, fetchPosts }) => {

  const getPostType = (packageDetails) => {
    return packageDetails?.[0]?.name || 'Không xác định';
  };

  const getStatusTag = (status) => {
    switch(status) {
      case "available":
        return <Tag color="green">Còn hạn</Tag>;
      case "expired":
        return <Tag color="red">Hết hạn</Tag>;
      case "waiting":
        return <Tag color="gray">Chờ duyệt</Tag>;
      default:
        return <Tag>{status}</Tag>; 
    }
  };

  const displayCard = (post) => {
    const packageType = post.packageDetails?.[0]?.name;
    
    switch(packageType) {
      case "Tin VIP nổi bật":
        return <CardFeature item={post} />;
      case "Tin VIP 1": // VIP 1
        return <CardVip1 item={post} />;
      case "Tin VIP 2": // VIP 2
        return <CardVip2 item={post} />;
      default:
        return <CardRegular item={post} />;
    }
  };

  return (
    <Modal
      title="Chi tiết bài đăng"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="Delete" type="danger" onClick={() => handleDelete(selectedPost._id)}>
          Xóa bài
        </Button>,
        <Button key="Đóng" type="primary" onClick={handleOk}>
          Đóng
        </Button>,
      ]}
      width={800}
    >
      {selectedPost && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Tiêu đề:</strong> {selectedPost.title}</p>
              <p><strong>Giá:</strong> {selectedPost.price.toLocaleString()} VNĐ/tháng</p>
              <p><strong>Diện tích:</strong> {selectedPost.area} m²</p>
            </div>
            <div>
              <p><strong>Loại tin:</strong> {selectedPost.category?.name}</p>
              <p><strong>Tình trạng:</strong> {getStatusTag(selectedPost.status)}</p>
              <p><strong>Gói đăng ký:</strong> {getPostType(selectedPost.packageDetails)}</p>
            </div>
          </div>

          <div>
            <p><strong>Địa chỉ:</strong> {[
              selectedPost.location?.street,
              selectedPost.location?.ward,
              selectedPost.location?.district,
              selectedPost.location?.province
            ].filter(Boolean).join(', ')}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Ngày đăng:</strong> {dayjs(selectedPost.createdAt).format('DD/MM/YYYY HH:mm')}</p>
            </div>
            <div>
              <p><strong>Ngày hết hạn:</strong> {dayjs(selectedPost.expiryDate).format('DD/MM/YYYY HH:mm')}</p>
            </div>
          </div>

          <div>
            <p><strong>Mô tả:</strong></p>
            <div className="p-3 bg-gray-50 rounded">
              {selectedPost.description}
            </div>
          </div>

          <div>
            <p><strong>Tiện ích:</strong></p>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedPost.utilityDetails?.map(utility => (
                <Tag key={utility._id}>{utility.name}</Tag>
              ))}
            </div>
          </div>

          <div>
            <p><strong>Hình ảnh:</strong></p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Image.PreviewGroup>
                {selectedPost.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Ảnh ${index + 1}`}
                    width={120}
                    height={80}
                    className="rounded object-cover"
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          </div>

          <div className="mt-6">
            <p><strong>Xem trước hiển thị:</strong></p>
            <div className="mt-3 border rounded p-4">
              {displayCard(selectedPost)}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalDetail;