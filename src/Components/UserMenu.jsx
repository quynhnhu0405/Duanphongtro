import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  PlusOutlined,
  FileTextOutlined,
  SettingOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Popover, Space } from "antd";
import { Link } from "react-router";
import { useAuth } from "../Utils/AuthContext";
import { useState } from "react";

const UserMenu = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const getItems = () => {
    if (isAuthenticated()) {
      const items = [
        {
          key: "profile",
          icon: <ProfileOutlined />,
          label: (
            <Link to="/quan-ly/quan-ly-tai-khoan">Thông tin tài khoản</Link>
          ),
        },
        {
          key: "posts",
          icon: <FileTextOutlined />,
          label: <Link to="/quan-ly/danh-sach-tin-dang">Tin đã đăng</Link>,
        },
        {
          key: "new-post",
          icon: <PlusOutlined />,
          label: <Link to="/quan-ly/dang-bai-moi">Đăng tin mới</Link>,
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Đăng xuất",
          onClick: logout,
          danger: true,
        },
      ];

      // Add admin menu if user is admin
      if (isAdmin()) {
        items.splice(3, 0, {
          key: "admin",
          icon: <SettingOutlined />,
          label: <Link to="/admin">Quản trị viên</Link>,
        });
      }

      return items;
    }

    // Not authenticated
    return [
      {
        key: "login",
        icon: <LoginOutlined />,
        label: <Link to="/dang-nhap">Đăng nhập</Link>,
      },
      {
        key: "register",
        icon: <UserOutlined />,
        label: <Link to="/tao-tai-khoan-moi">Đăng ký</Link>,
      },
    ];
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
                />
              </div>

              {isAuthenticated() ? (
                <>
                  <div className="ml-6  text-black leading-4">
                    <p className="font-bold text-base">{user?.name}</p>
                    <p className="text-gray-600 text-sm">{user?.phone}</p>
                  </div>
                </>
              ) : (
                <span className="hidden sm:inline-block">Tài khoản</span>
              )}
            </div>
            <div>
              <Menu>
                {getItems().map((item) => {
                  if (item.type === "divider") {
                    return <Menu.Divider key={item.key} />;
                  }

                  return (
                    <Menu.Item
                      key={item.key}
                      icon={
                        <div className="bg-gray-50 p-2 rounded-4xl">
                          {item.icon}
                        </div>
                      }
                      danger={item.danger}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </div>
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={(open) => setOpen(open)}
      >
        <Space style={{ color: "white" }}>
          <Avatar src="https://random.imagecdn.app/500/150"></Avatar>
          <div className="w-[90px]">
            <span className="block w-full truncate">{user?.name || ""}</span>
          </div>
          <CaretDownOutlined />
        </Space>
      </Popover>
    </div>
  );
};

export default UserMenu;
