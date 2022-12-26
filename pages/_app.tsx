import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "../styles/global.scss";
import { useEffect } from "react";
import AOS from "aos";

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({});
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;