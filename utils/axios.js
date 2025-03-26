import axios from "axios";
import { REGISTERAUTHKEY } from "./data";
import router from "next/router";
import { LoginUrl } from "./router";

export default axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: "application/json",
  },
});

export const authAxios = axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: "application/json",
  },
  timeout: 20000, // 10 soniya timeout
});

authAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const authKey = localStorage.getItem(REGISTERAUTHKEY);
      if (authKey) {
        config.headers.Authorization = `Bearer ${authKey}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Interceptor error:", error);

    if (!error.response || error.code === "ECONNABORTED") {
      window.alert("Network error or request timeout, Please refresh page");
    } else if (error.response.status === 401) {
      localStorage.removeItem(REGISTERAUTHKEY);
      router.push(`/${LoginUrl}`);
    }

    return Promise.reject(error);
  }
);

