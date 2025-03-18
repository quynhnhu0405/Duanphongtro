import { Col, Row } from "antd";

const TimePackage = ({ onChange }) => {
  return (
    <Col lg={8} className="!pr-2">
      <div className="relative w-full">
        <label
          htmlFor="package_type"
          className="absolute top-1 left-3 text-gray-500 text-xs transition-all pointer-events-none"
        >
          Gói thời gian
        </label>
        <select
          id="package_type"
          name="package_type"
          className="w-full border border-gray-300 rounded-lg p-2 pt-5 bg-white focus:ring-1 focus:ring-blue-500"
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="day">Đăng theo ngày</option>
          <option value="week">Đăng theo tuần</option>
          <option value="month">Đăng theo tháng</option>
        </select>
      </div>
    </Col>
  );
};

export default TimePackage;
