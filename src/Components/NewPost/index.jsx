import { Card } from "antd";
import { formatTimeAgo } from "../../Utils/dateUtil";
import { useEffect, useState } from "react";
import { postService } from "../../Utils/api";
import slugify from "slugify";
const NewPost = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    postService.getLatestPosts()
      .then(response => {
        console.log("Dữ liệu từ API:", response.data);
        setPost(response.data);
      })
      .catch(error => console.error("Lỗi API:", error));
  }, []);
  return (
    <Card title="Tin mới đăng" className="new-post">
      <div>
        <ul>
          {post.slice(0, 8).map((item) => (
            <li key={item._id} >
              <a
                className="flex items-center"
                href={`/chi-tiet/${slugify(item?._id, { lower: true, locale: "vi" })}`}
              >
                <img
                  src={item.images[0]}
                  alt=""
                  className="!w-20 rounded-2xl h-20"
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
