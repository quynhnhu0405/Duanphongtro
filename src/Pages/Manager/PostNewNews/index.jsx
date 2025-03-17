
import Category from "./Component/Category";
import Address from "./Component/Address";
import Description from "./Component/Description";
import OutstandingFeatures from "./Component/OutstandingFeatures";
import ImageUpload from "./Component/UploadImg";
import Contact from "./Component/Contact";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const item = [
  {
    key: "1",
    label: "Khu vực",
    id: "khu-vuc",
  },
  {
    key: "2",
    label: "Thông tin mô tả",
    id: "mo-ta",
  },
  {
    key: "3",
    label: "Hình ảnh",
    id: "hinh-anh",
  },
  {
    key: "4",
    label: "Thông tin liên hệ",
    id: "lien-he",
  },
];

const PostNew = () => {

  return (
    <div>
      <div className="fixed w-full z-30 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.3)] top-[60px]  pt-5 pb-5 pl-15">
        <h1 className="text-2xl font-bold">Đăng tin cho thuê</h1>
      </div>
      <div className=" max-w-[900px] m-auto mt-30">
        <Category />
        <Address/>
        <Description/>
        <OutstandingFeatures/>
        <ImageUpload/>
        < Contact/>
        <Button className="w-full mt-10 !font-bold !text-base !p-5 !bg-red-600 !rounded-3xl" type="primary" danger >
          Tiếp tục <ArrowRightOutlined className="ml-3" />
        </Button>
      </div>
    </div>
  );
};

export default PostNew;
