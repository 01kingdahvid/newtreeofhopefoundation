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
              A small team with a big heart, working tirelessly to bring hope
              to those who need it most.
            </h5>

            <p>
              New Tree of Hope Foundation (NTHF) is a grassroots nonprofit
              headquartered in Seoul, South Korea. We started with a simple
              belief: that even a handful of dedicated people can make a real
              difference. Today, we are still that handful—a small but passionate
              team committed to serving vulnerable communities across Asia.
            </p>

            <p>
              The truth is, we are not a large organization with endless
              resources. We are a growing family of givers, doers, and dreamers
              who often stretch every dollar to reach one more child, one more
              family. Our vision is vast—a world where no one goes hungry,
              homeless, or hopeless—but our current reach is limited by funds
              and capacity. That’s why every partnership, every donation, and
              every prayer matters. With your help, we can grow from a small
              tree into a forest of hope.
            </p>

            <p>
              Guided by compassion and a belief that every life matters, NTHF
              serves people whose basic needs for food, shelter, health, and
              education are unmet due to disaster, conflict, or poverty. From
              emergency relief to long-term development, we work to restore
              dignity and resilience for vulnerable communities in South Korea
              and across Asia.
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
              rebuild a dignified life. We dream of expanding our reach to
              every corner of Asia and beyond—but we know we can’t do it alone.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Our Mission</h3>

            <p>
              New Tree of Hope Foundation (NTHF) provides emergency aid and
              fosters sustainable development for communities in crisis. With
              the resources we have, we deliver food, shelter, healthcare, and
              education, while empowering children, families, and vulnerable
              groups to overcome hardship—regardless of race, nationality, or
              religion. As we grow, we aim to deepen our impact and broaden our
              reach, one community at a time.
            </p>
          </div>
        </div>

        {/* OUR STORY */}

        <div className={styles.rowReverse}>
          <div className={styles.text}>
            <h2>Our Story</h2>
            <h5>From a seed of compassion to a growing tree of hope.</h5>

            <p>
              New Tree of Hope Foundation began not in a boardroom, but in the
              hearts of a few individuals who saw suffering and refused to look
              away. What started as small acts of kindness—delivering meals to
              elderly neighbors in Seoul, collecting school supplies for
              orphanages—has slowly grown into an organized effort to serve
              communities across Asia.
            </p>

            <p>
              But the truth is, we are still small. There are countless
              villages we haven’t reached, orphanages we haven’t renovated,
              children we haven’t sponsored. Our potential to do good far
              outstrips our current resources. We are working day and night to
              change that—building partnerships, raising awareness, and
              stretching every donation to its maximum impact. We believe that
              with more support, we can become the organization we dream of
              being: one that can respond to every crisis, uplift every
              community, and give every child a future.
            </p>

            <p>
              Our vision is rooted in dignity and inclusivity: we serve without
              boundaries of nationality, race, religion, or social status.
              Through partnerships, community engagement, and the generosity of
              supporters around the world, NTHF continues to expand its reach
              and bring hope to people who need it most—one step, one meal, one
              life at a time.
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