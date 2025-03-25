import { Col, Row } from "antd"
import { Link } from "react-router"

const FamousProvince = () => {
  return (
    <div className="box-province bg-white p-10 rounded-3xl mt-6">
        <div className="grid wide">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Tỉnh, thành phố nổi bật</h2>
          </div>
          <Row gutter={[16, 16]} className="justify-center">
            {[
              { name: "Hồ Chí Minh", img: "https://tromoi.com/frontend/home/images/province/hcm.jpg" },
              { name: "Hà Nội", img: "https://tromoi.com/frontend/home/images/province/ha_noi.jpg" },
              { name: "Đà Nẵng", img: "https://tromoi.com/frontend/home/images/province/da_nang.jpg" },
              { name: "Bình Dương", img: "../../src/assets/binhduong.png" },
            ].map((province, index) => (
              <Col xs={12} sm={12} md={6} lg={6} key={index}>
                <div className="province-item text-center border-amber-950 border p-2 rounded-lg">
                  <div className="province-item__img">
                      <img
                        src={`${province.img}`}
                        alt={province.name}
                        className="w-full h-full object-cover rounded-lg shadow"
                      />
                  </div>
                  <div className="province-item__name mt-2">
                      <span className="font-bold text-gray-800 text-lg mt-3">
                        {province.name}
                      </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
  )
}

export default FamousProvince
