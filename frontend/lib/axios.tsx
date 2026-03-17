import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.NODE_ENV === "production" ? import.meta.env.VITE_API_URL : "/api",
  withCredentials: true,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json"
  }
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute = originalRequest.url?.includes("/login") || originalRequest.url?.includes("/refresh");
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;
      try {
        await api.post("/refresh");
        return api(originalRequest);
      } catch (refreshError) {

        window.location.replace("/login?message=session_expired");
        return Promise.reject(refreshError);

      }
    }
    return Promise.reject(error);
  }
)

export default api
