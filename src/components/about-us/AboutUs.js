import React from 'react'
import styles from './AboutUs.module.css'
import PageHero from '../shared/PageHero/PageHero'

const AboutUs = () => {
  return (
    <div>
      <PageHero
        title='WHO WE ARE'
        subtitle='New Tree of Hope Foundation - Hope For Humanity'
        image='/images/shared/kids-2.avif'
      />

      <section className={styles.container}>
        {/* WHO WE ARE */}

        <div className={styles.row}>
          <img
            src='/images/shared/hero-section-give-kazat.jpg'
            className={styles.image}
          />

          <div className={styles.text}>
            <h2>NEW TREE OF HOPE FOUNDATION</h2>
            <h5>
              Compassionate relief and sustainable development for those most in
              need.
            </h5>

            <p>
              New Tree of Hope Foundation (NTHF) is a nonprofit humanitarian and
              development organization headquartered in Seoul, South Korea.
            </p>

            <p>
              Guided by compassion and a belief that every life matters, NTHF
              serves people whose basic needs for food, shelter, health, and
              education are unmet due to disaster, conflict, or poverty. From
              emergency relief to long-term development, we work to restore
              dignity and resilience for vulnerable communities worldwide and in
              the U.S.
            </p>

            <p>
              Our mission is not only to respond to urgent needs but to empower
              communities to rebuild their lives and create a future filled with
              possibility.
            </p>
          </div>
        </div>

        {/* VISION & MISSION */}

        <div className={styles.visionMission}>
          <div className={styles.card}>
            <h3>Our Vision</h3>

            <p>
              A world where every person affected by disaster, conflict, or
              poverty has the essentials to survive and the opportunity to
              rebuild a dignified life.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Our Mission</h3>

            <p>
              New Tree of Hope Foundation (NTHF) provides emergency aid and
              fosters sustainable development for communities in crisis. We
              deliver food, shelter, healthcare, and education, while empowering
              children, families, and vulnerable groups to overcome
              hardship—regardless of race, nationality, or religion.
            </p>
          </div>
        </div>

        {/* OUR STORY */}

        <div className={styles.rowReverse}>
          <div className={styles.text}>
            <h2>Our Story</h2>
            <h5>Empowering Humanity Together</h5>

            <p>
              New Tree of Hope Foundation (NTHF) is a humanitarian organization
              committed to uplifting lives through compassion, action, and
              community empowerment. New Tree of Hope Foundation was founded
              with a simple yet powerful belief: that even the smallest act of
              kindness can change a life. We believe that every person deserves
              a fair chance to thrive. Through collaborative efforts and
              grassroots initiatives, we strive to build a hunger-free world
              where basic human rights are accessible to all.
            </p>

            <p>
              From global crises to local challenges, we respond with urgency
              and care—providing essential aid and long-term support to
              individuals and families in need. What began as a small initiative
              to support families facing hardship has grown into a global
              humanitarian effort dedicated to addressing urgent needs and
              creating sustainable solutions.
            </p>

            <p>
              Our vision is rooted in dignity and inclusivity: we serve without
              boundaries of nationality, race, religion, or social status.
            </p>

            <p>
              Through partnerships, community engagement, and the generosity of
              supporters around the world, NTHF continues to expand its reach
              and bring hope to people who need it most.
            </p>
          </div>

          <img
            src='/images/shared/hero-section-give-kazat.jpg'
            className={styles.image}
          />
        </div>
      </section>
    </div>
  )
}

export default AboutUs
