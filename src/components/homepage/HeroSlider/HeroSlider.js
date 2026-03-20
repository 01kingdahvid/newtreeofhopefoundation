'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './HeroSlider.module.css'

const slides = [
  {
    title: 'A SAFE HOME FOR NTHF CHILDREN',
    text: 'At New Tree of Hope Foundation, every child deserves a safe place to sleep, grow, and feel loved. Your support helps us provide a stable home and a brighter future for every child in our care.',
    button: 'Donate Now',
    image: '/images/shared/hero-orphan-g1.jpg',
    link: '/our-programs/donate?slug=shelter'
  },
  {
    title: 'EDUCATION THAT SHAPES THEIR FUTURE',
    text: 'We equip NTHF children with the education, tools, and support they need to succeed in school and in life — building confidence, knowledge, and lifelong opportunities.',
    button: 'Learn More',
    image: '/images/shared/hero-edu.jpg',
    link: '/our-programs/education'
  },
  {
    title: 'CARING FOR THEIR HEALTH AND WELL-BEING',
    text: 'From routine care to critical medical support, we ensure every NTHF child receives the attention and treatment they need to grow up healthy and strong.',
    button: 'Learn More',
    image: '/images/shared/hero-healthcare.jpg',
    link: '/our-programs/health'
  },
  {
    title: 'BECOME PART OF A CHILD’S STORY',
    text: 'Your support provides daily care, education, and stability for children at NTHF. Together, we can give them the love, security, and opportunities they deserve.',
    button: 'Support a Child',
    image: '/images/shared/hero-orphan-g2.jpg',
    link: '/donate#donation-section'
  }
]

export default function HeroSlider () {
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      triggerSlideChange(prev => (prev + 1) % slides.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  const triggerSlideChange = newIndexFn => {
    setAnimate(false) // reset animation
    setTimeout(() => {
      setIndex(newIndexFn)
      setAnimate(true) // trigger animation
    }, 100)
  }

  const nextSlide = () => {
    triggerSlideChange((index + 1) % slides.length)
  }

  const prevSlide = () => {
    triggerSlideChange(index === 0 ? slides.length - 1 : index - 1)
  }

  const slide = slides[index]

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* TEXT */}
        <div className={`${styles.content} ${animate ? styles.fadeIn : ''}`}>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <Link href={slide.link}>
            <button>{slide.button}</button>
          </Link>
        </div>

        {/* IMAGE */}
        <div className={`${styles.imageWrap} ${animate ? styles.zoomIn : ''}`}>
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
