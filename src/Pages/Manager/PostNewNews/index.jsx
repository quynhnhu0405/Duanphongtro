import { useState, useCallback } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import Category from "./Component/Category";
import Address from "./Component/Address";
import Description from "./Component/Description";
import OutstandingFeatures from "./Component/OutstandingFeatures";
import ImageUpload from "./Component/UploadImg";
import Contact from "./Component/Contact";
import { useAuth } from "../../../Utils/AuthContext";

const PostNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get current user from context
  const [images, setImages] = useState([]);
  // Consolidated state for post data, mirroring PostSchema structure
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    price: null,
    area: null,
    category: { id: null, name: "" },
    location: { province: "", district: "", ward: "", street: "" },
    utilities: [],
    images: [],
    landlordId: currentUser?._id || "", // Get actual user ID from auth context
  });

  // Validation states
  const [validation, setValidation] = useState({
    category: false,
    address: false,
    title: false,
    description: false,
    price: false,
    area: false,
    images: false,
  });

  // Callback to update postData state from child components
  const handleDataChange = useCallback((field, value) => {
    setPostData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  // Callback to update validation state from child components
  const handleValidationChange = useCallback((field, isValid) => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      [field]: isValid,
    }));
  }, []);

  const handleSubmit = () => {
    // Perform validation based on the validation state
    if (!validation.category) {
      alert("Vui lòng chọn loại chuyên mục!");
      return;
    }
    if (!validation.address) {
      alert("Vui lòng nhập đầy đủ địa chỉ!");
      return;
    }
    if (!validation.title) {
      alert("Vui lòng nhập tiêu đề từ 30-100 ký tự!");
      return;
    }
    if (!validation.description) {
      alert("Vui lòng nhập mô tả từ 50-5000 ký tự!");
      return;
    }
    if (!validation.price) {
      alert("Vui lòng nhập giá thuê hợp lệ!");
      return;
    }
    if (!validation.area) {
      alert("Vui lòng nhập diện tích hợp lệ!");
      return;
    }
    if (images.length < 4) {
      console.log("images", images);
      alert("Vui lòng tải lên ít nhất 4 hình ảnh!");
      return;
    } else {
      // handleDataChange("images", images);
    }

    // Prepare final data with default values for missing fields
    const finalPostData = {
      ...postData,
      status: "waiting", // Set default status
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days from now
    };

    console.log("Navigating with state:", finalPostData);

    // Navigate and pass the postData object in state
    navigate(`${location.pathname.replace(/\/?$/, "")}/thanh-toan`, {
      state: { postData: finalPostData },
    });
  };

  return (
    <div>
      <div className="fixed w-full z-30 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.3)] top-[60px] pt-5 pb-5 pl-15">
        <h1 className="text-2xl font-bold">Đăng tin cho thuê</h1>
      </div>
      <div className="max-w-[900px] m-auto mt-30">
        <Category
          onCategoryChange={(category) =>
            handleDataChange("category", category)
          }
          onValidate={(isValid) => handleValidationChange("category", isValid)}
        />
        <Address
          onAddressChange={(location) => handleDataChange("location", location)}
          onValidate={(isValid) => handleValidationChange("address", isValid)}
        />
        <Description
          onDataChange={handleDataChange}
          onTitleValidate={(isValid) =>
            handleValidationChange("title", isValid)
          }
          onDescriptionValidate={(isValid) =>
            handleValidationChange("description", isValid)
          }
          onPriceValidate={(isValid) =>
            handleValidationChange("price", isValid)
          }
          onAreaValidate={(isValid) => handleValidationChange("area", isValid)}
        />
        <OutstandingFeatures
          onUtilitiesChange={(utilities) =>
            handleDataChange("utilities", utilities)
          }
        />
        <ImageUpload
          images={images}
          setImages={setImages}
          onValidate={(isValid) => handleValidationChange("images", isValid)}
        />
        <Contact />
        <Button
          className="w-full mt-10 !font-bold !text-base !p-5 !bg-red-600 !rounded-3xl"
          type="primary"
          danger
          onClick={handleSubmit}
        >
          Tiếp tục <ArrowRightOutlined className="ml-3" />
        </Button>
      </div>
    </div>
  );
};

export default PostNew;
