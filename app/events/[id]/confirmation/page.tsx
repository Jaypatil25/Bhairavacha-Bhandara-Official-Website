import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, CheckCircle, Download, Share2 } from "lucide-react"
import { events } from "@/lib/data"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const event = events.find((e) => e.id === id)

  if (!event) return null

  // Generate a random booking reference
  const bookingRef = `BB-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-8 text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-xl text-gray-300 mb-6">Thank you for your purchase</p>

            <div className="bg-gray-900/50 rounded-lg p-4 inline-block mb-6">
              <p className="text-gray-300 mb-1">Booking Reference</p>
              <p className="text-2xl font-bold">{bookingRef}</p>
            </div>

            <p className="text-gray-300 mb-8">A confirmation email has been sent to your registered email address.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                Download Tickets
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <Share2 className="h-5 w-5" />
                Share Event
              </button>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Event Details</h2>

            <div className="flex gap-4 mb-6">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <div className="flex items-center text-gray-300 mb-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-300 mb-1">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h3 className="font-semibold mb-2">Ticket Information</h3>
              <div className="space-y-2 text-gray-300">
                <p>2 x Standard Tickets</p>
                <p>Doors open: 30 minutes before show time</p>
                <p>Please arrive early to avoid delays</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="btn-primary inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
