"use client";

import styles from "./op.module.css";
import Link from "next/link";
import useReveal from "@/hooks/useReveal";

export default function ImpactCard({ title, content, cta, programSlug }) {
  const { ref, visible } = useReveal();

  const href = programSlug
    ? `/our-programs/donate?slug=${programSlug}`
    : "/our-programs/donate";

  return (
    <section
      ref={ref}
      className={`${styles.impactCard} ${styles.reveal} ${
        visible ? styles.revealVisible : ""
      }`}
    >
      <div className={styles.impactContent}>
        <div
          className={`${styles.left} ${
            visible ? styles.revealVisible : ""
          }`}
        >
          <h2>{title}</h2>
          <Link href={href} className={styles.donateBtn}>
            {cta || "Donate Now"}
          </Link>
        </div>

        <div
          className={`${styles.right} ${
            visible ? styles.revealVisible : ""
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
}