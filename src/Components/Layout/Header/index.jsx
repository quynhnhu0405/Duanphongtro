import {  CloudUploadOutlined, FilterOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Menu,  } from "antd";
import  { useEffect, useState } from "react";
import FilterModal from "../../Filter/FilterModal";
import SearchModal from "../../search/SearchModal";
import { useLocation, useNavigate } from "react-router";
import User from "./User";


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
  const navigate = useNavigate();
  const location = useLocation();

  const categories = ["Phòng trọ", "Căn hộ chung cư","Ở ghép"];
  const priceRanges = ["Tất cả", "Dưới 1 triệu", "1 - 2 triệu", "2 - 3 triệu", "3 - 5 triệu", "5 - 7 triệu", "7 - 10 triệu", "10 - 15 triệu", "Trên 15 triệu"];
  const acreages = ["Tất cả", "Dưới 20m²", "20m² - 30m²", "30m² - 50m²", "50m² - 70m²", "70m² - 90m²", "Trên 90m²"];
  const characteristics = ["Đầy đủ nội thất", "Có gác", "Có bếp", "Có tủ lạnh","Có máy lạnh", "Có máy giặt","Không chung chủ","Có thang máy", "Giờ giấc tự do", "Có hầm để xe","Có bảo vệ 24/24", "Có ban công"];
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

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
    if (selectedProvince && selectedDistrict && selectedWard) {
      setLocationText(`${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`);
    }
    setVisible(false);
  };

  return (
      <Layout.Header style={{ background: "rgb(255, 248, 238)", height: "auto", paddingTop: "10px", position:"sticky", top: 0, zIndex: 1000, width:" 100%" }}>
        <div className="header">
          <div className="header-left">
            <div className="logo">
              <a href="/"><img src="./src/assets/logo.png" alt="logo"  /></a>
            </div>
            <div>
              <Input
                prefix={<EnvironmentOutlined style={{ color: selectedProvince ? "red" : "gray" }} />}
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
            <div className="filter" style={{ display: "flex"}}>
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
                characteristics={characteristics}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                isAcreage={isAcreage}
                setIsAcreage={setIsAcreage}
                isCharacteristics={isCharacteristics}
                setIsCharacteristics={setIsCharacteristics}
              />
            </div>
          </div>
          <div className="header-right">
            <div>
              <a className="manage" href="/quan-ly/tin-dang">Quản lý</a>
            </div>
            <div className="user">
              <User/>
            </div>
            <div style={{ display: "flex"}}>
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
