import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, Timer } from "lucide-react"
import { useEventsStore } from "@/lib/store"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // We need to use the client-side store for the actual rendering
  // This is just for metadata
  const id = Number.parseInt(params.id)

  // Import events directly for SSR metadata
  const { events } = await import("@/lib/data")
  const event = events.find((e) => e.id === id)

  if (!event) {
    return {
      title: "Event Not Found",
    }
  }

  return {
    title: `${event.title} - Bhairava Bhandara`,
    description: event.description.substring(0, 160),
  }
}

export default function EventPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Use client-side store for the actual rendering
  const events = useEventsStore.getState().events
  const event = events.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Event Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link href="/#upcoming-shows" className="text-red-500 hover:text-red-400 flex items-center gap-2">
                  ← Back to all events
                </Link>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">{event.title}</h1>

              <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-red-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold">Date</h3>
                  </div>
                  <p>{event.date}</p>
                </div>

                <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-red-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold">Time</h3>
                  </div>
                  <p>{event.time}</p>
                </div>

                <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-red-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold">Location</h3>
                  </div>
                  <p>{event.location}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-300 leading-relaxed mb-6">{event.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Timer className="h-5 w-5 text-red-500" />
                    <span>Duration: {event.duration}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-red-500" />
                    <span>Available Seats: {event.availableSeats}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {event.categories.map((category, index) => (
                    <span key={index} className="bg-red-900/50 text-white px-3 py-1 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div>
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-4">Book Tickets</h2>
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-2">{event.price}</div>
                  <p className="text-gray-300">Per person</p>
                </div>

                <Link href={`/events/${event.id}/book`} className="btn-primary w-full text-center block mb-4">
                  Select Tickets
                </Link>

                <div className="text-sm text-gray-400 text-center">No payment will be charged at this step</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
