"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-ueQQ4s6hqEzqMzvUHjPPGav9j9emOu.png"
              alt="Bhairava Bhandara Logo"
              width={120}
              height={60}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              HOME
            </Link>
            <Link href="#upcoming-shows" className="nav-link">
              UPCOMING SHOWS
            </Link>
            <Link href="/past-shows" className="nav-link">
              PAST SHOWS
            </Link>
            <Link href="#about-us" className="nav-link">
              ABOUT US
            </Link>
            <Link href="#contact-us" className="nav-link">
              CONTACT US
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button className="absolute top-6 right-6 text-white focus:outline-none" onClick={toggleMenu}>
          <X className="h-6 w-6" />
        </button>
        <Link href="/" className="text-2xl font-bold mb-4" onClick={() => setIsOpen(false)}>
          HOME
        </Link>
        <Link href="#upcoming-shows" className="text-2xl font-bold mb-4" onClick={() => setIsOpen(false)}>
          UPCOMING SHOWS
        </Link>
        <Link href="/past-shows" className="text-2xl font-bold mb-4" onClick={() => setIsOpen(false)}>
          PAST SHOWS
        </Link>
        <Link href="#about-us" className="text-2xl font-bold mb-4" onClick={() => setIsOpen(false)}>
          ABOUT US
        </Link>
        <Link href="#contact-us" className="text-2xl font-bold" onClick={() => setIsOpen(false)}>
          CONTACT US
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
