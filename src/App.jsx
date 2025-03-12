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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
