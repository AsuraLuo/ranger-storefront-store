import type { NextPage, NextPageContext } from "next/types";

interface PageProps {
  query: NextPageContext["query"];
}

const Page: NextPage<PageProps> = ({ query }) => {
  return (
    <div>
      <p>Page</p>
      {JSON.stringify(query)}
    </div>
  );
};

Page.getInitialProps = async (context: NextPageContext) => {
  const { query } = context;

  return {
    query,
  };
};

export default Page;
