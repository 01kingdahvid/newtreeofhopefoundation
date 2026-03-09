import styles from './op.module.css';

export default function Stats({ title, stats }) {
  return (
    <section className={styles.stats}>
      <div className={styles.statsContainer}>
        <h2>{title}</h2>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
