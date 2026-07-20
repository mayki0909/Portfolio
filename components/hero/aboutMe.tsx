import { NextComponentType } from "next";
import { motion } from "motion/react";
import styles from "./hero.module.scss";
import { ArrowIcon } from "../ui/arrow-icon";

export const AboutMe: NextComponentType = () => {
  return (
    <section className={styles.aboutMe}>
      <div className={`container ${styles.aboutHeroContainer}`}>
        <div className={styles.eyebrow}>
          <span>About me</span>
          <span>Developer · Builder · Problem solver</span>
        </div>
        <h1>
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15, duration: 1 }}
          >
            Code with
          </motion.span>
          <motion.span
            className={styles.outline}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.25, duration: 1 }}
          >
            curiosity.
          </motion.span>
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.35, duration: 1 }}
          >
            Built with care.
          </motion.span>
        </h1>
        <div className={styles.aboutHeroBottom}>
          <span>Miha Žnidar · Slovenia</span>
          <p>
            I&apos;m a full-stack developer who enjoys turning complex
            challenges into clear, reliable products—and learning something new
            with every build.
          </p>
          <a href="mailto:miha.znidar7@gmail.com">
            Let&apos;s work together <ArrowIcon size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
