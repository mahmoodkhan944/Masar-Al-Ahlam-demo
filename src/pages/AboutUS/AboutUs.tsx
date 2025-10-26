import "./AboutUs.module.css"
import Header from "@/reusable_sections/Header"
import OurMissionAndValues from "./sections/OurMissionAndValues"
import MeetOurTeam from "./sections/MeetOurTeam"
import Footer from "@/reusable_sections/Footer"

export default function AboutUsPage() {

  return (
    <div>
      <Header />
      <OurMissionAndValues />
      <MeetOurTeam />
      <Footer />
    </div>
  )
}
