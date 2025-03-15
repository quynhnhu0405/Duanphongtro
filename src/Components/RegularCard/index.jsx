import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { Link } from "react-router";
import { formatTimeAgo } from "../../Utils/dateUtil";
const RegularCard = ({ item }) => {
  return (
    <div className="roomCard mb-7">
      <Link to={`/${item.title}`}>
        <div className="border-gray-200 border rounded-t-lg">
          <Row>
            <Col className="pr-2" xs={24} sm={24} md={6} lg={6}>
                  <img
                    alt={item.title}
                    src={item.images[0].url}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      paddingRight: "1px",
                    }}
                    className="rounded-tl-lg"
                  />
            </Col>
            <Col className="p-3 text-black" xs={24} sm={24} md={18} lg={18}>
              <h1 className="font-bold text-base mb-2 text-blue-500 two-line-text">
                {item.title}
              </h1>
              <p className="text-base text-red-500 font-bold inline">
                {item.price}
              </p>
              <p className="text-base text-blue-500 font-bold inline ml-10">
                {item.acreage}m<sup>2</sup>
              </p>
              <p className="text-sm mb-2 mt-2">
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
            <p className="text-gray-400">Đăng {formatTimeAgo (item.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularCard;
