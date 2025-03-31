import { Col, Row } from 'antd'
import ProductItem from '../../../Components/ProductCard'
import { Link } from 'react-router'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
const HotRoom = () => {
  const [room, setRoom] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
    .then(res => res.json())
    .then(data => {
      setRoom(data)})
    .catch(err => console.log(err));
  },[])
  return (
    <div className="bg-white p-10 rounded-3xl list-room">
        <h2 className="text-xl font-semibold text-red-600 pb-6">
          PHÒNG TRỌ HOT NHẤT
        </h2>
        <Row gutter={[16, 16]}>
          {room.map((item) => (
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
