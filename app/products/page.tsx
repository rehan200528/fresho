"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Heart, Search, Filter, Grid, List } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import ProductModal from "@/components/product-modal"
import Header from "@/components/header"
import Footer from "@/components/footer"

const allProducts = [
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
  {
    id: 7,
    name: "Organic Apples",
    price: 120,
    originalPrice: 150,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 203,
    category: "Fruits",
    description: "Crisp, sweet organic apples with natural flavor. Perfect for snacking and baking.",
    features: ["Crisp Texture", "Natural Sweetness", "Organic"],
    inStock: true,
    discount: 20,
  },
  {
    id: 8,
    name: "Fresh Broccoli",
    price: 75,
    originalPrice: 95,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 67,
    category: "Vegetables",
    description: "Fresh green broccoli florets packed with vitamins and minerals. Great for steaming and stir-fries.",
    features: ["Vitamin C", "Fresh Daily", "Nutrient Dense"],
    inStock: true,
    discount: 21,
  },
  {
    id: 9,
    name: "Organic Oranges",
    price: 95,
    originalPrice: 125,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 145,
    category: "Fruits",
    description: "Juicy organic oranges bursting with vitamin C and natural citrus flavor.",
    features: ["Vitamin C Rich", "Juicy", "Organic"],
    inStock: true,
    discount: 24,
  },
  {
    id: 10,
    name: "Fresh Lettuce",
    price: 35,
    originalPrice: 45,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 56,
    category: "Vegetables",
    description: "Crisp, fresh lettuce leaves perfect for salads and sandwiches.",
    features: ["Crisp Texture", "Fresh Daily", "Low Calorie"],
    inStock: true,
    discount: 22,
  },
  {
    id: 11,
    name: "Organic Grapes",
    price: 180,
    originalPrice: 220,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 98,
    category: "Fruits",
    description: "Sweet, seedless organic grapes perfect for snacking and fruit salads.",
    features: ["Seedless", "Sweet", "Organic"],
    inStock: true,
    discount: 18,
  },
  {
    id: 12,
    name: "Fresh Bell Peppers",
    price: 85,
    originalPrice: 110,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 73,
    category: "Vegetables",
    description: "Colorful bell peppers with crisp texture and sweet flavor. Great for cooking and salads.",
    features: ["Colorful Mix", "Crisp Texture", "Sweet Flavor"],
    inStock: true,
    discount: 23,
  },
]

const categories = ["All", "Fruits", "Vegetables"]
const sortOptions = [
  { value: "name", label: "Name" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "discount", label: "Discount" },
]

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof allProducts)[0] | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { addItem } = useCart()
  const { toast } = useToast()

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "discount":
          return b.discount - a.discount
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
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
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-1"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-1"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredAndSortedProducts.length} of {allProducts.length} products
            </p>
          </div>

          {/* Products Grid/List */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredAndSortedProducts.map((product) => (
              <Card
                key={product.id}
                className={`group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
              >
                <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                  {/* Product Image */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "h-full" : "h-64 sm:h-72"}`}>
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
                    </div>
                  </div>
                </div>

                <CardContent
                  className={`p-4 sm:p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}
                >
                  <div>
                    {/* Category */}
                    <Badge variant="outline" className="mb-2 text-xs">
                      {product.category}
                    </Badge>

                    {/* Product Name */}
                    <h3
                      className={`font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors cursor-pointer ${
                        viewMode === "list" ? "text-xl" : "text-lg sm:text-xl"
                      }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">{renderStars(product.rating)}</div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {viewMode === "list" && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    )}
                  </div>

                  <div>
                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`font-bold text-green-600 ${
                          viewMode === "list" ? "text-2xl" : "text-xl sm:text-2xl"
                        }`}
                      >
                        ₹{product.price}
                      </span>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <Footer />
    </>
  )
}
