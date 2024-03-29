import { NextComponentType } from 'next';
import styles from './hero.module.scss';

export const Hero: NextComponentType = () => {
  return (
    <section id='hero' className={styles.hero}>
      <div className='container'>
        <div className='row align-items-center'>
          <div className="col-12 col-md-4">
            <img className="rounded-circle mx-auto" data-aos="fade-right" data-aos-duration="300" data-aos-delay="200" src="assets/me.jpg" />
          </div>
          <div className='col-12 col-md-8 mw-100'>
            <h2>My name is Miha Žnidar I am full stack web developer.</h2>
            <p>Interested in blockchain, web development, game development and AR/VR technologies. In free time I experiment a lot with those technologies.</p>
          </div>
        </div>
      </div>
    </section>
  )
}