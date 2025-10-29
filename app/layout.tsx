import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bhairavacha Bhandara - Ticket Booking",
  description: "Book tickets for upcoming cultural shows and events",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Primary favicon as SVG (modern browsers) */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        {/* Web manifest for basic PWA metadata */}
        <link rel="manifest" href="/site.webmanifest" />
        {/* Apple touch icon for iOS (optional) */}
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        {/* Theme color for mobile UI */}
        <meta name="theme-color" content="#c40000ff" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
