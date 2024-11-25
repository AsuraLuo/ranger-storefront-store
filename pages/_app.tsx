import Head from "next/head";
import type { AppProps, AppContext } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";

import EmotionRegistry from "@/lib/emotion/registry";
import { cache } from "@/config/cache";
import { emotionTheme } from "@/config/emotion";
import { muiTheme } from "@/config/mui";
import GlobalStyled from "@/components/GlobalStyled";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
            padding: "20px",
          }}
        >
          <Component {...pageProps} />
        </main>
        <Footer />
      </EmotionRegistry>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps({ ...ctx })
    : {};

  return { pageProps };
};

export default App;
