import React from 'react'
import styles from './Footer.module.css'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* COLUMN 1 */}
        <div className={styles.col}>
          <Link href='/' className={styles.logoLink}>
            <div className={styles.logoIcon}>
              <img
                src='/images/logos/nthf-logo.png'
                alt='New Tree of Hope Foundation helping children'
                className={styles.logoImg}
              />
              <div className={styles.logoText}>
                <span>NTHF</span>
                <small>New Tree Of Hope Foundation</small>
              </div>
            </div>
          </Link>

          <ul className={styles.contact}>
            <li>📍 Seoul, South Korea</li>
            <li>📞 +82 000 000 000</li>
            <li>✉️ contact@treeofhopefoundation.org</li>
          </ul>

          {/* <div className={styles.socials}>
            <span>f</span>
            <span>x</span>
            <span>ig</span>
            <span>yt</span>
            <span>t</span>
          </div> */}
        </div>

        {/* COLUMN 2 */}
        <div className={styles.col}>
          <h3>OTHER WAYS TO DONATE</h3>
          <ul>
            <li>BTC: donate@nthf.org</li>
            <li>ETH: donate@nthf.org</li>
            <li>SOL: sgshssheyye</li>
          </ul>

          <button className={styles.donateBtn}>DONATE</button>
        </div>

        {/* COLUMN 3 */}
        <div className={styles.col}>
          <h3>QUICK LINKS</h3>

          <ul>
            <li>ABOUT US</li>
            <li>OUR STORY</li>
            <li>OUR PROGRAMS</li>
            <li>GET INVOLVED</li>
            <li>CONTACT US</li>
            {/* <li>IMPACT</li>
            <li>WAYS TO HELP</li>
            <li>PARTNERSHIPS</li>
            <li>EVENTS</li> */}
          </ul>

          {/* <h4 className={styles.subheading}>LEGAL & POLICY</h4>

          <ul>
            <li>LEGAL DOCUMENTS</li>
            <li>DONOR INTENT POLICY</li>
            <li>FUNDRAISING POLICY</li>
            <li>PRIVACY POLICY</li>
          </ul> */}
        </div>

        {/* COLUMN 4 */}
        <div className={styles.col}>
          <h3>OUR PROGRAMS</h3>

          <ul>
            <li>RAMADAN</li>
            <li>EMERGENCY RELIEF</li>
            <li>FOOD SECURITY</li>
            <li>WASH</li>
            <li>HEALTH</li>
            <li>SHELTER</li>
            <li>CHILD PROTECTION</li>
            <li>EDUCATION</li>
            <li>FAITH BASED GIVING</li>
            <li>WOMEN EMPOWERMENT</li>
          </ul>
        </div>

        {/* COLUMN 5 */}
        <div className={styles.col}>
          <h3>JOIN OUR MAILING LIST</h3>

          <input type='email' placeholder='Email' className={styles.input} />

          <button className={styles.subscribeBtn}>SUBSCRIBE</button>

          <p className={styles.note}>
            NTHF is a registered nonprofit humanitarian organization. Donations
            help support vulnerable communities worldwide.
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} New Tree of Hope Foundation. All Rights
        Reserved.
      </div>
    </footer>
  )
}

export default Footer
