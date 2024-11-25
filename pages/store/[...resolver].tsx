import type { NextPage, NextPageContext } from "next/types";

interface ResolverProps {
  query: NextPageContext["query"];
}

const Resolver: NextPage<ResolverProps> = ({ query }) => {
  return (
    <div>
      <p>Resolver</p>
      {JSON.stringify(query)}
    </div>
  );
};

Resolver.getInitialProps = async (context: NextPageContext) => {
  const { query } = context;

  return {
    query,
  };
};

export default Resolver;
