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
              { name: "Hồ Chí Minh", link: "ho-chi-minh", img: "hcm.jpg" },
              { name: "Hà Nội", link: "ha-noi", img: "ha_noi.jpg" },
              { name: "Đà Nẵng", link: "da-nang", img: "da_nang.jpg" },
              {
                name: "Thừa Thiên Huế",
                link: "thua-thien-hue",
                img: "hue.jpg",
              },
              { name: "Cần Thơ", link: "can-tho", img: "can_tho.jpg" },
              { name: "Khánh Hòa", link: "khanh-hoa", img: "khanh_hoa.jpg" },
            ].map((province, index) => (
              <Col xs={12} sm={8} md={8} lg={4} key={index}>
                <div className="province-item text-center border-amber-950 border p-2 rounded-lg">
                  <div className="province-item__img">
                    <Link to={`/tinh-thanh/${province.link}`}>
                      <img
                        src={`https://tromoi.com/frontend/home/images/province/${province.img}`}
                        alt={province.name}
                        className="w-full h-full object-cover rounded-lg shadow"
                      />
                    </Link>
                  </div>
                  <div className="province-item__name mt-2">
                    <Link to={`/tinh-thanh/${province.link}`}>
                      <span className="font-bold text-gray-800 text-lg mt-3">
                        {province.name}
                      </span>
                    </Link>
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
