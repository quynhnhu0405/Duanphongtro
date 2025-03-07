import { Col, Row } from 'antd'
import ProductItem from '../../../Components/ProductCard'
import { Link } from 'react-router'
import { ArrowRightOutlined } from '@ant-design/icons'
const data = [
    {
      id: 1,
      image: "./src/assets/1.jpg",
      title: "Nhà Trọ 416/23 Dương Quảng Hàm",
      price: "4.5 triệu/tháng",
      acreage: "20m2",
      location: "Gò Vấp, TP Hồ Chí Minh",
      type: "Nhà trọ, phòng trọ",
    },
    {
      id: 2,
      image: "./src/assets/1.jpg",
      title: "Nhà tại Phường Đông Hòa, Dĩ An",
      price: "2.9 triệu/tháng",
      acreage: "20m2",
      location: "Dĩ An, Bình Dương",
      type: "Nhà trọ, phòng trọ",
    },
    {
      id: 3,
      image: "./src/assets/1.jpg",
      title: "Nhà trọ số 279 Đường Hòa Hảo",
      price: "4.5 triệu/tháng",
      acreage: "20m2",
      location: "Quận 10, TP Hồ Chí Minh",
      type: "Nhà trọ, phòng trọ",
    },
    {
      id: 4,
      image: "./src/assets/1.jpg",
      title: "Nhà nguyên căn Tỉnh lộ 286",
      price: "4.5 triệu/tháng",
      acreage: "20m2",
      location: "Cần Giuộc, Long An",
      type: "Nhà nguyên căn",
    },
    {
      id: 5,
      image: "./src/assets/1.jpg",
      title: "Nhà nguyên căn Tỉnh lộ 286",
      price: "4.5 triệu/tháng",
      acreage: "20m2",
      location: "Cần Giuộc, Long An",
      type: "Nhà nguyên căn",
    },
  ];
const HotRoom = () => {
  return (
    <div className="bg-white p-10 rounded-3xl list-room">
        <h2 className="text-xl font-semibold text-red-600 pb-6">
          PHÒNG TRỌ HOT NHẤT
        </h2>

        <Row gutter={[16, 16]}>
          {data.map((item) => (
            <Col xs={24} sm={12} md={12} lg={6} key={item.id}>
              <ProductItem item={item} />
            </Col>
          ))}
        </Row>

        <div className="mt-10 flex justify-center btn-action">
          <Link
            to="/phong-tro"
            className="border-red-600 border-2 px-4 py-2 rounded-lg text-base font-bold text-red-600 hover:bg-red-600 hover:text-white transition duration-300"
          >
            Xem tất cả <ArrowRightOutlined />
          </Link>
        </div>
      </div>
  )
}

export default HotRoom
