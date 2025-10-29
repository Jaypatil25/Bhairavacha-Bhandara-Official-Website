import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Event } from "./types"
import { events as initialEvents } from "./data"


// Update the SiteContentState interface to include carousel images
interface SiteContentState {
  carousel: {
    title: string
    subtitle: string
    images: CarouselImage[]
  }
  aboutUs: {
    title: string
    description: string[]
    image: string
  }
  updateCarousel: (data: { title: string; subtitle: string }) => void
  updateCarouselImages: (images: CarouselImage[]) => void
  updateAboutUs: (data: { title: string; description: string[]; image: string }) => void
}

// Add the CarouselImage interface
interface CarouselImage {
  src: string
  alt: string
}

// Update the default carousel content to include images
const defaultCarousel = {
  // title: "Experience the Magic of Culture",
  subtitle: "मऱ्हाटा पातशहा या लोकप्रिय पुस्तकाचे लेखक केतन कैलास पुरी यांच्या शोचे अधिकृत वेबसाइट.",
  images: [
    {
      src: "https://ik.imagekit.io/uwohn1ycw/Carousel/D302605D-D43B-4DA2-8991-DC85FF5B9F9A.heic?updatedAt=1761735278728",
      alt: "Ketan-kailas-puri-Carousel-1",
    },
    {
      src: "https://ik.imagekit.io/uwohn1ycw/Carousel/01.heic?updatedAt=1761734519624",
      alt: "Ketan-kailas-puri-Carousel-2",
    },
    {
      src: "https://ik.imagekit.io/uwohn1ycw/Carousel/E16A1841-A376-4400-B7B2-3EBED057F9DF.heic?updatedAt=1761735441769",
      alt: "Ketan-kailas-puri-Carousel-3",
    },
  ],
}

const defaultAboutUs = {
  title: "About Us",
  description: [
    "Bhairava Bhandara is a celebration of our rich cultural heritage through music, dance, and theatrical performances. For over a decade, we have been bringing together talented artists from across the country to showcase the beauty and diversity of traditional art forms.",
    "Led by Ketan Kailas Puri, the show explores ancient temples, sculptures, and the hidden beauty of India’s heritage.",
    "Bhairavacha Bhandara isn’t just a show, it’s an experience where history comes alive!",
  ],
  image: "https://ik.imagekit.io/uwohn1ycw/About%20Us/ketan-puri.jpg?updatedAt=1761735648172",
}

// Update the useSiteContentStore to include the new updateCarouselImages function
export const useSiteContentStore = create<SiteContentState>()(
  persist(
    (set) => ({
      carousel: defaultCarousel,
      aboutUs: defaultAboutUs,

      updateCarousel: (data) => {
        set((state) => ({
          carousel: {
            ...state.carousel,
            title: data.title,
            subtitle: data.subtitle,
          },
        }))
      },

      updateCarouselImages: (images) => {
        set((state) => ({
          carousel: {
            ...state.carousel,
            images,
          },
        }))
      },

      updateAboutUs: (data) => {
        set(() => ({
          aboutUs: data,
        }))
      },
    }),
    {
      name: "site-content-storage",
    },
  ),
)

