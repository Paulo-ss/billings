import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import PricesVisibilityProvider from "../contexts/PricesVisibility";
import LoadingTopBar from "../components/util/loadingTopBar/LoadingTopBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PricesVisibilityProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <LoadingTopBar />
      </PricesVisibilityProvider>
    </>
  );
}

export default MyApp;
