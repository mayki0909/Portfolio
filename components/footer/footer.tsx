import { NextComponentType } from 'next';
import styles from './footer.module.scss';

export const Footer: NextComponentType = () => {
  return (
    <section id='contact' className={styles.section}>
      <div className={`container ${styles.container}`}>
        <h4>LET'S TALK ABOUT <span>YOUR</span> NEXT PROJECT</h4>
        <div className='d-block d-md-flex justify-content-center'>
          <a className={styles.button} href="mailto:miha.znidar7@gmail.com">Write a message</a>
          <a className={styles.button} href="mailto:miha.znidar7@gmail.com">Discuss a project</a>
        </div>

        <div className={`row ${styles.linksContainer}`}>
          <div className='col-xs-12 col-md-3 offset-md-1'>
            <span>Get in touch</span>
            <p>miha.znidar7@gmail.com</p>
          </div>
          <div className='col-xs-12 col-md-4'>
            <span>Explore</span>
            <p>
              <a href="/">Home</a>
              <a href="/#work">Work</a>
              <a href="/about">About me</a>
              <a href="/#contact">Contact me</a>
            </p>
          </div>
          <div className='col-xs-12 col-md-2'>
            <span>Social</span>
            <p>
              <a     
                href='https://www.linkedin.com/in/miha-žnidar'
                target='_blank'
              >LinkedIn</a>
              <a               
                href='https://github.com/mayki0909'
                target='_blank'
              >Github</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}