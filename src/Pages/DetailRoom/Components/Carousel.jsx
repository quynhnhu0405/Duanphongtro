import { Carousel, Image, Spin } from "antd";
import { useState } from "react";
const Carousels = ({ item }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center" style={{ height: "400px" }}>
          <Spin size="large" />
        </div>
      )}
      <Carousel
        arrows
        infinite={true}
        className="bg-black items-center rounded-t-lg"
      >
        {item?.images?.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              style={{ width: "auto", maxHeight: "400px" }}
              onLoad={handleImageLoad}
              preview={false}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousels;
