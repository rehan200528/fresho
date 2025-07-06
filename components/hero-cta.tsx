"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroCTA() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Healthy Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied customers who trust FreshCo for their organic needs
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
