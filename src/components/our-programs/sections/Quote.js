import styles from './op.module.css';

export default function Quote({ quote, focusAreas }) {
  return (
    <section className={styles.quote}>
      <div className={styles.quoteContainer}>
        <blockquote>{quote}</blockquote>
        {focusAreas && (
          <div className={styles.focusAreas}>
            <h3>Our Focus Areas</h3>
            <ul>
              {focusAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
