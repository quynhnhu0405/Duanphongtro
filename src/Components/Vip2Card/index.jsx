import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";
import { formatTimeAgo } from "../../Utils/dateUtil";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { userService } from "../../Utils/api";
const Vip2Card = ({ item }) => {
  const [landlord, setLandlord] = useState(null);

 useEffect(() => {
    if (item.landlordId) {
      userService.getUser(item.landlordId)
        .then((data) => setLandlord(data))
        .catch((error) => console.error("Failed to fetch landlord:", error));
    }
  }, [item.landlordId]);
  return (
    <div className="roomCard mb-7">
      <Link to={`/chi-tiet/${slugify(item?._id, { lower: true, locale: "vi" })}`}>
        <div className="border-gray-200 border rounded-t-lg">
          <Row>
            <Col className="pr-2" xs={24} sm={24} md={8} lg={8}>
              <img
                alt={item.title}
                src={item.images[0]}
                style={{
                  height: "210px",
                  width: "100%",
                  objectFit: "cover",
                  paddingRight: "1px",
                }}
                className="rounded-tl-lg"
              />
            </Col>
            <Col className="p-3 text-black" xs={24} sm={24} md={16} lg={16}>
              <h1 className=" uppercase font-bold text-base mb-2 text-pink-800 two-line-text">
                {item.title}
              </h1>
              <p className="text-base text-red-500 font-bold inline">
              {item.price.toLocaleString("vi-VN")} VND
              </p>
              <p className="text-base text-blue-500 font-bold inline ml-10">
                {item.area}m<sup>2</sup>
              </p>
              <p className="text-sm mb-2 mt-1">⭐️⭐️</p>
              <p className="text-sm mb-2">
                <EnvironmentOutlined /> {item.location.district},{" "}
                {item.location.province}
              </p>
              <p className="text-sm two-line-text text-gray-700">
                {item.description}
              </p>
            </Col>
          </Row>
        </div>
      </Link>
      <div className="border-gray-200 border rounded-b-lg flex items-center justify-between p-3">
        <div className="flex items-center">
          {landlord && (
            <>
              <div className="p-1 border border-gray-400 rounded-3xl w-fit h-fit">
                <Avatar
                  src={landlord?.data?.avatar || "/defaul-avt.png"}
                  className="w-7 rounded-3xl"
                  alt="Avatar"
                />
              </div>
              <div className="ml-3 text-sm text-black leading-4">
                <p className="font-bold">{landlord?.data?.name}</p>
                <p className="text-gray-400">
                  Đăng {formatTimeAgo(item.createdAt)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vip2Card;
