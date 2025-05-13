import { Card } from "antd";
import { useEffect, useState } from "react";
import { packageService } from "../../../../Utils/api";

const Bill = ({ selectedPackage, packageType, totalDays, postData }) => {
  const [packageInfo, setPackageInfo] = useState(null);
  const [packageData, setPackageData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await packageService.getAll();
        setPackageData(response.data);
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchPackageData();
  }, []);

  useEffect(() => {
    if (packageData.length > 0 && selectedPackage) {
      const foundPackage = packageData.find(
        (pkg) => pkg.level == selectedPackage
      );
      setPackageInfo(foundPackage);

      const priceKey =
        packageType === "day"
          ? "priceday"
          : packageType === "week"
          ? "priceweek"
          : "pricemonth";

      const quantity = parseInt(totalDays.split(" ")[0], 10) || 1;
      const price = foundPackage[priceKey] * quantity;
      setTotalPrice(price);

      const expiryDate = calculateExpirationDate(totalDays);

      // Truyền dữ liệu ra ngoài thông qua postData
      if (typeof postData === "function") {
        const pricePerUnit = foundPackage[priceKey];
        const totalPrice = pricePerUnit * quantity;

        postData({
          selectedPackage: foundPackage,
          pricePerUnit,
          quantity,
          totalPrice,
          expiryDate,
          packageType,
        });
      }
    }
  }, [packageData, selectedPackage, packageType, totalDays]);

  const timePackageMap = {
    day: "Đăng theo ngày",
    week: "Đăng theo tuần",
    month: "Đăng theo tháng",
  };

  const calculateExpirationDate = (totalDays) => {
    const today = new Date();
    const [value, unit] = totalDays.split(" ");
    const quantity = parseInt(value, 10);

    let expiryDate = new Date(today);
    switch (unit) {
      case "ngày":
        expiryDate.setDate(today.getDate() + quantity);
        break;
      case "tuần":
        expiryDate.setDate(today.getDate() + quantity * 7);
        break;
      case "tháng":
        expiryDate.setMonth(today.getMonth() + quantity);
        break;
      default:
        break;
    }

    return expiryDate;
  };

  const expiryDate = calculateExpirationDate(totalDays);

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
              <td>
                {expiryDate
                  ? `${expiryDate
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${expiryDate
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")} ${expiryDate
                      .getDate()
                      .toString()
                      .padStart(2, "0")}/${(expiryDate.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/${expiryDate.getFullYear()}`
                  : ""}
              </td>
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
