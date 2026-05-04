import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json"
  }
})

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute = originalRequest.url?.includes("/login") || originalRequest.url?.includes("/refresh");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        api.post("/refresh")
          .then(() => {
            processQueue(null);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err);
            if (window.location.pathname.startsWith('/dashboard')) {
              window.location.replace("/login?message=session_expired");
            }
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);



api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status >= 500) {
       const payload = {
            type: 'FEATURE_EVENT',
            eventName: 'api_crash',
            metadata: { 
                url: error.config?.url,
                method: error.config?.method,
                status: error.response?.status,
                errorMessage: error.message
            },
            sessionId: sessionStorage.getItem('analytics_session_id') || 'untracked'
        };

        // We use fetch with keepalive to push the error silently without blocking the UI
        fetch(api.defaults.baseURL + '/analytics/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true
        }).catch(() => {});
    }
    return Promise.reject(error);
  }
);


export default api
