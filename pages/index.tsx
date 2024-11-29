import { useEffect } from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Home = ({ ...props }) => {
  const locale: string = props?.locale ?? "";

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch("/api/geo", {
        headers: { "X-Locale-Code": locale },
      });
      const result = await response.json();
      console.info(result);
    };

    fetchApi();
  }, [locale]);

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

export default Home;
