"use client";

import styles from "./op.module.css";
import useReveal from "@/hooks/useReveal";

export default function TextWithImage({
  title,
  content,
  image,
  imagePosition = "right",
}) {
  const { ref, visible } = useReveal();
  const hasImage = Boolean(image);

  return (
    <section ref={ref} className={styles.textWithImage}>
      <div
        className={`${styles.container} 
        ${imagePosition === "left" ? styles.reverse : ""}`}
      >
        <div
          className={styles.content}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0)"
              : "translateX(-40px)",
            transition: "all 0.7s ease",
          }}
        >
          <h2>{title}</h2>
          {Array.isArray(content)
            ? content.map((c, i) => <p key={i}>{c.paragraph || c}</p>)
            : <p>{content}</p>}
        </div>

        {hasImage && (
          <div
            className={`${styles.image} ${styles.zoomImage}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateX(0)"
                : "translateX(40px)",
              transition: "all 0.7s ease",
            }}
          >
            <img src={image} alt={title} />
          </div>
        )}
      </div>
    </section>
  );
}