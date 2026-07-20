import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import { useEffect } from "react";
import { MotionConfig } from "motion/react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <Component {...pageProps} />
    </MotionConfig>
  );
}

export default MyApp;
