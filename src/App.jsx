import "./App.scss";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./Layouts/DefaultLayout";
import PostingRegulation from "./Pages/PostingRegulations";
import Introduce from "./Pages/Introduce";
import ActiveRegulation from "./Pages/Regulations";
import TermsOfUse from "./Pages/TermsOfUse";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Questions from "./Pages/Questions";
import InstructPost from "./Pages/Instruct";
import HomeLayout from "./Layouts/HomeLayout";
import HomePage from "./Pages/Home";
import ResolveComplaints from "./Pages/Complaints";
import MotelRoom from "./Pages/MotelRoom";
import PolicyLayout from "./Layouts/PolicyLayout";
import Apartments from "./Pages/Apartments";
import Roommate from "./Pages/Roommate";
import DetailRoom from "./Pages/DetailRoom";
import DetailRoomLayout from "./Layouts/DetailRoomLayout";
import LoginLayout from "./Layouts/LoginLayout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import PricePosts from "./Pages/PricePosts";
import PricePostsLayout from "./Layouts/PricePostLayout";
import PostNew from "./Pages/Manager/PostNewNews";
import ManageLayout from "./Layouts/ManageLayout";
import Payment from "./Pages/Manager/Payment";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="phong-tro" element={<MotelRoom />} />
          <Route path="chung-cu" element={<Apartments />} />
          <Route path="o-ghep" element={<Roommate />} />
        </Route>
        <Route element={<PricePostsLayout />}>
          <Route path="bang-gia" element={<PricePosts />} />
        </Route>
        <Route element={<DetailRoomLayout />}>
          <Route path="chi-tiet" element={<DetailRoom />} />
        </Route>
        <Route element={<PolicyLayout />}>
          <Route path="quy-dinh-dang-tin" element={<PostingRegulation />} />
          <Route path="gioi-thieu" element={<Introduce />} />
          <Route path="quy-che-hoat-dong" element={<ActiveRegulation />} />
          <Route path="quy-dinh-su-dung" element={<TermsOfUse />} />
          <Route path="chinh-sach-bao-mat" element={<PrivacyPolicy />} />
          <Route path="cau-hoi-thuong-gap" element={<Questions />} />
          <Route path="huong-dan-dang-tin" element={<InstructPost />} />
          <Route path="quy-dinh-dang-tin" element={<PostingRegulation />} />
          <Route path="giai-quyet-khieu-nai" element={<ResolveComplaints />} />
        </Route>
        <Route path="quan-ly" element={<ManageLayout />}>
          <Route path="dang-bai-moi" element={<PostNew />}/>
          <Route path="dang-bai-moi/thanh-toan" element={<Payment />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path="dang-nhap" element={<Login />} />
          <Route path="tao-tai-khoan-moi" element={<Register />} />
          <Route path="quen-mat-khau" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
