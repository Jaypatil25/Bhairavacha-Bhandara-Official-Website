import { NextResponse } from "next/server"
import { events } from "@/lib/data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const event = events.find((e) => e.id === Number.parseInt(id))

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 })
      }

      return NextResponse.json(event)
    }

    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
