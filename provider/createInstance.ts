import axios from "axios";
import type { AxiosInstance } from "axios";

type InstanceType = {
  domain: string;
  locale: string;
};

export const createInstance = ({
  domain,
  locale,
}: InstanceType): AxiosInstance => {
  const isServer: boolean = typeof window === "undefined";
  const baseURL: string = isServer ? domain : window.location.origin;
  const instance = axios.create({
    baseURL,
    method: "GET",
    timeout: 5000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers["x-locale-code"] = locale;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      if (res.status === 200 || res.status === 304) {
        return Promise.resolve(res.data);
      }
      return Promise.resolve(res);
    },
    (error) => {
      if (error && error.response) {
        const res = {
          code: error.response.status,
          message: error.response,
        };
        return Promise.reject(res);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
