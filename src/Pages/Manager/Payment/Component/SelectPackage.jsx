import { Card, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import NoteFeaturedPackage from "./noteFeatured";
import NoteVip1 from "./noteVip1";
import NoteVip2 from "./noteVip2";
import NoteRegular from "./noteRegular";
import TimePackage from "./TimePackage";
import Package from "./Package";
import PackageDay from "./PackageDay";
import PackageWeek from "./PackageWeek";
import PackageMonth from "./PackageMonth";
import CardFeature from "../../Component/CardFeature";
import CardVip1 from "../../Component/CardVip1";
import CardVip2 from "../../Component/CardVip2";
import CardRegular from "../../Component/CardRegular";
import { packageService } from "../../../../Utils/api";

const SelectPackage = ({
  selectedPackage,
  setSelectedPackage,
  packageType,
  setPackageType,
  totalDays,
  setTotalDays,
  pricePerDay,
  setPricePerDay,
  onDataReady,
}) => {
  const location = useLocation();
  const [postData, setPostData] = useState(null);
  const [packageData, setPackageData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch package data from MongoDB
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await packageService.getAll();
        setPackageData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package data:", error);
        setLoading(false);
      }
    };
    fetchPackageData();
  }, []);

  // Get post data from location state
  useEffect(() => {
    if (location.state?.postData) {
      setPostData(location.state.postData);
    }
  }, [location.state]);

  const calculatePrice = (selectedPackage, packageType) => {
    if (!packageData.length || !selectedPackage) return 0;

    const packageInfo = packageData.find(
      (pkg) => pkg.level === selectedPackage
    );
    if (!packageInfo) return 0;

    switch (packageType) {
      case "day":
        return packageInfo.priceday;
      case "week":
        return packageInfo.priceweek;
      case "month":
        return packageInfo.pricemonth;
      default:
        return 0;
    }
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

  // Prepare data to send to parent component
  useEffect(() => {
    if (!postData || !packageData.length) return;

    // Calculate expiry date
    let daysValue = 1;
    switch (packageType) {
      case "week":
        daysValue = 7;
        break;
      case "month":
        daysValue = 30;
        break;
      default:
        daysValue = 1;
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysValue);

    const packageId = getPackageIdByLevel(selectedPackage);
    const currentPrice = calculatePrice(selectedPackage, packageType);

    // Format data to match the new schema
    const preparedData = {
      ...postData,
      package: packageId ? [packageId] : [], // Keep this format for backward compatibility
      packageType,
      expiryDate: expiryDate.toISOString(),
      totalPrice: currentPrice,
      duration: daysValue,
    };

    if (onDataReady) {
      onDataReady(preparedData);
    }
  }, [postData, selectedPackage, packageType, packageData]);

  // Update preview item based on received postData
  const previewItem = postData
    ? {
        title: postData.title,
        images: postData.images,
        price: `${new Intl.NumberFormat("vi-VN").format(
          postData.price
        )} đồng/tháng`,
        area: postData.area.toString(),
        location: {
          province: postData.location.province,
          ward: postData.location.district,
          street: `${postData.location.street || ""}, ${
            postData.location.ward
          }`,
        },
        description: postData.description.substring(0, 100) + "...",
        tempImages: postData.tempImages,
      }
    : null;
  console.log("Preview item:", previewItem);
  // Mapping gói đăng tin
  const packageComponents = {
    day: { component: PackageDay, label: "ngày" },
    week: { component: PackageWeek, label: "tuần" },
    month: { component: PackageMonth, label: "tháng" },
  };
  const SelectedPackageComponent =
    packageComponents[packageType]?.component || PackageDay;

  // Update price when packageType or selectedPackage changes
  useEffect(() => {
    const newPrice = calculatePrice(selectedPackage, packageType);
    setPricePerDay(newPrice);
  }, [selectedPackage, packageType, packageData]);

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

  // Get package _id by level
  const getPackageIdByLevel = (level) => {
    if (!packageData.length || !level) return null;
    const packageInfo = packageData.find((pkg) => pkg.level === level);
    return packageInfo ? packageInfo._id : null;
  };

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
            packageData={packageData}
          />
          <SelectedPackageComponent
            setTotalDays={setTotalDays}
            setPricePerDay={setPricePerDay}
            selectedPackage={selectedPackage}
            packageType={packageType}
            calculatePrice={calculatePrice}
            packageData={packageData}
          />
        </Row>

        {/* Xem trước mẫu */}
        <div className="mt-5 mb-5">
          <h1 className="font-lg font-black mb-2">Xem trước mẫu</h1>
          {previewItem ? (
            <SelectedPreviewComponent item={previewItem} />
          ) : (
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              Không có dữ liệu bài đăng
            </div>
          )}
        </div>

        {/* Hiển thị thông tin gói tin */}
        <SelectedNoteComponent />
      </Card>
    </div>
  );
};

export default SelectPackage;
