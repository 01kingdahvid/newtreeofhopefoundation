import AboutUsSection from '@/components/homepage/AboutUsSection/AboutUsSection'
import DonateNowSection from '@/components/homepage/DonateNowSection/DonateNowSection'
import HeroSlider from '@/components/homepage/HeroSlider/HeroSlider'
import OurProgramsSection from '@/components/homepage/OurProgramsSection/OurProgramsSection'

export default function Home () {
  return (
    <main>
      <HeroSlider />
      <AboutUsSection/>
      <DonateNowSection/>
      <OurProgramsSection/>
    </main>
  )
}
