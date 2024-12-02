import axios from "axios";
import type { AxiosInstance } from "axios";

type InstanceType = {
  locale: string;
};

export const createInstance = ({ locale }: InstanceType): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 5000,
  });

  instance.interceptors.request.use((config) => {
    if (typeof window === "undefined") {
      config.headers["x-locale-code"] = locale;
    } else {
      config.headers["x-locale-code"] = locale;
    }
    return config;
  });

  return instance;
};
