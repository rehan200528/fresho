export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  weight: string
  badge?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  createdAt: Date
  shippingAddress: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    pincode: string
  }
  paymentMethod: string
}
