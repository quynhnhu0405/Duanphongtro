import { Layout } from "antd";
import { Outlet } from "react-router";
import DefaultHeader from "../../Components/Layout/Header";
import DefaultFooter from "../../Components/Layout/Footer";

const DetailRoomLayout = () => {
  return (
    <Layout>
      <DefaultHeader />
      <Layout.Content className="mx-auto w-full">
        <Outlet />
      </Layout.Content>
      <DefaultFooter />
    </Layout>
  );
};

export default DetailRoomLayout;
