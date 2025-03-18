import { useState } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import Category from "./Component/Category";
import Address from "./Component/Address";
import Description from "./Component/Description";
import OutstandingFeatures from "./Component/OutstandingFeatures";
import ImageUpload from "./Component/UploadImg";
import Contact from "./Component/Contact";

const PostNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryValid, setCategoryValid] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [titleValid, setTitleValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [imageValid, setImageValid] = useState(false);


  const handleSubmit = () => { 
    if (!categoryValid) {
      alert("Vui lòng chọn loại chuyên mục!");
      return;
    }
    
    if (!addressValid) {
      alert("Vui lòng nhập đầy đủ địa chỉ!");
      return;
    }

    if (!titleValid) {
      alert("Vui lòng nhập tiêu đề từ 30-100 ký tự!");
      return;
    }

    if (!descriptionValid) {
      alert("Vui lòng nhập mô tả từ 50-5000 ký tự!");
      return;
    }
    if (!imageValid) {
      alert("Vui lòng tải lên ít nhất 4 hình ảnh!");
      return;
    }

  
    navigate(`${location.pathname.replace(/\/$/, "")}/thanh-toan`);
  };

  return (
    <div>
      <div className="fixed w-full z-30 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.3)] top-[60px] pt-5 pb-5 pl-15">
        <h1 className="text-2xl font-bold">Đăng tin cho thuê</h1>
      </div>
      <div className="max-w-[900px] m-auto mt-30">
        <Category onValidate={setCategoryValid} />
        <Address onValidate={setAddressValid} />
        <Description onTitleValidate={setTitleValid} onDescriptionValidate={setDescriptionValid} />
        <OutstandingFeatures />
        <ImageUpload onValidate={setImageValid}/>
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
