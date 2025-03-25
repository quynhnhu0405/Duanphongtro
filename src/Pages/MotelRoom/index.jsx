import { Card } from "antd";
import FeaturedPost from "../../Components/FeaturedPost";
import Vip1Card from "../../Components/Vip1Card";
import Vip2Card from "../../Components/Vip2Card";
import RegularCard from "../../Components/RegularCard";
import FilterProvince from "../../Components/FilterProvince";
import TabMenu from "../../Components/TabMenu";
import { useEffect, useState } from "react";

const MotelRoom = () => {
  const [room, setRoom] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setRoom(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Card className="bg-white p-7  ">
        <div className="border-b border-gray-200 pb-2">
          <h1 className="font-bold text-2xl">
            Kênh thông tin Phòng trọ số 1 Việt Nam
          </h1>
          <p className="text-sm text-gray-700">Có 70.494 tin đăng cho thuê</p>
        </div>
        <FilterProvince />
        <TabMenu />
        <div>
          {room.length === 0 && (
            <div className="flex flex-col items-center">
              <img src="./src/assets/empty.jpeg" alt="" className="w-1/4" />
              <p className="text-base">Không có bài đăng nào !!!</p>
            </div>
          )}
          {room.map((item) => {
            const packageLevel = Number(item?.packageDetails?.level);
            console.log(packageLevel);
            if (packageLevel === 1) {
              return <FeaturedPost key={item._id} item={item} />;
            } else if (packageLevel === 2) {
              return <Vip1Card key={item._id} item={item} />;
            } else if (packageLevel === 3) {
              return <Vip2Card key={item._id} item={item} />;
            } else {
              return <RegularCard key={item._id} item={item} />;
            }
          })}
        </div>
      </Card>
    </div>
  );
};

export default MotelRoom;
