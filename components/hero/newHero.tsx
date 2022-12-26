import { NextComponentType } from 'next';
import styles from './hero.module.scss';

import Arrow from '/public/icons/arrow.svg';
import Link from '/public/icons/link.svg';

export const Hero: NextComponentType = () => {
  return (
    <section className={styles.newHero}>
      <div className='container'>
        <div className='row d-none d-md-flex'>
          <div className='col-xs-12'>
            <h2>Creative</h2>
            <h1><span>WEB</span> developer.</h1>
          </div>
          <div className='col-6 align-self-end'>
            <a href='#work' className={styles.scroll}>
              <Arrow width={24} height={24}/>
            </a>
          </div>
          <div className={`col-6 ${styles.description}`}>
            <h3>Miha Žnidar</h3>
            <h4>Full-stack developer based in Slovenia - Kranj & Ljubljana</h4>
            <p>Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. 
              Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. Lorem ipsum is simply dummy.Lorem ipsum is simply dummy.Lorem ipsum is simply dummy. 
              Lorem ipsum is simply dummy.
            </p>
            <a href='#work'>
              View more  
              <Link />
            </a>
          </div>
        </div>

        <div className='row d-flex d-md-none'>
          <div className={`col-12 ${styles.mobile}`}>
            <h1><span>WEB</span> developer.</h1>

            <h3>Miha Žnidar</h3>
            <h4>Full-stack developer based in Slovenia - Kranj & Ljubljana</h4>
            <p>Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. 
              Lorem ipsum is simply dummy. Lorem ipsum is simply dummy. Lorem ipsum is simply dummy.Lorem ipsum is simply dummy.Lorem ipsum is simply dummy. 
              Lorem ipsum is simply dummy.
            </p>
            <a href='#work'>
              View more
              <Link />
            </a>

            <a href='#work' className={styles.scroll}>
              <Arrow width={24} height={24}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}