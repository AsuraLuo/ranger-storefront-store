import axios from "axios";
import type { AxiosInstance } from "axios";

import { domainConf } from "@/config/domain.conf";

type InstanceType = {
  domain: string;
  locale: string;
};

export const createInstance = ({
  domain,
  locale,
}: InstanceType): AxiosInstance => {
  const isServer: boolean = typeof window === "undefined";
  const apiURL: string = isServer ? domain : window.location.origin;
  const prefix: string =
    locale === domainConf.i18n.defaultLocale ? "" : `/${locale}`;
  const baseURL: string = `${apiURL}${prefix}/api`;

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
