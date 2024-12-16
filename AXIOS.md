## Axios 支持 nextjs 多站点配置集成:

#### 1. 安装 axios npm 依赖

```sh
pnpm add axios -w
```

#### 2. 创建 axios 实列全局配置 (createInstance.ts)

```ts
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
```

#### 3. 封装 withAxios 高阶组件，暴露内置 axiosInstance 实列和目前环境 locale 到 ctx 上下文对象 (withAxios.tsx)

```tsx
import { Component } from "react";

import { createInstance } from "./createInstance";

export const withAxios = (App: any) =>
  class AppWithAxios extends Component {
    private axiosInstance: any;

    static async getInitialProps(appContext: any) {
      const { router } = appContext;
      const { locale } = router;

      const isServer: boolean = typeof window === "undefined";
      const proto: string = isServer
        ? appContext.ctx?.req?.headers?.["x-forwarded-proto"] ?? ""
        : window.location.protocol;
      const host: string = isServer
        ? appContext.ctx?.req?.headers?.host ?? ""
        : window.location.host;
      const domain: string = isServer
        ? `${proto}://${host}`
        : `${proto}//${host}`;

      const instance = createInstance({ domain, locale });
      // Provide the apollo to getInitialProps of pages
      appContext.ctx.axiosInstance = instance;

      // Run wrapped getInitialProps methods
      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        axiosInstance: instance,
        domain,
      };
    }

    constructor(props: any) {
      super(props);
      this.axiosInstance = createInstance({
        locale: props?.router?.locale,
        domain: props?.domain,
      });
    }

    render() {
      return <App axiosInstance={this.axiosInstance} {...this.props} />;
    }
  };

// 封装的高阶组件withAxios必须在_app.tsx里面进行使用，类似于withRedux
App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps({ ...ctx })
    : {};

  return { pageProps };
};

export default withAxios(App);
```

#### 4. 封装 Context, Provider, useHooks 等，包裹 axios 实列 (axiosProvier.ts)

```tsx
import React, { createContext, useContext } from "react";
import { AxiosInstance } from "axios";

const AxiosContext = createContext<AxiosInstance | null>(null);

type AxiosProviderType = {
  children: React.ReactNode;
  axiosInstance: AxiosInstance;
};

export const AxiosProvider: React.FC<AxiosProviderType> = ({
  axiosInstance,
  children,
}) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);

  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return context;
};
```

#### 5. 服务端 SSR API 请求案列

```tsx
Home.getInitialProps = async (ctx: PageContext) => {
  const { axiosInstance } = ctx;

  try {
    const { data } = await axiosInstance.get("/api/config/api/country/list");
    return { data };
  } catch (error: any) {
    console.info("error:", error);
    return { data: {} };
  }
};

export default Home;
```

#### 6. 客户端 CSR API 请求案列

```tsx
import { useEffect } from "react";

import { useAxios } from "@/provider";
import Link from "@/components/Link";

const Header = () => {
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await axiosInstance.get(
        "/api/config/api/mallConfig/getCurrentTime"
      );
      console.info(data);
    };

    fetchApi();
  }, [axiosInstance]);

  return (
    <div className="grid">
      <Link href="/">Website Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/store/retail">URL Key</Link>
    </div>
  );
};

export default Header;
```

#### 7. 迁移所有 apis 目录下面的方法，修改为使用 const 变量

```ts
export const userPageApi: string = "/carpooling/user/page";

export const placeListApi: string = "/carpooling/place/list";

export const tripApi: string = "/carpooling/trip/page";

export const tripDateApi: string = "/carpooling/trip/tripDate";
```

#### 8. nextjs 对于 i18n 多站点配置获取 locale

```tsx
// SSR
Home.getInitialProps = async (ctx: PageContext) => {
  const { locale, locales } = ctx;

  return {
    locale,
    locales,
  };
};

// CSR
import { useRouter } from "next/compact/router";

const Component = () => {
  const router = useRouter();
  const { locale, locales } = router;

  return <div />;
};

export default Component;
```

#### 9. 按照以上步骤进行集成，主要难点还是对于步骤 2， 5， 6 的改动集成
