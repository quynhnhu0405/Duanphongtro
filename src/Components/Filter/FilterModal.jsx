import { Button, Modal, Select, Space } from "antd";
import React from "react";

export default function FilterModal({
  isFilterVisible,
  setFillerVisible,
  categories,
  selectedCategory,
  setSelectedCategory,
  handleProvinceChange,
  handleDistrictChange,
  handleWardChange,
  provinces,
  districts,
  wards,
  selectedProvince,
  selectedDistrict,
  selectedWard,
  priceRanges,
  acreages,
  utilities,
  selectedPrice,
  setSelectedPrice,
  isAcreage,
  setIsAcreage,
  isCharacteristics,
  setIsCharacteristics,
  onOk,
}) {
  const handleOk = () => {
    if (onOk) {
      onOk();
    } else {
      setFillerVisible(false);
    }
  };

  return (
    <Modal
      title="Bộ lọc"
      className="modal-filter"
      open={isFilterVisible}
      onCancel={() => setFillerVisible(false)}
      onOk={handleOk}
      okText="Áp dụng"
      cancelText="Hủy"
    >
      <h3>Danh mục cho thuê</h3>
      <Space wrap>
        {categories.length>0 &&categories.map((category) => (
          <Button
            key={category._id}
            type={selectedCategory === category.name ? "primary" : "default"}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </Space>
      <h3>Khu vực</h3>
      <div className="filter-location">
        <Select
          placeholder="Chọn tỉnh/thành phố"
          onChange={handleProvinceChange}
          className="custom-modal"
          style={{ width: "30%" }}
          value={selectedProvince?.code}
        >
          {provinces.map((province) => (
            <Select.Option key={province.code} value={province.code}>
              {province.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Chọn quận/huyện"
          onChange={handleDistrictChange}
          style={{ width: "30%" }}
          disabled={!selectedProvince}
          value={selectedDistrict?.code}
        >
          {districts.map((district) => (
            <Select.Option key={district.code} value={district.code}>
              {district.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Chọn xã/phường"
          onChange={handleWardChange}
          style={{ width: "30%" }}
          disabled={!selectedDistrict}
          value={selectedWard?.code}
        >
          {wards.map((ward) => (
            <Select.Option key={ward.code} value={ward.code}>
              {ward.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <h3>Khoảng giá</h3>
      <Space wrap>
        {priceRanges.map((price) => (
          <Button
            key={price}
            type={selectedPrice === price ? "primary" : "default"}
            onClick={() => setSelectedPrice(price)}
          >
            {price}
          </Button>
        ))}
      </Space>
      <h3>Diện tích</h3>
      <Space wrap>
        {acreages.map((acreage) => (
          <Button
            key={acreage}
            type={isAcreage === acreage ? "primary" : "default"}
            onClick={() => setIsAcreage(acreage)}
          >
            {acreage}
          </Button>
        ))}
      </Space>
      <h3>Đặc điểm nổi bật</h3>
      <Space wrap>
        {utilities?.map((utility) => (
          <Button
            key={utility._id}
            type={
              isCharacteristics.includes(utility.name) ? "primary" : "default"
            }
            onClick={() => {
              if (isCharacteristics.includes(utility.name)) {
                setIsCharacteristics((prev) =>
                  prev.filter((name) => name !== utility.name)
                );
              } else {
                setIsCharacteristics((prev) => [...prev, utility.name]);
              }
            }}
          >
            {utility.name}
          </Button>
        ))}
      </Space>
    </Modal>
  );
}
