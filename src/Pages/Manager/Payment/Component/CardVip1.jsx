import { EnvironmentOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'

const CardVip1 = ({item}) => {
  return (
    <div className="roomCard mb-7">
        <div className="border-gray-200 border rounded-t-lg">
          <Row>
          <Col className="pr-2" xs={24} sm={24} md={10} lg={10}>
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
                        height: "105px",
                        objectFit: "cover",
                        padding: "0 0 1px 1px",
                      }}
                    />
                  </Row>
                  <Row>
                    <img
                      alt={item.title}
                      src={item.images[1].url}
                      style={{
                        height: "105px",
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
                {item.price}
              </p>
              <p className="text-base text-blue-500 font-bold inline ml-10">
                {item.acreage}m<sup>2</sup>
              </p>
              <p className="text-sm mb-2 mt-1">⭐️⭐️⭐️</p>
              <p className="text-sm mb-2">
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

export default CardVip1
