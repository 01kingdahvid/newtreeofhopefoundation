// components/our-programs/sections/ImpactCard.jsx
import styles from './op.module.css';
import Link from 'next/link';

export default function ImpactCard({ title, content, cta, programSlug }) {
  const href = programSlug ? `/our-programs/donate?slug=${programSlug}` : '/our-programs/donate';
  return (
    <section className={styles.impactCard}>
      <div className={styles.impactContent}>
        <div className={styles.left}>
          <h2>{title}</h2>
          <Link href={href} className={styles.donateBtn}>
            {cta || 'Donate Now'}
          </Link>
        </div>
        <div className={styles.right}>
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
}