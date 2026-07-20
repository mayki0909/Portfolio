import { NextComponentType } from "next";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
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
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const firstLineX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const accentLineX = useTransform(smoothX, [-0.5, 0.5], [22, -22]);
  const lastLineX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const titleRotate = useTransform(smoothY, [-0.5, 0.5], [0.8, -0.8]);

  return (
    <section
      id="hero"
      className={styles.hero}
      ref={sectionRef}
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className={styles.orbitScene} aria-hidden="true">
        <motion.div
          className={`${styles.orbit} ${styles.orbitOuter}`}
          style={{ scaleY: 0.68 }}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          <span className={styles.orbitNode} />
        </motion.div>
        <motion.div
          className={`${styles.orbit} ${styles.orbitInner}`}
          style={{ scaleY: 0.72 }}
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <span className={styles.orbitNode} />
        </motion.div>
        <motion.div
          className={styles.orbitCore}
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className={`${styles.floatingLabel} ${styles.labelOne}`}>
          React / Next.js
        </span>
        <span className={`${styles.floatingLabel} ${styles.labelTwo}`}>
          Ideas to products
        </span>
      </div>

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
          style={{
            y: titleY,
            opacity: titleOpacity,
            rotate: reduceMotion ? 0 : titleRotate,
          }}
        >
          <h1 aria-label="Full-stack digital developer">
            <motion.span
              style={{ x: reduceMotion ? 0 : firstLineX }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.15, duration: 1 }}
            >
              Full-stack
            </motion.span>
            <motion.span
              className={styles.titleAccent}
              style={{ x: reduceMotion ? 0 : accentLineX }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.25, duration: 1 }}
            >
              digital
            </motion.span>
            <motion.span
              className={styles.titleLast}
              style={{ x: reduceMotion ? 0 : lastLineX }}
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
            <motion.span
              className={styles.scrollIcon}
              animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Arrow width={22} height={22} />
            </motion.span>
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
