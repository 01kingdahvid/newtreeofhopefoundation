import Programs from '@/components/our-programs/Programs/Programs'
import PageHero from '@/components/shared/PageHero/PageHero'

export default function OurProgramsPage () {
  return (
    <main>
      <PageHero
        title='OUR PROGRAMS'
        image='/images/shared/kids-2.avif'
      />
      <Programs />
    </main>
  )
}
