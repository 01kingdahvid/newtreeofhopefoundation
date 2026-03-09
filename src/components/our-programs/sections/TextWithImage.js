import styles from './op.module.css';

export default function TextWithImage({ title, content, image, imagePosition = 'right' }) {
  const renderContentItem = (item, idx) => {
    // Plain string
    if (typeof item === 'string') {
      return <p key={idx}>{item}</p>;
    }

    // Paragraph object
    if (item.paragraph) {
      return <p key={idx}>{item.paragraph}</p>;
    }

    // List item (for bullet points)
    if (item.listItem) {
      return (
        <p key={idx} className={styles.listItem}>
          • {item.listItem}
        </p>
      );
    }

    // List title + items (like fish farm project)
    if (item.listTitle && Array.isArray(item.listItems)) {
      return (
        <div key={idx} className={styles.listBlock}>
          <h3>{item.listTitle}</h3>
          <ul>
            {item.listItems.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <section className={styles.textWithImage}>
      <div className={`${styles.container} ${imagePosition === 'left' ? styles.reverse : ''}`}>
        <div className={styles.content}>
          <h2>{title}</h2>
          {Array.isArray(content)
            ? content.map(renderContentItem)
            : <p>{content}</p>}
        </div>
        <div className={styles.image}>
          <img src={image} alt={title} />
        </div>
      </div>
    </section>
  );
}