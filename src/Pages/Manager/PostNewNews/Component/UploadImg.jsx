import { Card } from "antd";
import { useState } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const ImgLimit = (files, images) => {
    if (files.length + images.length > 20) {
      alert("Bạn chỉ được tải lên tối đa 20 ảnh");
      return false;
    }
    return true;
  };
  const SizeLimit = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("Ảnh không được vượt quá 10MB");
      return false;
    }
    return true;
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!ImgLimit(files, images)) {
      return;
    }
    if (!SizeLimit(files)) {
      return;
    }
    const newImages = [];
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        if (newImages.length === files.length) {
          setImages([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Xóa ảnh
  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="!mt-6 ">
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
            Tải lên tối đa 20 ảnh, dung lượng mỗi ảnh tối đa 10MB
          </p>
        </div>

        <div className="text-sm mt-3">
          <p>
            • Hình ảnh phải liên quan đến phòng trọ, nhà cho thuê 
          </p>
          <p>
          • Không chèn văn bản, số điện thoại lên ảnh
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
      </Card>
    </div>
  );
};

export default ImageUpload;
