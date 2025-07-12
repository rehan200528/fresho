"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import ProductModal from "./product-modal"

const featuredProducts = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 89,
    originalPrice: 120,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    category: "Fruits",
    description:
      "Fresh organic bananas rich in potassium and natural sweetness. Perfect for smoothies and healthy snacking.",
    features: ["Organic Certified", "Rich in Potassium", "Natural Ripening"],
    inStock: true,
    discount: 26,
  },
  {
    id: 2,
    name: "Fresh Spinach",
    price: 45,
    originalPrice: 60,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    category: "Vegetables",
    description: "Crisp, fresh spinach leaves packed with iron and vitamins. Ideal for salads, smoothies, and cooking.",
    features: ["Iron Rich", "Vitamin K", "Fresh Daily"],
    inStock: true,
    discount: 25,
  },
  {
    id: 3,
    name: "Organic Tomatoes",
    price: 65,
    originalPrice: 85,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    category: "Vegetables",
    description: "Juicy organic tomatoes with rich flavor. Perfect for cooking, salads, and fresh consumption.",
    features: ["Vine Ripened", "Rich Flavor", "Organic"],
    inStock: true,
    discount: 24,
  },
  {
    id: 4,
    name: "Mixed Berries",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 78,
    category: "Fruits",
    description:
      "Premium mix of strawberries, blueberries, and raspberries. Rich in antioxidants and natural sweetness.",
    features: ["Antioxidant Rich", "Mixed Variety", "Premium Quality"],
    inStock: true,
    discount: 25,
  },
  {
    id: 5,
    name: "Organic Carrots",
    price: 55,
    originalPrice: 75,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 92,
    category: "Vegetables",
    description: "Sweet, crunchy organic carrots rich in beta-carotene. Great for snacking, cooking, and juicing.",
    features: ["Beta Carotene", "Crunchy Texture", "Organic"],
    inStock: true,
    discount: 27,
  },
  {
    id: 6,
    name: "Fresh Avocados",
    price: 199,
    originalPrice: 249,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 134,
    category: "Fruits",
    description: "Creamy, ripe avocados perfect for toast, salads, and smoothies. Rich in healthy fats and nutrients.",
    features: ["Healthy Fats", "Creamy Texture", "Nutrient Dense"],
    inStock: false,
    discount: 20,
  },
]

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof featuredProducts)[0] | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      className: "border-green-200 bg-green-50",
    })
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Discover our handpicked selection of premium organic products, sourced directly from trusted farms for
              maximum freshness and quality.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  {/* Product Image */}
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.discount > 0 && (
                        <Badge variant="destructive" className="bg-red-500">
                          {product.discount}% OFF
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary" className="bg-gray-500 text-white">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-10 h-10 p-0 bg-white hover:bg-gray-100"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorites.includes(product.id) ? "text-red-500 fill-current" : "text-gray-600"
                          }`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-10 h-10 p-0 bg-white hover:bg-gray-100"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-6">
                    {/* Category */}
                    <Badge variant="outline" className="mb-2 text-xs">
                      {product.category}
                    </Badge>

                    {/* Product Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">{renderStars(product.rating)}</div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl sm:text-2xl font-bold text-green-600">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12 sm:mt-16">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 bg-transparent"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  )
}
