import { ArrowRightOutlined, BellOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { Link } from "react-router";

const dataNews = [
    {
      id: 1,
      image: "./src/assets/thumptro_272.jpg",
      title:
        "Tại sao đăng trọ trên nền tảng số sẽ giúp chủ nhà cho thuê nhanh hơn?",
    },
    {
      id: 2,
      image: "./src/assets/thumptro_272.jpg",
      title:
        "Tại sao đăng trọ trên nền tảng số sẽ giúp chủ nhà cho thuê nhanh hơn?",
    },
    {
      id: 3,
      image: "./src/assets/thumptro_272.jpg",
      title:
        "Tại sao đăng trọ trên nền tảng số sẽ giúp chủ nhà cho thuê nhanh hơn?",
    },
    {
      id: 4,
      image: "./src/assets/thumptro_272.jpg",
      title:
        "Tại sao đăng trọ trên nền tảng số sẽ giúp chủ nhà cho thuê nhanh hơn?",
    },
  ];
const HotNews = () => {
  return (
    <div className="rounded-3xl mt-10 box-news pt-3 pb-3">
        <div className="flex fx-between gap-x-16 justify-between p-2 m-auto">
          <h2 className="text-xl font-black text-red-600 pb-6">
            TIN TỨC NỔI BẬT
          </h2>
          <a href="" className="text-base font-bold text-red-600">
            Xem thêm <ArrowRightOutlined />
          </a>
        </div>
        <div>
          <Row gutter={[16, 16]}>
            {dataNews.map((item) => (
              <Col xs={24} sm={12} md={12} lg={6} key={item.id}>
                <Link
                  to={`/chi-tiet/${item?.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card>
                    <img src={item.image} alt={item.title} />
                    <div className="flex font-bold mt-2">
                      <BellOutlined
                        style={{
                          fontSize: "2vw",
                          color: "red",
                          textAlign: "center",
                          width: "40%",
                        }}
                      />
                      <div className="titleNews">
                        <p>{item.title}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
    </div>
  );
};

export default HotNews;
