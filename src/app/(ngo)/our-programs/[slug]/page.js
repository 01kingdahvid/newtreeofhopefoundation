'use client';

import { use } from 'react';

import PageHero from '@/components/shared/PageHero/PageHero';
import CTA from '@/components/our-programs/sections/CTA';
import Gallery from '@/components/our-programs/sections/Gallery';
import ImpactCard from '@/components/our-programs/sections/ImpactCard';
import Initiatives from '@/components/our-programs/sections/Initiatives';
import List from '@/components/our-programs/sections/List';
import ProjectCosts from '@/components/our-programs/sections/ProjectCosts';
import Quote from '@/components/our-programs/sections/Quote';
import SimpleText from '@/components/our-programs/sections/SimpleText';
import Stats from '@/components/our-programs/sections/Stats';
import TextWithImage from '@/components/our-programs/sections/TextWithImage';

import styles from './ProgramDetail.module.css';
import programs from "@/data/programs.json";

export default function ProgramDetailPage({ params }) {

  // ✅ unwrap params
  const { slug } = use(params);

  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return (
      <div className={styles.notFound}>
        <h2>Program Not Found</h2>
      </div>
    );
  }

 const renderSection = (section, index) => {
  const { props } = section;               // section.props does NOT include key
  const slugProp = { programSlug: slug };   // additional prop

  switch (section.type) {
    case 'impactCard':
      return <ImpactCard key={index} {...props} {...slugProp} />;
    case 'simpleText':
      return <SimpleText key={index} {...props} {...slugProp} />;
    case 'stats':
      return <Stats key={index} {...props} {...slugProp} />;
    case 'initiatives':
      return <Initiatives key={index} {...props} {...slugProp} />;
    case 'textWithImage':
      return <TextWithImage key={index} {...props} {...slugProp} />;
    case 'gallery':
      return <Gallery key={index} {...props} {...slugProp} />;
    case 'cta':
      return <CTA key={index} {...props} {...slugProp} />;
    case 'list':
      return <List key={index} {...props} {...slugProp} />;
    case 'quote':
      return <Quote key={index} {...props} {...slugProp} />;
    case 'projectCosts':
      return <ProjectCosts key={index} {...props} {...slugProp} />;
    default:
      return null;
  }
};

  return (
    <main>
      <PageHero
        title={program.title}
        subtitle={program.subtitle}
        image={program?.image || program.image}
      />

      <div className={styles.programDetail}>
        <div className={styles.sectionsContainer}>
          {program.sections?.map((section, index) =>
            renderSection(section, index)
          )}
        </div>
      </div>
    </main>
  );
}