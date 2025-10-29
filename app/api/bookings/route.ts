import { NextResponse } from "next/server"
import type { Booking } from "@/lib/types"

// This would be replaced with a database in a real application
const bookings: Booking[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the booking data
    if (!data.eventId || !data.tickets || data.tickets.length === 0) {
      return NextResponse.json({ error: "Invalid booking data" }, { status: 400 })
    }

    // Create a new booking
    const booking: Booking = {
      id: `booking_${Date.now()}`,
      userId: data.userId || "guest",
      eventId: data.eventId,
      tickets: data.tickets,
      totalAmount: data.totalAmount,
      bookingDate: new Date().toISOString(),
      status: "pending",
    }

    // In a real application, this would be saved to a database
    bookings.push(booking)

    return NextResponse.json({
      success: true,
      booking,
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (userId) {
      const userBookings = bookings.filter((booking) => booking.userId === userId)
      return NextResponse.json(userBookings)
    }

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
