import "./App.scss";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
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
import ListPosts from "./Pages/Manager/ListOfNews";
import Account from "./Pages/Manager/Account";
import Profile from "./Pages/Manager/Account/Profile";
import ChangePassword from "./Pages/Manager/Account/ChangePassword";
import ForgotPasswordAccount from "./Pages/Manager/Account/ForgotPassword";
import AdminLayout from "./Layouts/AdminLayout";
import DashboardPage from "./Pages/Admin/Dashboard";
import PostManagementPage from "./Pages/Admin/ManagePost";
import AccountManagementPage from "./Pages/Admin/AccountManagementPage";
import CategoryManagementPage from "./Pages/Admin/CategoryManagement";
import PriceManagementPage from "./Pages/Admin/PricesManagement";
import PaymentManagementPage from "./Pages/Admin/PaymentManagementPage";
import { AuthProvider } from "./Utils/AuthContext";
import {
  ProtectedRoute,
  AdminRoute,
  PublicRoute,
} from "./Utils/ProtectedRoute";
import HistoryPayment from "./Pages/Manager/HistoryPayment";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
          <Route path="chi-tiet" element={<DetailRoomLayout />}>
            <Route path=":id" element={<DetailRoom />} />
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
            <Route
              path="giai-quyet-khieu-nai"
              element={<ResolveComplaints />}
            />
          </Route>

          {/* Protected routes for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="quan-ly" element={<ManageLayout />}>
              <Route path="dang-bai-moi" element={<Outlet />}>
                <Route index element={<PostNew />} />
                <Route path="thanh-toan" element={<Payment />} />
              </Route>
              <Route path="lich-su-thanh-toan" element={<HistoryPayment />} />
              <Route path="danh-sach-tin-dang" element={<ListPosts />} />
              <Route path="quan-ly-tai-khoan" element={<Account />}>
                <Route index element={<Profile />} />
                <Route path="doi-mat-khau" element={<ChangePassword />} />
                <Route
                  path="quen-mat-khau"
                  element={<ForgotPasswordAccount />}
                />
              </Route>
            </Route>
          </Route>

          {/* Public routes (accessible only when not logged in) */}
          <Route element={<PublicRoute />}>
            <Route element={<LoginLayout />}>
              <Route path="dang-nhap" element={<Login />} />
              <Route path="tao-tai-khoan-moi" element={<Register />} />
              <Route path="quen-mat-khau" element={<ForgotPassword />} />
            </Route>
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="posts" element={<PostManagementPage />} />
              <Route path="users" element={<AccountManagementPage />} />
              <Route path="categories" element={<CategoryManagementPage />} />
              <Route path="prices" element={<PriceManagementPage />} />
              <Route path="payment" element={<PaymentManagementPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
