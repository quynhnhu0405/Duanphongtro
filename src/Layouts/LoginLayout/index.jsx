import DefaultHeader from "../../Components/Layout/Header";
import { Layout } from "antd";
import { Outlet } from "react-router";

const LoginLayout = () => {
  return (
    <Layout className="bg-color  h-screen">
      <DefaultHeader />
      <Layout.Content className="mx-auto">
        <div className="flex justify-between bodypage">
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default LoginLayout;
