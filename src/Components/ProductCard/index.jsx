import { Card } from "antd";
import React from "react";
import { Link } from "react-router";
import slugify from "slugify";

const ProductItem = ({ item }) => {
  return (
    <Link
      to={`/chi-tiet/${slugify(item?._id, { lower: true, locale: "vi" })}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        hoverable
        cover={
          <img
            alt={item.title}
            src={
              item.images?.length > 0 ? item.images[0] : "/default-image.jpg"
            }
            style={{ height: 200, objectFit: "cover" }}
          />
        }
      >
        <h3 className="title">{item.title}</h3>
        <p style={{ color: "#ff5722", fontWeight: "bold" }}>
          {item.price.toLocaleString("vi-VN")} VND
        </p>

        <div className="flex">
          <span className="p-1 pl-2 pr-2 text-sm font-bold mr-2 rounded-md bg-gray-50 border border-gray-300">
            {item.category?.name || "Không xác định"}
          </span>
          <span className="p-1  pl-2 pr-2  text-sm font-bold rounded-md bg-gray-50 border border-gray-300">
            {item.area}m<sup>2</sup>
          </span>
        </div>
        <p style={{ color: "gray", fontSize: "0.9rem" }}>
          📍 {item.location?.district || "N/A"},{" "}
          {item.location?.province || "N/A"}
        </p>
      </Card>
    </Link>
  );
};

export default ProductItem;
