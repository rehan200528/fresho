"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Plus, Minus, X } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types"

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      })
      return
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }

    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart`,
    })

    onClose()
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 1
    setQuantity(Math.max(1, value))
  }

  // Generate random rating between 4.0 and 5.0
  const rating = (4.0 + Math.random()).toFixed(1)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-w-[95vw] bg-white p-0 max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop"
                }}
              />
            </div>
            {/* Category Badge */}
            <Badge className="absolute top-3 left-3 bg-green-100 text-green-800 hover:bg-green-100">
              {product.category}
            </Badge>
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-gray-200 text-gray-200" />
                </div>
                <span className="text-sm sm:text-base text-gray-600">({rating})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-green-600">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                <span className="text-sm sm:text-base text-gray-500">/ {product.weight}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Product Details</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Premium quality {product.category} sourced directly from certified organic farms. Rich in nutrients and
                free from harmful chemicals, this product ensures the highest standards of quality and freshness for
                your healthy lifestyle.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">100% Organic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Fresh Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">No Chemicals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Farm Fresh</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decrementQuantity}
                  className="h-10 w-10 p-0 rounded-full bg-transparent"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 text-center h-10"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={incrementQuantity}
                  className="h-10 w-10 p-0 rounded-full bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">Total: ₹{(product.price * quantity).toFixed(2)}</p>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Add {quantity} to Cart
            </Button>

            {/* Additional Info */}
            <div className="text-xs sm:text-sm text-gray-500 space-y-1">
              <p>✓ Free delivery on orders above ₹500</p>
              <p>✓ Fresh guarantee or money back</p>
              <p>✓ Sourced directly from organic farms</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
