import ContactUsSection from '@/components/contact-us/ContactUs'
import PageHero from '@/components/shared/PageHero/PageHero'
import React from 'react'

const ContactUsPage = () => {
  return (
    <>
      <main>
        <PageHero
          title='CONTACT US'
          subtitle='GET IN TOUCH'
          image='/images/shared/kids-2.avif'
        />

        <ContactUsSection />
      </main>
    </>
  )
}

export default ContactUsPage
