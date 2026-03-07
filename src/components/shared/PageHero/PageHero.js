import React from "react";
import styles from "./PageHero.module.css";

const PageHero = ({ title, subtitle, image }) => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1>{title}</h1>
        <span>{subtitle}</span>
      </div>
    </section>
  );
};

export default PageHero;