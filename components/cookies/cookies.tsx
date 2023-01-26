import Script from 'next/script';
import { useEffect, useState } from 'react'
import styles from './cookies.module.scss'

export const Cookies = () => {
  const [accepted, setAccepted] = useState(true);

  const accpetCookies = () => {
    sessionStorage.setItem('cookies', 'true');
    setAccepted(true)
  }

  useEffect(() =>{
    const cookies = window.sessionStorage.getItem('cookies');
    if (cookies !== 'true') setAccepted(false)
  }, [])

  return (
    <>        
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-T2RSCD3EPM"></Script>
      <Script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-T2RSCD3EPM');
      `}</Script>
      <div className={`${styles.modal} ${accepted ? 'd-none' : 'd-inline d-md-flex'}`}>
        <p>This site tracks visits anonymously using cookies. Close this dialog to confirm you are happy with that.</p>
        <button onClick={()=>accpetCookies()}>Aggree and close</button>
      </div>
    </>
  )
}