"use client"

import type React from "react"
import { Calendar, MapPin, Clock } from "lucide-react"
import { events } from "@/lib/data"

const UpcomingEvents = () => {
  // Filter only active events
  const activeEvents = events.filter((event) => event.status !== "cancelled" && event.status !== "sold-out")

  const handleBuyTickets = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault()

    const bookingLink = localStorage.getItem("bookingLink") || "https://in.bookmyshow.com/plays/bhairavacha-bhandara/ET00467632"
    window.open(bookingLink, "_blank")
  }

  return (
    <section id="upcoming-shows" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">Upcoming Shows</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeEvents.length > 0 ? (
            activeEvents.map((event) => (
              <div key={event.id} className="event-card group">
                {/* Image Container */}
                <div className="relative h-[200px] overflow-hidden rounded-t-xl">
                  <img
                    src={event.image || "/placeholder.svg?height=200&width=300"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-800 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {event.price}
                  </div>
                  {/* Sold Out Overlay */}
                  {event.status === "sold-out" && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">SOLD OUT</span>
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 text-white">{event.title}</h3>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-300 text-sm">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0 text-red-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-red-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 text-sm line-clamp-3">{event.description}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#"
                      onClick={(e) => handleBuyTickets(e, event.id)}
                      className="btn-primary text-center text-sm flex-1"
                    >
                      Buy Tickets
                    </a>
                    {/* <button className="btn-secondary text-sm flex-1">Learn More</button> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No upcoming shows at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents
