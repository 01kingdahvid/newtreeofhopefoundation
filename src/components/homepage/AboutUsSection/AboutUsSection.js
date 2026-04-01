'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './AboutUsSection.module.css'
import { useRouter } from 'next/navigation'

const AboutUsSection = () => {
  const router = useRouter()
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

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

  const handleAboutUsClick = () => {
    router.push('/about-us')
  }

  return (
    <section className={styles.aboutSection} ref={ref}>
      <div className={styles.container}>
       

        <div className={`${styles.content} ${visible ? styles.showRight : ''}`}>
          <span className={styles.smallHeading}>ABOUT NTHF</span>

          <h1 className={styles.title}>A Home for Every Child Who Needs One</h1>

            <p className={styles.description}>
            New Tree of Hope Foundation (NTHF) is a nonprofit orphanage and
            child welfare organization headquartered in Seoul, South Korea. We
            exist for one reason - the children in our care. Each child who
            walks through our doors carries a story of loss, hardship, or
            uncertainty, and it is our privilege to rewrite that story with
            love, safety, and opportunity. At NTHF, every child is known by
            name, valued beyond measure, and surrounded by a family that will
            never give up on them.
          </p>

          <button className={styles.cta} onClick={handleAboutUsClick}>
            LEARN ABOUT NTHF
          </button>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection
