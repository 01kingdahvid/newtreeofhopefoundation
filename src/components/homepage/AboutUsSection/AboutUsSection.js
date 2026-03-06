import React from "react";
import styles from "./AboutUsSection.module.css";

const AboutUsSection = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        <div className={styles.imageWrap}>
          <img
            src="/images/shared/hero-section-give-kazat.jpg"
            alt="New Tree of Hope Foundation helping children"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.smallHeading}>ABOUT NTHF</span>

          <h1 className={styles.title}>
            Who We Are and Why We Serve
          </h1>

          <p className={styles.description}>
            New Tree Of Hope Foundation (NTHF) is a nonprofit humanitarian and
            development organization headquartered in Seoul, South Korea.
            Guided by compassion and inclusivity, NTHF serves people whose
            basic needs for food, shelter, health, and education are unmet
            due to disaster, conflict, or poverty. From emergency relief to
            long-term development, we work to restore dignity and resilience
            for vulnerable communities worldwide and in South Korea.
          </p>

          <button className={styles.cta}>
            LEARN ABOUT NTHF
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;