import { Card, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";

const { TextArea } = Input;

const Description = ({
  onDataChange,
  onTitleValidate,
  onDescriptionValidate,
  onPriceValidate,
  onAreaValidate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [area, setArea] = useState(null);

  // Validate title
  useEffect(() => {
    const isValid = title.length >= 30 && title.length <= 100;
    onTitleValidate(isValid);

    if (isValid) {
      onDataChange("title", title);
    }
  }, [title]);

  // Validate description
  useEffect(() => {
    const isValid = description.length >= 50 && description.length <= 5000;
    onDescriptionValidate(isValid);

    if (isValid) {
      onDataChange("description", description);
    }
  }, [description]);

  // Validate price
  useEffect(() => {
    const isValid = price && price > 0;
    onPriceValidate(isValid);

    if (isValid) {
      onDataChange("price", price);
    }
  }, [price]);

  // Validate area
  useEffect(() => {
    const isValid = area && area > 0;
    onAreaValidate(isValid);

    if (isValid) {
      onDataChange("area", area);
    }
  }, [area]);

  return (
    <Card className="bg-white w-full rounded-2xl mt-6 shadow-md">
      <div className="text-xl font-black mb-3">Thông tin mô tả</div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Tiêu đề <span className="text-red-500">(*)</span>
        </label>
        <Input
          placeholder="Nhập tiêu đề tin đăng (30-100 ký tự)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2"
        />
        <div className="text-xs text-gray-500 mt-1">
          {title.length}/100 ký tự (tối thiểu 30 ký tự)
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Giá cho thuê (VNĐ/tháng) <span className="text-red-500">(*)</span>
        </label>
        <InputNumber
          placeholder="Nhập giá cho thuê"
          value={price}
          onChange={(value) => setPrice(value)}
          className="w-full p-2"
          min={0}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Diện tích (m²) <span className="text-red-500">(*)</span>
        </label>
        <InputNumber
          placeholder="Nhập diện tích (m²)"
          value={area}
          onChange={(value) => setArea(value)}
          className="w-full p-2"
          min={0}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Mô tả <span className="text-red-500">(*)</span>
        </label>
        <TextArea
          placeholder="Nhập mô tả chi tiết (50-5000 ký tự)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full p-2"
        />
        <div className="text-xs text-gray-500 mt-1">
          {description.length}/5000 ký tự (tối thiểu 50 ký tự)
        </div>
      </div>
    </Card>
  );
};

export default Description;
