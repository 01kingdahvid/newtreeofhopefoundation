'use client'

import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
import styles from './op.module.css'

export default function Stats ({ title, stats }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  const formatStat = value => {
    const match = value.match(/^([\d.]+)([a-zA-Z%]*)$/)
    return {
      number: match ? parseFloat(match[1]) : 0,
      suffix: match ? match[2] : ''
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
  }, [])

  return (
    <section className={styles.stats} ref={ref}>
      <div className={styles.statsContainer}>
        <h2 className={visible ? styles.fadeIn : ''}>{title}</h2>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${styles.statItem} ${visible ? styles.show : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className={styles.statNumber}>
                {visible &&
                  (() => {
                    const { number, suffix } = formatStat(stat.number)

                    return (
                      <>
                        <CountUp
                          end={number}
                          duration={2}
                          decimals={number % 1 !== 0 ? 1 : 0}
                        />
                        {suffix}
                      </>
                    )
                  })()}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
