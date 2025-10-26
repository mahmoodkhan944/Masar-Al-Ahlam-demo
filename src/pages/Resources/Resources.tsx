import "./Resources.module.css"
import Header from "@/reusable_sections/Header"
import EssentialImmigrationLinks from "./sections/EssentialImmigrationLinks"
import GuidesAndArticles from "./sections/GuidesAndArticles"
import Footer from "@/reusable_sections/Footer"

export default function ResourcesPage() {

  return (
    <div>
      <Header />
      <EssentialImmigrationLinks />
      <GuidesAndArticles />
      <Footer />
    </div>
  )
}
