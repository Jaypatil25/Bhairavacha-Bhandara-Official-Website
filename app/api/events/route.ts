import { NextResponse } from "next/server"
import { events } from "@/lib/data"

export async function GET(request: Request) {
  try {
  // Use request.nextUrl.searchParams (Next.js provides this during build/runtime).
  // Avoid using `request.url` so the route can be safely invoked during static generation.
  const searchParams = (request as any).nextUrl?.searchParams
  const id = searchParams?.get("id")

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
