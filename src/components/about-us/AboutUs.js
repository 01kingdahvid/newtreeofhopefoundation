'use client'

import React, { useRef, useEffect, useState } from 'react';
import styles from './AboutUs.module.css';
import PageHero from '../shared/PageHero/PageHero';

const AboutUs = () => {
  const rowRef = useRef(null);
  const rowReverseRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  const [rowInView, setRowInView] = useState(false);
  const [rowReverseInView, setRowReverseInView] = useState(false);
  const [card1InView, setCard1InView] = useState(false);
  const [card2InView, setCard2InView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            switch (entry.target) {
              case rowRef.current:
                setRowInView(true);
                break;
              case rowReverseRef.current:
                setRowReverseInView(true);
                break;
              case card1Ref.current:
                setCard1InView(true);
                break;
              case card2Ref.current:
                setCard2InView(true);
                break;
              default:
                break;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    if (rowReverseRef.current) observer.observe(rowReverseRef.current);
    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <PageHero
        title="WHO WE ARE"
        subtitle="New Tree of Hope Foundation — A Family Built on Love"
        image="/images/shared/kids-2.avif"
      />

      <section className={styles.container}>

        {/* WHO WE ARE */}
        <div
          ref={rowRef}
          className={`${styles.row} ${rowInView ? styles.animate : ''}`}
        >
          <img
            src="/images/shared/abt-kids.jpg"
            alt="Children at New Tree of Hope Foundation"
            className={styles.image}
          />

          <div className={styles.text}>
            <h2>NEW TREE OF HOPE FOUNDATION</h2>
            <h5>
              More than an orphanage - a home where every child is cherished,
              protected, and given a future worth dreaming about.
            </h5>
            <p>
              New Tree of Hope Foundation (NTHF) is a nonprofit orphanage and
              child welfare home based in Seoul, South Korea. We are a small,
              dedicated team bound together not by resources, but by a deep and
              unwavering commitment to the children under our roof. Every child
              in our care has faced loss - some have lost parents, some have
              lost stability, and some have lost the simple assurance that
              someone will be there for them. We exist to be that someone.
            </p>
            <p>
              At NTHF, our children are not cases or statistics. They are
              individuals - with personalities, gifts, dreams, and a right to
              a life full of warmth and dignity. From the youngest toddler
              finding their footing, to the teenager preparing to step into
              the world, we walk alongside each one with patience, love, and
              intentionality. Our home is their home, and their wellbeing is
              our greatest calling.
            </p>
            <p>
              We are honest about our limitations. We are a growing
              organization, and there are more children who need us than our
              current resources allow. But we press forward every day - because
              for every child already in our care, giving up is simply not an
              option. With the support of generous donors and partners, we are
              slowly but steadily building the kind of home every child
              deserves.
            </p>
          </div>
        </div>

        {/* VISION & MISSION */}
        <div className={styles.visionMission}>
          <div
            ref={card1Ref}
            className={`${styles.card} ${card1InView ? styles.animate : ''}`}
          >
            <h3>Our Vision</h3>
            <p>
              A world where no child under NTHF's care ever feels forgotten,
              unloved, or without a future. We envision a fully resourced home
              where every child has a safe bed, a full plate, quality education,
              proper healthcare, and the emotional security that comes from
              belonging to a family - even when life has taken theirs away.
            </p>
          </div>

          <div
            ref={card2Ref}
            className={`${styles.card} ${card2InView ? styles.animate : ''}`}
          >
            <h3>Our Mission</h3>
            <p>
              New Tree of Hope Foundation provides a safe, nurturing, and
              structured home for orphaned and vulnerable children. Through
              holistic care - food, shelter, healthcare, education, and
              emotional support - we raise children who are resilient, loved,
              and equipped for life. Every decision we make, every resource we
              steward, and every partnership we pursue is done with one goal:
              the flourishing of the children in our care.
            </p>
          </div>
        </div>

        {/* OUR STORY */}
        <div
          ref={rowReverseRef}
          className={`${styles.rowReverse} ${rowReverseInView ? styles.animate : ''}`}
        >
          <div className={styles.text}>
            <h2>Our Story</h2>
            <h5>
              It started with a child who had nowhere to go - and a few hearts
              that couldn't turn away.
            </h5>
            <p>
              New Tree of Hope Foundation was not born out of a strategic plan
              or a polished proposal. It was born out of a moment of conscience
              - the quiet, unmistakable weight of seeing a child in need and
              choosing to do something about it. What began as small, personal
              acts of care in Seoul - opening a door, providing a meal, offering
              a safe place to sleep - gradually took shape into the organization
              we are today.
            </p>
            <p>
              We are still small, and we carry that truth with both humility
              and urgency. There are children in our community who haven't yet
              found their way to us. There are rooms we haven't been able to
              open, needs we haven't been able to fully meet. But every day, we
              stretch what we have as far as it will go - because the children
              already with us are counting on us, and the ones who haven't
              arrived yet deserve our continued readiness.
            </p>
            <p>
              Our story is still being written - one child at a time. With
              every donor who believes in our mission, every volunteer who
              gives their time, and every partner who stands with us, NTHF
              grows stronger and more capable of being the home these children
              need. We are a family in progress - and we are grateful you
              are part of it.
            </p>
          </div>

          <img
            src="/images/shared/abt-donation.jpg"
            alt="Support and care at New Tree of Hope Foundation"
            className={styles.image}
          />
        </div>

      </section>
    </div>
  );
};

export default AboutUs;