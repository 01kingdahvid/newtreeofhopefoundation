'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './HeroSlider.module.css'

const slides = [
  {
    title: 'SUPPORT ORPHANAGES IN SOUTH KOREA',
    text: 'HELP PROVIDE A SAFE HOME, EDUCATION, AND HOPE FOR ORPHANED CHILDREN IN SOUTH KOREA.',
    button: 'DONATE NOW',
    image: '/images/shared/hero-section-give-kazat.jpg',
    link: '/our-programs/donate?slug=shelter' // goes to donate page with shelter pre-selected
  },
  {
    title: 'EDUCATION FOR ORPHANS IN ASIA',
    text: 'EMPOWER ORPHANED CHILDREN WITH QUALITY EDUCATION AND SKILLS FOR A BRIGHTER FUTURE.',
    button: 'Learn More',
    image: '/images/shared/hero-section-give-kazat.jpg',
    link: '/our-programs/education' // program detail page for education
  },
  {
    title: 'HEALTHCARE FOR VULNERABLE CHILDREN',
    text: 'ENSURE ORPHANS AND UNDERPRIVILEGED CHILDREN RECEIVE ESSENTIAL MEDICAL CARE AND NUTRITION.',
    button: 'Learn More',
    image: '/images/shared/hero-section-give-kazat.jpg',
    link: '/our-programs/health' // program detail page for health
  },
  {
    title: 'SPONSOR AN ORPHAN IN SOUTH KOREA',
    text: "CHANGE A CHILD'S LIFE WITH MONTHLY SUPPORT FOR FOOD, EDUCATION, AND CARE.",
    button: 'Sponsor Now',
    image: '/images/shared/hero-section-give-kazat.jpg',
    link: '/donate#donation-section' // main donate page, scroll to donation section
  }
]

export default function HeroSlider () {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setIndex((index + 1) % slides.length)
  }

  const prevSlide = () => {
    setIndex(index === 0 ? slides.length - 1 : index - 1)
  }

  const slide = slides[index]

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* TEXT */}
        <div className={styles.content}>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <Link href={slide.link} passHref>
            <button>{slide.button}</button>
          </Link>
        </div>

        {/* IMAGE */}
        <div className={styles.imageWrap}>
          <img src={slide.image} alt={slide.title} />
        </div>
      </div>

      {/* ARROWS */}
      <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
        ❮
      </button>
      <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
        ❯
      </button>
    </section>
  )
}
