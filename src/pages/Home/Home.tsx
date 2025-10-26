import "./Home.module.css"
import Header from "@/reusable_sections/Header"
import YourJourneyStartsHere from "./sections/YourJourneyStartsHere"
import WhyChooseRapidLineImmigration from "./sections/WhyChooseRapidLineImmigration"
import OurComprehensiveServices from "./sections/OurComprehensiveServices"
import NavigatingTheImmigrationMaze from "./sections/NavigatingTheImmigrationMaze"
import SuccessStories from "./sections/SuccessStories"
import FrequentlyAskedQuestions from "./sections/FrequentlyAskedQuestions"
import ContactUsToday from "./sections/ContactUsToday"
import Footer from "@/reusable_sections/Footer"

export default function HomePage() {

  return (
    <div>
      <Header />
      <YourJourneyStartsHere />
      <WhyChooseRapidLineImmigration />
      <OurComprehensiveServices />
      <NavigatingTheImmigrationMaze />
      <SuccessStories />
      <FrequentlyAskedQuestions />
      <ContactUsToday />
      <Footer />
    </div>
  )
}
