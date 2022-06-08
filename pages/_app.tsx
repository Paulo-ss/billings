import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import PricesVisibilityProvider from "../contexts/PricesVisibility";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PricesVisibilityProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PricesVisibilityProvider>
    </>
  );
}

export default MyApp;
