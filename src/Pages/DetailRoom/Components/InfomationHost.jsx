import { MessageFilled, PhoneFilled } from "@ant-design/icons";
import { Card, Image } from "antd";

const InformationHost = ({ post }) => {
  return (
    <div className="mb-4">
      <Card className="bg-white">
        <div className="w-30 h-30 m-auto p-1 border border-gray-200 rounded-full">
          <Image 
            src={post.landlordId?.avatar || "/defaul-avt.png"} 
            className="rounded-full" 
            alt="User Avatar" 
            preview={false}
          />
        </div>
        <p className="text-center m-2 font-black text-lg">{post.landlordId?.name}</p>
        <div className="text-center">
          <p>Tham gia từ: {new Date(post.landlordId?.createAt).toLocaleDateString()}</p>
        </div>
        <div className="mt-4 space-y-2">
          <a
            className="text-white flex justify-center items-center py-2 rounded-2xl !bg-green-500 hover:!bg-green-500 transition-colors"
            rel="nofollow"
            href={`tel:${post.landlordId?.phone}`}
          >
            <PhoneFilled className="mr-2" /> {post.landlordId?.phone}
          </a>
          <a
            className="text-white flex justify-center items-center py-2 rounded-2xl  !bg-blue-500  hover:bg-blue-500 transition-colors"
            target="_blank"
            rel="nofollow"
            href={`https://zalo.me/${post.landlordId?.phone}`}
          >
            <MessageFilled className="mr-2" /> Nhắn Zalo
          </a>
        </div>
      </Card>
    </div>
  );
};

export default InformationHost;