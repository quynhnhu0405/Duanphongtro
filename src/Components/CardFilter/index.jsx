import { RightOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useLocation, useNavigate } from "react-router";

const FilterCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to build and navigate to URL with filters
  const navigateWithFilter = (params) => {
    // Get current path
    let path = location.pathname;
    if (path === "/" || !path) {
      // If on homepage, default to phong-tro
      path = "/phong-tro";
    }

    // Create search params
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });

    // Navigate to filtered page
    navigate({
      pathname: path,
      search: searchParams.toString(),
    });
  };

  // Apply price filter
  const applyPriceFilter = (min, max) => {
    const params = {};
    if (min !== null) params.priceMin = min;
    if (max !== null) params.priceMax = max;
    navigateWithFilter(params);
  };

  // Apply area filter
  const applyAreaFilter = (min, max) => {
    const params = {};
    if (min !== null) params.areaMin = min;
    if (max !== null) params.areaMax = max;
    navigateWithFilter(params);
  };

  return (
    <div className="filter-card">
      <Card title="Xem theo khoảng giá">
        <ul
          className="leading-7 text-sm"
          style={{
            columnCount: 2,
            columnGap: "20px",
            listStyle: "none",
          }}
        >
          <li className="col-6">
            <a
              className="text-black"
              onClick={() => applyPriceFilter(0, 1000000)}
              style={{ cursor: "pointer" }}
            >
              <RightOutlined className="icon" />
              Dưới 1 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              onClick={() => applyPriceFilter(1000000, 2000000)}
              style={{ cursor: "pointer" }}
            >
              <RightOutlined className="icon" />
              Từ 1 - 2 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              onClick={() => applyPriceFilter(2000000, 3000000)}
              style={{ cursor: "pointer" }}
            >
              <RightOutlined className="icon" />
              Từ 2 - 3 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              onClick={() => applyPriceFilter(3000000, 5000000)}
              style={{ cursor: "pointer" }}
            >
              <RightOutlined className="icon" />
              Từ 3 - 5 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              onClick={() => applyPriceFilter(5000000, 7000000)}
              style={{ cursor: "pointer" }}
            >
              <RightOutlined className="icon" />
              Từ 5 - 7 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              onClick={() => applyPriceFilter(7000000, 10000000)}
              style={{ cursor: "pointer" }}
            >
              <RightOutlined className="icon" />
              Từ 7 - 10 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              onClick={() => applyPriceFilter(10000000, 15000000)}
              style={{ cursor: "pointer" }}
            >
              <RightOutlined className="icon" />
              Từ 10 - 15 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              onClick={() => applyPriceFilter(15000000, null)}
              style={{ cursor: "pointer" }}
            >
              <RightOutlined className="icon" />
              Trên 15 triệu
            </a>
          </li>
        </ul>
      </Card>
      <div className="mt-3 mb-3">
        <Card title="Xem theo diện tích">
          <ul
            className="leading-7 text-sm"
            style={{
              columnCount: 2,
              columnGap: "20px",
              listStyle: "none",
            }}
          >
            <li className="col-6">
              <a
                className="text-black"
                onClick={() => applyAreaFilter(0, 20)}
                style={{ cursor: "pointer" }}
              >
                <RightOutlined className="icon" />
                Dưới 20 m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a
                className="text-black"
                onClick={() => applyAreaFilter(20, 30)}
                style={{ cursor: "pointer" }}
              >
                <RightOutlined className="icon" />
                Từ 20 - 30m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a
                className="text-black"
                onClick={() => applyAreaFilter(30, 50)}
                style={{ cursor: "pointer" }}
              >
                <RightOutlined className="icon" />
                Từ 30 - 50m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a
                className="text-black"
                onClick={() => applyAreaFilter(50, 70)}
                style={{ cursor: "pointer" }}
              >
                <RightOutlined className="icon" />
                Từ 50 - 70m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a
                className="text-black"
                onClick={() => applyAreaFilter(70, 90)}
                style={{ cursor: "pointer" }}
              >
                <RightOutlined className="icon" />
                Từ 70 - 90m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a
                className="text-black"
                onClick={() => applyAreaFilter(90, null)}
                style={{ cursor: "pointer" }}
              >
                <RightOutlined className="icon" />
                Trên 90m<sup>2</sup>
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default FilterCard;
