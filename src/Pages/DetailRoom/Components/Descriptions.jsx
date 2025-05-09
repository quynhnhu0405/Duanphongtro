import { Spin } from "antd";

const DescriptionRoom = ({ item, loading }) => {
  const description = item?.description
    ?.split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: "200px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-4 pb-4 border-b border-gray-300">
        <h1 className="text-lg font-black mb-4">Thông tin mô tả</h1>
        <div className="text-[15px]">
          {description?.map((para, index) => (
            <p key={index} className="mb-3">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionRoom;
