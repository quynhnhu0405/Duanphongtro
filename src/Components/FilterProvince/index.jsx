import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const FilterProvince = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState(null);

  // Check URL for province param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const province = params.get("province");
    if (province) {
      // Find matching province in the city array
      const matchingCity = city.find((c) => c.key === province);
      if (matchingCity) {
        setSelectedProvince(matchingCity.path);
      }
    } else {
      // If no province in URL, set default to "Tất cả"
      setSelectedProvince(location.pathname);
    }
  }, [location.search, location.pathname]);

  const city = [
    { label: "Tất cả", key: 1, path: `${location.pathname}` },
    {
      label: "Hà Nội",
      key: "Thành phố Hà Nội",
      path: `${location.pathname}/tinh-thanh/ha-noi`,
    },
    {
      label: "TP Hồ Chí Minh",
      key: "Thành phố Hồ Chí Minh",
      path: `${location.pathname}/tinh-thanh/ho-chi-minh`,
    },
    {
      label: "Đà Nẵng",
      key: "Thành phố Đà Nẵng",
      path: `${location.pathname}/tinh-thanh/da-nang`,
    },
    {
      label: "Bình Dương",
      key: "Tỉnh Bình Dương",
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

  const handleMenuClick = (e) => {
    const selectedCity = city.find((item) => item.path === e.key);

    if (selectedCity) {
      // Build search params
      const params = new URLSearchParams(location.search);

      if (selectedCity.key === 1) {
        // If "Tất cả" is selected, remove province filter
        params.delete("province");
        params.delete("district");
        params.delete("ward");
      } else {
        // Apply province filter
        params.set("province", selectedCity.key);
        params.delete("district");
        params.delete("ward");
      }

      // Navigate with updated params
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      });
    }
  };

  return (
    <div>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedProvince]}
        className="filter-province"
        defaultSelectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        items={city.map((item) => ({
          key: item.path,
          label: item.label,
        }))}
      />
    </div>
  );
};

export default FilterProvince;
