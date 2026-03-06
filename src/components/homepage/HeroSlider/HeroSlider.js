"use client";

import { useEffect, useState } from "react";
import styles from "./HeroSlider.module.css";

const slides = [
  {
    title: "GIVE YOUR ZAKAT",
    text: "FULFILL YOUR ZAKAT OBLIGATION TODAY AND ENSURE YOUR IMPACT REACHES THOSE WHO NEED IT MOST.",
    button: "DONATE NOW",
    image: "/images/shared/hero-section-give-kazat.jpg"
  },
  {
    title: "YEMEN EMERGENCY APPEAL",
    text: "SUPPORT THE PEOPLE OF YEMEN TODAY.",
    button: "Learn More",
    image: "/images/shared/hero-section-give-kazat.jpg"
  },
  {
    title: "SUDAN EMERGENCY APPEAL",
    text: "SUPPORT THE PEOPLE OF SUDAN TODAY!",
    button: "Learn More",
    image: "/images/shared/hero-section-give-kazat.jpg"
  },
  {
    title: "PAKISTAN FLOODS",
    text: "SUPPORT THE PEOPLE OF PAKISTAN.",
    button: "Learn More",
    image: "/images/shared/hero-section-give-kazat.jpg"
  }
];

export default function HeroSlider() {

  const [index,setIndex] = useState(0);

  useEffect(()=>{

    const timer = setInterval(()=>{
      setIndex((prev)=> (prev + 1) % slides.length);
    },8000);

    return ()=> clearInterval(timer);

  },[]);

  const nextSlide = ()=>{
    setIndex((index + 1) % slides.length);
  };

  const prevSlide = ()=>{
    setIndex(index === 0 ? slides.length - 1 : index - 1);
  };

  const slide = slides[index];

  return (

    <section className={styles.hero}>

      <div className={styles.inner}>

        {/* TEXT */}

        <div className={styles.content}>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <button>{slide.button}</button>
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

  );
}