import { useState, useEffect } from "react";
import { Card, Checkbox, Row, Col } from "antd";
import { utilityService } from "../../../../Utils/api";

const OutstandingFeatures = ({ onUtilitiesChange }) => {
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUtilities, setSelectedUtilities] = useState([]);

  // Fetch utilities on component mount
  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        setLoading(true);
        const response = await utilityService.getAll();
        setUtilities(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching utilities:", error);
        setLoading(false);
      }
    };

    fetchUtilities();
  }, []);

  // Call onUtilitiesChange when selected utilities change
  useEffect(() => {
    onUtilitiesChange(selectedUtilities);
  }, [selectedUtilities]);

  const handleUtilityChange = (checkedValues) => {
    setSelectedUtilities(checkedValues);
  };

  return (
    <Card className="bg-white w-full rounded-2xl mt-6 shadow-md">
      <div className="text-xl font-black mb-3">Tiện ích nổi bật</div>
      {loading ? (
        <div>Đang tải tiện ích...</div>
      ) : (
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={handleUtilityChange}
          value={selectedUtilities}
        >
          <Row>
            {utilities.map((utility) => (
              <Col span={8} key={utility._id}>
                <Checkbox value={utility._id}>{utility.name}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      )}
    </Card>
  );
};

export default OutstandingFeatures;
