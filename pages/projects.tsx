import { Banner } from "../components/banner/banner";
import { Cookies } from "../components/cookies/cookies";
import { Footer } from "../components/footer/footer";
import { Navbar } from "../components/navbar/navbar";
import { Projects } from "../components/newProjects/projects";
import { SeoHead } from "../components/seo/seo-head";
import { projects } from "../contants";
import { projectsPageSchema } from "../lib/schema";
import { projectImagePath } from "../lib/seo";

const title = "Web Development Projects & Portfolio";
const description =
  "Explore web development projects by Miha Žnidar, including e-commerce platforms, web applications, and high-performance client websites.";

const keywords = [
  "web development projects",
  "portfolio",
  "Next.js projects",
  "React projects",
  "e-commerce websites",
  "full-stack developer portfolio",
  "Miha Žnidar projects",
  "Slovenia web developer",
];

const ProjectsPage = () => {
  const featuredImage = projects[0]
    ? projectImagePath(projects[0].image)
    : undefined;

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        path="/projects"
        image={featuredImage}
        keywords={keywords}
        schemas={[projectsPageSchema()]}
      />

      <main>
        <Navbar />
        <Projects page />
        <Banner />
        <Footer />
        <Cookies />
      </main>
    </>
  );
};

export default ProjectsPage;
