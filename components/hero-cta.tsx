"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Gift } from "lucide-react"
import Link from "next/link"
import AuthModal from "./auth-modal"
import { useAuth } from "@/contexts/auth-context"

export default function HeroCTA() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user } = useAuth()

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Start Your
              <span className="block">Healthy Journey?</span>
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-green-100 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made the switch to organic, natural products. Experience
              the Freshco difference today!
            </p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold mb-2">Free Delivery</div>
                <div className="text-green-100 text-sm">On orders above ₹500</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold mb-2">Fresh Guarantee</div>
                <div className="text-green-100 text-sm">100% freshness assured</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold mb-2">24/7 Support</div>
                <div className="text-green-100 text-sm">Always here to help</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-semibold"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              {!user && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 text-lg font-semibold bg-transparent"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Join Freshco Free
                </Button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-green-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">50,000+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Organic Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Same Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
