import { NextComponentType } from "next";
import styles from "./projects.module.scss";
import { projects } from "../../contants";
import { Project } from "./project";
import { Reveal } from "../motion/reveal";

export const Projects: NextComponentType = () => {
  return (
    <section id="work" className={styles.projects}>
      <div className="container">
        <Reveal className={styles.projectsHeader}>
          <div>
            <span className={styles.kicker}>Selected work · 2025—2026</span>
            <h2>
              Building products with <em>purpose.</em>
            </h2>
          </div>
          <p>
            A selection of digital products created from first idea to
            production—combining product thinking, design, and engineering.
          </p>
        </Reveal>
        <div className={styles.projectList}>
          {projects.slice(0, 3).map((project, index) => (
            <Project key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
