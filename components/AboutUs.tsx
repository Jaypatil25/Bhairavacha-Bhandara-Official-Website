"use client"

import { useSiteContentStore } from "@/lib/store"

const AboutUs = () => {
  const { aboutUs } = useSiteContentStore()

  return (
    <section id="about-us" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">{aboutUs.title}</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            {aboutUs.description.map((paragraph, index) => (
              <p key={index} className="text-lg mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-black/50"></div>
            <img
              src={aboutUs.image || "/placeholder.svg"}
              alt="Ketan-Puri-About-Us"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
