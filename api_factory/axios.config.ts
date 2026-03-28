import axios from "axios";

const GATEWAY_ENDPOINT = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://wisekings-backend-hq.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

GATEWAY_ENDPOINT.interceptors.request.use(
  (config) => {
    if (typeof document !== 'undefined') {
      const token = document.cookie.split('; ').find(row => row.startsWith('wk_partner_token='))?.split('=')[1] || '';
      if (token) config.headers.Authorization = `Bearer ${decodeURIComponent(token)}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

GATEWAY_ENDPOINT.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest.url.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        // Get refresh token from cookie
        const refreshToken = document.cookie.split('; ').find(row => row.startsWith('wk_partner_refresh_token='))?.split('=')[1] || '';

        if (refreshToken) {
          const res = await axios.post(`${GATEWAY_ENDPOINT.defaults.baseURL}/auth/refresh`, { refreshToken: decodeURIComponent(refreshToken) });
          const { accessToken, refreshToken: newRefreshToken } = res.data.data.tokens;

          // Update tokens in cookies (with expiration)
          const cookieOptions = "; path=/; max-age=604800; SameSite=Lax"; // 7 days
          document.cookie = `wk_partner_token=${accessToken}${cookieOptions}`;
          document.cookie = `wk_partner_refresh_token=${newRefreshToken}${cookieOptions}`;

          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return GATEWAY_ENDPOINT(originalRequest);
        }
      } catch (refreshError) {
        console.error("Partner session expired. Please login again.");
      }
    }

    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    return Promise.reject({ ...error, message });
  }
);

export { GATEWAY_ENDPOINT };
