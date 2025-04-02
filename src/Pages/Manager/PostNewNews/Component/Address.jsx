import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";

const Address = ({ onValidate, onAddressChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [street, setStreet] = useState("");

  const [buttonText, setButtonText] = useState("Địa chỉ");

  const TARGET_PROVINCES = [
    "Thành phố Hà Nội",
    "Thành phố Hồ Chí Minh",
    "Tỉnh Bình Dương",
    "Thành phố Đà Nẵng",
  ];

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((response) => response.json())
      .then((data) => {
        const targetProvinces = data.filter((province) =>
          TARGET_PROVINCES.includes(province.name)
        );
        setProvinces(targetProvinces);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleProvinceChange = (e) => {
    const selectedProvinceCode = parseInt(e.target.value);
    const province = provinces.find((p) => p.code === selectedProvinceCode);
    onAddressChange({ province: province.name });
    setSelectedProvince(province);
    setDistricts(province?.districts || []);
    setSelectedDistrict(null);
    setWards([]);
    setSelectedWard(null);
    setStreet("");
    updateButtonText(province?.name || "");
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictCode = parseInt(e.target.value);
    const district = districts.find((d) => d.code === selectedDistrictCode);
    setSelectedDistrict(district);
    setWards(district?.wards || []);
    setSelectedWard(null);
    setStreet("");
    updateButtonText(district?.name, selectedProvince?.name);
    onAddressChange({
      province: selectedProvince.name,
      district: district.name,
    });
  };

  const handleWardChange = (e) => {
    const selectedWardCode = parseInt(e.target.value);
    const ward = wards.find((w) => w.code === selectedWardCode);
    setSelectedWard(ward);
    setStreet("");
    updateButtonText(
      ward?.name,
      selectedDistrict?.name,
      selectedProvince?.name
    );
    onAddressChange({
      province: selectedProvince.name,
      district: selectedDistrict.name,
      ward: ward.name,
    });
  };

  const handleStreetChange = (e) => {
    const streetName = e.target.value;
    setStreet(streetName);
    updateButtonText(
      streetName,
      selectedWard?.name,
      selectedDistrict?.name,
      selectedProvince?.name
    );
    onAddressChange({
      province: selectedProvince.name,
      district: selectedDistrict.name,
      ward: selectedWard.name,
      street: streetName,
    });
  };

  const updateButtonText = (
    street = "",
    ward = "",
    district = "",
    province = ""
  ) => {
    const addressParts = [street, ward, district, province].filter(Boolean);
    setButtonText(
      addressParts.length > 0 ? addressParts.join(", ") : "Địa chỉ"
    );
  };

  const validateAddress = () => {
    if (
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !street.trim()
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (onValidate) {
      onValidate(validateAddress());
    }
  }, [selectedProvince, selectedDistrict, selectedWard, street]);

  return (
    <div className="!mb-6">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-md">
        <div className="text-xl font-black mb-3">Khu vực</div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <label className="font-medium">
              Tỉnh/Thành phố <span className="text-red-500">(*)</span>
            </label>
            <select
              className="p-3 mt-2 w-full border border-gray-300 rounded-lg"
              onChange={handleProvinceChange}
              value={selectedProvince?.code || ""}
            >
              <option value="">-- Chọn tỉnh --</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </Col>
          <Col xs={24} sm={12}>
            <label className="font-medium">
              Quận/Huyện <span className="text-red-500">(*)</span>
            </label>
            <select
              className="p-3 mt-2 w-full border border-gray-300 rounded-lg"
              onChange={handleDistrictChange}
              value={selectedDistrict?.code || ""}
              disabled={!selectedProvince}
            >
              <option value="">-- Chọn quận/huyện --</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </Col>
          <Col xs={24} sm={12}>
            <label className="font-medium">
              Phường/Xã <span className="text-red-500">(*)</span>
            </label>
            <select
              className="p-3 mt-2 w-full border border-gray-300 rounded-lg"
              onChange={handleWardChange}
              value={selectedWard?.code || ""}
              disabled={!selectedDistrict}
            >
              <option value="">-- Chọn phường/xã --</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </Col>
          <Col xs={24} sm={12}>
            <label className="font-medium">
              Địa chỉ cụ thể <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              className="p-3 mt-2 w-full border border-gray-300 rounded-lg"
              placeholder="Nhập tên đường"
              onChange={handleStreetChange}
              value={street}
            />
          </Col>
        </Row>
        <div className="mt-4">
          <label className="font-medium">Địa chỉ</label>
          <button
            type="button"
            className="p-3 mt-2 w-full border text-left bg-gray-100 border-gray-300 rounded-lg"
          >
            {buttonText}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Address;
