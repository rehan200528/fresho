"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import Image from "next/image"
import { getProducts } from "@/lib/firebase"
import type { Product } from "@/types"

export default function MasonryGridTemplate() {
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

  // Generate random heights for masonry effect
  const getRandomHeight = (index: number) => {
    const heights = [300, 350, 400, 320, 380, 360]
    return heights[index % heights.length]
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-lg mb-6 break-inside-avoid"
                style={{ height: getRandomHeight(i) }}
              ></div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Creative Header */}
      <section className="py-20 mt-16 bg-gradient-to-br from-green-400 via-green-500 to-green-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-6xl font-bold mb-6">Creative Grid</h1>
          <p className="text-xl mb-8 opacity-90">Discover products in a whole new way</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary">
              Explore Collection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              View Gallery
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 break-inside-avoid group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={getRandomHeight(index)}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ height: getRandomHeight(index) }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="text-white">
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-sm opacity-90">{product.weight}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-green-600 hover:bg-green-700">{product.badge}</Badge>
                )}
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 rounded-xl">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 px-12">
            Load More Products
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
