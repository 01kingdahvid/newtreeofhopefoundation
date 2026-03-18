"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Programs.module.css";
import programs from "@/data/programs.json";

const Programs = () => {
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
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.grid}>
        {programs.map((program, i) => (
          <Link
            key={program.id}
            href={`/our-programs/${program.slug}`}
            className={styles.cardLink}
          >
            <div
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
                <p className={styles.subtitle}>
                  {program.subtitle}
                </p>
              </div>

              <div className={styles.hoverContent}>
                <p>{program.description}</p>

                <button className={styles.donateBtn}>
                  DONATE NOW
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Programs;