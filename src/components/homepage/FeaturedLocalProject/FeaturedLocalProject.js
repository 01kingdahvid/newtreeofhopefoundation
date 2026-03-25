'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import styles from './FeaturedLocalProject.module.css'

const projects = [
  {
    title: 'Food Pantry',
    icon: (
      <img
        src='/images/shared/local-project-food-1.png'
        alt='Food Pantry'
        className={styles.icon}
      />
    )
  },
  {
    title: 'Homeless Outreach',
    icon: (
      <img
        src='/images/shared/local-project-education-2.png'
        alt='Homeless Outreach'
        className={styles.icon}
      />
    )
  },
  {
    title: 'Seasonal Distribution',
    icon: (
      <img
        src='/images/shared/local-project-seasonal-1.png'
        alt='Seasonal Distribution'
        className={styles.icon}
      />
    )
  }
]

export default function FeaturedLocalProject () {
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

  const handleViewAllClick = () => {
    router.push('/our-programs')
  }

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <p className={`${styles.subheading} ${visible ? styles.fadeIn : ''}`}>
          FEATURED LOCAL PROJECTS
        </p>

        <h2 className={`${styles.heading} ${visible ? styles.fadeIn : ''}`}>
          NTHF'S LOCAL PROJECTS
        </h2>

        <p className={`${styles.description} ${visible ? styles.fadeIn : ''}`}>
          At NTHF, we take care of orphaned children under our care. 
        </p>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <div
              key={i}
              className={`${styles.card} ${visible ? styles.showCard : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {project.icon}
              <span>{project.title}</span>
            </div>
          ))}
        </div>

        <button
          className={`${styles.button} ${visible ? styles.fadeIn : ''}`}
          onClick={handleViewAllClick}
        >
          → VIEW OUR PROGRAMS
        </button>
      </div>
    </section>
  )
}
