"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Leaf, Shield, Truck } from "lucide-react"
import Link from "next/link"
import AuthModal from "./auth-modal"
import { useAuth } from "@/contexts/auth-context"

export default function Hero() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user } = useAuth()

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                  <Leaf className="w-3 h-3 mr-1" />
                  100% Natural & Organic
                </Badge>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Fresh, Natural Products
                  <span className="block text-green-600">Delivered Daily</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Discover premium organic fruits, vegetables, and natural products sourced directly from local farms.
                  Experience the difference of truly fresh, chemical-free produce.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">100% Organic</h3>
                    <p className="text-xs text-gray-600">Chemical-free</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Quality Assured</h3>
                    <p className="text-xs text-gray-600">Lab tested</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Fast Delivery</h3>
                    <p className="text-xs text-gray-600">Same day</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  >
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                {!user && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg bg-transparent"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Join Freshco
                  </Button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">100+</div>
                  <div className="text-sm text-gray-600">Partner Farms</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Fresh organic vegetables and fruits"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Floating Cards */}
                <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Fresh Today</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Free Delivery</div>
                    <div className="text-gray-600">Orders above ₹500</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
