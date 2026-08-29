import axios from "axios";

export let axiosinsta = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor
axiosinsta.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling 401 & automatic token refresh
axiosinsta.interceptors.response.use(
  (response) => {
    console.log(`[API Response Success] ${response.config.url}`, response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized and not already retried and not the get-act endpoint itself
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/get-act")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosinsta(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      console.warn("⚠️ 401 Unauthorized detected (Access token expired!). Triggering Interceptor to refresh token...");

      try {
        // Call backend refresh token endpoint
        const refreshResponse = await axiosinsta.get("/api/auth/get-act");
        console.log("✅ [Interceptor] Access token refreshed successfully!", refreshResponse.data);

        isRefreshing = false;
        processQueue(null);

        // Retry the original failed request with the new access token cookie set!
        return axiosinsta(originalRequest);
      } catch (refreshError) {
        console.error("❌ [Interceptor] Refresh token expired or invalid! User must log in again.", refreshError);
        isRefreshing = false;
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);