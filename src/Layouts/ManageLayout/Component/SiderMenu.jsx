import { useState, useEffect } from "react";
import {
  FormOutlined,
  LogoutOutlined,
  ProfileOutlined,
  TagsOutlined,
  UserOutlined,
  MenuOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Drawer, Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../Utils/AuthContext";

const items = [
  {
    label: "Đăng tin mới",
    key: "/quan-ly/dang-bai-moi",
    icon: <FormOutlined />,
    path: "/quan-ly/dang-bai-moi",
  },
  {
    label: "Danh sách tin đăng",
    key: "/quan-ly/danh-sach-tin-dang",
    icon: <ProfileOutlined />,
    path: "/quan-ly/danh-sach-tin-dang",
  },
  {
    label: "Lịch sử thanh toán",
    key: "/quan-ly/lich-su-thanh-toan",
    icon: <PayCircleOutlined />,
    path: "/quan-ly/lich-su-thanh-toan",
  },
  {
    label: "Bảng giá dịch vụ",
    key: "/bang-gia",
    icon: <TagsOutlined />,
    path: "/bang-gia",
  },
  {
    label: "Quản lý tài khoản",
    key: "/quan-ly/quan-ly-tai-khoan",
    icon: <UserOutlined />,
    path: "/quan-ly/quan-ly-tai-khoan",
  },
];

const SiderMenu = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { user} = useAuth();
  const nav = useNavigate();
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 1220);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div>
      {isMobile && (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          style={{ margin: "16px" }}
        >
          Danh mục
        </Button>
      )}

      {!isMobile && (
        <div
          className="fixed shadow-[1px_0_5px_rgba(0,0,0,0.3)] bg-white z-40"
          style={{ minHeight: "calc(100vh - 60px)" }}
        >
          <Sider className="manager-sider h-full">
            <div className="border-b border-b-gray-300 p-4 flex items-center">
              <div className="w-fit m-auto p-1 border border-black rounded-full">
              <Avatar className="!w-15 !h-15" src={user?.avatar || "/defaul-avt.png"}></Avatar>
              </div>
              <div className="leading-5 ml-2">
                <p>{user?.name}</p>
                <p>{user?.phone}</p>
              </div>
            </div>
            <Menu mode="vertical" selectedKeys={[location.pathname]}>
              {items.map((item) => (
                <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={() => nav(item.path)}
              >
                {item.label}
              </Menu.Item>
              ))} 
              <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
                Đăng xuất
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
      )}

      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
        width={250}
      >
        <Menu mode="vertical" selectedKeys={[location.pathname]}>
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <a href={item.path}>{item.label}</a>
            </Menu.Item>
          ))}
          <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Drawer>
    </div>
  );
};

export default SiderMenu;
