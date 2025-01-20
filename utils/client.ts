import { serverCookie } from "./cookies";

export interface Options {
  domain?: string;
  encode?: string;
  expires?: string;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  sameSite?: boolean | string;
  secure?: boolean;
}

interface Cookie {
  setItem: (name: string, value: any, options?: Options) => void;
  getItem: (name: string) => any;
  getAll: () => any;
  removeItem: (name: string, options?: Options) => void;
  cleanItem: (name: string, options?: Options) => void;
}

export const clientCookie: Cookie = {
  setItem: (name: string, value: any, options?: Options) => {
    serverCookie.setItem(null, name, value, options);
  },
  getItem: (name: string) => {
    return serverCookie.getItem(null, name);
  },
  getAll: () => serverCookie.getAll(null),
  removeItem: (name: string, options?: Options) => {
    serverCookie.removeItem(null, name, options);
  },
  cleanItem: (name: string, options?: Options) => {
    serverCookie.removeItem(null, name, options);
  },
};
