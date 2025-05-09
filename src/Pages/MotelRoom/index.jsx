import { Card } from "antd";
import FeaturedPost from "../../Components/FeaturedPost";
import Vip1Card from "../../Components/Vip1Card";
import Vip2Card from "../../Components/Vip2Card";
import RegularCard from "../../Components/RegularCard";
import FilterProvince from "../../Components/FilterProvince";
import TabMenu from "../../Components/TabMenu";
import { useEffect, useState } from "react";
import { postService } from "../../Utils/api";
import { useLocation } from "react-router";

const MotelRoom = () => {
  const location = useLocation();
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);

        // Get filter params from URL
        const queryParams = {};
        const searchParams = new URLSearchParams(location.search);
        for (const [key, value] of searchParams.entries()) {
          queryParams[key] = value;
        }

        // Fetch filtered data
        const response = await postService.getMotelRooms(queryParams);
        setRoom(response.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải phòng trọ:", err);
        setError("Không thể tải danh sách phòng trọ");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [location.search]);

  return (
    <div>
      <Card className="bg-white p-7">
        <div className="border-b border-gray-200 pb-2">
          <h1 className="font-bold text-2xl">
            Kênh thông tin Phòng trọ số 1 Việt Nam
          </h1>
          <p className="text-sm text-gray-700">
            Có {room.length} tin đăng cho thuê
          </p>
        </div>

        <FilterProvince />
        <TabMenu />
        <div>
          {loading && (
            <div className="flex justify-center p-10">
              <p>Đang tải dữ liệu...</p>
            </div>
          )}


          {error && (
            <div className="flex justify-center p-10">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && room.length === 0 && (
            <div className="flex flex-col items-center">
              <img src="empty.jpeg" alt="" className="w-1/4" />
              <p className="text-base">Không có bài đăng nào !!!</p>
            </div>
          )}

          {!loading &&
            !error &&
            room.map((item) => {
              const packageLevel = Number(item?.packageDetails?.level);
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
