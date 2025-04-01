import { Carousel, Image } from "antd";

const Carousels = ({ item }) => {
  return (
    <div>
      <Carousel
        arrows
        infinite={true}
        className="bg-black items-center rounded-t-lg"
      >
        {item?.images?.map((image, index) => (
          <div key={index}>
            <Image src={image} style={{ width: "auto", maxHeight: "400px" }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousels;
