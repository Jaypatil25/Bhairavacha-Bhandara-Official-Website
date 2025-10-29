import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL ?? "https://sawszgtlexbgdvwfvldc.supabase.co",
  process.env.SUPABASE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhd3N6Z3RsZXhiZ2R2d2Z2bGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjIyOTYsImV4cCI6MjA3NzIzODI5Nn0.OGniHEt5Mm_lfOcMCpux-OQkdHKQpEU-i8RLYGdY6QM"
)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    const { error } = await supabase.from("contact_messages").insert([{ name, email, message }])

    if (error) {
      console.error(error)
      return Response.json({ success: false, message: "Failed to send message" }, { status: 500 })
    }

    return Response.json({ success: true, message: "Message sent successfully!" })
  } catch (err) {
    console.error(err)
    return Response.json({ success: false, message: "Something went wrong" }, { status: 500 })
  }
}
