"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSiteContentStore } from "@/lib/store"

export interface CarouselImage {
  src: string
  alt: string
}

interface EnhancedCarouselProps {
  images?: CarouselImage[]
  autoPlay?: boolean
  interval?: number
}

const EnhancedCarousel = ({ autoPlay = true, interval = 5000 }: EnhancedCarouselProps) => {
  // Get carousel content from store
  const { carousel } = useSiteContentStore()

  // Use images from the store if available, otherwise use default
  const images = carousel.images && carousel.images.length > 0 ? carousel.images : defaultImages

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean[]>(new Array(images.length).fill(true))
  const [isAnimating, setIsAnimating] = useState(false)

  const totalSlides = images.length

  const next = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [totalSlides, isAnimating])

  const prev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [totalSlides, isAnimating])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleImageLoad = (index: number) => {
    setIsLoading((prev) => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })
  }

  useEffect(() => {
    // Reset loading state when images change
    setIsLoading(new Array(images.length).fill(true))
  }, [images])

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      next()
    }, interval)

    return () => clearInterval(timer)
  }, [next, autoPlay, interval])

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl mb-12 mt-8 shadow-2xl">
      {/* Slides */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
              index === currentSlide
                ? "opacity-100 z-10 translate-x-0"
                : index < currentSlide || (currentSlide === 0 && index === totalSlides - 1)
                  ? "opacity-0 -translate-x-full z-0"
                  : "opacity-0 translate-x-full z-0"
            }`}
          >
            {isLoading[index] && <div className="absolute inset-0 bg-gray-800 animate-pulse z-0"></div>}
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover"
              onLoad={() => handleImageLoad(index)}
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute bottom-10 left-0 right-0 z-20 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">{carousel.title}</h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{carousel.subtitle}</p>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full z-20 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full z-20 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default EnhancedCarousel
