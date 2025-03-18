import { Col } from "antd";

const PackageWeek = () => {
  return (
    <Col lg={8} className="!pl-2">
      <div className="relative ">
        <label
          htmlFor="package_type"
          className="absolute top-1 left-3 text-gray-500 text-xs transition-all pointer-events-none"
        >
          Số tuần
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 pt-5 bg-white focus:ring-1 focus:ring-blue-500"
          id="total_week"
          name="total_week"
          aria-label="Chọn số tuần"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((week) => (
            <option key={week} value={week}>
              {week} tuần
            </option>
          ))}
        </select>
      </div>
    </Col>
  );
};

export default PackageWeek;
