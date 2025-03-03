import { Button, Modal, Select, Space } from 'antd'
import React from 'react'

export default function FilterModal({isFilterVisible, setFillerVisible, categories, selectedCategory, setSelectedCategory, handleProvinceChange, handleDistrictChange,handleWardChange, provinces, districts, wards, selectedProvince, selectedDistrict, priceRanges,acreages, characteristics, selectedPrice, setSelectedPrice, isAcreage, setIsAcreage, isCharacteristics, setIsCharacteristics}) {
  return (
    <Modal title="Bộ lọc" open={isFilterVisible} onCancel={() => setFillerVisible(false) } okText="Áp dụng" cancelText="Hủy">
                <h3>Danh mục cho thuê</h3>
                <Space wrap>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      type={selectedCategory === category ? "primary" : "default"}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </Space>
                <h3>Khu vực</h3>
                <div className="filter-location">
                  <Select
                    placeholder="Chọn tỉnh/thành phố"
                    onChange={handleProvinceChange}
                    className="custom-modal"
                    style={{ width: "30%"}}
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
                  {characteristics.map((characteristic) => (
                    <Button
                      key={characteristic}
                      type={isCharacteristics.includes(characteristic) ? "primary" : "default"}
                      onClick={() => setIsCharacteristics((prev)=>[...prev,characteristic])}
                    >
                      {characteristic}
                    </Button>
                  ))}
                </Space>
              </Modal>
  )
}
