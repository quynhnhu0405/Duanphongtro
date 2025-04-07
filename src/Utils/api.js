import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (credentials) => api.post("/users/login", credentials),
  register: (userData) => api.post("/users/register", userData),
  forgotPassword: (data) => api.post("/users/forgot-password", data),
};

// Post services
export const postService = {
  getAll: () => api.get("/posts"),
  getById: (id) => api.get(`/posts/${id}`),
  getMotelRooms: (params) => api.get("/posts/phong-tro", { params }),
  getApartments: (params) => api.get("/posts/can-ho", { params }),
  getRoommates: (params) => api.get("/posts/o-ghep", { params }),
  getUserPosts: () => api.get("/posts/my-posts"),
  createPost: (postData) => api.post("/posts", postData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  searchPosts: (params) => api.get("/posts/search", { params }),
  getLatestPosts: () => api.get("/posts/latest-posts"),
  getMyPosts: () => api.get(`/posts/my-posts`),
  createPayment: (paymentData) => api.post("/payments", paymentData),
  updatePostStatus: (id, status) => api.patch(`/posts/admin/${id}/status`, { status }),
  hiddenPost: (id) => api.delete(`/posts/${id}`),
  renewPost: (postId,postData) => api.put(`/posts/${postId}/renew`, postData),
  getPostByUserId: (userId) => api.get(`/posts/count/${userId}`),
};
  

// Payment services
export const paymentService = {
  createPayment: (paymentData) => api.post("/payments", paymentData),
  completePayment: (id) => api.patch(`/payments/${id}/complete`),
  getUserPayments: () => api.get("/payments/my-payments"),
};

// Category services
export const categoryService = {
  getAll: () => api.get("/categories"),
};

// Utility services
export const utilityService = {
  getAll: () => api.get("/utilities"),
};

// Package services
export const packageService = {
  getAll: () => api.get("/packages"),
};

// Admin services
export const adminService = {
  approvePost: (id, data) => api.patch(`/posts/admin/${id}/approve`, data),
  getAllUsers: () => api.get("/users"),
};

// User services
export const userService = {
  getUser: (id) => api.get(`/users/user/${id}`),
  updateProfile: (id, data) => api.put(`/users/${id}`, data),
  getMyProfile: () => api.get("/users/my-profile"),
  changePassword: (data) => api.post("/users/change-password", data),
};

export default api;
