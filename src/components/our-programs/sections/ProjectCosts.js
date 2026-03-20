// components/our-programs/sections/ProjectCosts.jsx
import styles from './op.module.css';
import Link from 'next/link';

function getPriceHref(price, programSlug) {
  if (price?.toLowerCase().includes('contact us')) return '/contact-us#contact-form';
  return programSlug ? `/our-programs/donate?slug=${programSlug}` : '/our-programs/donate';
}

export default function ProjectCosts({ title, description, cta, costs, programSlug }) {
  const ctaHref = programSlug ? `/our-programs/donate?slug=${programSlug}` : '/our-programs/donate';

  return (
    <section className={styles.projectCosts}>
      <div className={styles.projectCostsContainer}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <div className={styles.costsTable}>
          {costs.map((cost, index) => {
            const isContactUs = cost.price?.toLowerCase().includes('contact us');
            const priceHref = getPriceHref(cost.price, programSlug);
            return (
              <div key={index} className={styles.costItem}>
                <div className={styles.costName}>{cost.item}</div>
                <div className={styles.costPrice}>
                  {isContactUs ? (
                    <Link href={priceHref} className={styles.contactUsPrice}>
                      {cost.price}
                    </Link>
                  ) : (
                    cost.price
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {cta && (
          <Link href={ctaHref} className={styles.ctaButton}>
            {cta}
          </Link>
        )}
      </div>
    </section>
  );
}