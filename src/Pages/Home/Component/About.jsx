import { Col, Row } from 'antd'

const About = () => {
  return (
    <div className="bg-white p-10 rounded-3xl mt-6  text-center box-about">
        <h2 className="text-xl font-black text-red-400">
          Hơn <span className="text-red-600">50.000</span> chủ trọ tin tưởng Trọ
          Mới
        </h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} md={8} lg={8}>
            <div className="p-5">
              <img src="public/mang-luoi.svg"></img>
              <p>Hệ thống đăng và quản lý trọ cho thuê hiện đại nhất</p>
            </div>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8}>
            <div className="p-5">
              <img src="public/nguoi-thue.svg"></img>
              <p>
                Hơn 5.000 trọ mới từ khắp các tỉnh thành được cập nhật mỗi tháng
              </p>
            </div>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8}>
            <div className="p-5">
              <img src="public/quang-cao.svg"></img>
              <p>
                Đăng trọ của bạn lên website của chúng tôi và cho thuê nhanh
                chóng
              </p>
            </div>
          </Col>
        </Row>
      </div>
  )
}

export default About
