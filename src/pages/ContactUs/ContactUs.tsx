import "./ContactUs.module.css"
import Header from "@/reusable_sections/Header"
import GetInTouchWithOurImmigrationExpertsSection from "./sections/GetInTouchWithOurImmigrationExpertsSection"
import ContactInformation from "./sections/ContactInformation"
import Footer from "@/reusable_sections/Footer"

export default function ContactUsPage() {

  return (
    <div>
      <Header />
      <GetInTouchWithOurImmigrationExpertsSection />
      <ContactInformation />
      <Footer />
    </div>
  )
}
