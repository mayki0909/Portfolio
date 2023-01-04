import { NextComponentType } from 'next';
import styles from './banner.module.scss';

export const Banner: NextComponentType = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollingText}>
        <p>LET'S <span>TALK</span></p>
      </div>
    </div>
  )
}