import { NextComponentType } from 'next';
import { useEffect, useState } from 'react';
import styles from './navbar.module.scss';

import Linkedin from '/public/icons/linkedin.svg';
import Github from '/public/icons/github.svg';
import Menu from '/public/icons/menu.svg';
import Close from '/public/icons/close.svg';

export const Navbar: NextComponentType = () => {

  const [open, setOpen] = useState(false);
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.hash)
  },[open])
  return (
    <>
      <section className={styles.desktopNavbar}>
        <nav className='container d-none d-md-flex flex-row justify-content-between'>
          <a className={styles.button} href='/' aria-label='Home'>
            MIHA ŽNIDAR @2022
          </a>
    
          <div className='d-flex'>
            <a className={styles.link} href="/#work" aria-label='Projects'>Projects</a>
            <a className={styles.link} href="/about" aria-label='About'>About me</a>
            <a className={styles.link} href="/#contact" aria-label='Contact'>Contact me</a>
            <div className={styles.breaker}></div>
            <a 
              className={styles.buttonCircle} 
              href='https://www.linkedin.com/in/miha-žnidar' 
              target='_blank'
              aria-label='LinkedIn'
              >
              <Linkedin />
            </a>
            <a 
              className={styles.buttonCircle} 
              href='https://github.com/mayki0909' 
              target='_blank'
              aria-label='Github'
              >
              <Github />
            </a>
          </div>
        </nav>
      </section>
      <section className={styles.mobileNavbar}>
        <nav className='d-block d-md-none'>
          <div className='d-flex justify-content-between'>
            <a className={styles.home} href='/' aria-label='Home'>
              M. @2022
            </a>

            <button onClick={()=>setOpen(!open)} aria-label='Open navigation'>
              {!open && <Menu width={20} height={20} />}
              {open && <Close width={20} height={20} />}
            </button>
          </div>
          <div className={`${styles.dropdown} ${open ? styles.open : styles.close}`}>
            <div className={styles.stickBottom}>
              <a href='/#home' onClick={()=>setOpen(false)} aria-label='Home'>
                <p className={path.includes('#home') ? styles.active : styles.unactive}>HOME</p>
              </a>
              <a href='/#work' onClick={()=>setOpen(false)} aria-label='Projects'>
                <p className={path.includes('#work') ? styles.active : styles.unactive}>WORK</p>
              </a>
              <a href='/about' onClick={()=>setOpen(false)} aria-label='About'>
                <p className={path.includes('about') ? styles.active : styles.unactive}>ABOUT ME</p>
              </a>
              <a href='/#contact' onClick={()=>setOpen(false)} aria-label='Contact'>
                <p className={path.includes('#contact') ? styles.active : styles.unactive}>CONTACT ME</p>
              </a>
            </div>
          </div>
        </nav>
      </section>
    </>
  )
}