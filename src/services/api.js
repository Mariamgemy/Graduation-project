import axios from "axios";
import { API_BASE_URL } from "../api/config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة interceptor لإضافة التوكن تلقائياً
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally if needed, e.g., redirect to login on 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - possibly expired token.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
