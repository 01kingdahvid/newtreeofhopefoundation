"use client";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <p>🌙 Never forget a night – Automate your Ramadan Giving</p>
        <button>Schedule My Giving</button>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.logoIcon}>
            <img
              src='/images/logos/nthf-logo.png'
              alt='New Tree of Hope Foundation helping children'
              className={styles.logo}
            />

            <div className={styles.logo}>
              <span>NTHF</span>
              <small>New Tree Of Hope Foundation</small>
            </div>
          </div>

        <ul className={styles.navLinks}>
          <li>Home</li>
          <li>About Us</li>
          <li>Our Programs</li>
          <li>Contact Us</li>
          <li>Get Involved</li>
        </ul>

        <div className={styles.actions}>
          {/* <span className={styles.icon}>🔍</span>
          <span className={styles.icon}>👤</span> */}
          <button className={styles.donate}>Donate</button>
        </div>
      </nav>
    </header>
  );
}