import { CheckCircleFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import { utilityService } from "../../../Utils/api";
import { use, useEffect, useState } from "react";

const Extend = ({ room }) => {
  const addEffect = (id, types) => {
    return types?.some((type) => type == id) ? "text-green-700" : "opacity-25";
  };
  const [data, setData] = useState([]);
  const fetchUtilities = () => {
    try {
      utilityService.getAll().then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.error("Lỗi khi tải tiện ích:", error);
    }
  };
  useEffect(() => {
    fetchUtilities();
  }, []);
  return (
    <div className="pb-3 pb-4 border-b border-gray-300">
      <h1 className="text-lg font-black mb-4 mt-4">Nổi bật</h1>
      <Row>
        {data?.map((item) => (
          <Col lg={6} key={item._id}>
            <div
              className={`text-body d-flex pt-1 pb-1 mr-2  ${addEffect(
                item._id,
                room.utilities
              )}`}
            >
              <CheckCircleFilled
                style={{ marginRight: "5px" }}
                twoToneColor="#52c41a"
              />
              <span className="text-black">{item.name}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Extend;
