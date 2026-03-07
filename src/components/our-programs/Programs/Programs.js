"use client";

import React from "react";
import styles from "./Programs.module.css";
import programs from "@/data/programs.json";

const Programs= () => {
  return (
    <section className={styles.section}>

      

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

export default Programs;