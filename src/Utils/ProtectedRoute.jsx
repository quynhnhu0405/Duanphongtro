import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router";
import { Spin } from "antd";

// Component to protect routes that require authentication
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  return isAuthenticated() ? <Outlet /> : <Navigate to="/dang-nhap" />;
};

// Component to protect admin routes
export const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  return isAuthenticated() && isAdmin() ? (
    <Outlet />
  ) : (
    <Navigate to="/dang-nhap" />
  );
};

// Component for public routes (redirect to home if already authenticated)
export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};
