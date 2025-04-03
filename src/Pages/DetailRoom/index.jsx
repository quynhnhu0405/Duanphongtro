import { Card, Col, Row } from "antd";
import Carousels from "./Components/Carousel";
import HeaderTitle from "./Components/HeaderTitle";
import DescriptionRoom from "./Components/Descriptions";
import Extend from "./Components/Extend";
import Note from "./Components/Note";
import { useParams } from "react-router";
import { postService } from "../../Utils/api";
import { useEffect, useState } from "react";
import InformationHost from "./Components/InfomationHost";
import NewPost from "../../Components/NewPost";
const DetailRoom = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const fetchPost = () => {
    postService.getById(id).then((res) => {
      setPost(res.data);
    });
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="flex justify-between bodypage">
      <Row>
        <Col className="p-4" sm={24} md={16} lg={16}>
          <div>
            <div className="braekcrumb"></div>
            <Card className="bg-white p-7  ">
              <Carousels item={post} />
              <HeaderTitle item={post} />
              <DescriptionRoom item={post} />
              <Extend room={post} />
              <Note />
            </Card>
          </div>
        </Col>
        <Col className="p-4" sm={24} md={8} lg={8}>
          <InformationHost post={post} />
          <div className="sticky top-[120px]">
            <NewPost />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailRoom;
