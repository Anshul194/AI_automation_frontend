import axios from "axios";

// API base URL
const API_BASE_URL =
  import.meta.env.VITE_BASE_URL ;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60 * 60 * 1000, // 1 hour in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["x-access-token"] = token;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        config.headers["x-refresh-token"] = refreshToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response interceptor with Google Analytics token refresh logic
import store from './src/store';
import { setTokens } from './src/store/slices/connection';
import { refreshGoogleAccessToken } from './src/store/slices/refreshToken';

let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Only handle Google Analytics endpoints
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      originalRequest.url &&
      originalRequest.url.includes('/google-analytics') &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const gaTokens = JSON.parse(localStorage.getItem('ga_tokens') || '{}');
        const refresh_token = gaTokens.refresh_token || localStorage.getItem('refreshToken');
        if (!refresh_token) throw new Error('No refresh token available');
        const data = await refreshGoogleAccessToken(refresh_token);
        // Update localStorage and Redux
        const newTokens = {
          access_token: data.access_token,
          refresh_token: data.refresh_token || refresh_token,
        };
        localStorage.setItem('ga_tokens', JSON.stringify(newTokens));
        localStorage.setItem('accessToken', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refreshToken', data.refresh_token);
        }
        store.dispatch(setTokens(newTokens));
        processQueue(null, data.access_token);
        originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Optionally clear tokens on failure
        localStorage.removeItem('ga_tokens');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
