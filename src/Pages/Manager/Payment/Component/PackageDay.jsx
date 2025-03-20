import { Col } from "antd";

const PackageDay = ({  setTotalDays, setPricePerDay, selectedPackage, packageType, calculatePrice }) => {
  const handleChange = (e) => {
    const days = parseInt(e.target.value, 10);
    setTotalDays(`${days} ngày`);

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
          Số ngày
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 pt-5 bg-white focus:ring-1 focus:ring-blue-500"
          id="total_day"
          name="total_day"
          aria-label="Chọn số ngày"
          onChange={handleChange}
        >
          {Array.from({ length: 90 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>
              {day} ngày
            </option>
          ))}
        </select>
      </div>
    </Col>
  );
};

export default PackageDay;