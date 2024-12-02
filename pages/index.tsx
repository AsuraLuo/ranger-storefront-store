import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { NextPageContext } from "next/types";
import type { AxiosInstance } from "axios";

interface PageContext extends NextPageContext {
  axiosInstance: AxiosInstance;
}

const Home = ({ ...props }) => {
  const locale: string = props?.locale ?? "";

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home Page" />
      </Head>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            {locale.toLocaleUpperCase()} Website Home Page
          </Typography>
        </Box>
      </Container>
    </>
  );
};

Home.getInitialProps = async (ctx: PageContext) => {
  const { axiosInstance } = ctx;

  try {
    const { data } = await axiosInstance.get("/api/geo");
    console.info(data);
  } catch (error: any) {
    console.info(error);
  }

  return {};
};

export default Home;
