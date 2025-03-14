import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router";
import DefaultHeader from "../../Components/Layout/Header";
import DefaultFooter from "../../Components/Layout/Footer";
import NewPost from "../../Components/NewPost";
import Contact from "../../Components/Contact";
import InformationHost from "./Component/InfomationHost";
const host = {
    id: 1,
    name: "Nguyen Van A",
    attendAt: "10/10/2022",
    phone: "0123456789",
    avatar: "./src/assets/defaul-avt.png",
    posts: 4,
  };
const DetailRoomLayout = () => {
  return (
    <Layout>
      <DefaultHeader />
      <Layout.Content className="mx-auto w-full">
        <div className="flex justify-between bodypage">
          <Row>
            <Col className="p-4" sm={24} md={16} lg={16}>
              <Outlet />
            </Col>
            <Col className="p-4" sm={24} md={8} lg={8}>
              <InformationHost host={host}/>
              <div className="sticky top-[120px]">
                <NewPost />
              </div>
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

export default DetailRoomLayout;
