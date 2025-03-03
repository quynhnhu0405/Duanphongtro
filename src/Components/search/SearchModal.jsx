import { Modal, Select } from 'antd'
import React from 'react'

const SearchModal = ({visible,setVisible,provinces,districts,wards,selectedProvince,selectedDistrict,handleProvinceChange,handleDistrictChange,handleWardChange,handleConfirm}) => {
  return (
    <Modal title="Chọn khu vực" className="modal-search" open={visible} onCancel={() => setVisible(false)} onOk={handleConfirm} okText="Tìm kiếm" cancelText="Hủy">
                <Select
                  placeholder="Chọn tỉnh/thành phố"
                  onChange={handleProvinceChange}
                  className="custom-modal"
                  style={{ width: "100%", marginBottom: "10px" }}
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
                  style={{ width: "100%", marginBottom: "10px" }}
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
                  style={{ width: "100%" }}
                  disabled={!selectedDistrict}
                >
                  {wards.map((ward) => (
                    <Select.Option key={ward.code} value={ward.code}>
                      {ward.name}
                    </Select.Option>
                  ))}
                </Select>
              </Modal>
  )
}

export default SearchModal
