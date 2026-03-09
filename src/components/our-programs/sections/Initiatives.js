// components/our-programs/sections/Initiatives.jsx
import styles from './op.module.css';
import Link from 'next/link';

export default function Initiatives({ title, initiatives, sectors, programSlug }) {
  const hrefBase = programSlug ? `/our-programs/donate?slug=${programSlug}` : '/our-programs/donate';

  return (
    <section className={styles.initiatives}>
      <div className={styles.initiativesContainer}>
        <h2>{title}</h2>
        {sectors ? (
          sectors.map((sector, sectorIndex) => (
            <div key={sectorIndex} className={styles.sector}>
              <h3>{sector.sector}</h3>
              <div className={styles.initiativesGrid}>
                {sector.initiatives.map((initiative, index) => (
                  <div key={index} className={styles.initiativeCard}>
                    <h4>{initiative.title}</h4>
                    <p>{initiative.description}</p>
                    {initiative.cta && (
                      <Link href={hrefBase} className={styles.initiativeCta}>
                        {initiative.cta}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.initiativesGrid}>
            {initiatives.map((initiative, index) => (
              <div key={index} className={styles.initiativeCard}>
                {initiative.image && (
                  <div className={styles.initiativeImage}>
                    <img src={initiative.image} alt={initiative.title} />
                  </div>
                )}
                <div className={styles.initiativeContent}>
                  <h3>{initiative.title}</h3>
                  <p>{initiative.description}</p>
                  {initiative.cta && (
                    <Link href={hrefBase} className={styles.initiativeCta}>
                      {initiative.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}