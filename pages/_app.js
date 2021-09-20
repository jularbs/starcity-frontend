import "bootstrap/dist/css/bootstrap.css";

import "../styles/master.scss";

import Layout1 from "../layouts/Layout1";

function MyApp({ Component, pageProps }) {
  return (
    <Layout1>
      <Component {...pageProps} />
    </Layout1>
  );
}

export default MyApp;
