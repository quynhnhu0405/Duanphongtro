import { Card, Row } from "antd";
import NoteFeaturedPackage from "./noteFeatured";
import NoteVip1 from "./noteVip1";
import NoteVip2 from "./noteVip2";
import NoteRegular from "./noteRegular";
import TimePackage from "./TimePackage";
import Package from "./Package";
import PackageDay from "./PackageDay";
import PackageWeek from "./PackageWeek";
import PackageMonth from "./PackageMonth";
import CardFeature from "./CardFeature";
import CardVip1 from "./CardVip1";
import CardVip2 from "./CardVip2";
import CardRegular from "./CardRegular";

const SelectPackage = ({
  selectedPackage,
  setSelectedPackage,
  packageType,
  setPackageType,
  totalDays,
  setTotalDays,
  setPricePerDay
}) => {
  // Danh sách item mẫu
  const items = [
    {
      id: 1,
      title: "Nhà Trọ 416/23 Dương Quảng Hàm",
      images: [
        { id: 1, url: "../../src/assets/1.jpg" },
        { id: 2, url: "../../src/assets/1.jpg" },
        { id: 3, url: "../../src/assets/1.jpg" },
        { id: 4, url: "../../src/assets/1.jpg" },
      ],
      price: "4.5 triệu/tháng",
      acreage: "20",
      location: { city: "TP Hồ Chí Minh", ward: "Gò Vấp", street: "416/23 Dương Quảng Hàm" },
      description: "Homestay Hoàng Phúc – hệ thống Kytucxa Q7 rẻ nhất Sài Gòn...",
    },
  ];

  return (
    <div className="mr-1 mb-6">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-md">
        <div className="text-xl font-black mb-3">Chọn gói đăng tin</div>
        <Row>
          <TimePackage onChange={setPackageType} />
          <Package packageType={packageType} onSelect={setSelectedPackage} />
          {packageType === "day" ? <PackageDay setTotalDays={setTotalDays} setPricePerDay={setPricePerDay} /> 
            : packageType === "week" ? <PackageWeek setTotalDays={setTotalDays} setPricePerDay={setPricePerDay} /> 
            : <PackageMonth setTotalDays={setTotalDays} setPricePerDay={setPricePerDay} />}
        </Row>
        <div className="mt-5 mb-5">
          <h1 className="font-lg font-black mb-2">Xem trước mẫu</h1>
          {selectedPackage === "1" ? <CardFeature item={items[0]} />
            : selectedPackage === "2" ? <CardVip1 item={items[0]} />
            : selectedPackage === "3" ? <CardVip2 item={items[0]} />
            : <CardRegular item={items[0]} />}
        </div>

        {/* Hiển thị thông tin chi tiết của gói tin */}
        {selectedPackage === "1" ? <NoteFeaturedPackage />
          : selectedPackage === "2" ? <NoteVip1 />
          : selectedPackage === "3" ? <NoteVip2 />
          : <NoteRegular />}
      </Card>
    </div>
  );
};

export default SelectPackage;
