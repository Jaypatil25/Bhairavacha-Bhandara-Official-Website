"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Minus, Plus, Info } from "lucide-react"
import { seatTypes } from "@/lib/data"
import { useEventsStore } from "@/lib/store"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const id = Number.parseInt(params.id)

  // Use the store to get the latest event data
  const events = useEventsStore.getState().events
  const event = events.find((e) => e.id === id)

  const [selectedSeats, setSelectedSeats] = useState<{ [key: string]: number }>({
    standard: 0,
    premium: 0,
    vip: 0,
  })

  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    if (!event) {
      router.push("/")
      return
    }

    // Calculate total amount
    const basePrice = Number.parseInt(event.price.replace(/\D/g, ""))
    let total = 0

    seatTypes.forEach((seatType) => {
      total += selectedSeats[seatType.id] * basePrice * seatType.priceMultiplier
    })

    setTotalAmount(total)
  }, [event, selectedSeats, router])

  if (!event) return null

  const updateSeatCount = (type: string, increment: boolean) => {
    setSelectedSeats((prev) => {
      const newCount = increment
        ? Math.min((prev[type] || 0) + 1, 10) // Max 10 tickets per type
        : Math.max((prev[type] || 0) - 1, 0)

      return {
        ...prev,
        [type]: newCount,
      }
    })
  }

  const totalTickets = Object.values(selectedSeats).reduce((sum, count) => sum + count, 0)
  const basePrice = Number.parseInt(event.price.replace(/\D/g, ""))

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <Link href={`/events/${event.id}`} className="text-red-500 hover:text-red-400 flex items-center gap-2">
              ← Back to event details
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8">Select Tickets</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Event Summary */}
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6 mb-8">
                <div className="flex gap-4">
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
                    <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                    <div className="flex items-center text-sm text-gray-300 mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300 mb-1">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Selection */}
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6">
                <h2 className="text-xl font-bold mb-6">Choose Ticket Type</h2>

                {seatTypes.map((seatType) => (
                  <div
                    key={seatType.id}
                    className="flex items-center justify-between py-4 border-b border-gray-800 last:border-0"
                  >
                    <div>
                      <h3 className="font-semibold mb-1">{seatType.name}</h3>
                      <p className="text-sm text-gray-300">
                        ₹{(basePrice * seatType.priceMultiplier).toFixed(0)} per ticket
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateSeatCount(seatType.id, false)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 transition-colors"
                        disabled={selectedSeats[seatType.id] <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="w-8 text-center">{selectedSeats[seatType.id] || 0}</span>

                      <button
                        onClick={() => updateSeatCount(seatType.id, true)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                {totalTickets > 0 ? (
                  <>
                    <div className="space-y-3 mb-6">
                      {seatTypes.map(
                        (seatType) =>
                          selectedSeats[seatType.id] > 0 && (
                            <div key={seatType.id} className="flex justify-between">
                              <span>
                                {seatType.name} x {selectedSeats[seatType.id]}
                              </span>
                              <span>
                                ₹{(selectedSeats[seatType.id] * basePrice * seatType.priceMultiplier).toFixed(0)}
                              </span>
                            </div>
                          ),
                      )}

                      <div className="border-t border-gray-700 pt-3 font-bold flex justify-between">
                        <span>Total</span>
                        <span>₹{totalAmount.toFixed(0)}</span>
                      </div>
                    </div>

                    <Link href={`/events/${event.id}/checkout`} className="btn-primary w-full text-center block mb-4">
                      Proceed to Checkout
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-gray-300 mb-6">
                    <Info className="h-5 w-5" />
                    <p>Please select at least one ticket to continue</p>
                  </div>
                )}

                <div className="text-sm text-gray-400">
                  <p className="mb-2">Ticket prices include all applicable taxes and fees.</p>
                  <p>You'll be asked to sign in before completing your purchase.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
