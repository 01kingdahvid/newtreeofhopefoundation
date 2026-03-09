'use client'

import { use } from 'react'

import PageHero from '@/components/shared/PageHero/PageHero'
import CTA from '@/components/our-programs/sections/CTA'
import Gallery from '@/components/our-programs/sections/Gallery'
import ImpactCard from '@/components/our-programs/sections/ImpactCard'
import Initiatives from '@/components/our-programs/sections/Initiatives'
import List from '@/components/our-programs/sections/List'
import ProjectCosts from '@/components/our-programs/sections/ProjectCosts'
import Quote from '@/components/our-programs/sections/Quote'
import SimpleText from '@/components/our-programs/sections/SimpleText'
import Stats from '@/components/our-programs/sections/Stats'
import TextWithImage from '@/components/our-programs/sections/TextWithImage'

import styles from './ProgramDetail.module.css'
import programs from '@/data/programs.json'

export default function ProgramDetailPage ({ params }) {
  // ✅ unwrap params
  const { slug } = use(params)

  const program = programs.find(p => p.slug === slug)

  if (!program) {
    return (
      <div className={styles.notFound}>
        <h2>Program Not Found</h2>
      </div>
    )
  }

  const renderSection = (section, index) => {
    const commonProps = { key: index, ...section.props }
    const slugProp = { programSlug: slug } // slug is from use(params)

    
    switch (section.type) {
      case 'impactCard':
        return <ImpactCard {...commonProps} {...slugProp} />

      case 'simpleText':
        return <SimpleText {...commonProps} {...slugProp} />

      case 'stats':
        return <Stats {...commonProps} {...slugProp} />

      case 'initiatives':
        return <Initiatives {...commonProps} {...slugProp} />

      case 'textWithImage':
        return <TextWithImage {...commonProps} {...slugProp} />

      case 'gallery':
        return <Gallery {...commonProps} {...slugProp} />

      case 'cta':
        return <CTA {...commonProps} {...slugProp} />

      case 'list':
        return <List {...commonProps} {...slugProp} />

      case 'quote':
        return <Quote {...commonProps} {...slugProp} />

      case 'projectCosts':
        return <ProjectCosts {...commonProps} {...slugProp} />

      default:
        return null
    }
  }

  return (
    <main>
      <PageHero
        title={program.title}
        subtitle={program.subtitle}
        image={program.hero?.image || program.image}
      />

      <div className={styles.programDetail}>
        <div className={styles.sectionsContainer}>
          {program.sections?.map((section, index) =>
            renderSection(section, index)
          )}
        </div>
      </div>
    </main>
  )
}
