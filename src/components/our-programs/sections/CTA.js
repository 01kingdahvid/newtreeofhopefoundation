// components/our-programs/sections/CTA.jsx
import styles from './op.module.css';
import Link from 'next/link';

export default function CTA({ title, content, cta, programSlug }) {
  const isContactUs = cta?.toLowerCase().trim() === 'contact us';
  const href = isContactUs
    ? '/contact-us'
    : programSlug
    ? `/our-programs/donate?slug=${programSlug}`
    : '/our-programs/donate';

  return (
    <section className={styles.cta}>
      <div className={styles.ctaContainer}>
        <h2>{title}</h2>
        <p>{content}</p>
        <Link href={href} className={styles.ctaButton}>
          {cta || 'DONATE NOW'}
        </Link>
      </div>
    </section>
  );
}