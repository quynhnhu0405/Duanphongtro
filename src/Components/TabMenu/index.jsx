import { Menu } from "antd";
import { useNavigate } from "react-router";

const TabMenu = () => {
  const menu = [
    { label: "Đề xuất", key: 1, path: `${location.pathname}` },
    { label: "Mới Đăng", key: 2, path: `${location.pathname}/moi-dang` },
    {
      label: "Có video",
      key: 3,
      path: `${location.pathname}/co-video`,
    },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        className="tab-menu"
        defaultSelectedKeys={1}
        onClick={(e) => navigate(e.key)}
        items={menu.map((item) => ({
          key: item.path,
          label: item.label,
        }))}
      />
    </div>
  );
};

export default TabMenu;
