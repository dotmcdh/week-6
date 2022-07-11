import type { AppProps } from "next/app";
import { CartStateContextProvider } from "../components/Cart/CartContext";
import { Layout } from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartStateContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartStateContextProvider>
  );
}

export default MyApp;
