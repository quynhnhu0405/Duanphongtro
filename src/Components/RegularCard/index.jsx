import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { Link } from "react-router";
import { formatTimeAgo } from "../../Utils/dateUtil";
import { useEffect, useState } from "react";
import slugify from "slugify";
const RegularCard = ({ item }) => {
  const [landlord, setLandlord] = useState(null);

  useEffect(() => {
    if (item.landlordId) {
      fetch(`http://localhost:5000/api/users/user/${item.landlordId}`)
        .then((res) => res.json())
        .then((data) => setLandlord(data))
        .catch((error) => console.error("Lỗi lấy dữ liệu chủ nhà:", error));
    }
  }, [item.landlordId]);
  return (
    <div className="roomCard mb-7">
      <Link to={`/chi-tiet/${slugify(item?._id, { lower: true, locale: "vi" })}`}>
        <div className="border-gray-200 border rounded-t-lg">
          <Row>
            <Col className="pr-2" xs={24} sm={24} md={6} lg={6}>
              <img
                alt={item.title}
                src={item.images[0]}
                style={{
                  height: "180px",
                  width: "100%",
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
              {item.price.toLocaleString("vi-VN")} VND
              </p>
              <p className="text-base text-blue-500 font-bold inline ml-10">
                {item.area}m<sup>2</sup>
              </p>
              <p className="text-sm mb-2 mt-2">
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
      </div>
    </div>
  );
};

export default RegularCard;
