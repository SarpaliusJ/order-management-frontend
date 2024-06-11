import axios from "axios";
import router from "@/router";
import store from "@/store";

const AxiosService = axios.create({
  baseURL: "http://localhost/api",
  timeout: 10000,
});

AxiosService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Token has expired"
      ) {
        store.dispatch("logout");
        router.push("/login");
      }
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default AxiosService;
