import { Navbar } from '../../components/navbar/navbar';
import { ProjectDetails } from '../../components/newProjects/projectDetails';
import { Projects } from '../../components/newProjects/projects';
import { Banner } from '../../components/banner/banner';
import { Footer } from '../../components/footer/footer';
import { SeoHead } from '../../components/seo/seo-head';
import { metadata } from '../../contants';
import { projectPageSchema } from '../../lib/schema';
import { projectImagePath } from '../../lib/seo';
import { ProjectService } from '../../services/projects';
import { IProject } from '../../interfaces';

export const getStaticPaths = async () => {
  try {
    const projectSlugs = await ProjectService.getProjectsSlugs();
    const paths = projectSlugs.map(slug => {
      return {
        params: {
          slug
        }
      }}
    )
    return {
      paths: paths,
      fallback: false,
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getStaticProps(context) {
  try {
    const slug = context.params.slug
    const project = await ProjectService.getProject(slug)
    return {
      props: {
        project: project
      }
    }
  } catch (error) {
    console.error(error)
  }
}

type Props = {
  project: IProject;
};

const ProjectDetailPage = ({ project }: Props) => {
  const title = `${project.name} — ${project.shortDescription}`;
  const path = `/project/${project.slug}`;

  return (
    <>
      <SeoHead
        title={title}
        description={project.description}
        path={path}
        image={projectImagePath(project.image)}
        ogType="article"
        schemas={[projectPageSchema(project)]}
      />

      <main>
        <Navbar />
        <ProjectDetails project={project} />
        <Projects />
        <Banner />
        <Footer />
      </main>
    </>
  )
}

export default ProjectDetailPage;
