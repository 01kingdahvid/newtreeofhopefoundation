// components/our-programs/sections/ProjectCosts.jsx
import styles from './op.module.css';
import Link from 'next/link';

export default function ProjectCosts({ title, description, cta, costs, programSlug }) {
  const href = programSlug ? `/our-programs/donate?slug=${programSlug}` : '/our-programs/donate';
  return (
    <section className={styles.projectCosts}>
      <div className={styles.projectCostsContainer}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <div className={styles.costsTable}>
          {costs.map((cost, index) => (
            <div key={index} className={styles.costItem}>
              <div className={styles.costName}>{cost.item}</div>
              <div className={styles.costPrice}>{cost.price}</div>
            </div>
          ))}
        </div>
        {cta && (
          <Link href={href} className={styles.ctaButton}>
            {cta}
          </Link>
        )}
      </div>
    </section>
  );
}