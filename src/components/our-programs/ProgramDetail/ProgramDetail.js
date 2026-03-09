'use client';

import CTA from '../sections/CTA';
import Gallery from '../sections/Gallery';
import ImpactCard from '../sections/ImpactCard';
import Initiatives from '../sections/Initiatives';
import List from '../sections/List';
import ProjectCosts from '../sections/ProjectCosts';
import Quote from '../sections/Quote';
import SimpleText from '../sections/SimpleText';
import Stats from '../sections/Stats';
import TextWithImage from '../sections/TextWithImage';
import styles from './ProgramDetail.module.css';
import Link from 'next/link';


export default function ProgramDetail({ program }) {
  if (!program) {
    return (
      <div className={styles.notFound}>
        <h2>Program Not Found</h2>
        <p>The program you're looking for doesn't exist or has been moved.</p>
        <Link href="/our-programs" className={styles.backLink}>
          ← Back to All Programs
        </Link>
      </div>
    );
  }

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'impactCard':
        return <ImpactCard key={index} {...section.props} />;
      case 'simpleText':
        return <SimpleText key={index} {...section.props} />;
      case 'stats':
        return <Stats key={index} {...section.props} />;
      case 'initiatives':
        return <Initiatives key={index} {...section.props} />;
      case 'textWithImage':
        return <TextWithImage key={index} {...section.props} />;
      case 'gallery':
        return <Gallery key={index} {...section.props} />;
      case 'cta':
        return <CTA key={index} {...section.props} />;
      case 'list':
        return <List key={index} {...section.props} />;
      case 'quote':
        return <Quote key={index} {...section.props} />;
      case 'projectCosts':
        return <ProjectCosts key={index} {...section.props} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.programDetail}>

      <div className={styles.sectionsContainer}>
        {program.sections?.map((section, index) => renderSection(section, index))}
      </div>
    </div>
  );
}
