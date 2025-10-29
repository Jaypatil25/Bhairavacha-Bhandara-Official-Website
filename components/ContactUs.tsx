"use client"

import { useState } from "react"
import { Mail, Phone, Send } from "lucide-react"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      setStatus(data.message)

      if (data.success) {
        setFormData({ name: "", email: "", subject: "", message: "" })
      }
    } catch (error) {
      console.error(error)
      setStatus("Something went wrong. Please try again later.")
    }

    setLoading(false)
  }

  return (
    <section id="contact-us" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-lg mb-8">
              Have questions about our shows or need assistance with booking tickets? Get in touch with us and our team
              will be happy to help.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-red-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-gray-300">bhairavachabhandara@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-red-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-gray-300">+91 70203 61663</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-red-500/30">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn-primary flex items-center">
                <Send className="h-4 w-4 mr-2" />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {status && <p className="mt-4 text-sm text-gray-300">{status}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
