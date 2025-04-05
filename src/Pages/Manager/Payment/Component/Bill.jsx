import { Card } from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import { packageService } from "../../../../Utils/api";

const Bill = ({ selectedPackage, packageType, totalDays }) => {
  const [packageInfo, setPackageInfo] = useState(null);
  const [packageData, setPackageData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    console.log("Package data:", packageData);
    if (packageData && packageData.length > 0 && selectedPackage) {
      console.log("Selected package:", selectedPackage, packageType, totalDays);
      const foundPackage = packageData.find(
        (pkg) => pkg.level == selectedPackage
      );
      console.log("Found package:", foundPackage);
      setPackageInfo(foundPackage);
      const priceKey =
        packageType === "day"
          ? "priceday"
          : packageType === "week"
          ? "priceweek"
          : "pricemonth";

      // Extract quantity from totalDays
      const quantity = parseInt(totalDays.split(" ")[0], 10) || 1;

      setTotalPrice(foundPackage[priceKey] * quantity);
    }
  }, [packageData, selectedPackage, packageType, totalDays]);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await packageService.getAll();
        console.log("Package data:", response.data);
        setPackageData(response.data);
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchPackageData();
  }, []);

  // Map gói thời gian
  const timePackageMap = {
    day: "Đăng theo ngày",
    week: "Đăng theo tuần",
    month: "Đăng theo tháng",
  };

  const calculateExpirationDate = (totalDays) => {
    const today = new Date();
    const [value, unit] = totalDays.split(" ");

    let expirationDate = new Date(today);

    switch (unit) {
      case "ngày":
        expirationDate.setDate(today.getDate() + parseInt(value, 10));
        break;
      case "tuần":
        expirationDate.setDate(today.getDate() + parseInt(value, 10) * 7);
        break;
      case "tháng":
        expirationDate.setMonth(today.getMonth() + parseInt(value, 10));
        break;
      default:
        expirationDate = today; // Mặc định là ngày và giờ hiện tại
    }

    // Định dạng ngày và giờ thành "dd/MM/yyyy HH:mm"
    const day = expirationDate.getDate().toString().padStart(2, "0");
    const month = (expirationDate.getMonth() + 1).toString().padStart(2, "0");
    const year = expirationDate.getFullYear();
    const hours = expirationDate.getHours().toString().padStart(2, "0");
    const minutes = expirationDate.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes} ${day}/${month}/${year} `;
  };
  // Tính ngày hết hạn
  const expirationDate = calculateExpirationDate(totalDays);

  return (
    <div className="mr-1 mb-6 sticky top-[150px]">
      <Card className="!bg-[#e9f6e9] w-full rounded-2xl mt-20 shadow-md !border-2 !border-green-900">
        <div className="text-xl font-black mb-3">Thanh toán</div>
        <table className="check-bill">
          <tbody>
            <tr>
              <td>Loại tin:</td>
              <td>{packageInfo ? packageInfo.name : ""}</td>
            </tr>
            <tr>
              <td>Gói thời gian:</td>
              <td>{timePackageMap[packageType]}</td>
            </tr>
            <tr>
              <td>Đơn giá:</td>
              <td>{(totalPrice / parseInt(totalDays)).toLocaleString()}₫</td>
            </tr>
            <tr>
              <td>Số ngày đăng:</td>
              <td>{totalDays}</td>
            </tr>
            <tr>
              <td>Đến ngày:</td>
              <td>{expirationDate}</td>
            </tr>
            <tr>
              <td>Thành tiền:</td>
              <td className="font-bold">{totalPrice.toLocaleString()}₫</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Bill;
