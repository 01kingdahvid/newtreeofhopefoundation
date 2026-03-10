import AboutUsSection from '@/components/homepage/AboutUsSection/AboutUsSection'
import DonateNowSection from '@/components/homepage/DonateNowSection/DonateNowSection'
import FeaturedLocalProject from '@/components/homepage/FeaturedLocalProject/FeaturedLocalProject'
import HeroSlider from '@/components/homepage/HeroSlider/HeroSlider'
import NgoWorldMap from '@/components/homepage/NGOWorldMap/NGOWorldMap'
import OurProgramsSection from '@/components/homepage/OurProgramsSection/OurProgramsSection'

export default function Home () {
  return (
    <main>
      <HeroSlider />
      <AboutUsSection/>
      <DonateNowSection/>
      <OurProgramsSection/>
      <FeaturedLocalProject/>
      <NgoWorldMap/>
    </main>
  )
}
