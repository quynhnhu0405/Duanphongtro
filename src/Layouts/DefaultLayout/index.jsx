import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router";
import DefaultHeader from "../../Components/Layout/Header";
import DefaultFooter from "../../Components/Layout/Footer";
import NewPost from "../../Components/NewPost";
import Contact from "../../Components/Contact";
import FilterCard from "../../Components/CardFilter";

const DefaultLayout = () => {
  return (
    <Layout>
      <DefaultHeader />
      <Layout.Content className="mx-auto w-full">
        <div className="flex justify-between w-full min-h-screen bodypage">
          <Row className="w-full flex-1">
            <Col className="p-4 w-full min-w-[300px]" sm={24} md={16} lg={16}>
              <Outlet />
            </Col>
            <Col className="p-4 w-full min-w-[300px]" sm={24} md={8} lg={8}>
              <FilterCard />
              <NewPost />
            </Col>
          </Row>
        </div>

        <div className="bodypage p-4">
          <Contact />
        </div>
      </Layout.Content>
      <DefaultFooter />
    </Layout>
  );
};

export default DefaultLayout;
