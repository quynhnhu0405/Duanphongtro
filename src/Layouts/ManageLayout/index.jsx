import { Layout } from "antd";
import { Outlet } from "react-router";
import HeaderManage from "../../Components/HeaderManage";
import SiderMenu from "./Component/SiderMenu";
import ManageFooter from "./Component/Footer";

const ManageLayout = () => {
  return (
    <Layout>
        <HeaderManage />
      <Layout>
        <SiderMenu />
        <Layout.Content className="content-manage-desktop ">
        <Outlet/>
        <ManageFooter />
        </Layout.Content>
      </Layout>
      
    </Layout>
  );
};

export default ManageLayout;
