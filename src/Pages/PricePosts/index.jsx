import { CheckCircleFilled } from "@ant-design/icons";
import PriceList from "./Component/PriceList";
import Vip from "./Component/Vip";
import Vip1 from "./Component/Vip1";
import Vip2 from "./Component/Vip2";
import Regular from "./Component/Regular";

const PricePosts = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">
        Bảng giá tin đăng
      </h1>
      <PriceList />
      <h1 className="text-3xl font-bold text-center mt-20">
        Minh họa tin đăng
      </h1>
      <div className="m-auto w-3/4 mt-20">
        <Vip />
        <Vip1/>
        <Vip2/>
        <Regular/>
      </div>
    </div>
  );
};

export default PricePosts;
