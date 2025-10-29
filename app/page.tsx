import Navbar from "@/components/Navbar"
import EnhancedCarousel from "@/components/EnhancedCarousel"
import AboutUs from "@/components/AboutUs"
import UpcomingEvents from "@/components/UpcomingEvents"
import ContactUs from "@/components/ContactUs"
import Footer from "@/components/Footer"
import Aurora from "@/components/Aurora"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} />
      <Navbar />
      <div className="pt-20 container mx-auto px-4">
        <EnhancedCarousel />

        <UpcomingEvents />
        <AboutUs />
        <ContactUs />
      </div>
      <Footer />
    </main>
  )
}
