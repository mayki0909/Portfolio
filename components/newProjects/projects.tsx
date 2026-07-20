import styles from "./projects.module.scss";
import { projects } from "../../contants";
import { Project } from "./project";
import { Reveal } from "../motion/reveal";
import { ArrowIcon } from "../ui/arrow-icon";

type ProjectsProps = {
  limit?: number;
  showViewMore?: boolean;
  page?: boolean;
};

export const Projects = ({
  limit,
  showViewMore = false,
  page = false,
}: ProjectsProps) => {
  const visibleProjects =
    typeof limit === "number" ? projects.slice(0, limit) : projects;
  const Heading = page ? "h1" : "h2";
  const sectionClassName = page
    ? `${styles.projects} ${styles.projectsPage}`
    : styles.projects;

  return (
    <section
      id={page ? "projects" : "work"}
      className={sectionClassName}
      aria-label={page ? "All projects" : "Selected work"}
    >
      <div className="container">
        <Reveal className={styles.projectsHeader}>
          <div>
            <span className={styles.kicker}>
              {page ? "Project archive · 2021—2026" : "Selected work · 2025—2026"}
            </span>
            <Heading>
              {page ? "Selected projects, built with " : "Building products with "}
              <em>purpose.</em>
            </Heading>
          </div>
          <p>
            {page
              ? "Explore client work and digital products spanning e-commerce, platforms, and high-performance websites."
              : "A selection of digital products created from first idea to production—combining product thinking, design, and engineering."}
          </p>
        </Reveal>
        <div className={styles.projectList}>
          {visibleProjects.map((project, index) => (
            <Project key={project.id} project={project} index={index} />
          ))}
        </div>
        {showViewMore && visibleProjects.length < projects.length && (
          <Reveal className={styles.viewMore}>
            <a href="/projects" aria-label="View more projects">
              View more <ArrowIcon size={18} />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
};
