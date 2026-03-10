import DonateNowSection from '@/components/homepage/DonateNowSection/DonateNowSection'
import PageHero from '@/components/shared/PageHero/PageHero'
import NGOLeafletMap from '@/components/where-we-work/NgoLeafletMap/NgoLeafletMap'
import React from 'react'

const WhereWeWorkPage = () => {
  return (
    <>
      <main>
        <PageHero title='WHERE WE WORK' image='/images/shared/kids-2.avif' />

        <NGOLeafletMap />

        <div style={{marginBottom: '4rem'}}>
          <DonateNowSection />
        </div>
      </main>
    </>
  )
}

export default WhereWeWorkPage
