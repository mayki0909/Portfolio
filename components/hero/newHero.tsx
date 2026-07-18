import { NextComponentType } from "next";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import styles from "./hero.module.scss";

import Arrow from "/public/icons/arrow.svg";

export const Hero: NextComponentType = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 120],
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, reduceMotion ? 1 : 0],
  );

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <span>Full-Stack Web Developer</span>
          <span>Slovenia · 46.2397° N</span>
        </motion.div>

        <motion.div
          className={styles.titleWrap}
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <h1 aria-label="Full-stack digital developer">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.15, duration: 1 }}
            >
              Full-stack
            </motion.span>
            <motion.span
              className={styles.titleAccent}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.25, duration: 1 }}
            >
              digital
            </motion.span>
            <motion.span
              className={styles.titleLast}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35, duration: 1 }}
            >
              developer<span className={styles.dot}>.</span>
            </motion.span>
          </h1>
        </motion.div>

        <div className={styles.heroBottom}>
          <motion.a
            href="#work"
            className={styles.scroll}
            aria-label="Scroll to selected work"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.08 }}
          >
            <Arrow width={22} height={22} />
            <span>Explore work</span>
          </motion.a>

          <motion.div
            className={styles.intro}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <span className={styles.introLabel}>What I do</span>
            <p>
              I design and build thoughtful digital products that connect strong
              engineering with clear, refined experiences.
            </p>
            <div className={styles.disciplines}>
              <span>Strategy</span>
              <span>Development</span>
              <span>Product</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
