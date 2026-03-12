import DonateNow from '@/components/donate/DonateNow/DonateNow'
import PageHero from '@/components/shared/PageHero/PageHero'
import React from 'react'

const DonatePage = () => {
  return (
    <main>
      <PageHero
        title='DONATE BITCOIN TO CHARITY'
        image='/images/shared/kids-2.avif'
      />

      <DonateNow />
    </main>
  )
}

export default DonatePage
