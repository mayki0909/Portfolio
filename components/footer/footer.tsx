import { NextComponentType } from "next";
import styles from "./footer.module.scss";

export const Footer: NextComponentType = () => {
  return (
    <section id="contact" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topline}>
          <span>Have a project in mind?</span>
          <span>Kranj · Slovenia</span>
        </div>
        <h4>
          Let&apos;s make it <span>real.</span>
        </h4>
        <a className={styles.button} href="mailto:miha.znidar7@gmail.com">
          Start a conversation
          <i aria-hidden="true">↗</i>
        </a>

        <div className={styles.linksContainer}>
          <div>
            <span>Direct</span>
            <a href="mailto:miha.znidar7@gmail.com">miha.znidar7@gmail.com</a>
          </div>
          <div>
            <span>Explore</span>
            <p className={styles.linkList}>
              <a href="/">Home</a>
              <a href="/#work">Work</a>
              <a href="/about">About</a>
            </p>
          </div>
          <div>
            <span>Social</span>
            <p className={styles.linkList}>
              <a
                href="https://www.linkedin.com/in/miha-žnidar"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/mayki0909"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </p>
          </div>
        </div>
        <div className={styles.bottomline}>
          <span>© {new Date().getFullYear()} Miha Žnidar</span>
          <a href="#hero">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
};
