// Event types
export interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  image: string
  description: string
  price: string
  availableSeats: number
  categories: string[]
  duration: string
  artists?: string[]
  status?: "active" | "sold-out" | "cancelled"
}

// Ticket types
export interface Ticket {
  id: string
  eventId: number
  seatType: string
  price: number
  quantity: number
}

// Booking types
export interface Booking {
  id: string
  userId: string
  eventId: number
  tickets: Ticket[]
  totalAmount: number
  bookingDate: string
  status: "pending" | "confirmed" | "cancelled"
  paymentId?: string
}

// User types
export interface User {
  id: string
  name: string
  email: string
  image?: string
}

// Ticket sales by type
export interface TicketSalesByType {
  standard: number
  premium: number
  vip: number
}

// Recent booking type
export interface RecentBooking {
  id: string
  name: string
  tickets: number
  time: string
  eventId: number
}
