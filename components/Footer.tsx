import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <footer className="footer pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-ueQQ4s6hqEzqMzvUHjPPGav9j9emOu.png"
                alt="Bhairava Bhandara Logo"
                width={150}
                height={75}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-300 mb-6">
            Unfolding the Untold History.<br/>
            Rediscovering India’s Untold Historical Treasures...
            </p>
            <div className="flex space-x-4">

              <a href="https://www.instagram.com/bhairavacha_bhandara/?hl=en" className="bg-red-800/50 hover:bg-red-700 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              
              <a href="https://www.facebook.com/p/Bhairavacha-Bhandara-%E0%A4%AD%E0%A5%88%E0%A4%B0%E0%A4%B5%E0%A4%BE%E0%A4%9A%E0%A4%BE-%E0%A4%AD%E0%A4%82%E0%A4%A1%E0%A4%BE%E0%A4%B0%E0%A4%BE-61573719272457/" className="bg-red-800/50 hover:bg-red-700 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              {/* <a href="#" className="bg-red-800/50 hover:bg-red-700 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a> */}
              {/* <a href="#" className="bg-red-800/50 hover:bg-red-700 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a> */}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#upcoming-shows" className="text-gray-300 hover:text-white transition-colors">
                  Upcoming Shows
                </Link>
              </li>
              <li>
                <Link href="#about-us" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact-us" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to get updates on upcoming shows and exclusive offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:border-red-500 w-full"
              />
              <button type="submit" className="bg-red-700 hover:bg-red-800 text-white px-4 rounded-r-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Bhairava Bhandara. All rights reserved.
            <br />
            Crafted with <span aria-hidden="true">❤️</span> by Team शिवकल्याण राजा
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
