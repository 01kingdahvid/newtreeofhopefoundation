import DonateNow from '@/components/donate/DonateNow/DonateNow'
import PageHero from '@/components/shared/PageHero/PageHero'
import React from 'react'

const DonatePage = () => {
  return (
    <main>
      <PageHero
        title='DONATE TO CHARITY'
        image='/images/our-program/orphan7.jpg' 
      />

      <DonateNow />
    </main>
  )
}

export default DonatePage
