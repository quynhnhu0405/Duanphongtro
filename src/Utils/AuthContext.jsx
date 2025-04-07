import { createContext, useState, useEffect, useContext } from "react";
import { message } from "antd";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user & token từ localStorage khi app mount
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
      }
    }

    setLoading(false);
  }, []);

  // Đăng nhập
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("userToken", authToken);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // Cập nhật user sau khi chỉnh sửa profile
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    message.success("Đã đăng xuất thành công");
    navigate("/dang-nhap");
  };

  // Kiểm tra đã đăng nhập chưa
  const isAuthenticated = () => !!token;

  // Kiểm tra quyền admin
  const isAdmin = () => user?.role === "admin";

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,     
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
