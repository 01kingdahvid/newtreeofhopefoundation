"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./OurProgramsSection.module.css";
import programs from "@/data/programs.json";

const OurProgramsSection = () => {
  const router = useRouter();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
  }, []);

  const handleDonateClick = (slug) => {
    router.push(`/our-programs/${slug}`);
  };

  const handleViewAllClick = () => {
    router.push("/our-programs");
  };

  return (
    <section className={styles.section} ref={ref}>
      <div className={`${styles.header} ${visible ? styles.fadeIn : ""}`}>
        <p className={styles.smallTitle}>OUR GLOBAL PROGRAMS</p>
        <h2 className={styles.title}>EXPLORE OUR HUMANITARIAN PROGRAMS</h2>
        <button className={styles.viewBtn} onClick={handleViewAllClick}>
          → VIEW ALL PROGRAMS
        </button>
      </div>

      <div className={styles.grid}>
        {programs.map((program, i) => (
          <div
            key={program.id}
            className={`${styles.card} ${
              visible ? styles.showCard : ""
            }`}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <img
              src={program.image}
              className={styles.image}
              alt={program.title}
            />

            <div className={styles.overlay}>
              <h3>{program.title}</h3>
              <p className={styles.subtitle}>{program.subtitle}</p>
            </div>

            <div className={styles.hoverContent}>
              <p>{program.description}</p>
              <button
                className={styles.donateBtn}
                onClick={() => handleDonateClick(program.slug)}
              >
                DONATE NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProgramsSection;