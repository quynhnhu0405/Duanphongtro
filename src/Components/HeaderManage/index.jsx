import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import logo from "../../assets/logo2.png";
import { useNavigate } from "react-router";
import User from "./Component/User";
import Sider from "../../Layouts/ManageLayout/Component/SiderMenu";
const menuItems = [
  { label: "Trang chủ", key: "/", path: "/" },
  { label: "Phòng trọ", key: "/phong-tro", path: "/phong-tro" },
  { label: "Chung cư", key: "/chung-cu", path: "/chung-cu" },
  { label: "Ở ghép", key: "/o-ghep", path: "/o-ghep" },
  { label: "Bảng giá đăng bài", key: "/bang-gia", path: "/bang-gia" },
];
const HeaderManage = () => {
  const navigate = useNavigate();
  return (
    <Layout.Header
      style={{
        background: "rgb(0 62 146)",
        height: "auto",
        paddingTop: "10px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: " 100%",
      }}
    >
      <div className="flex justify-between">
        <div className="header-left">
          <div className="logo">
            <a href="/"><img src={logo} alt="logo" /></a>
          </div>
          <div className="w-[500px] ">
            <Menu
              mode="horizontal"
              className="manage-menu !border-none !bg-transparent text-white"
              onClick={(e) => navigate(e.key)}
              items={menuItems.map((item) => ({
                key: item.path,
                label: item.label,
              }))}
            />
          </div>
        </div>

        <div className="header-right">
          <div>
            <a className="text-white mr-15" href="/quan-ly/tin-dang">
              Quản lý
            </a>
          </div>
          <div className="user">
            <User/>
          </div>
          <div style={{ display: "flex" }}>
            <Button className="post" href="/quan-ly/dang-bai-moi">
              <CloudUploadOutlined />
              <span>Đăng bài</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};

export default HeaderManage;
