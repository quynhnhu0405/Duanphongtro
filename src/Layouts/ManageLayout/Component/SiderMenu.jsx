import { useState, useEffect } from "react";
import {
  FormOutlined,
  LogoutOutlined,
  ProfileOutlined,
  TagsOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Drawer, Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { useLocation } from "react-router";

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
              <div className="p-1 border border-gray-400 rounded-full">
                <Avatar
                  src="https://random.imagecdn.app/500/150"
                  className="!w-[60px] !h-[60px]"
                />
              </div>
              <div className="leading-5 ml-4">
                <p>Phucs</p>
                <p>0963767987</p>
                <p>Mã tài khoản: 123</p>
              </div>
            </div>
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
