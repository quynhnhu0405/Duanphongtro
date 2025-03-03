import { CaretDownOutlined, CloudUploadOutlined, UserOutlined, PlusOutlined, WalletOutlined, LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Dropdown, Input, Layout, Menu, Modal, Select, Space } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/skeleton/Title";
import React, { useEffect, useState } from "react";

const menuItems = [
  { label: "Trang chủ", key: "1" },
  { label: "Phòng trọ", key: "2" },
  { label: "Chung cư", key: "3" },
  { label: "Ở ghép", key: "4" },
  { label: "Bảng giá đăng bài", key: "5" },
];

const userMenuItems = [
  { label: "1st menu item", key: "1", icon: <UserOutlined /> },
  { label: "2nd menu item", key: "2", icon: <UserOutlined /> },
  { label: "3rd menu item", key: "3", icon: <UserOutlined />, danger: true },
  { label: "4th menu item", key: "4", icon: <UserOutlined />, danger: true, disabled: true },
];
const ManagerHeader = () => {
  return (
    <Layout >
      <Layout.Header style={{ background: "rgb(255, 248, 238)", height: "auto", position:"fixed", width:" 100%", padding:"10px 0" }}>
        <div className="manager-header">
            <div className="header-left">
              <div className="logo">
                <img src="./src/assets/logo.png" alt="logo" />
              </div>
              <div className="menu">
              <Menu mode="horizontal" items={menuItems} className="main-menu" />
          </div>
          </div>
            <div className="header-right">
              <div>
                <a className="manage">Quản lý</a>
              </div>
              <div className="user">
                <Dropdown trigger={["click"]} menu={{ items: userMenuItems }}>
                  <Space style={{ color: "white" }}>
                    <Avatar src="https://random.imagecdn.app/500/150"></Avatar>
                    <span>Admin</span>
                    <CaretDownOutlined />
                  </Space>
                </Dropdown>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button className="post">
                  <CloudUploadOutlined />
                  <span>Đăng bài</span>
                </Button>
              </div>
            </div>
          </div>
        </Layout.Header>
        <Sider className="manager-sider">
          <div style={{ textAlign: "center", marginBottom: 20, display: "flex", alignItems: "center" , borderBottom: "1px solid rgb(255, 196, 0)"}}>
            <Avatar src="https://random.imagecdn.app/500/150"></Avatar>
            <div className="user-info">
              <p level={4}>Phucs</p>
              <p>0963767987</p>
              <p>Mã tài khoản: 123</p>
            </div>
          </div>
          <Menu mode="vertical" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<ProfileOutlined />}>Đăng tin mới</Menu.Item>
            <Menu.Item key="2" icon={<ProfileOutlined />}>Danh sách tin đăng</Menu.Item>
            <Menu.Item key="3" icon={<WalletOutlined />}>Lịch sử thanh toán</Menu.Item>
            <Menu.Item key="3" icon={<WalletOutlined />}>Bảng giá dịch vụ</Menu.Item>
            <Menu.Item key="3" icon={<WalletOutlined />}>Quản lý tài khoản</Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} danger>Đăng xuất</Menu.Item>
          </Menu>
      </Sider>
      </Layout>
  );
};

export default ManagerHeader;
