import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import TogglePricesProvider from "../contexts/TogglePrices";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TogglePricesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TogglePricesProvider>
    </>
  );
}

export default MyApp;
