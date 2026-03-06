"use client";

import React from "react";
import styles from "./OurProgramsSection.module.css";
import programs from "@/data/programs.json";

const OurProgramsSection = () => {
  return (
    <section className={styles.section}>

      <div className={styles.header}>
        <p className={styles.smallTitle}>OUR GLOBAL PROGRAMS</p>

        <h2 className={styles.title}> 
          EXPLORE OUR HUMANITARIAN PROGRAMS
        </h2>

        <button className={styles.viewBtn}>
          → VIEW ALL PROGRAMS
        </button>
      </div>

      <div className={styles.grid}>
        {programs.map((program) => (
          <div
            key={program.id}
            className={styles.card}
          >
            <img
              src={program.image}
              className={styles.image}
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
        ))}
      </div>

    </section>
  );
};

export default OurProgramsSection;