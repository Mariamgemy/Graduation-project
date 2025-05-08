import axios from "axios";

// Define the base URL for the API
// Vite uses import.meta.env for environment variables (prefixed with VITE_)
// Define VITE_API_BASE_URL in a .env file at the project root if needed
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7197/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for request or response handling (e.g., adding auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      // Add the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally if needed, e.g., redirect to login on 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Optional: Clear token and redirect to login
      // localStorage.removeItem("authToken");
      // localStorage.removeItem("userEmail");
      // window.location.href = 
      console.error("Unauthorized access - possibly expired token.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;

