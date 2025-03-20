import { Col } from "antd";

const PackageMonth = ({ setTotalDays, setPricePerDay, selectedPackage, packageType, calculatePrice }) => {
  const handleChange = (e) => {
    const months = parseInt(e.target.value, 10);
    setTotalDays(`${months} tháng`); // Sửa thành "tháng"

    // Tính toán lại giá dựa trên loại tin và gói thời gian
    const price = calculatePrice(selectedPackage, packageType);
    setPricePerDay(price);
  };

  return (
    <Col lg={8} className="!pl-2">
      <div className="relative">
        <label
          htmlFor="package_type"
          className="absolute top-1 left-3 text-gray-500 text-xs transition-all pointer-events-none"
        >
          Số tháng
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 pt-5 bg-white focus:ring-1 focus:ring-blue-500"
          id="total_month"
          name="total_month"
          aria-label="Chọn số tháng"
          onChange={handleChange}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {month} tháng
            </option>
          ))}
        </select>
      </div>
    </Col>
  );
};

export default PackageMonth;