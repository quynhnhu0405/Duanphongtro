import { Col } from "antd";
import { useState } from "react";

const Package = ({ packageType, onSelect, onPriceChange }) => {
  const [selectedPackage, setSelectedPackage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (value !== selectedPackage) {
      setSelectedPackage(value);
      onSelect(value);

      let price = 0;
      switch (value) {
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

      onPriceChange(price);
    }
  };

  return (
    <Col lg={8} className="!pl-1 !pr-1">
      <div className="relative">
        <label
          htmlFor="package_type"
          className="absolute top-1 left-3 text-gray-500 text-xs transition-all pointer-events-none"
        >
          Chọn loại tin
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 pt-5 bg-white focus:ring-1 focus:ring-blue-500"
          id="post_package"
          name="package"
          required=""
          value={selectedPackage}
          onChange={handleChange}
        >
          <option value="4">
            Tin thường{" "}
            {packageType === "day"
              ? "(2.000/ngày)"
              : packageType === "week"
              ? "(12.000/tuần)"
              : "(48.000/tháng)"}
          </option>
          <option value="3">
            Tin VIP 2{" "}
            {packageType === "day"
              ? "(10.000/ngày)"
              : packageType === "week"
              ? "(63.000/tuần)"
              : "(240.000/tháng)"}
          </option>
          <option value="2">
            Tin VIP 1{" "}
            {packageType === "day"
              ? "(20.000/ngày)"
              : packageType === "week"
              ? "(133.000/tuần)"
              : "(540.000/tháng)"}
          </option>
          <option value="1">
            Tin VIP nổi bật{" "}
            {packageType === "day"
              ? "(30.000/ngày)"
              : packageType === "week"
              ? "(190.000/tuần)"
              : "(800.000/tháng)"}
          </option>
        </select>
      </div>
    </Col>
  );
};

export default Package;