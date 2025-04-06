import React from "react";
import { Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";

const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
   

  const getSelectedKey = () => {
    if (location.pathname.endsWith("/doi-mat-khau")) {
      return "change-password";
    }
    return "account";
  };

  // Xử lý khi chọn menu
  const handleMenuClick = (e) => {
    if (e.key === "account") {
      navigate("/quan-ly/quan-ly-tai-khoan");
    } else if (e.key === "change-password") {
      navigate(`/quan-ly/quan-ly-tai-khoan/doi-mat-khau`);
    }
  };

  return (
    <div>
      <div className="fixed w-full z-30 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.3)] top-[60px] pt-5 pb-5 pl-15">
        <h1 className="text-2xl font-bold">Quản lý tài khoản</h1>
        {/* Menu sử dụng Ant Design */}
        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="account">Tài khoản</Menu.Item>
          <Menu.Item key="change-password">Đổi mật khẩu</Menu.Item>
        </Menu>
      </div>
      <div className="w-1/2 m-auto mt-35">
        <Outlet/>
      </div>
    </div>
  );
};

export default Account;