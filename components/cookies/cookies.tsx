import { useEffect, useState } from "react";
import styles from "./cookies.module.scss";

export const Cookies = () => {
  const [accepted, setAccepted] = useState(true);

  const acceptCookies = () => {
    sessionStorage.setItem("cookies", "true");
    setAccepted(true);
  };

  useEffect(() => {
    const cookies = window.sessionStorage.getItem("cookies");
    if (cookies !== "true") setAccepted(false);
  }, []);

  return (
    <div
      className={`${styles.modal} ${accepted ? "d-none" : "d-inline d-md-flex"}`}
    >
      <p>
        This site tracks visits anonymously using cookies. Close this dialog to
        confirm you are happy with that.
      </p>
      <button onClick={acceptCookies}>Agree and close</button>
    </div>
  );
};
