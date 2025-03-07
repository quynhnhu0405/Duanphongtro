import HotRoom from "./Component/HotRoom";
import FamousProvince from "./Component/FamousProvince";
import HotApartment from "./Component/HotApartment";
import HotNews from "./Component/HotNews";
import About from "./Component/About";

const HomePage = () => {
  return (
    <div>
      <HotRoom />
      <FamousProvince />
      <HotApartment />
      <HotNews />
      <About />
    </div>
  );
};
export default HomePage;
