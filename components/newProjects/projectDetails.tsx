import styles from './projects.module.scss';
import { IProject } from '../../interfaces';

interface Props {
  project: IProject;
}

export const ProjectDetails = (props: Props) => {
  return (
    <section className={styles.projectDetails}>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>{props.project.name}</h1>
          </div>
          <div className='col-12 col-md-8'>
            <p className={styles.shortDescription}>{props.project.shortDescription}</p>
          </div>
          <div className='col-12 col-md-4 d-flex justify-content-end align-items-end'>
            <a
              className={styles.websiteLink}
              href={props.project.url} 
              aria-label={`Project ${props.project.slug}`}
              target='_blank'
            >LINK TO PROJECT</a>
          </div>
          <hr />
          <div className='d-block d-md-flex'>
            <div className={styles.item}>YEAR: {new Date(props.project.createdAt).getFullYear()}</div>
            <div className={styles.item}>TECHNOLOGIES: {props.project.technologies.join(', ')}</div>
            <div className={styles.item}>ROLES: {props.project.roles.join(', ')}</div>
          </div>
          <div className='col-12'>
            <img src={`/assets/projects/${props.project.image}`} alt={`${props.project.name} project of Miha Žnidar`} />
          </div>
          <div className='col-12'>
            <p className={styles.description}>{props.project.description}</p>
          </div>
          <div className='col-12'>
            {props.project.aboutProject !== '' &&
              <p className={styles.aboutProject}>{props.project.aboutProject}</p>
            }
          </div>
          <div className='col-12 mt-5'>
            {props.project.creativeImage !== '' && 
              <img src={`/assets/projects/${props.project.creativeImage}`} alt={`${props.project.name} project of Miha Žnidar`} />
            }
          </div>
        </div>
      </div>
    </section>
  )
}