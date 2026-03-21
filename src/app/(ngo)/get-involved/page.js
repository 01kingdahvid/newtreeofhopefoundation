import Partnership from '@/components/get-involved/Partnership'
import PageHero from '@/components/shared/PageHero/PageHero'
import React from 'react'

const GetInvolvedPage = () => {
  return (
    <>
      <main>
        <PageHero
          title='PARTNERSHIPS AND COMMUNITY SUPPORT'
          image='/images/our-program/shelter.jpg'
          subtitle='PROVIDING SUPPORT AND ASSISTANCE'
        />

        <Partnership />
      </main>
    </>
  )
}

export default GetInvolvedPage
