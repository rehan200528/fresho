"use client"

import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, X } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  category: string
  description: string
  features: string[]
  inStock: boolean
  discount: number
}

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative h-64 md:h-full min-h-[400px]">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
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

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 w-8 h-8 p-0 bg-white/80 hover:bg-white"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Category */}
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>

            {/* Product Name */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock ? `Add ${quantity} to Cart` : "Out of Stock"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-12 h-12 p-0 bg-transparent"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-current" : "text-gray-600"}`} />
              </Button>
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              {product.inStock ? (
                <span className="text-green-600 font-medium">✓ In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">✗ Currently Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
