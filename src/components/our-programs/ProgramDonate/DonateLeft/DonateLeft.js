// components/our-programs/ProgramDonate/DonateLeftSide.jsx
'use client';

import { useRef } from 'react';

import styles from './DonateLeft.module.css';
import ProgramDonate from '../ProgramDonate';

export default function DonateLeft({ program }) {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{program.title}</h1>
      {program.subtitle && <p className={styles.subtitle}>{program.subtitle}</p>}
      <div className={styles.content}>
        {/* Use a suitable description field – adjust if your program data differs */}
        <p>{program.description || 'Support this program with your donation.'}</p>
      </div>
      <button onClick={scrollToForm} className={styles.donateButton}>
        Donate Now
      </button>
      <div ref={formRef} id="donation-form">
        {/* Pass the program data so the form can be pre‑filled or associated */}
        <ProgramDonate program={program} />
      </div>
    </div>
  );
}