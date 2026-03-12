import axios from "axios";

const GATEWAY_ENDPOINT = axios.create({
  baseURL: "https://wisekings-backend-hq.onrender.com/api/v1",
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
  (error) => {
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    return Promise.reject({ ...error, message });
  }
);

export { GATEWAY_ENDPOINT };
