"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Aurora from "@/components/Aurora"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

// Sample past shows gallery data
const pastShowsGallery = [
  //   {
  //   id: 4,
  //   title: "Summer Festival Celebration",
  //   image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop",
  //   date: "August 22, 2024",
  // }
  {
    id: 1,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1750082355_3656278261475024196_2262467102.heic?updatedAt=1761736137783",

  },
  {
    id: 2,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1750082355_3656278261332339525_2262467102.heic?updatedAt=1761736137011",
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1750082355_3656278261248362611_2262467102.heic?updatedAt=1761736137829",
  },
    {
    id: 4,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1758636022_3728031615562149939_2262467102.heic?updatedAt=1761736137752",
  },
    {
    id: 5,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1750082355_3656278261240094493_2262467102.heic?updatedAt=1761736136996",
  },
    {
    id: 6,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1750082355_3656278261256823979_2262467102.heic?updatedAt=1761736137831",

  },
    {
    id: 7,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1750082355_3656278261256802367_2262467102.heic?updatedAt=1761736137779",

  },
    {
    id: 8,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1750082355_3656278261248415814_2262467102.heic?updatedAt=1761736137858",

  },
  {
    id: 9,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1758636022_3728031615570520790_2262467102.heic?updatedAt=1761736137847",

  },
  {
    id: 10,
    image: "https://ik.imagekit.io/uwohn1ycw/Past%20Shows/bhairava_theexplorer_1758636022_3728031615385956987_2262467102.heic?updatedAt=1761736136541",

  },
]

export default function PastShowsPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof pastShowsGallery)[0] | null>(null)

  return (
    <main className="min-h-screen">
      <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} />
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors mb-6">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Past Shows Gallery</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            {/* Relive the magic of our previous performances. Explore the moments that made our cultural events
            unforgettable. */}
          </p>
        </div>

        {/* Gallery Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"> */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols- gap-2 mb-12">
          {pastShowsGallery.map((show) => (
            <div
              key={show.id}
              className="group cursor-pointer relative overflow-hidden rounded-xl border border-red-500/30 hover:border-red-500/60 transition-all duration-300"
              onClick={() => setSelectedImage(show)}
            >
              <div className="relative h-55 md:h-72 overflow-hidden">
                <img
                  src={show.image || "/placeholder.svg"}
                  alt={show.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg mb-2">{show.title}</h3>
                  <p className="text-gray-300 text-sm">{show.date}</p>
                </div> */}
              </div>
              {/* Card Info */}
              {/* <div className="p-4 bg-black/40 backdrop-blur-sm">
                <h3 className="text-white font-bold text-sm line-clamp-2 mb-1">{show.title}</h3>
                <p className="text-gray-400 text-xs">{show.date}</p>
              </div> */}
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-red-500 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                <p className="text-gray-400">{selectedImage.date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
