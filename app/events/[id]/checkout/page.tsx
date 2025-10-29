"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CreditCard, Check, Loader2, Info, Mail } from "lucide-react"
import { useEventsStore } from "@/lib/store"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const id = Number.parseInt(params.id)

  // Use the store to get the latest event data
  const events = useEventsStore.getState().events
  const event = events.find((e) => e.id === id)

  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"details" | "login" | "payment">("details")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [loginMethod, setLoginMethod] = useState<"google" | "site" | null>(null)

  if (!event) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("login")
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    setLoginMethod("google")
    // Simulate Google login process
    setTimeout(() => {
      setIsLoading(false)
      setStep("payment")
    }, 1500)
  }

  const handleSiteLogin = () => {
    setIsLoading(true)
    setLoginMethod("site")
    // Simulate site login process
    setTimeout(() => {
      setIsLoading(false)
      setStep("payment")
    }, 1500)
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <Link href={`/events/${event.id}/book`} className="text-red-500 hover:text-red-400 flex items-center gap-2">
              ← Back to ticket selection
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {/* Checkout Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "details" || step === "login" || step === "payment" ? "bg-red-600" : "bg-gray-700"}`}
              >
                <Check className="h-5 w-5" />
              </div>
              <div
                className={`w-20 h-1 ${step === "login" || step === "payment" ? "bg-red-600" : "bg-gray-700"}`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "login" || step === "payment" ? "bg-red-600" : "bg-gray-700"}`}
              >
                {step === "login" || step === "payment" ? <Check className="h-5 w-5" /> : "2"}
              </div>
              <div className={`w-20 h-1 ${step === "payment" ? "bg-red-600" : "bg-gray-700"}`}></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "payment" ? "bg-red-600" : "bg-gray-700"}`}
              >
                {step === "payment" ? <Check className="h-5 w-5" /> : "3"}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === "details" && (
                <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6">
                  <h2 className="text-xl font-bold mb-6">Contact Information</h2>

                  <form onSubmit={handleDetailsSubmit}>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="email" className="block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="phone" className="block mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      Continue to Login
                    </button>
                  </form>
                </div>
              )}

              {step === "login" && (
                <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6">
                  <h2 className="text-xl font-bold mb-6">Login to Continue</h2>

                  <p className="mb-6 text-gray-300">
                    Please sign in to proceed with the payment. You can use your Google account or create a site
                    account.
                  </p>

                  <div className="space-y-4">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                    >
                      {isLoading && loginMethod === "google" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <svg width="20" height="20" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          Sign in with Google
                        </>
                      )}
                    </button>

                    <div className="relative flex items-center justify-center">
                      <div className="border-t border-gray-700 flex-grow"></div>
                      <div className="mx-4 text-gray-400">OR</div>
                      <div className="border-t border-gray-700 flex-grow"></div>
                    </div>

                    <button
                      onClick={handleSiteLogin}
                      disabled={isLoading}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors"
                    >
                      {isLoading && loginMethod === "site" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Mail className="h-5 w-5" />
                          Sign in with Email
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === "payment" && (
                <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Information</h2>

                  <div className="bg-gray-900/50 p-4 rounded-lg mb-6 border border-yellow-500/30">
                    <p className="text-yellow-400 flex items-start gap-2">
                      <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>
                        Payment gateway integration is coming soon. For now, this is a demonstration of the checkout
                        flow.
                      </span>
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <CreditCard className="h-6 w-6 text-red-500" />
                      <h3 className="font-semibold">Payment Method</h3>
                    </div>

                    <div className="flex gap-4 mb-4">
                      <div className="border border-gray-700 rounded-lg p-3 flex-1 flex items-center gap-3 bg-gray-900/50">
                        <div className="w-10 h-6 bg-gray-800 rounded"></div>
                        <span>Credit Card</span>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-3 flex-1 flex items-center gap-3">
                        <div className="w-10 h-6 bg-gray-800 rounded"></div>
                        <span>UPI</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm">
                      Razorpay payment gateway will be integrated soon. This will allow for secure payment processing.
                    </p>
                  </div>

                  <button
                    className="btn-primary w-full"
                    onClick={() => router.push(`/events/${event.id}/confirmation`)}
                  >
                    Complete Booking (Demo)
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="flex gap-4 mb-6">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="text-sm text-gray-300 mb-1">
                      {event.date} • {event.time}
                    </div>
                    <div className="text-sm text-gray-300">{event.location}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6 border-t border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span>Standard x 2</span>
                    <span>₹3,000</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>₹600</span>
                  </div>

                  <div className="border-t border-gray-700 pt-3 font-bold flex justify-between">
                    <span>Total</span>
                    <span>₹3,600</span>
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  <p>By completing this booking, you agree to our Terms of Service and Privacy Policy.</p>
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
