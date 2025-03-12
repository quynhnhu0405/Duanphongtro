import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router";
import DefaultHeader from "../../Components/Layout/Header";
import DefaultFooter from "../../Components/Layout/Footer";
import NewPost from "../../Components/NewPost";
import Contact from "../../Components/Contact";

const PolicyLayout = () => {
  return (
    <Layout>
      <DefaultHeader />
      <Layout.Content className="mx-auto">
        <div className="flex justify-between bodypage">
          <Row>
            <Col className="p-4" sm={24} md={16} lg={16}>
              <Outlet />
            </Col>
            <Col className="p-4" sm={24} md={8} lg={8}>
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

export default PolicyLayout;
