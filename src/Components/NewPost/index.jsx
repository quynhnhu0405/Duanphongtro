import { Card } from "antd";
import { formatTimeAgo } from "../../Utils/dateUtil";
const post = [
  {
    id: 1,
    title:
      "Cho thuê nhà trọ giá rẻ sát Chợ Thành Nam, an ninh, chỉ 800k/tháng (có nhà ngay)",
    image: "./src/assets/1.jpg",
    createdAt: "2025-03-11 17:00",
    price: "4.5 triệu/tháng",
  },
  {
    id: 2,
    title:
      "Cho thuê nhà trọ giá rẻ sát Chợ Thành Nam, an ninh, chỉ 800k/tháng (có nhà ngay)",
    image: "./src/assets/1.jpg",
    createdAt: "2025-03-11 17:00",
    price: "4.5 triệu/tháng",
  },
  {
    id: 3,
    title:
      "Cho thuê nhà trọ giá rẻ sát Chợ Thành Nam, an ninh, chỉ 800k/tháng (có nhà ngay)",
    image: "./src/assets/1.jpg",
    createdAt: "2025-03-11 17:00",
    price: "4.5 triệu/tháng",
  },
  {
    id: 4,
    title:
      "Cho thuê nhà trọ giá rẻ sát Chợ Thành Nam, an ninh, chỉ 800k/tháng (có nhà ngay)",
    image: "./src/assets/1.jpg",
    createdAt: "2025-03-11 17:00",
    price: "4.5 triệu/tháng",
  },
  {
    id: 5,
    title:
      "Cho thuê nhà trọ giá rẻ sát Chợ Thành Nam, an ninh, chỉ 800k/tháng (có nhà ngay)",
    image: "./src/assets/1.jpg",
    createdAt: "2025-03-11 17:00",
    price: "4.5 triệu/tháng",
  },
];
const NewPost = () => {
  return (
    <Card title="Tin mới đăng" className="new-post">
      <div>
        <ul>
          {post.map((item) => (
            <li key={item.id} >
              <a
                className="flex items-center"
                href={`/${item.title}`}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-20 rounded-2xl h-20"
                />
                <div className="ml-4">
                  <p className="two-line-text text-blue-700 text-[15px] font-bold">
                    {item.title}
                  </p>
                  <div className="flex justify-between text-sm text-black mt-2">
                    <p className="font-bold text-green-600">{item.price}</p>
                    <p>{formatTimeAgo(item.createdAt)}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default NewPost;
