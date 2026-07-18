import { IProject } from "../../interfaces";
import styles from "./projects.module.scss";
import { motion } from "motion/react";

import Arrow from "/public/icons/arrow.svg";

interface Props {
  project: IProject;
  index: number;
}

export const Project = (props: Props) => {
  const number = String(props.index + 1).padStart(2, "0");

  return (
    <motion.article
      className={styles.project}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9 }}
    >
      <a
        href={`/project/${props.project.slug}`}
        aria-label={`View ${props.project.name} case study`}
      >
        <div className={styles.projectTopline}>
          <span>{number}</span>
          <span>{new Date(props.project.createdAt).getFullYear()}</span>
        </div>
        <div className={styles.media}>
          <motion.img
            src={`/assets/projects/${props.project.image}`}
            alt={props.project.name}
            width="1200"
            height="675"
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className={styles.viewProject}>
            <Arrow width={24} height={24} alt="Arrow" />
          </div>
        </div>
        <div className={styles.projectInfo}>
          <div>
            <h3>{props.project.name}</h3>
            <p>{props.project.shortDescription}</p>
          </div>
          <div className={styles.meta}>
            <span>{props.project.roles.join(" · ")}</span>
            <span>{props.project.technologies.slice(0, 3).join(" · ")}</span>
          </div>
        </div>
      </a>
    </motion.article>
  );
};
