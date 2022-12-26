import { NextComponentType } from 'next';
import styles from './projects.module.scss';
import { projects } from '../../contants';
import { Project } from './project';

export const Projects: NextComponentType = () => {
  return (
    <section id='work' className={styles.projects}>
      <div className='container'>
        <div className='row'>
          <h2>FEATURED <span>WORK</span></h2>
          {projects.map(project => { return <Project key={project.id} project={project}/>})}
        </div>
      </div>
    </section>
  )
}