import { Card, Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const Address = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [street, setStreet] = useState("");
  const [displayProvince, setDisplayProvince] = useState("");
  const [displayDistrict, setDisplayDistrict] = useState("");
  const [displayWard, setDisplayWard] = useState("");
  const [displayStreet, setDisplayStreet] = useState("");
  const [buttonText, setButtonText] = useState("Địa chỉ");

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvinceCode = e.target.value;
    const selectedProvince = provinces.find(
      (province) => province.code === parseInt(selectedProvinceCode)
    );
    setSelectedProvince(selectedProvince);
    setDistricts(selectedProvince?.districts || []);
    setSelectedDistrict(null);
    setWards([]);
    setSelectedWard(null);
    setDisplayProvince(selectedProvince?.name || "");
    setDisplayDistrict("");
    setDisplayWard("");
    setDisplayStreet("");
    setButtonText(selectedProvince?.name || "Địa chỉ");
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictCode = e.target.value;
    const district = districts.find(
      (d) => d.code === parseInt(selectedDistrictCode)
    );
    setSelectedDistrict(district);
    setWards(district?.wards || []);
    setSelectedWard(null);
    setDisplayDistrict(district?.name || "");
    setDisplayWard("");
    setDisplayStreet("");
    setButtonText(`${district?.name}, ${selectedProvince?.name}` || "Địa chỉ");
  };

  const handleWardChange = (e) => {
    const selectedWardCode = e.target.value;
    const ward = wards.find((w) => w.code === parseInt(selectedWardCode));
    setSelectedWard(ward);
    setDisplayWard(ward?.name || "");
    setDisplayStreet("");
    setButtonText(
      `${ward?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}` ||
        "Địa chỉ"
    );
  };

  const handleStreet = (e) => {
    setStreet(e.target.value);
    setDisplayStreet(e.target.value);
    setButtonText(
      `${e.target.value}, ${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}` ||
        "Địa chỉ"
    );
  };

  return (
    <div className="!mb-6 ">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-[0_1px_5px_rgba(0,0,0,0.3)]">
        <div className="text-xl font-black mb-3">Khu vực</div>
        <div>
          <Row>
            <Col xs={24} sm={12} md={12} lg={12} className="pr-2 mt-2">
              <div className="mb-3"></div>
              <label
                className="form-label mb-1 d-block text-base"
                htmlFor="tinh"
              >
                Tỉnh/Thành phố <span className="text-red-500">(*)</span>
              </label>
              <br />
              <select
                placeholder="Chọn tỉnh/thành phố"
                onChange={handleProvinceChange}
                className="p-3 mt-3 w-full border border-gray-300 rounded-2xl focus:border-black focus:border-1"
                value={selectedProvince?.code}
              >
                <option value="" selected="">
                  -- Chọn tỉnh --
                </option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
              <div className="text-red-500 text-sm ml-2"></div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} className="pl-2 mt-2">
              <div className="mb-3"></div>
              <label
                className="form-label mb-1 d-block text-base"
                htmlFor="huyen"
              >
                Chọn quận/huyện <span className="text-red-500">(*)</span>
              </label>
              <br />
              <select
                placeholder="Chọn quận/huyện"
                onChange={handleDistrictChange}
                className="p-3 mt-3 w-full border border-gray-300 rounded-2xl focus:border-black focus:border-1"
                disabled={!selectedProvince}
                value={selectedDistrict?.code}
              >
                <option value="" selected="">
                  -- Chọn quận/huyện --
                </option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
              <div className="text-red-500 text-sm ml-2"></div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} className="pr-2 mt-3">
              <div className="mb-3"></div>
              <label className="form-label mb-1 d-block text-base" htmlFor="xa">
                Chọn phường/xã <span className="text-red-500">(*)</span>
              </label>
              <br />
              <select
                placeholder="Chọn phường/xã"
                onChange={handleWardChange}
                className="p-3 mt-3 w-full border border-gray-300 rounded-2xl focus:border-black focus:border-1"
                disabled={!selectedDistrict}
                value={selectedWard?.code}
              >
                <option value="" selected="">
                  -- Chọn phường/xã --
                </option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
              <div className="text-red-500 text-sm ml-2"></div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} className="pl-2 mt-3">
              <div className="mb-3"></div>
              <label className="form-label mb-1 d-block text-base" htmlFor="xa">
                Địa chỉ cụ thể <span className="text-red-500">(*)</span>
              </label>
              <br />
              <input
                type="text"
                id="street"
                className="p-3 mt-3 w-full border border-gray-300 rounded-2xl focus:border-black focus:border-1"
                placeholder="Nhập tên đường/phố"
                onChange={handleStreet}
                value={street}
              ></input>
              <div className="text-red-500 text-sm ml-2"></div>
            </Col>
          </Row>
          <div className="mt-3">
            <label className="form-label mb-1 d-block text-base">
              Địa chỉ
            </label>
            <button
              type="text"
              id="street"
              className="p-3 mt-3 w-full border text-[15px] text-left bg-gray-100 border-gray-300 rounded-2xl  focus:border-black focus:border-1"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Address;
