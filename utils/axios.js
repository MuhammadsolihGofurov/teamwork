import axios from "axios";
import { REGISTERAUTHKEY } from "./data";

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
