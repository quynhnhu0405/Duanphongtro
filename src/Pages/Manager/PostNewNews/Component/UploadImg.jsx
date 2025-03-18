import { Card } from "antd";
import { useState } from "react";

const ImageUpload = ({ onValidate }) => {
  const [images, setImages] = useState([]);

  const ImgLimit = (files) => {
    if (files.length + images.length > 20) {
      alert("Bạn chỉ được tải lên tối đa 20 ảnh");
      return false;
    }
    return true;
  };

  const SizeLimit = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      alert(`Ảnh ${file.name} vượt quá 10MB`);
      return false;
    }
    return true;
  };

  const updateValidation = (newImages) => {
    onValidate(newImages.length >= 4);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!ImgLimit(files)) return;

    const validFiles = files.filter(SizeLimit);
    if (validFiles.length === 0) return;

    Promise.all(
      validFiles.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((newImages) => {
      setImages((prev) => {
        const updatedImages = [...prev, ...newImages];
        updateValidation(updatedImages);
        return updatedImages;
      });
    });
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      updateValidation(updatedImages);
      return updatedImages;
    });
  };

  return (
    <div className="!mt-6">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-[0_1px_5px_rgba(0,0,0,0.3)] !p-4">
        <div className="text-xl font-black mb-4">Hình ảnh</div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
          <label
            htmlFor="image-upload"
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
          >
            Chọn ảnh
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <p className="mt-2 text-sm text-gray-500">
            Tải lên tối đa 20 ảnh, tối thiểu 4 ảnh, dung lượng mỗi ảnh tối đa 10MB
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`uploaded-${index}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {images.length < 4 && (
          <p className="mt-2 text-xs text-red-500">
            Vui lòng tải lên ít nhất 4 ảnh.
          </p>
        )}
      </Card>
    </div>
  );
};

export default ImageUpload;
