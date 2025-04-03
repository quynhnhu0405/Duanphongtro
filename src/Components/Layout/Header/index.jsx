import {
  CloudUploadOutlined,
  FilterOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import FilterModal from "../../Filter/FilterModal";
import SearchModal from "../../search/SearchModal";
import { useLocation, useNavigate } from "react-router";
import User from "./User";
import { useAuth } from "../../../Utils/AuthContext";
import { postService } from "../../../Utils/api";
const menuItems = [
  { label: "Trang chủ", key: "/", path: "/" },
  { label: "Phòng trọ", key: "/phong-tro", path: "/phong-tro" },
  { label: "Chung cư", key: "/chung-cu", path: "/chung-cu" },
  { label: "Ở ghép", key: "/o-ghep", path: "/o-ghep" },
  { label: "Bảng giá đăng bài", key: "/bang-gia", path: "/bang-gia" },
];
const DefaultHeader = () => {
  const [visible, setVisible] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [locationText, setLocationText] = useState("Tìm theo khu vực");
  const [isFilterVisible, setFillerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Phòng trọ");
  const [selectedPrice, setSelectedPrice] = useState("Tất cả");
  const [isAcreage, setIsAcreage] = useState("Tất cả");
  const [isCharacteristics, setIsCharacteristics] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [utilities, setUtilities] = useState([]);
  const [categories, setCategories] = useState([]);

  // Parse URL query params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Set initial filter values from URL if they exist
    const queryKeyword = params.get("keyword");
    if (queryKeyword) setKeyword(queryKeyword);

    const queryProvince = params.get("province");
    const queryDistrict = params.get("district");
    const queryWard = params.get("ward");

    const queryPriceMin = params.get("priceMin");
    const queryPriceMax = params.get("priceMax");
    if (queryPriceMin && queryPriceMax) {
      // Find the matching price range
      const priceRangeLabel = getPriceRangeLabel(queryPriceMin, queryPriceMax);
      if (priceRangeLabel) setSelectedPrice(priceRangeLabel);
    }

    const queryAreaMin = params.get("areaMin");
    const queryAreaMax = params.get("areaMax");
    if (queryAreaMin && queryAreaMax) {
      // Find the matching acreage range
      const acreageRangeLabel = getAcreageRangeLabel(
        queryAreaMin,
        queryAreaMax
      );
      if (acreageRangeLabel) setIsAcreage(acreageRangeLabel);
    }
  }, [location.search]);

  // Get category data
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const priceRanges = [
    "Tất cả",
    "Dưới 1 triệu",
    "1 - 2 triệu",
    "2 - 3 triệu",
    "3 - 5 triệu",
    "5 - 7 triệu",
    "7 - 10 triệu",
    "10 - 15 triệu",
    "Trên 15 triệu",
  ];
  const acreages = [
    "Tất cả",
    "Dưới 20m²",
    "20m² - 30m²",
    "30m² - 50m²",
    "50m² - 70m²",
    "70m² - 90m²",
    "Trên 90m²",
  ];

  // Get utility data
  useEffect(() => {
    fetch("http://localhost:5000/api/utilities")
      .then((res) => res.json())
      .then((data) => {
        setUtilities(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const TARGET_PROVINCES = [
    "Thành phố Hà Nội",
    "Thành phố Hồ Chí Minh",
    "Tỉnh Bình Dương",
    "Thành phố Đà Nẵng",
  ];

  // Get province data
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((response) => response.json())
      .then((data) => {
        const targetProvinces = data.filter((province) =>
          TARGET_PROVINCES.includes(province.name)
        );
        setProvinces(targetProvinces);

        // After provinces are loaded, set the selected province from URL if available
        setInitialLocationFromURL();
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Set initial location values from URL
  const setInitialLocationFromURL = () => {
    const params = new URLSearchParams(location.search);
    const queryProvince = params.get("province");
    const queryDistrict = params.get("district");
    const queryWard = params.get("ward");

    if (queryProvince && provinces.length > 0) {
      const province = provinces.find((p) => p.name === queryProvince);
      if (province) {
        setSelectedProvince(province);
        setDistricts(province.districts);

        if (queryDistrict) {
          const district = province.districts.find(
            (d) => d.name === queryDistrict
          );
          if (district) {
            setSelectedDistrict(district);
            setWards(district.wards);

            if (queryWard) {
              const ward = district.wards.find((w) => w.name === queryWard);
              if (ward) {
                setSelectedWard(ward);
                setLocationText(
                  `${ward.name}, ${district.name}, ${province.name}`
                );
              }
            } else {
              setLocationText(`${district.name}, ${province.name}`);
            }
          }
        } else {
          setLocationText(province.name);
        }
      }
    }
  };

  const handleProvinceChange = (value) => {
    const province = provinces.find((p) => p.code === value);
    setSelectedProvince(province);
    setDistricts(province?.districts || []);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setWards([]);
  };

  const handleDistrictChange = (value) => {
    const district = districts.find((d) => d.code === value);
    setSelectedDistrict(district);
    setWards(district?.wards || []);
    setSelectedWard(null);
  };

  const handleWardChange = (value) => {
    const ward = wards.find((w) => w.code === value);
    setSelectedWard(ward);
  };

  const handleConfirm = () => {
    if (selectedProvince) {
      if (selectedDistrict && selectedWard) {
        setLocationText(
          `${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`
        );
      } else if (selectedDistrict) {
        setLocationText(`${selectedDistrict.name}, ${selectedProvince.name}`);
      } else {
        setLocationText(selectedProvince.name);
      }

      // Apply location filter
      applyFilters();
    }
    setVisible(false);
  };

  // Get price range values
  const getPriceRangeValues = (priceRange) => {
    let min, max;
    switch (priceRange) {
      case "Dưới 1 triệu":
        min = 0;
        max = 1000000;
        break;
      case "1 - 2 triệu":
        min = 1000000;
        max = 2000000;
        break;
      case "2 - 3 triệu":
        min = 2000000;
        max = 3000000;
        break;
      case "3 - 5 triệu":
        min = 3000000;
        max = 5000000;
        break;
      case "5 - 7 triệu":
        min = 5000000;
        max = 7000000;
        break;
      case "7 - 10 triệu":
        min = 7000000;
        max = 10000000;
        break;
      case "10 - 15 triệu":
        min = 10000000;
        max = 15000000;
        break;
      case "Trên 15 triệu":
        min = 15000000;
        max = null;
        break;
      default:
        min = null;
        max = null;
    }
    return { min, max };
  };

  // Get acreage range values
  const getAcreageRangeValues = (acreageRange) => {
    let min, max;
    switch (acreageRange) {
      case "Dưới 20m²":
        min = 0;
        max = 20;
        break;
      case "20m² - 30m²":
        min = 20;
        max = 30;
        break;
      case "30m² - 50m²":
        min = 30;
        max = 50;
        break;
      case "50m² - 70m²":
        min = 50;
        max = 70;
        break;
      case "70m² - 90m²":
        min = 70;
        max = 90;
        break;
      case "Trên 90m²":
        min = 90;
        max = null;
        break;
      default:
        min = null;
        max = null;
    }
    return { min, max };
  };

  // Function to get price range label from min/max values
  const getPriceRangeLabel = (min, max) => {
    min = Number(min);
    max = max ? Number(max) : null;

    if (min === 0 && max === 1000000) return "Dưới 1 triệu";
    if (min === 1000000 && max === 2000000) return "1 - 2 triệu";
    if (min === 2000000 && max === 3000000) return "2 - 3 triệu";
    if (min === 3000000 && max === 5000000) return "3 - 5 triệu";
    if (min === 5000000 && max === 7000000) return "5 - 7 triệu";
    if (min === 7000000 && max === 10000000) return "7 - 10 triệu";
    if (min === 10000000 && max === 15000000) return "10 - 15 triệu";
    if (min === 15000000 && max === null) return "Trên 15 triệu";

    return null;
  };

  // Function to get acreage range label from min/max values
  const getAcreageRangeLabel = (min, max) => {
    min = Number(min);
    max = max ? Number(max) : null;

    if (min === 0 && max === 20) return "Dưới 20m²";
    if (min === 20 && max === 30) return "20m² - 30m²";
    if (min === 30 && max === 50) return "30m² - 50m²";
    if (min === 50 && max === 70) return "50m² - 70m²";
    if (min === 70 && max === 90) return "70m² - 90m²";
    if (min === 90 && max === null) return "Trên 90m²";

    return null;
  };

  // Apply filters and navigate to filtered page
  const applyFilters = () => {
    // Determine which API endpoint to use based on current path
    let path = location.pathname;
    if (path === "/" || !path) {
      // If on homepage, default to phong-tro
      path = "/phong-tro";
    }

    // Only change path if a different category is selected and we're on a filterable page
    const filterable = ["/phong-tro", "/chung-cu", "/o-ghep"].includes(path);
    if (filterable && selectedCategory) {
      switch (selectedCategory) {
        case "Phòng trọ":
          path = "/phong-tro";
          break;
        case "Chung cư căn hộ":
          path = "/chung-cu";
          break;
        case "Ở ghép":
          path = "/o-ghep";
          break;
      }
    }

    // Build query params
    const params = {};

    if (keyword) params.keyword = keyword;

    if (selectedProvince) params.province = selectedProvince.name;
    if (selectedDistrict) params.district = selectedDistrict.name;
    if (selectedWard) params.ward = selectedWard.name;

    // Add price range filters
    if (selectedPrice && selectedPrice !== "Tất cả") {
      const { min, max } = getPriceRangeValues(selectedPrice);
      if (min !== null) params.priceMin = min;
      if (max !== null) params.priceMax = max;
    }

    // Add area range filters
    if (isAcreage && isAcreage !== "Tất cả") {
      const { min, max } = getAcreageRangeValues(isAcreage);
      if (min !== null) params.areaMin = min;
      if (max !== null) params.areaMax = max;
    }

    // Add utilities if selected
    if (isCharacteristics && isCharacteristics.length > 0) {
      params.utilities = isCharacteristics.join(",");
    }

    // Update URL with query params
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });

    // Navigate to the filtered page
    navigate({
      pathname: path,
      search: searchParams.toString(),
    });

    // Close filter modal
    setFillerVisible(false);
  };

  const handleApplyFilter = () => {
    applyFilters();
  };

  return (
    <Layout.Header
      style={{
        background: "rgb(255, 248, 238)",
        height: "auto",
        paddingTop: "10px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: " 100%",
      }}
    >
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <a href="/">
              <img src="/logo.png" alt="logo" />
            </a>
          </div>
          <div>
            <Input
              prefix={
                <EnvironmentOutlined
                  style={{ color: selectedProvince ? "red" : "gray" }}
                />
              }
              value={locationText}
              onClick={() => setVisible(true)}
              readOnly
              className="search"
              style={{
                borderRadius: "30px",
                padding: "6px 16px",
                background: "white",
                cursor: "pointer",
                color: selectedProvince ? "red" : "black",
                fontWeight: selectedProvince ? "bold" : "normal",
              }}
            />
            <SearchModal
              visible={visible}
              setVisible={setVisible}
              provinces={provinces}
              districts={districts}
              wards={wards}
              selectedProvince={selectedProvince}
              selectedDistrict={selectedDistrict}
              selectedWard={selectedWard}
              handleProvinceChange={handleProvinceChange}
              handleDistrictChange={handleDistrictChange}
              handleWardChange={handleWardChange}
              handleConfirm={handleConfirm}
              onCancel={() => setVisible(false)}
            />
          </div>
          <div className="filter" style={{ display: "flex" }}>
            <Input.Search
              placeholder="Tìm kiếm theo từ khóa..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onSearch={applyFilters}
              style={{ width: "170px", marginRight: "8px" }}
            />
            <Button onClick={() => setFillerVisible(true)}>
              <FilterOutlined />
              <span>Filter</span>
            </Button>
            <FilterModal
              isFilterVisible={isFilterVisible}
              setFillerVisible={setFillerVisible}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleProvinceChange={handleProvinceChange}
              handleDistrictChange={handleDistrictChange}
              handleWardChange={handleWardChange}
              provinces={provinces}
              districts={districts}
              wards={wards}
              selectedProvince={selectedProvince}
              selectedDistrict={selectedDistrict}
              selectedWard={selectedWard}
              priceRanges={priceRanges}
              acreages={acreages}
              utilities={utilities}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              isAcreage={isAcreage}
              setIsAcreage={setIsAcreage}
              isCharacteristics={isCharacteristics}
              setIsCharacteristics={setIsCharacteristics}
              onOk={handleApplyFilter}
            />
          </div>
        </div>
        <div className="header-right">
          <div>
            <a className="manage" href="/quan-ly/danh-sach-tin-dang">
              Quản lý
            </a>
          </div>
          <div className="user">
            <User />
          </div>
          <div style={{ display: "flex" }}>
            <Button className="post" href="/quan-ly/dang-bai-moi">
              <CloudUploadOutlined />
              <span>Đăng bài</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="menu">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          className="main-menu"
          onClick={(e) => navigate(e.key)}
          items={menuItems.map((item) => ({
            key: item.path,
            label: item.label,
          }))}
        />
      </div>
    </Layout.Header>
  );
};

export default DefaultHeader;
