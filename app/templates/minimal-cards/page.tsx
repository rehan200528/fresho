"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { getProducts } from "@/lib/firebase"
import type { Product } from "@/types"

export default function MinimalCardsTemplate() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const productsData = await getProducts()
      setProducts(productsData.slice(0, 12))
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded h-80"></div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Minimal Hero */}
      <section className="py-20 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-light text-gray-800 mb-6">Minimal</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Clean design. Pure focus. Premium products.</p>
          <div className="w-24 h-px bg-green-600 mx-auto"></div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-20">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Product Image */}
              <div className="relative mb-6 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white bg-transparent"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center space-y-2">
                <h3 className="font-light text-lg text-gray-800 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg font-light text-gray-800">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal CTA */}
        <div className="text-center mt-20">
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-12 bg-transparent"
          >
            View More
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
