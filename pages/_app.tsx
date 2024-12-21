import Head from "next/head";
import { Profiler } from "react";
import { withScan } from "react-scan";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps, AppContext } from "next/app";
import type { AxiosInstance } from "axios";

import EmotionRegistry from "@/lib/emotion/registry";
import { cache } from "@/config/cache";
import { emotionTheme } from "@/config/emotion";
import { muiTheme } from "@/config/mui";
import { AxiosProvider, withAxios } from "@/provider";
import GlobalStyled from "@/components/GlobalStyled";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface NextAppProps extends AppProps {
  axiosInstance: AxiosInstance;
}

const App = ({ Component, pageProps, router, ...props }: NextAppProps) => {
  const { axiosInstance } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AxiosProvider axiosInstance={axiosInstance}>
        <EmotionRegistry
          cacheOptions={cache}
          muiTheme={muiTheme}
          emotionTheme={emotionTheme}
        >
          <CssBaseline />
          <GlobalStyled />
          <Header />
          <main
            style={{
              maxWidth: "1280px",
              minHeight: "80dvh",
              margin: "0 auto",
              padding: "20px 0",
            }}
          >
            <Profiler
              id="MyComponent"
              onRender={(
                id,
                phase,
                actualDuration,
                baseDuration,
                startTime,
                commitTime
              ) => {
                console.log("Profiler data:", {
                  id,
                  phase,
                  actualDuration,
                  baseDuration,
                  startTime,
                  commitTime,
                });
              }}
            >
              <Component {...pageProps} locale={router.locale} />
            </Profiler>
          </main>
          <Footer />
        </EmotionRegistry>
      </AxiosProvider>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps({ ...ctx })
    : {};

  return { pageProps };
};

export default withScan(withAxios(App));
