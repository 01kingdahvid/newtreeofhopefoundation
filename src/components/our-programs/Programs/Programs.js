"use client";

import React from "react";
import Link from "next/link";
import styles from "./Programs.module.css";
import programs from "@/data/programs.json";

const Programs = () => {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {programs.map((program) => (
          
          <Link
            key={program.id}
            href={`/our-programs/${program.slug}`}
            className={styles.cardLink}
          >

            <div className={styles.card}>
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