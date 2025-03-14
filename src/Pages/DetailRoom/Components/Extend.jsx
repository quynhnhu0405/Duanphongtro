import { CheckCircleFilled } from "@ant-design/icons";
import { Col, Row } from "antd";

const data = [
    {
        id:1,
        title: "Đầy đủ nội thất",
    },
    {
        id:2,
        title: "Có gác",
    },
    {
        id:3,
        title: "Có kệ bếp",
    },
    {
        id:4,
        title: "Có máy lạnh",
    },
    {
        id:5,
        title: "Có máy giặt",
    },
    {
        id:6,
        title: "Có tủ lạnh",
    },
    {
        id:7,
        title: "Có thang máy",
    },
    {
        id:8,
        title: "Không chung chủ",
    },
    {
        id:9,
        title: "Giờ giấc tự do",
    },
    {
        id:10,
        title: "Có bảo vệ 24/24",
    },
    {
        id:11,
        title: "Có hầm giữ xe",
    },
    {
        id:12,
        title: "Có ban công",
    },
]
const addEffect= (id, types) => {
    return types.some(type => type.id === id) ? "text-green-700" : "opacity-25";
  };
const Extend = ({room}) => {
  return (
    <div className="pb-3 pb-4 border-b border-gray-300">
      <h1 className="text-lg font-black mb-4 mt-4">Nổi bật</h1>
      <Row>
        {data.map((item) => (
            <Col lg={6} key = {item.id}>
            <div className={`text-body d-flex pt-1 pb-1  ${addEffect(item.id, room.feature)}`}>
            <CheckCircleFilled
                style={{ marginRight: "5px", } }
                twoToneColor="#52c41a"
              />
              <span className="text-black">{item.title}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Extend;
