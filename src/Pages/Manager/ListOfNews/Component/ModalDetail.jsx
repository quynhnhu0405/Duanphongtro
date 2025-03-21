import { Button, Modal } from "antd";
import React, { useState } from "react";
import CardFeature from "../../Component/CardFeature";
import CardVip1 from "../../Component/CardVip1";
import CardVip2 from "../../Component/CardVip2";
import CardRegular from "../../Component/CardRegular";

const ModalDetail = ({ isModalOpen, handleOk, selectedPost, handleCancel }) => {
    const getPostType = (item) => {
        return item === 1
          ? "Tin VIP nổi bật"
          : item === 2
          ? "Tin VIP 1"
          : item === 3
          ? "Tin VIP 2"
          : "Tin thường";
      };
    const display = (item) => {
        return item.package === 1
          ? <CardFeature item={item} />
          : item.package === 2
          ? <CardVip1 item={item} />
          : item.package === 3
          ? <CardVip2 item={item} />
          : <CardRegular item={item} />;
      };
  return (
    <Modal
      title="Chi tiết bài đăng"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="Đóng" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
      className="!w-1/2 modal-list-post"
    >
      {selectedPost && (
        <div>
          <p>
            <strong>Tiêu đề: </strong>&nbsp; &nbsp;&nbsp; &nbsp;{selectedPost.title}
          </p>
          <p>
            <strong>Giá:  </strong>&nbsp; &nbsp;&nbsp; &nbsp; {selectedPost.price}
          </p>
          <p>
            <strong>Diện tích:  </strong>&nbsp; &nbsp;&nbsp; &nbsp; {selectedPost.acreage} m²
          </p>
          <p>
            <strong>Địa chỉ:  </strong>&nbsp; &nbsp;&nbsp; &nbsp; {selectedPost.location.street}, {selectedPost.location.ward}, {selectedPost.location.city}
          </p>
          <p>
            <strong>Loại tin:  </strong>&nbsp; &nbsp;&nbsp; &nbsp; {selectedPost.type}
          </p>
          <p>
            <strong>Ngày đăng:  </strong>&nbsp; &nbsp;&nbsp; &nbsp; {selectedPost.createAt}
          </p>
          <p>
            <strong>Ngày hết hạn:  </strong>&nbsp; &nbsp;&nbsp; &nbsp; {selectedPost.expdate}
          </p>
          <p>
            <strong>Mô tả:  </strong>&nbsp; &nbsp;&nbsp; &nbsp; {selectedPost.description}
          </p>
          <div>
            <strong>Hình ảnh:</strong>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {selectedPost.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Ảnh ${index + 1}`}
                  style={{ width: "100px", height: "auto" }}
                />
              ))}
            </div>
          </div>
          <div className="mt-5">
            <strong>Hiển thị gói tin:</strong>&nbsp; &nbsp;&nbsp; &nbsp;{getPostType(selectedPost.package)}
            <div className="mt-2">
                {display(selectedPost)}
            </div>
              
            
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalDetail;
