import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Attach JWT access token to every request
api.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem("auth-store");
      if (raw) {
        const parsed = JSON.parse(raw);
        const token = parsed?.state?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // silently ignore parse errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api };
