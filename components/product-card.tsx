"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  onQuickView: () => void
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
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

    addToCart(product)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  // Generate random rating between 4.0 and 5.0
  const rating = (4.0 + Math.random()).toFixed(1)

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      {/* Category Badge */}
      <div className="bg-gray-100 px-3 py-2">
        <span className="text-xs sm:text-sm font-medium text-gray-600 capitalize">{product.category}</span>
      </div>

      {/* Product Image */}
      <div className="relative h-36 sm:h-48 bg-gray-50 flex items-center justify-center flex-shrink-0">
        <Image
          src={product.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop"}
          alt={product.name}
          width={200}
          height={200}
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop"
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base flex-1">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-gray-200 text-gray-200" />
          <span className="text-xs sm:text-sm text-gray-600 ml-1">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <span className="text-xs sm:text-sm text-gray-500">{product.weight}</span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm sm:text-base py-2 sm:py-3"
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
