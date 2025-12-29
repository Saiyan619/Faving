import axios from "axios"
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  // console.log("API Request:", config.method?.toUpperCase(), config.url)
  return config;
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Auth Check: User is not authenticated. Redirecting to login...");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
)