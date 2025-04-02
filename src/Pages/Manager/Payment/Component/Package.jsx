import { Col } from "antd";
import { useState, useEffect } from "react";

const Package = ({ packageType, onSelect, onPriceChange, packageData }) => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (packageData && packageData.length > 0) {
      // Sort packages by their level in descending order (4 to 1)
      const sortedPackages = [...packageData].sort((a, b) => b.level - a.level);
      setOptions(sortedPackages);

      // If no package is selected yet, select the first one (typically the lowest tier)
      if (!selectedPackage && sortedPackages.length > 0) {
        const lowestTier = sortedPackages[sortedPackages.length - 1];
        setSelectedPackage(lowestTier.level);
        onSelect(lowestTier.level);

        // Set the initial price
        const priceKey =
          packageType === "day"
            ? "priceday"
            : packageType === "week"
            ? "priceweek"
            : "pricemonth";
        onPriceChange(lowestTier[priceKey]);
      }
    }
  }, [packageData, packageType]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value !== selectedPackage) {
      setSelectedPackage(value);
      onSelect(value);

      if (packageData && packageData.length > 0) {
        const selectedPkg = packageData.find((pkg) => pkg.level === value);
        if (selectedPkg) {
          let price = 0;
          switch (packageType) {
            case "day":
              price = selectedPkg.priceday;
              break;
            case "week":
              price = selectedPkg.priceweek;
              break;
            case "month":
              price = selectedPkg.pricemonth;
              break;
            default:
              price = 0;
          }
          onPriceChange(price);
        }
      }
    }
  };

  const getFormattedPrice = (pkg) => {
    if (!pkg) return "";

    const priceKey =
      packageType === "day"
        ? "priceday"
        : packageType === "week"
        ? "priceweek"
        : "pricemonth";
    const price = pkg[priceKey];

    const unit =
      packageType === "day"
        ? "ngày"
        : packageType === "week"
        ? "tuần"
        : "tháng";
    return `(${new Intl.NumberFormat("vi-VN").format(price)}/${unit})`;
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
          {options.map((pkg) => (
            <option key={pkg._id} value={pkg.level}>
              {pkg.name} {getFormattedPrice(pkg)}
            </option>
          ))}
        </select>
      </div>
    </Col>
  );
};

export default Package;
