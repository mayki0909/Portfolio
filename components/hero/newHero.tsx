import { NextComponentType } from 'next';
import styles from './hero.module.scss';

import Arrow from '/public/icons/arrow.svg';
import Link from '/public/icons/link.svg';

export const Hero: NextComponentType = () => {
  return (
    <section id='hero' className={styles.newHero}>
      <div className='container'>
        <div className='row d-none d-md-flex'>
          <div className='col-xs-12'>
            <h1>Full-stack <br/><span>WEB</span> developer.</h1>
          </div>
          <div className='col-6 align-self-end'>
            <a href='#work' className={styles.scroll} aria-label='Scroll down'>
              <Arrow width={24} height={24} />
            </a>
          </div>
          <div className={`col-6 ${styles.description}`}>
            <h2>Miha Žnidar</h2>
            <h3>Full-stack web developer based in Slovenia - Kranj & Ljubljana.</h3>
            <p>
              Interested in blockchain, web development, game development and AR/VR technologies. I have a keen eye for exploring the latest advancements in these fields and enjoy experimenting with them in my free time. As a software engineer, I am constantly striving to expand my knowledge and develop my skills to help create innovative solutions.
            </p>
            <a href='#about' aria-label='About'>
              View more  
              <Link />
            </a>
          </div>
        </div>

        <div className='row d-flex d-md-none'>
          <div className={`col-12 ${styles.mobile}`}>
            <p className={styles.title}><span>WEB</span> developer.</p>

            <h2>Miha Žnidar</h2>
            <h3>Full-stack webdeveloper based in Slovenia - Kranj & Ljubljana.</h3>
            <p>
              Interested in blockchain, web development, game development and AR/VR technologies. I have a keen eye for exploring the latest advancements in these fields and enjoy experimenting with them in my free time. As a software engineer, I am constantly striving to expand my knowledge and develop my skills to help create innovative solutions.
            </p>
            <a href='#about' aria-label='About'>
              View more
              <Link />
            </a>

            <a href='#work' className={styles.scroll} aria-label='Scroll down'>
              <Arrow width={24} height={24}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}