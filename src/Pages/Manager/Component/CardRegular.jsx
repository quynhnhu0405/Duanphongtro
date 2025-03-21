import { EnvironmentOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'

const CardRegular = ({item}) => {
  return (
    <div className="roomCard mb-7">
        <div className="border-gray-200 border rounded-lg">
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
                    className="rounded-l-lg"
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
    </div>
  )
}

export default CardRegular
