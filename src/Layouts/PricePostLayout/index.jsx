import DefaultHeader from "../../Components/Layout/Header";
import DefaultFooter from "../../Components/Layout/Footer";
import { Layout } from "antd";
import { Outlet } from "react-router";
import Contact from "../../Components/Contact";

const PricePostsLayout = () => {
  return (
    <Layout className="!bg-white">
      <DefaultHeader />
      <Layout.Content className="mx-20">
        <Outlet />
        <div className="bodypage p-4 !mt-30">
          <Contact />
        </div>
      </Layout.Content>
      <DefaultFooter />
    </Layout>
  );
};

export default PricePostsLayout;
