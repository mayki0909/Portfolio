import { NextComponentType } from "next";
import styles from "./hobbies.module.scss";
import { Reveal } from "../motion/reveal";

export const Hobbies: NextComponentType = () => {
  const facts = [
    ["Based in", "Kranj, Slovenia"],
    ["Experience", "Web products & platforms"],
    ["Focus", "Full-stack engineering"],
    ["Away from screen", "Mountain biking · Snowboarding"],
  ];

  return (
    <section id="hobbies" className={styles.hobbiesSection}>
      <div className="container">
        <Reveal className={styles.story}>
          <span className={styles.label}>A little more personal</span>
          <div>
            <h2>
              Always moving—on screen and <em>off it.</em>
            </h2>
            <p>
              Outside of development, I recharge in nature. Mountain biking,
              snowboarding, camping, and hands-on mechanical work keep me
              curious, focused, and comfortable solving unfamiliar problems.
            </p>
          </div>
        </Reveal>

        <div className={styles.facts}>
          {facts.map(([label, value], index) => (
            <Reveal className={styles.fact} delay={index * 0.06} key={label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{label}</small>
              <strong>{value}</strong>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.quote}>
          <span>“</span>
          <p>
            The best products come from equal parts curiosity, discipline, and
            care for the people who will use them.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
