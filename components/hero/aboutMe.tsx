import { NextComponentType } from 'next';
import styles from './hero.module.scss';

export const AboutMe: NextComponentType = () => {
  return (
    <section className={styles.aboutMe}>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
            <h1>Hello <br/><em></em> my name is <span>Miha</span></h1>
          </div>
          <div className='col-xs-12 offset-0 offset-md-6 col-md-6'>
            <p>Enjoy spending time in nature hiking, riding <span>mountain bike</span> or camping.</p>
          </div>
        </div>
      </div>
    </section>
  );
}