import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { Link } from "react-router";
import { formatTimeAgo } from "../../Utils/dateUtil";
const FeaturedPost = ({ item }) => {
  const today = new Date(); // Lấy ngày hôm nay
  const otherDate = new Date(item.createdAt); // Chuyển createdAt thành Date object

  // Tính số ngày chênh lệch
  const differenceInTime = today - otherDate;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
  return (
    <div className="roomCard mb-7">
      <Link to={`/phong-tro/${item.title}`}>
        <div className="border-gray-200 border rounded-t-lg">
          <Row>
            <Col className="pr-2" xs={24} sm={24} md={12} lg={12}>
              <Row className="flex justify-center">
                <Col span={14}>
                  <img
                    alt={item.title}
                    src={item.images[0].url}
                    style={{
                      height: "210px",
                      objectFit: "cover",
                      paddingRight: "1px",
                    }}
                    className="rounded-tl-lg"
                  />
                </Col>
                <Col span={10}>
                  <Row>
                    <img
                      alt={item.title}
                      src={item.images[1].url}
                      style={{
                        height: "120px",
                        objectFit: "cover",
                        padding: "0 0 1px 1px",
                      }}
                    />
                  </Row>
                  <Row>
                    <Col span={12}>
                      <img
                        alt={item.title}
                        src={item.images[2].url}
                        style={{
                          height: "90px",
                          objectFit: "cover",
                          padding: "1px 1px 0 1px",
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <img
                        alt={item.title}
                        src={item.images[3].url}
                        style={{
                          height: "90px",
                          objectFit: "cover",
                          padding: "1px 0 0 1px",
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              className="p-3 text-black"
              xs={24}
              sm={24}
              md={12}
              lg={12}
            >
              <h1 className="uppercase font-bold text-base mb-2 text-orange-600 two-line-text">
                {item.title}
              </h1>
              <p className="text-base text-red-500 font-bold inline">
                {item.price}
              </p>
              <p className="text-base text-blue-500 font-bold inline ml-10">
                {item.acreage} m<sup>2</sup>
              </p>
              <p className="text-sm mb-2 mt-1">⭐️⭐️⭐️⭐️</p>
              <p className="text-sm mb-2">
                <EnvironmentOutlined /> {item.location.ward},{" "}
                {item.location.city}
              </p>
              <p className="text-sm two-line-text text-gray-700">{item.description}</p>
            </Col>
          </Row>
        </div>
      </Link>
      <div className="border-gray-200 border rounded-b-lg flex items-center justify-between p-3">
        <div className=" flex items-center">
          <div className="p-1 border border-gray-400 rounded-3xl w-fit h-fit">
            <img src={item.host.avatar} className="w-7 rounded-3xl"></img>
          </div>
          <div className="ml-3 text-sm text-black leading-4">
            <p className="font-bold">{item.host.name}</p>
            <p className="text-gray-400">Đăng {formatTimeAgo(item.createdAt)}</p>
          </div>
        </div>
        <a
          target="_blank"
          rel="nofollow"
          href={`tel:${item.host.phone}`}
          className=" host-phone text-sm"
        >
          <PhoneOutlined /> {item.host.phone}
        </a>
      </div>
    </div>
  );
};

export default FeaturedPost;
