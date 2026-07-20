import styles from "./projects.module.scss";
import { IProject } from "../../interfaces";
import { motion } from "motion/react";
import { Reveal } from "../motion/reveal";
import { ArrowIcon } from "../ui/arrow-icon";

interface Props {
  project: IProject;
}

export const ProjectDetails = (props: Props) => {
  return (
    <section className={styles.projectDetails}>
      <div className={`container ${styles.detailContainer}`}>
        <div className={styles.detailEyebrow}>
          <a href="/#work">
            <ArrowIcon direction="left" size={14} /> Selected work
          </a>
          <span>{new Date(props.project.createdAt).getFullYear()}</span>
        </div>

        <div className={styles.detailHero}>
          <h1>
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.15, duration: 1 }}
            >
              {props.project.name}
            </motion.span>
          </h1>
          <p className={styles.shortDescription}>
            {props.project.shortDescription}
          </p>
          <a
            className={styles.websiteLink}
            href={props.project.url}
            aria-label={`Visit ${props.project.name}`}
            target="_blank"
            rel="noreferrer"
          >
            Visit live project <ArrowIcon size={14} />
          </a>
        </div>

        <motion.div
          className={styles.detailMedia}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 1 }}
        >
          <img
            src={`/assets/projects/${props.project.image}`}
            alt={`${props.project.name} project by Miha Žnidar`}
          />
        </motion.div>

        <Reveal className={styles.detailMeta}>
          <div>
            <span>Role</span>
            <p>{props.project.roles.join(" · ")}</p>
          </div>
          <div>
            <span>Technology</span>
            <p>{props.project.technologies.join(" · ")}</p>
          </div>
          <div>
            <span>Year</span>
            <p>{new Date(props.project.createdAt).getFullYear()}</p>
          </div>
        </Reveal>

        <Reveal className={styles.narrative}>
          <span>Overview</span>
          <div>
            <h2>{props.project.description}</h2>
            {props.project.aboutProject && <p>{props.project.aboutProject}</p>}
          </div>
        </Reveal>

        {props.project.creativeImage && (
          <Reveal className={styles.secondaryMedia}>
            <img
              src={`/assets/projects/${props.project.creativeImage}`}
              alt={`${props.project.name} interface`}
            />
          </Reveal>
        )}

        <Reveal className={styles.nextProject}>
          <span>Continue exploring</span>
          <a href="/#work">
            View all selected work
            <i>
              <ArrowIcon size={24} />
            </i>
          </a>
        </Reveal>
      </div>
    </section>
  );
};
