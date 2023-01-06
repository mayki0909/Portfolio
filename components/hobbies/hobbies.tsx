import { NextComponentType } from 'next';
import styles from './hobbies.module.scss';

export const Hobbies: NextComponentType = () => {
  return (
    <section id='hobbies' className={styles.hobbiesSection}>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <img src="/assets/me.jpg" alt="Miha Žnidar with mountain bike" />
          </div>
          <div className='col-12 col-md-6 d-flex-row align-self-center'>
            <div className={`${styles.item} ${styles.blue}`}>Age:  <strong>{new Date().getFullYear()-2000}</strong></div>
            <div className={`${styles.item} ${styles.purple}`}>Name: <strong>Miha Žnidar</strong></div>
            <div className={`${styles.item} ${styles.green}`}>Hobbies: <strong>Downhill, Motocycling, Fitness</strong></div>
            <div className={`${styles.item} ${styles.red}`}>Located: <strong>Slovenia, Kranj</strong></div>
            
            <div className='mt-5'>
              <p>I do various <span>sport activities</span> in my free time. But most of all I love mountain biking and snowboarding with friends.</p>
              <p>I am passionate about engineering and have built a small <span>mechanical workshop</span> in my garage where I am able to perform all the maintenance and <span>repair services</span> for my bike on my own.</p> 
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}