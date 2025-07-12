"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Truck, ShoppingBag, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, getCartTotal, getCartCount, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  })

  const deliveryCharge = 50
  const total = getCartTotal()
  const grandTotal = total + (total > 0 ? deliveryCharge : 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form
      if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and show success
      clearCart()

      toast({
        title: (
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Order Placed Successfully! 🎉</span>
          </div>
        ),
        description: "Thank you for your order. We'll send you a confirmation email shortly.",
        className: "border-green-200 bg-green-50",
      })

      // Redirect to home page
      router.push("/")
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 sm:mt-20">
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to login to proceed to checkout</p>
            <Button onClick={() => router.push("/")} className="bg-green-600 hover:bg-green-700">
              Go to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 sm:mt-20">
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products before checkout</p>
            <Button onClick={() => router.push("/products")} className="bg-green-600 hover:bg-green-700">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-16 sm:mt-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Shipping Information */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Shipping Information</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700 font-medium text-sm">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        required
                        className="mt-1 h-11 sm:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700 font-medium text-sm">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        required
                        className="mt-1 h-11 sm:h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="mt-1 h-11 sm:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium text-sm">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        required
                        className="mt-1 h-11 sm:h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-gray-700 font-medium text-sm">
                      Address *
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address, apartment, suite, etc."
                      required
                      rows={3}
                      className="mt-1 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-700 font-medium text-sm">
                        City *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                        className="mt-1 h-11 sm:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-gray-700 font-medium text-sm">
                        State *
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        required
                        className="mt-1 h-11 sm:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-gray-700 font-medium text-sm">
                        Pincode *
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="123456"
                        required
                        className="mt-1 h-11 sm:h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-gray-700 font-medium text-sm">
                      Order Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions for delivery..."
                      rows={3}
                      className="mt-1 resize-none"
                    />
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Payment Method</h2>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Cash on Delivery</span>
                        <span className="text-sm text-gray-500">Pay when you receive</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 opacity-50">
                    <RadioGroupItem value="online" id="online" disabled />
                    <Label htmlFor="online" className="flex-1 cursor-not-allowed">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Online Payment</span>
                        <span className="text-sm text-gray-500">Coming Soon</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md sticky top-24">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Order Totals */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({getCartCount()} items):</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery:</span>
                    <span>₹{deliveryCharge}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium h-12 sm:h-14"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Place Order</span>
                    </div>
                  )}
                </Button>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  By placing your order, you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
