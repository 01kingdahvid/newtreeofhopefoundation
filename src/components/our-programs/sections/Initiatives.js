// components/our-programs/sections/Initiatives.jsx
'use client';
import styles from './op.module.css';
import { useRouter } from 'next/navigation';

function InitiativeCard({ initiative, programSlug }) {
  const router = useRouter();
  const isContactUs = initiative.cta?.toLowerCase().trim() === 'contact us';

  const handleClick = () => {
    if (isContactUs) {
      router.push('/contact-us#contact-form');
      return;
    }
    // Store note in sessionStorage — never touches the URL
    if (initiative.title) {
      sessionStorage.setItem('donationNote', initiative.title);
    }
    const href = programSlug
      ? `/our-programs/donate?slug=${programSlug}`
      : '/our-programs/donate';
    router.push(href);
  };

  return (
    <div className={styles.initiativeCard}>
      {initiative.image && (
        <div className={styles.initiativeImage}>
          <img src={initiative.image} alt={initiative.title} />
        </div>
      )}
      <div className={styles.initiativeContent}>
        <h3>{initiative.title}</h3>
        <p>{initiative.description}</p>
        {initiative.cta && (
          <button onClick={handleClick} className={styles.initiativeCta}>
            {initiative.cta}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Initiatives({ title, initiatives, sectors, programSlug }) {
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
                  <InitiativeCard
                    key={index}
                    initiative={initiative}
                    programSlug={programSlug}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.initiativesGrid}>
            {initiatives.map((initiative, index) => (
              <InitiativeCard
                key={index}
                initiative={initiative}
                programSlug={programSlug}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}