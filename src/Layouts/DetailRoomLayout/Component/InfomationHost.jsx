import { MessageFilled, PhoneFilled } from "@ant-design/icons";
import { Card, Image } from "antd";


const InformationHost = ({host}) => {
  return (
    <div className="mb-4">
      <Card className="bg-white ">
        <div className="w-30 h-30 m-auto p-1 border border-gray-200 rounded-full">
          <Image src={host.avatar} className="rounded-full" />
        </div>
        <p className="text-center m-2 font-black text-lg ">{host.name}</p>
        <div className="text-center text-sm flex w-[250px] m-auto justify-between items-center">
          <p>{host.posts} tin đăng</p>
          <span className="w-1 h-1 rounded-4xl bg-gray-400"></span>
          <p> Tham gia từ: {host.attendAt}</p>
        </div>
        <div>
          <a
            className="text-white flex justify-center rounded-4 phone"
            rel="nofollow"
            href={`tel:${host.phone}`}
          >
            <PhoneFilled className="mr-2"/> {host.phone}
          </a>
          <a
            className="text-white flex justify-center rounded-4 zalo"
            target="_blank"
            rel="nofollow"
            href={`https://zalo.me/${host.phone}`}
          >
            <MessageFilled className="mr-2"/> Nhắn Zalo
          </a>
        </div>
      </Card>
    </div>
  );
};

export default InformationHost;
