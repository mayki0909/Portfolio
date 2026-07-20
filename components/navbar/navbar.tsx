import { NextComponentType } from "next";
import { useEffect, useState } from "react";
import styles from "./navbar.module.scss";

import Linkedin from "/public/icons/linkedin.svg";
import Github from "/public/icons/github.svg";
import Menu from "/public/icons/menu.svg";
import Close from "/public/icons/close.svg";
import Logo from "/public/icons/logo.svg";

export const Navbar: NextComponentType = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={`container ${styles.nav}`} aria-label="Main navigation">
        <a className={styles.brand} href="/" aria-label="Miha Žnidar, home">
          <span className={styles.brandMark}>
            <Logo width={18} height={18} />
          </span>
          <span>Miha Žnidar</span>
          <small>©{new Date().getFullYear()}</small>
        </a>

        <div className={styles.desktopLinks}>
          <a href="/projects">Work</a>
          <a href="/about">About</a>
          <a href="/#contact">Contact</a>
        </div>

        <div className={styles.actions}>
          <span className={styles.availability}>
            <i aria-hidden="true" />
            Available for work
          </span>
          <a
            className={styles.social}
            href="https://www.linkedin.com/in/miha-žnidar"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
          <a
            className={styles.social}
            href="https://github.com/mayki0909"
            target="_blank"
            rel="noreferrer"
            aria-label="Github"
          >
            <Github />
          </a>
          <button
            className={styles.menuButton}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? (
              <Close width={20} height={20} />
            ) : (
              <Menu width={20} height={20} />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
        aria-hidden={!open}
      >
        <div className={`container ${styles.mobileMenuInner}`}>
          <span className={styles.menuLabel}>Navigation</span>
          <a href="/" onClick={closeMenu}>
            Home <small>01</small>
          </a>
          <a href="/projects" onClick={closeMenu}>
            Work <small>02</small>
          </a>
          <a href="/about" onClick={closeMenu}>
            About <small>03</small>
          </a>
          <a href="/#contact" onClick={closeMenu}>
            Contact <small>04</small>
          </a>
          <div className={styles.mobileMeta}>
            <span>Kranj, Slovenia</span>
            <span>Full-stack developer</span>
          </div>
        </div>
      </div>
    </header>
  );
};
