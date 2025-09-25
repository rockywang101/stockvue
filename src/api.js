import axios from "axios";

// 讀取環境變數
const baseURL = import.meta.env.VITE_API_BASE_URL;

// 建立 Axios 實例
const api = axios.create({
  baseURL,
  timeout: 10000, // 10秒 timeout
});

// 這裡可加上攔截器（例如自動帶 Token、錯誤處理）
api.interceptors.request.use(
  (config) => {
    // 假設要自動帶 Token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data, // 預設只回傳 data
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
