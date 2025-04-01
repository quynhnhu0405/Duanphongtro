import { EnvironmentOutlined } from "@ant-design/icons";
import { formatDate } from "date-fns";

const HeaderTitle = ({ item }) => {
  return (
    <div>
      <div className="border-b border-gray-300">
        {item?.packageDetails?.level == 1 && (
          <div>
            <p className="p-1 pl-2 pr-2 bg-red-500 text-white text-xs w-fit rounded-lg mt-5">
              ⭐️⭐️⭐️⭐️ TIN VIP NỔI BẬT
            </p>
            <h1 className="uppercase font-bold text-lg mb-2 text-red-600 mt-3 ">
              {item.title}
            </h1>{" "}
          </div>
        )}
        {item.packageDetails?.level == 2 && (
          <div>
            <p className="p-1 pl-2 pr-2 bg-blue-800 text-white text-xs w-fit rounded-lg mt-5">
              ⭐️⭐️⭐️ TIN VIP 1
            </p>{" "}
            <h1 className=" uppercase font-bold text-lg mb-2 text-blue-800 mt-3">
              {item.title}
            </h1>
          </div>
        )}
        {item.packageDetails?.level == 3 && (
          <div>
            <p className="p-1 pl-2 pr-2 bg-pink-800 text-white text-xs w-fit rounded-lg mt-5">
              ⭐️⭐️ TIN VIP 2
            </p>{" "}
            <h1 className=" uppercase font-bold text-lg mb-2 text-pink-800 two-line-text mt-3">
              {item.title}
            </h1>{" "}
          </div>
        )}
        <p className="text-sm">
          <EnvironmentOutlined className="mr-2" />
          {item?.location?.street}, {item?.location?.ward},{" "}
          {item?.location?.district}, {item?.location?.province}
        </p>
        <div className="flex mt-3 items-end w-[370px] justify-between mb-4">
          <p className="text-lg text-green-600 font-black ">{item.price} đ</p>
          <span className="w-1 h-1 rounded-4xl bg-gray-400 mb-2"></span>
          <p className="text-sm">
            {item.area} m <sup>2</sup>
          </p>
          <p className="text-sm">
            Đăng tin:{" "}
            {formatDate(item?.createdAt || new Date(), "dd/MM/yyyy HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderTitle;
