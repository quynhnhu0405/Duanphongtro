import { Col, Row, Skeleton } from "antd";
import ProductItem from "../../../Components/ProductCard";
import { Link } from "react-router";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { postService } from "../../../Utils/api";
const HotApartment = () => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService
      .getApartments({ limit: 8 })
      .then((res) => {
        setRoom(res.data); // axios trả về dữ liệu ở res.data
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-10 rounded-3xl list-room mt-6">
      <h2 className="text-xl font-semibold text-red-600 pb-6">
        CĂN HỘ HOT NHẤT
      </h2>

      <Row gutter={[16, 16]}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Col xs={24} sm={12} md={12} lg={6} key={i}>
                <Skeleton active paragraph={{ rows: 4 }} />
              </Col>
            ))
          : room &&
            room.slice(0, 8).map((item) => (
              <Col xs={24} sm={12} md={12} lg={6} key={item._id || item.id}>
                <ProductItem item={item} />
              </Col>
            ))}
      </Row>

      <div className="mt-10 flex justify-center btn-action">
        <Link
          to="/chung-cu"
          className="border-red-600 border-2 px-4 py-2 rounded-lg text-base font-bold text-red-600 hover:bg-red-600 hover:text-white transition duration-300"
        >
          Xem tất cả <ArrowRightOutlined />
        </Link>
      </div>
    </div>
  );
};

export default HotApartment;