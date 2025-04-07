import { EnvironmentOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";

const CardFeature = ({ item }) => {
  return (
    <div className="roomCard mb-7">
      <div className="border-gray-200 border rounded-lg">
        <Row>
          <Col className="pr-2" xs={24} sm={24} md={12} lg={12}>
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
                      height: "120px",
                      width: "100%",
                      objectFit: "cover",
                      padding: "0 0 1px 1px",
                    }}
                  />
                </Row>
                <Row>
                  <Col span={12}>
                    <img
                      alt={item.title}
                      src={item.images[2]}
                      style={{
                        height: "90px",
                        width: "100%",
                        objectFit: "cover",
                        padding: "1px 1px 0 1px",
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <img
                      alt={item.title}
                      src={item.images[3]}
                      style={{
                        height: "90px",
                        width: "100%",
                        objectFit: "cover",
                        padding: "1px 0 0 1px",
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className="p-3 text-black" xs={24} sm={24} md={12} lg={12}>
            <h1 className="uppercase font-bold text-base mb-2 text-orange-600 two-line-text">
              {item.title}
            </h1>
            <p className="text-base text-red-500 font-bold inline">
              {item.price.toLocaleString("vi-VN")} VND
            </p>
            <p className="text-base text-blue-500 font-bold inline ml-10">
              {item.area}m<sup>2</sup>
            </p>
            <p className="text-sm mb-2 mt-1">⭐️⭐️⭐️⭐️</p>
            <p className="text-sm mb-2">
              <EnvironmentOutlined /> {item.location.ward},{" "}
              {item.location.province}
            </p>
            <p className="text-sm two-line-text text-gray-700">
              {item.description}
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CardFeature;
