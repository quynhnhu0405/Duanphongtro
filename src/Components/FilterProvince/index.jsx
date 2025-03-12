import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router";

const FilterProvince = () => {
    const location = useLocation();
  const city = [
    { label: "Tất cả", key: 1, path: `${location.pathname}`},
    { label: "Hà Nội", key: "Thành Phố Hà Nội", path: `${location.pathname}/phong-tro/tinh-thanh/ha-noi` },
    {
      label: "TP Hồ Chí Minh",
      key: "/tinh-thanh/ho-chi-minh",
      path: `${location.pathname}/tinh-thanh/ho-chi-minh`,
    },
    {
      label: "Đà Nẵng",
      key: "/tinh-thanh/da-nang",
      path: `${location.pathname}/tinh-thanh/da-nang`,
    },
    {
      label: "Bình Dương",
      key: "/tinh-thanh/binh-duong",
      path: `${location.pathname}/tinh-thanh/binh-duong`,
    },
  ];
  const locations = [
    {
      id: 1,
      city: "TP Hồ Chí Minh",
      ward: [
        {
          id: 1,
          name: "Gò Vấp",
        },
        {
          id: 2,
          name: "Quán 10",
        },
        {
          id: 3,
          name: "Quán 11",
        },
        {
          id: 4,
          name: "Quán 12",
        },
      ],
    },
    {
      id: 2,
      city: "Hà Nội",
      ward: [
        {
          id: 1,
          name: "Ba Đình",
        },
        {
          id: 2,
          name: "Hoàng Mai",
        },
        {
          id: 3,
          name: "Thanh Xuân",
        },
      ],
    },
  ];
  const navigate = useNavigate();

  return (
    <div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        className="filter-province "
        defaultSelectedKeys={1}
        onClick={(e) => navigate(e.key)}
        items={city.map((item) => ({
          key: item.path,
          label: item.label,
        }))}
      />
    </div>
  );
};

export default FilterProvince;
