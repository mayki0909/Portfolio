import { NextComponentType } from 'next';
import styles from './banner.module.scss';

export const Banner: NextComponentType = () => {
  return (
    <div className={styles.container}>
      <div className={styles.marquee}>
        <span className={styles.text}>LET'S <span className={styles.purple}>TALK</span>&nbsp;&nbsp;</span>
      </div>
      <div className={styles.marquee}>
        <span className={`${styles.text} ${styles.delay}`}>LET'S <span className={styles.purple}>TALK</span>&nbsp;&nbsp;</span>
      </div>
    </div>
  )
}