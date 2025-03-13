
import { Card, Carousel, Image } from "antd";
import React from "react";

const item =
  {
    id: 1,
    title: "Ký túc xá quận 7 trọn gói 1tr gần Lotte Mart",
    address: "34 Phố số 36, Phường Tân Quy, Quận 7, Hồ Chí Minh",
    price: "3.5 triệu/tháng",
    area: "20m2",
    createAt: "3/10/2025 10:00",
    descriptions: `Đến Homestay Hoàng Phúc – hệ thống Kytucxa Q7 rẻ nhất Sài Gòn với những căn phòng đẹp lung linh chuẩn 2 sao, đa dạng tiện nghi và bao trọn toàn bộ các chi phí (cam kết 100% không phát sinh).
                    CHỈ 9️⃣0️⃣0️⃣.0️⃣0️⃣0️⃣/ THÁNG( KM 200K tháng đầu chỉ còn 7️⃣0️⃣0️⃣.0️⃣0️⃣0️⃣/ THÁNG )
                    TIỆN ÍCH NỔI TRỘI TẠI ĐÂY:
                    Giường tầng riêng tư, có tủ đồ, móc treo thông minh
                    Máy lạnh inverter, wifi tốc độ cao
                    Nhà vệ sinh riêng, sạch sẽ
                    Nhân viên dọn phòng hằng ngày
                    Tự do dùng máy giặt,bình lọc nước
                    Khu để xe rộng, được camera giám sát.
                    ⏰ ⏰ môi trường văn minh
                    Ngoài ra còn có:
                    Camera An ninh, quản lý tâm huyết.
                    Không gian bếp lớn đầy đủ thiết bị.
                    Có khu phơi quần áo riêng.
                    Vị trí ở trung tâm, mức sống dễ chịu, thuận lợi đi lại và ăn uống và rất nhiều các chi nhánh để các chọn lựa gần chỗ làm nơi học.
                    Địa chỉ các cơ sở chi nhánh KTX:
                    ️CN1: 34 đường 36, P. Tân Quy, Q.7
                    Các chi nhánh khác:
                    ️CN2: 1134/14A Huỳnh Tấn Phát, Q.7
                    ️CN3: Hẻm 350 Huỳnh Tấn Phát, Q.7
                    ️CN4: 233/11/6 Nguyễn Trãi, P2, Q.5
                    ️ CN5: 84 Nguyễn Tất Thành, Q.4
                    CÒN CHẦN CHỜ GÌ NỮA NHANH TAY LIÊN HỆ CHO MÌNH 1 CHỖ
                    Điện thoại: 0931313570`,
    images: [
      {
        id: 1,
        url: "./src/assets/1.jpg",
      },
      {
        id: 2,
        url: "./src/assets/1.jpg",
      },
      {
        id: 3,
        url: "./src/assets/1.jpg",
      },
      {
        id: 4,
        url: "./src/assets/1.jpg",
      },
      {
        id: 5,
        url: "./src/assets/1.jpg",
      },
      {
        id: 6,
        url: "./src/assets/1.jpg",
      },
      {
        id: 7,
        url: "./src/assets/1.jpg",
      },
      {
        id: 8,
        url: "./src/assets/1.jpg",
      },
      {
        id: 9,
        url: "./src/assets/1.jpg",
      },
      {
        id: 10,
        url: "./src/assets/1.jpg",
      },
      {
        id: 11,
        url: "./src/assets/1.jpg",
      },
      {
        id: 12,
        url: "./src/assets/1.jpg",
      },
      {
        id: 13,
        url: "./src/assets/1.jpg",
      },
      {
        id: 14,
        url: "./src/assets/1.jpg",
      },
      {
        id: 15,
        url: "./src/assets/1.jpg",
      },
    ],
  };
const DetailRoom = () => {
  return (
    <div>
      <div className="braekcrumb"></div>
      <Card className="bg-white p-7  ">
        <Carousel arrows infinite={true} className="bg-black items-center">
        {item.images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.url}
              alt={`Ký túc xá quận 7 trọn gói 1tr gần Lotte Mart ${index + 1}`}
              style={{width: 'auto', maxHeight: '400px'}}
            />
          </div>
        ))}
        </Carousel>
      </Card>
    </div>
  );
};

export default DetailRoom;
