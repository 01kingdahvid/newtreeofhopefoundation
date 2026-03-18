"use client";

import styles from "./op.module.css";
import useReveal from "@/hooks/useReveal";

export default function Quote({ quote, focusAreas }) {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      className={`${styles.quote} ${styles.reveal} ${
        visible ? styles.revealVisible : ""
      }`}
    >
      <div className={styles.quoteContainer}>
        <blockquote
          style={{
            transform: visible ? "scale(1)" : "scale(0.95)",
            transition: "all 0.6s ease",
          }}
        >
          {quote}
        </blockquote>

        {focusAreas && (
          <div className={styles.focusAreas}>
            <h3>Our Focus Areas</h3>
            <ul>
              {focusAreas.map((area, index) => (
                <li
                  key={index}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transition: `all 0.4s ease ${index * 0.1}s`,
                  }}
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}