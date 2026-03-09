import { redirect } from 'next/navigation';
import programs from '@/data/programs.json';
import styles from './page.module.css';
import DonateLeft from '@/components/our-programs/ProgramDonate/DonateLeft/DonateLeft';
import DonationPageHeader from '@/components/shared/DonationPageHeader/DonationPageHeader';


export default async function ProgramDonationPage({ searchParams }) {
  const { slug } = await searchParams;

  if (!slug) {
    redirect('/our-program');
  }

  const program = programs.find((p) => p.slug === slug);
  if (!program) {
    redirect('/our-program');
  }

  const imageUrl = program.hero?.image || program.image || '/images/shared/kids-2.avif';

  return (
    <main>
      <DonationPageHeader />
      <div className={styles.pageContainer}>
        <div className={styles.leftColumn}>
          <DonateLeft program={program} />
        </div>
        <div
          className={styles.rightColumn}
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />
      </div>
    </main>
  );
}