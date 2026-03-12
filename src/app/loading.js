'use client'

import { Spin } from 'antd'
import styles from './layout.module.css'

export default function Loading () {
  return (
    <div className={styles.container}>
      <div className={`${styles.logoLink} ${styles.pulse}`}>
        <div className={styles.logoIcon}>
          <img
            src='/images/logos/nthf-logo.png'
            alt='New Tree of Hope Foundation'
            className={styles.logoImg}
          />
          <div className={styles.logoText}>
            <span>NTHF</span>
            <small>New Tree Of Hope Foundation</small>
          </div>
        </div>
      </div>
      <Spin
        size='large'
        style={{ color: '#1aa2cc' }}
        className={styles.pulse}
      />
    </div>
  )
}
