import styles from './op.module.css';

export default function List({
  title,
  description,
  items = [],            // Default to empty array
  pastAchievements = []  // Default to empty array
}) {
  return (
    <section className={styles.list}>
      <div className={styles.listContainer}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <div className={styles.items}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <ul>
          {pastAchievements.map((achievement, index) => (
            <li key={index}>
              {typeof achievement === 'string'
                ? achievement
                : achievement.listItem || achievement.achievement || ''}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
