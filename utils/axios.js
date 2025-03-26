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
  timeout: 10000, // 10 soniya timeout
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
    if (!error.response || error.code === "ECONNABORTED") {
      // Connection yoki timeout xatosi
      // console.error("Network error or request timeout:", error.message);
      window.alert("Network error or request timeout, Please refresh page");
    } else if (error.response.status === 401) {
      // Auth xatosi
      localStorage.removeItem(REGISTERAUTHKEY);
      router.push(`/${LoginUrl}`);
    }

    return Promise.reject(error);
  }
);
