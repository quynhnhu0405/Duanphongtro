import { Card, Row, Button } from "antd";
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
import { postService } from "../../../../Utils/api";
import { packageService } from "../../../../Utils/api";
import Bill from "./Bill";

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
  const location = useLocation();
  const [postData, setPostData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (location.state && location.state.postData) {
      setPostData(location.state.postData);
      console.log("Received post data:", location.state.postData);
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

  // Update preview item based on received postData
  const previewItem = postData
    ? {
        title: postData.title,
        images: postData.images.map((url, index) => ({ id: index, url })),
        price: `${new Intl.NumberFormat("vi-VN").format(
          postData.price
        )} đồng/tháng`,
        acreage: postData.area.toString(),
        location: {
          city: postData.location.province,
          ward: postData.location.district,
          street: `${postData.location.street || ""}, ${
            postData.location.ward
          }`,
        },
        description: postData.description.substring(0, 100) + "...",
      }
    : null;

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

  // Handle post creation on submit
  const handleSubmitPost = async () => {
    if (!postData) {
      console.error("No post data available");
      return;
    }

    // Calculate expiry date based on package type
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

    // Create the expiry date directly as a Date object
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysValue);

    try {
      setIsSubmitting(true);

      // Get the package _id instead of level
      const packageId = getPackageIdByLevel(selectedPackage);

      // Add package and other details to the post data
      const finalPostData = {
        ...postData,
        package: packageId ? [packageId] : [], // Using the _id instead of level
        expiryDate: expiryDate.toISOString(), // Convert to ISO string format
        // Add any other fields needed by your API
      };

      console.log("Submitting post with data:", finalPostData);

      // Submit the post to the API
      const response = await postService.createPost(finalPostData);
      console.log("Post created successfully:", response.data);

      // Handle success - redirect or show success message
      alert("Đăng tin thành công!");
      // Redirect logic here if needed
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Đăng tin thất bại. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Submit button */}
        <Button
          type="primary"
          danger
          className="w-full mt-6 !font-bold !text-base !p-5 !bg-red-600 !rounded-3xl"
          onClick={handleSubmitPost}
          loading={isSubmitting || loading}
          disabled={!postData || isSubmitting || loading}
        >
          Đăng tin ngay
        </Button>
      </Card>
    </div>
  );
};

export default SelectPackage;
