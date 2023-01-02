import { NextComponentType } from 'next';
import styles from './about.module.scss';

export const About: NextComponentType = () => {
  return (
    <section id='about' className={styles.aboutContainer}>
      <div className='container'>
        <div className='d-flex'>
          <div className={styles.offer}>What I offer</div>
        </div>
        <div className='row'>
          <div className={`col-md-8 ${styles.textContainer}`}>
            <h2>Delivering modern, clean & intuitive web solutions.</h2>
            <p>I'm enjoying to develop websites and applications for brands and businesses. Using these technologies: React.js, Next.js, Node.js, MongoDB and having no problem learning something new. Always staying in touch with newest developing trends.</p>
          </div>
          <div className='col-md-4'>
            <p className={`${styles.item} ${styles.purple}`}><span>01/</span> Front-end development</p>
            <p className={`${styles.item} ${styles.blue}`}><span>02/</span> Back-end development</p>
            <p className={`${styles.item} ${styles.green}`}><span>03/</span> Web3 development</p>
          </div>
        </div>
      </div>
    </section>
  )
}