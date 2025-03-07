import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router';

const ProductItem = ({ item }) => {
  return (
    <Link
      to={`/chi-tiet/${item?.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        hoverable
        cover={
          <img
            alt={item.title}
            src={item.image}
            style={{ height: 200, objectFit: "cover" }}
          />
        }
      >
        <h3 className="title">{item.title}</h3>
        <p style={{ color: "#ff5722", fontWeight: "bold" }}>
          Từ {item.price}
        </p>
        <div className="flex">
          <span className="p-1 text-sm font-bold rounded-md bg-gray-100">{item.type}</span>
          <span className="p-1 text-sm font-bold ml-2 rounded-md bg-gray-100">{item.acreage}</span>
        </div>
        <p style={{ color: "gray", fontSize: "0.9rem" }}>📍 {item.location}</p>
      </Card>
    </Link>
  );
};

export default ProductItem;

