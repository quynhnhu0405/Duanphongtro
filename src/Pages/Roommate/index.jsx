import { Card } from "antd";
import FeaturedPost from "../../Components/FeaturedPost";
import Vip1Card from "../../Components/Vip1Card";
import Vip2Card from "../../Components/Vip2Card";
import RegularCard from "../../Components/RegularCard";
import FilterProvince from "../../Components/FilterProvince";
import TabMenu from "../../Components/TabMenu";

const items = [
  {
    id: 1,
    title: "Nhà Trọ 416/23 Dương Quảng Hàm",
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
    ],
    createdAt: "2025-03-01",
    price: "4.5 triệu/tháng",
    acreage: "20",
    location: {
      id: 1,
      city: "TP Hồ Chí Minh",
      ward: "Gò Vấp",
      street: "416/23 Dương Quảng Hàm",
    },
    type: {
      id: 1,
      name: "Nhà trọ, phòng trọ",
    },
    description:
      "Đến Homestay Hoàng Phúc – hệ thống Kytucxa Q7 rẻ nhất Sài Gòn với những căn phòng đẹp lung linh chuẩn 2 sao, đa dạng tiện nghi và bao trọn toàn bộ các chi",
    host: {
      id: 1,
      name: "Phúc",
      avatar: "./src/assets/defaul-avt.png",
      phone: "0123456789",
    },
    package: 1,
  },
];
const Roommate = () => {
  return (
    <div>
      <Card className="bg-white p-7  ">
        <div className="border-b border-gray-200 pb-2">
          <h1 className="font-bold text-2xl">
          Tìm Người Ở Ghép Mới Nhất 2025
          </h1>
          <p className="text-sm text-gray-700">Có 70.494 tin đăng cho thuê</p>
        </div>

          <FilterProvince />
          <TabMenu/>
        <RegularCard item={items[0]} />
        <RegularCard item={items[0]} />
        <RegularCard item={items[0]} />
        <RegularCard item={items[0]} />
      </Card>
    </div>
  );
};

export default Roommate;
