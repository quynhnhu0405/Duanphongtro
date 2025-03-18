import { Card } from "antd";
import { useEffect, useState } from "react";

const Description = ({ onTitleValidate, onDescriptionValidate }) => {
  const [title, setTitle] = useState("");
  const [titleCount, setTitleCount] = useState(0);
  const [description, setDescription] = useState("");
  const [descriptionCount, setDescriptionCount] = useState(0);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setTitleCount(value.length);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    setDescriptionCount(value.length);
  };

  // Kiểm tra hợp lệ từng phần riêng lẻ
  const validateTitle = () => titleCount >= 30 && titleCount <= 100;
  const validateDescription = () => descriptionCount >= 50 && descriptionCount <= 5000;

  // Cập nhật state hợp lệ để `PostNew.js` kiểm tra
  useEffect(() => {
    onTitleValidate(validateTitle());
  }, [title]);

  useEffect(() => {
    onDescriptionValidate(validateDescription());
  }, [description]);

  return (
    <div className="!mb-6">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-[0_1px_5px_rgba(0,0,0,0.3)] !p-4">
        <div className="text-xl font-black mb-3">Thông tin mô tả</div>
        
        {/* Tiêu đề */}
        <div>
          <p className="mb-2">
            Tiêu đề <span className="text-red-500">(*)</span>
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-2xl p-3 text-[15px]"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="mt-2 text-sm text-gray-600">
            {titleCount}/100 (Tối thiểu 30 ký tự, tối đa 100 ký tự)
          </div>
          {!validateTitle() && (
            <div className="mt-2 text-xs text-red-500">
              Vui lòng nhập từ 30 đến 100 ký tự.
            </div>
          )}
        </div>

        {/* Nội dung mô tả */}
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
          {!validateDescription() && (
            <div className="mt-2 text-xs text-red-500">
              Vui lòng nhập từ 50 đến 5000 ký tự.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Description;
