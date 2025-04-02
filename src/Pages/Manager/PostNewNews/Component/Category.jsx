import { useState, useEffect } from "react";
import { Card, Radio, Space } from "antd";
import { categoryService } from "../../../../Utils/api";

const Category = ({ onCategoryChange, onValidate }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getAll();
        setCategories(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Call onValidate and onCategoryChange when selection changes
  useEffect(() => {
    const isValid = !!selectedCategoryId;
    onValidate(isValid);

    if (isValid) {
      const selectedCategory = categories.find(
        (cat) => cat._id === selectedCategoryId
      );
      onCategoryChange({
        id: selectedCategory._id,
        name: selectedCategory.name,
      });
    }
  }, [selectedCategoryId, categories]);

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  return (
    <Card className="bg-white w-full rounded-2xl mt-20 shadow-md">
      <div className="text-xl font-black mb-3">Chọn chuyên mục đăng tin</div>
      {loading ? (
        <div>Đang tải danh mục...</div>
      ) : (
        <Radio.Group onChange={handleCategoryChange} value={selectedCategoryId}>
          <Space direction="vertical">
            {categories.map((category) => (
              <Radio key={category._id} value={category._id}>
                {category.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      )}
    </Card>
  );
};

export default Category;
