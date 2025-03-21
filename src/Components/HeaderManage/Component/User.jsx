import { useState } from "react";
import { Avatar, Popover, Space } from "antd";
import {
  CaretDownOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  EyeInvisibleOutlined,
  FolderOpenOutlined,
  LogoutOutlined,
  TagsOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
const User = () => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  localStorage.setItem("userName", "Phúc láo");
  localStorage.setItem("phone", "0123456789");
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <div>
      <Popover
        content={
          <div className="w-[350px] p-2 popover-user">
            <div className="flex items-center mb-4 border-b border-b-gray-300 pb-3 ">
              <div className="w-[50px] h-[50px] p-1 border rounded-4xl">
                <img
                  src="https://random.imagecdn.app/500/150"
                  className="w-full h-full rounded-4xl "
                ></img>
              </div>

              <div className="ml-6  text-black leading-4">
                <p className="font-bold text-base">
                  {localStorage.getItem("userName")}
                </p>
                <p className="text-gray-600 text-sm">
                  {localStorage.getItem("phone")}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <p className="text-xs text-gray-700 font-bold">
                  QUẢN LÝ TIN ĐĂNG
                </p>
                <a href="" className="text-xs underline">
                  Xem tất cả
                </a>
              </div>
              <div className="flex justify-between text-center p-3 bg-gray-100 rounded-2xl mb-4">
                <a href="" className="text-black font-bold">
                  <FolderOpenOutlined style={{ fontSize: "20px" }} /> <br />
                  Tất cả
                </a>
                <br />
                <a href="" className="text-black font-bold">
                  <CheckCircleOutlined style={{ fontSize: "20px" }} /> <br />
                  Đang hiển thị
                </a>
                <br />
                <a href="" className="text-black font-bold">
                  <WarningOutlined style={{ fontSize: "20px" }} /> <br />
                  Hết hạn
                </a>
                <br />
                <a href="" className="text-black font-bold">
                  <EyeInvisibleOutlined style={{ fontSize: "20px" }} /> <br />
                  Bị ẩn
                </a>
                <br />
              </div>
              <div className="leading-12">
                <a className="text-black" href="bang-gia">
                  <TagsOutlined className="icon" /> Bảng giá dịch vụ
                </a>
                <br />
                <a className="text-black" href="quan-ly-tai-khoan">
                  <UserOutlined className="icon" /> Quản lý tài khoản
                </a>
                <br />
                <a className="text-black">
                  <LogoutOutlined className="icon" /> Đăng xuất
                </a>
                <br />
              </div>
            </div>
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Space style={{ color: "white" }}>
          <Avatar src="https://random.imagecdn.app/500/150"></Avatar>
          <span className="text-white">Admin</span>
          <CaretDownOutlined style={{ color:"white"}}/>
        </Space>
      </Popover>
    </div>
  );
};

export default User;
