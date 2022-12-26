import { useState } from 'react';
import { IProject } from '../../interfaces';
import styles from './projects.module.scss';

interface Props {
  project: IProject;
}

export const Project = (props: Props) => {
  const [showMore, setShowMore] = useState(false);

  const shortenText = (text: string) => {
    if (text.length > 300) {
      return text.substring(0, 300) + ' ...';
    }
  }
  return (
    <div className={styles.project} 
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1000"
      data-aos-mirror='true'
    >
      <div className='row'>
        <div className='col-12 col-md-8 order-2 order-md-1' data-aos="fade-right" data-aos-delay='1000'>
          <img src={`/assets/projects/${props.project.image}`} alt={props.project.name} />
        </div>
        <div className='col-12 col-md-4 order-1 order-md-2'>
          <span data-aos="fade-left" data-aos-delay='1000'>PROJECT TYPE</span>
          <h3  className={styles.title} data-aos="fade-left" data-aos-delay='1000'>{props.project.name}</h3>

          <span data-aos="fade-left" data-aos-delay='1050'>Role</span>
          <p className={styles.role} data-aos="fade-left" data-aos-delay='1050'>{props.project.roles.join(', ')}</p>

          <span data-aos="fade-left" data-aos-delay='1100'>Technologies</span>
          <p  className={styles.technologies} data-aos="fade-left" data-aos-delay='1100'>{props.project.technologies.join(', ')}</p>

          <a href={props.project.url} data-aos="fade-left" data-aos-delay='1150'>
            PREVIEW
          </a>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-delay='1200'>
        <p className={styles.description} >
          {showMore ? props.project.description : shortenText(props.project.description)}
        </p>
        <button onClick={()=>setShowMore(prev => !prev)}>
          {showMore ? 'Show less' : 'Show more'}
        </button>
      </div>
    </div>
  )
}