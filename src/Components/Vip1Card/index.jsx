import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { Link } from "react-router";
import { formatTimeAgo } from "../../Utils/dateUtil";
import { useEffect, useState } from "react";
import slugify from "slugify";
const Vip1Card = ({ item }) => {
  const [landlord, setLandlord] = useState(null);

  useEffect(() => {
    if (item.landlordId) {
      fetch(`http://localhost:5000/api/users/user/${item.landlordId}`)
        .then((res) => res.json())
        .then((data) => setLandlord(data))
        .catch((error) => console.error("Lỗi lấy dữ liệu chủ nhà:", error))
    }
  }, [item.landlordId]);
  return (
    <div className="roomCard mb-7">
      <Link to={`/${slugify(item?.title, { lower: true, locale: "vi" })}`}>
        <div className="border-gray-200 border rounded-t-lg">
          <Row>
            <Col className="pr-2" xs={24} sm={24} md={10} lg={10}>
              <Row className="flex justify-center">
                <Col span={14}>
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
                <Col span={10}>
                  <Row>
                    <img
                      alt={item.title}
                      src={item.images[1]}
                      style={{
                        height: "105px",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0 0 1px 1px",
                      }}
                    />
                  </Row>
                  <Row>
                    <img
                      alt={item.title}
                      src={item.images[2]}
                      style={{
                        height: "105px",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0 0 1px 1px",
                      }}
                    />
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col className="p-3 text-black" xs={24} sm={24} md={14} lg={14}>
              <h1 className=" uppercase font-bold text-base mb-2 text-blue-800 two-line-text">
                {item.title}
              </h1>
              <p className="text-base text-red-500 font-bold inline">
                {item.price.toLocaleString("vi-VN")} VND
              </p>
              <p className="text-base text-blue-500 font-bold inline ml-10">
                {item.area}m<sup>2</sup>
              </p>
              <p className="text-sm mb-2 mt-1">⭐️⭐️⭐️</p>
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
                <img
                  src={landlord?.avatar || "./src/assets/defaul-avt.png"}
                  className="w-7 rounded-3xl"
                  alt="Avatar"
                />
              </div>
              <div className="ml-3 text-sm text-black leading-4">
                <p className="font-bold">{landlord.name}</p>
                <p className="text-gray-400">
                  Đăng {formatTimeAgo(item.createdAt)}
                </p>
              </div>
            </>
          )}
        </div>
        {landlord && (
          <a
            target="_blank"
            rel="nofollow"
            href={`tel:${landlord.phone}`}
            className="host-phone text-sm"
          >
            <PhoneOutlined /> {landlord.phone}
          </a>
        )}
      </div>
    </div>
  );
};

export default Vip1Card;
