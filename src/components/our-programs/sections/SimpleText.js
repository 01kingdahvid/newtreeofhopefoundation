import styles from './op.module.css';

export default function SimpleText({ title, content }) {
  const renderContentItem = (item, idx) => {
    // Plain string
    if (typeof item === 'string') {
      return <p key={idx}>{item}</p>;
    }

    // Paragraph object
    if (item.paragraph) {
      return <p key={idx}>{item.paragraph}</p>;
    }

    // Point + description (e.g., from WASH program)
    if (item.point && item.description) {
      return (
        <div key={idx} className={styles.pointItem}>
          <h3>{item.point}</h3>
          <p>{item.description}</p>
        </div>
      );
    }

    // List item (e.g., from Eid textWithImage)
    if (item.listItem) {
      return (
        <p key={idx} className={styles.listItem}>
          • {item.listItem}
        </p>
      );
    }

    // Fallback (should not happen)
    return null;
  };

  return (
    <section className={styles.simpleText}>
      <div className={styles.textContainer}>
        <h2>{title}</h2>
        {Array.isArray(content)
          ? content.map(renderContentItem)
          : <p>{content}</p>}
      </div>
    </section>
  );
}