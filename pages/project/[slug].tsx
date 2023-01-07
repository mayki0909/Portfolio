import Head from 'next/head'
import { Navbar } from '../../components/navbar/navbar';
import { ProjectDetails } from '../../components/newProjects/projectDetails';
import { Projects } from '../../components/newProjects/projects';
import { Banner } from '../../components/banner/banner';
import { Footer } from '../../components/footer/footer'; 
import { metadata } from '../../contants'; 
import { ProjectService } from '../../services/projects';

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

const ProjectDetailPage = ({project}) => {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="6QgNpyUunNctzrJ9dlKxlVbAT9DuOURhu28mlek6JQQ" />
        
        <link rel='icon' href='/favicon.ico' />
        <title>{metadata.title}</title>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />


        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />


        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metadata.url} />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content={`${metadata.url}${metadata.image}`} />
      </Head>

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