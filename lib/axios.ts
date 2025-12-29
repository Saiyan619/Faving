import axios from "axios"
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    withCredentials: true
});

api.interceptors.request.use((config) => {
    console.log("Request config", config.url, config.method)
    return config;
}
)

api.interceptors.response.use(
    (response)=>response,
    (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Not authenticated");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
)