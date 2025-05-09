import DefaultHeader from "../../Components/Layout/Header";
import DefaultFooter from "../../Components/Layout/Footer";
import { Layout } from "antd";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <Layout>
      <DefaultHeader />
      <div className="banner">
        <img src="public/banner.png" className="w-screen"></img>
      </div>
      <Layout.Content className="mx-auto">
        <div className="flex justify-between bodypage">
          <Outlet />
        </div>
      </Layout.Content>
      <DefaultFooter />
    </Layout>
  );
};

export default HomeLayout;
