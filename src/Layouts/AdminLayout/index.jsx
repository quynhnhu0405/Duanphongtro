import React from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Dropdown,
  Badge,
  notification,
} from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  UserOutlined,
  FolderOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  TagsOutlined,
  EuroCircleOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useMatch, useNavigate } from "react-router";
import { useAuth } from "../../Utils/AuthContext";

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const matchDashboard = useMatch("/admin");
  const matchPosts = useMatch("/admin/posts");
  const matchUsers = useMatch("/admin/users");
  const matchCategories = useMatch("/admin/categories");
  const matchPrice = useMatch("/admin/prices");
  const nav = useNavigate();
  const { user, logout } = useAuth();
  const avatarMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const getBreadcrumb = () => {
    if (matchDashboard)
      return (
        <Breadcrumb>
          <Breadcrumb.Item className="font-bold !text-2xl">
            Dashboard
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    if (matchPosts)
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/admin">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold">
            Quản lý Tin Đăng
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    if (matchUsers)
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/admin">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold">
            Quản lý Người Dùng
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    if (matchCategories)
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/admin">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold">
            Quản lý Danh Mục
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    if (matchPrice)
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/admin">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold">
            Bảng giá dịch vụ
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    return null;
  };
  return (
    <Layout className="flex admin-layout ">
      <Sider
        collapsible
        className="bg-gray-900 !text-white !w-64 !h-screen !fixed !top-0 !bottom-0 !p-0"
      >
        <div className="flex items-center justify-center p-4 ">
          <img
            src="/logo.png"
            alt="Logo"
            onClick={() => nav("/")}
            className="h-10"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="text-white h-full space-y-2 !pt-5"
          defaultSelectedKeys={[
            location.pathname === "/admin" ? "/admin" : location.pathname,
          ]}
        >
          <Menu.Item
            key="/admin"
            icon={<DashboardOutlined />}
            className="!mb-3"
            onClick={() => nav("/admin")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="/admin/posts"
            icon={<HomeOutlined />}
            className="!mb-3"
            onClick={() => nav("/admin/posts")}
          >
            Quản lý Tin Đăng
          </Menu.Item>
          <Menu.Item
            key="/admin/users"
            icon={<UserOutlined />}
            className="!mb-3"
            onClick={() => nav("/admin/users")}
          >
            Quản lý Người Dùng
          </Menu.Item>
          <Menu.Item
            key="/admin/categories"
            icon={<FolderOutlined />}
            className="!mb-3"
            onClick={() => nav("/admin/categories")}
          >
            Quản lý Danh Mục
          </Menu.Item>
          <Menu.Item
            key="/admin/payment"
            icon={<EuroCircleOutlined />}
            className="!mb-3"
            onClick={() => nav("/admin/payment")}
          >
            Quản lý Thanh Toán
          </Menu.Item>
          <Menu.Item
            key="/admin/prices"
            icon={<TagsOutlined />}
            className="!mb-3"
            onClick={() => nav("/admin/prices")}
          >
            Bảng giá dịch vụ
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="ml-64 w-full" style={{ minHeight: "100vh" }}>
        <Header className="!bg-white !h-[72px] shadow-md px-6 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
          <div>{getBreadcrumb()}</div>
          <div className="flex items-center gap-4">
            <Dropdown overlay={avatarMenu} trigger={["click"]}>
              <div className="flex items-center gap-2 cursor-pointer mr-6">
                <Avatar src={user?.avatar || "/defaul-avt.png"}></Avatar>
                  <span className="!text-black">
                    {user?.name || ""}
                  </span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="m-4 p-6 bg-white rounded-xl shadow-md mt-23">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
