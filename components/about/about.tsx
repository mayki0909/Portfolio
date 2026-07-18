import { NextComponentType } from "next";
import styles from "./about.module.scss";
import { Reveal } from "../motion/reveal";

export const About: NextComponentType = () => {
  const capabilities = [
    [
      "01",
      "Product engineering",
      "Scalable applications built around real business needs.",
    ],
    [
      "02",
      "Front-end systems",
      "Fast, accessible interfaces with a refined visual language.",
    ],
    [
      "03",
      "Back-end platforms",
      "Reliable APIs, data models, integrations, and operations.",
    ],
  ];

  return (
    <section id="about" className={styles.aboutContainer}>
      <div className="container">
        <Reveal className={styles.aboutIntro}>
          <span className={styles.label}>About · Capabilities</span>
          <div>
            <h2>
              Engineering is the craft.
              <span>Progress is the goal.</span>
            </h2>
            <p>
              I partner with ambitious teams to turn complex ideas into digital
              products that feel simple, useful, and built to last.
            </p>
            <a href="/about">
              More about me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>

        <div className={styles.capabilities}>
          {capabilities.map(([number, title, description], index) => (
            <Reveal
              className={styles.capability}
              delay={index * 0.08}
              key={number}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <i aria-hidden="true">↗</i>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.stack}>
          <span>Working with</span>
          <div>
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Supabase",
              "Product strategy",
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
