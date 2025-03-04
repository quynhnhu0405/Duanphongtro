import { CaretDownOutlined, CloudUploadOutlined, FilterOutlined, UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, Layout, Menu, Space } from "antd";
import  { useEffect, useState } from "react";
import FilterModal from "../../Filter/FilterModal";
import SearchModal from "../../search/SearchModal";


const menuItems = [
  { label: "Trang chủ", key: "1" },
  { label: "Phòng trọ", key: "2" },
  { label: "Chung cư", key: "3" },
  { label: "Ở ghép", key: "4" },
  { label: "Bảng giá đăng bài", key: "5" },
];

const userMenuItems = [
  { label: "1st menu item", key: "1", icon: <UserOutlined /> },
  { label: "2nd menu item", key: "2", icon: <UserOutlined /> },
  { label: "3rd menu item", key: "3", icon: <UserOutlined />, danger: true },
  { label: "4th menu item", key: "4", icon: <UserOutlined />, danger: true, disabled: true },
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


  const categories = ["Phòng trọ", "Nhà riêng", "Ở ghép", "Mặt bằng", "Căn hộ chung cư", "Căn hộ mini", "Căn hộ dịch vụ"];
  const priceRanges = ["Tất cả", "Dưới 1 triệu", "1 - 2 triệu", "2 - 3 triệu", "3 - 5 triệu", "5 - 7 triệu", "7 - 10 triệu", "10 - 15 triệu", "Trên 15 triệu"];
  const acreages = ["Tất cả", "Dưới 20m2", "20m2 - 30m2", "30m2 - 50m2", "50m2 - 70m2", "70m2 - 90m2", "Trên 90m2"];
  const characteristics = ["Đầy đủ nội thất", "Có gác", "Có bếp", "Có tủ lạnh","Có máy lạnh", "Có máy giặt","Không chung chủ","Có thang máy", "Giờ giấc tự do", "Có hầm để xe"];
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  const handleProvinceChange = (value) => {
    console.log(value)
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
              <img src="./src/assets/logo.png" alt="logo" />
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
            <div className="filter" style={{ display: "flex", alignItems: "center" }}>
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
              <a className="manage">Quản lý</a>
            </div>
            <div className="user">
              <Dropdown trigger={["click"]} menu={{ items: userMenuItems }}>
                <Space style={{ color: "white" }}>
                  <Avatar src="https://random.imagecdn.app/500/150"></Avatar>
                  <span>Admin</span>
                  <CaretDownOutlined />
                </Space>
              </Dropdown>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button className="post">
                <CloudUploadOutlined />
                <span>Đăng bài</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="menu">
          <Menu mode="horizontal" items={menuItems} className="main-menu" />
        </div>
      </Layout.Header>
  );
};

export default DefaultHeader;
