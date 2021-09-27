import "bootstrap/dist/css/bootstrap.css";

import "../styles/master.scss";

import Layout1 from "../layouts/Layout1";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    // <Layout1>
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"
          rel="preload"
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
    // </Layout1>
  );
}

export default MyApp;
