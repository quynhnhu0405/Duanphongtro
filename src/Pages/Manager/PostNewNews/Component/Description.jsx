import { Card } from "antd";
import { useState } from "react";

const Description = () => {
  const [inputValue, setInputValue] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [description, setdescription] = useState("");
  const [descriptionCount, setdescriptionCount] = useState(0);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setCharCount(value.length);
  };

  const isInputValid = charCount >= 30 && charCount <= 100;

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setdescription(value);
    setdescriptionCount(value.length);
  };

  const isDescriptionValid = charCount >= 50 && charCount <= 5000;

  return (
    <div className="!mb-6 ">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-[0_1px_5px_rgba(0,0,0,0.3)] !p-4">
        <div className="text-xl font-black mb-3">Thông tin mô tả</div>
        <div>
          <p className="mb-2">
            Tiêu đề <span className="text-red-500">(*)</span>
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-2xl p-3 text-[15px]"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="mt-2 text-sm text-gray-600">
            {charCount}/100 (Tối thiểu 30 ký tự, tối đa 100 ký tự)
          </div>
          {!isInputValid && (
            <div className="mt-2 text-xs text-red-500 ">
              Vui lòng nhập từ 30 đến 100 ký tự.
            </div>
          )}
        </div>
        <div className="mt-5">
          <p className="mb-2">
            Nội dung mô tả <span className="text-red-500">(*)</span>
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-2xl p-3 h-40 text-[15px]"
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className="mt-2 text-sm text-gray-600">
            {descriptionCount}/5000 (Tối thiểu 50 ký tự, tối đa 5000 ký tự)
          </div>
          {!isDescriptionValid && (
            <div className="mt-2 text-xs text-red-500 ">
              Vui lòng nhập từ 50 đến 5000 ký tự.
            </div>
          )}
        </div>
        <div className="mt-5">
          <p className="mb-2">
            Giá cho thuê<span className="text-red-500">(*)</span>
          </p>
          <div className="flex">
            <input
              className="w-1/3 border border-gray-300 rounded-l-2xl p-3 text-[15px]"
              type="number"
            />
            <div className="w-1/5 border border-gray-300 rounded-r-2xl text-center p-3 text-[15px]">
              triệu/tháng
            </div>
          </div>
          <div className="mt-2 text-xs text-red-500 ">
            Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000
          </div>
        </div>
        <div className="mt-5">
          <p className="mb-2">
            Diện tích<span className="text-red-500">(*)</span>
          </p>
          <div className="flex">
            <input
              className="w-1/3 border border-gray-300 rounded-l-2xl p-3 text-[15px]"
              type="number"
            />
            <div className="w-1/5 border border-gray-300 rounded-r-2xl text-center p-3 text-[15px]">
              m <sup>2</sup>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Description;
