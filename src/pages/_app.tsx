import type { AppProps } from "next/app";
import "../styles/globals.css";

import Layout from "components/shared/Layout";
import { PaginationProvider } from "contexts/PaginationContex";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PaginationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PaginationProvider>
  );
}

export default MyApp;
