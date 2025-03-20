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
import { useEffect } from "react";

const SelectPackage = ({
  selectedPackage,
  setSelectedPackage,
  packageType,
  setPackageType,
  totalDays,
  setTotalDays,
  pricePerDay,
  setPricePerDay,
}) => {
  const calculatePrice = (selectedPackage, packageType) => {
    let price = 0;
    switch (selectedPackage) {
      case "1":
        price = packageType === "day" ? 30000 : packageType === "week" ? 190000 : 800000;
        break;
      case "2":
        price = packageType === "day" ? 20000 : packageType === "week" ? 133000 : 540000;
        break;
      case "3":
        price = packageType === "day" ? 10000 : packageType === "week" ? 63000 : 240000;
        break;
      case "4":
        price = packageType === "day" ? 2000 : packageType === "week" ? 12000 : 48000;
        break;
      default:
        price = 0;
    }
    return price;
  };
  useEffect(() => {
    switch (packageType) {
      case "day":
        setTotalDays("1 ngày");
        break;
      case "week":
        setTotalDays("1 tuần");
        break;
      case "month":
        setTotalDays("1 tháng");
        break;
      default:
        setTotalDays("1 ngày");
    }
  }, [packageType, setTotalDays]);
  // Danh sách mẫu item
  const items = [
    {
      id: 1,
      title: "Nhà Trọ 416/23 Dương Quảng Hàm",
      images: Array(4).fill({ id: 1, url: "../../src/assets/1.jpg" }),
      price: "4.5 triệu/tháng",
      acreage: "20",
      location: {
        city: "TP Hồ Chí Minh",
        ward: "Gò Vấp",
        street: "416/23 Dương Quảng Hàm",
      },
      description:
        "Homestay Hoàng Phúc – hệ thống Kytucxa Q7 rẻ nhất Sài Gòn...",
    },
  ];

  // Mapping gói đăng tin
  const packageComponents = {
    day: { component: PackageDay, label: "ngày" },
    week: { component: PackageWeek, label: "tuần" },
    month: { component: PackageMonth, label: "tháng" },
  };
  const SelectedPackageComponent =
    packageComponents[packageType]?.component || PackageDay;
  
  // Cập nhật giá khi packageType hoặc selectedPackage thay đổi
  useEffect(() => {
    const newPrice = calculatePrice(selectedPackage, packageType);
    setPricePerDay(newPrice);
  }, [selectedPackage, packageType, setPricePerDay]);


  // Mapping xem trước mẫu
  const previewComponents = {
    1: CardFeature,
    2: CardVip1,
    3: CardVip2,
    4: CardRegular,
  };
  const SelectedPreviewComponent =
    previewComponents[selectedPackage] || CardRegular;

  // Mapping thông tin gói tin
  const noteComponents = {
    1: NoteFeaturedPackage,
    2: NoteVip1,
    3: NoteVip2,
    4: NoteRegular,
  };
  const SelectedNoteComponent = noteComponents[selectedPackage] || NoteRegular;

  return (
    <div className="mr-1 mb-6">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-md">
        <div className="text-xl font-black mb-3">Chọn gói đăng tin</div>
        <Row>
          <TimePackage onChange={setPackageType} />
          <Package
            packageType={packageType}
            onSelect={setSelectedPackage}
            onPriceChange={setPricePerDay}
          />
          <SelectedPackageComponent
        setTotalDays={setTotalDays}
        setPricePerDay={setPricePerDay}
        selectedPackage={selectedPackage}
        packageType={packageType}
        calculatePrice={calculatePrice}
      />
        </Row>

        {/* Xem trước mẫu */}
        <div className="mt-5 mb-5">
          <h1 className="font-lg font-black mb-2">Xem trước mẫu</h1>
          <SelectedPreviewComponent item={items[0]} />
        </div>

        {/* Hiển thị thông tin gói tin */}
        <SelectedNoteComponent />
      </Card>
    </div>
  );
};

export default SelectPackage;
