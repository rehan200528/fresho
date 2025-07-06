"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, Smile, Coffee, Sun, Zap, Menu, X, User, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getProducts } from "@/lib/firebase"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "@/components/auth-modal"
import type { Product } from "@/types"

export default function PlayfulModernTemplate() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const pathname = usePathname()
  const { getCartCount } = useCart()
  const { user, logout } = useAuth()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
    { name: "Templates", href: "/templates" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const productsData = await getProducts()
      setProducts(productsData.slice(0, 8))
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Playful Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-16 h-16 p-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transform rotate-12 hover:rotate-0 transition-transform">
                <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Freshco
                </span>
                <span className="text-xs text-gray-500 font-semibold">✨ FEEL GOOD FOOD ✨</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-orange-500 ${
                    isActive(item.href) ? "text-orange-500" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-gray-700">Hey {user.name}! 👋</span>
                  <Button variant="ghost" size="sm" onClick={logout} className="text-red-500 hover:text-red-700">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold rounded-full px-6"
                >
                  <User className="w-4 h-4 mr-2" />
                  Join Fun! 🎉
                </Button>
              )}

              {user && (
                <Link href="/cart">
                  <Button className="relative bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-full">
                    <ShoppingCart className="w-5 h-5" />
                    {getCartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
                        {getCartCount()}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              <Sun className="w-12 h-12 text-yellow-500 animate-spin" />
              <Smile className="w-12 h-12 text-orange-500 animate-bounce" />
              <Coffee className="w-12 h-12 text-pink-500 animate-pulse" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Life's
            <br />
            Delicious! 🌈
          </h1>
          <p className="text-xl font-semibold text-gray-700 mb-12 max-w-3xl mx-auto">
            🎉 Welcome to the most FUN organic food experience! Where healthy meets happy and every bite is a
            celebration! 🎊
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-black px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all"
            >
              🛒 Let's Shop!
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-400 text-purple-600 hover:bg-purple-50 px-12 py-6 text-xl rounded-full font-bold bg-transparent"
            >
              🌟 Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Fun Stats */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl transform hover:scale-105 transition-transform">
              <div className="text-4xl font-black text-orange-600 mb-2">500+ 🎯</div>
              <div className="text-lg font-bold text-gray-800">Amazing Products</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl transform hover:scale-105 transition-transform">
              <div className="text-4xl font-black text-pink-600 mb-2">50K+ 💖</div>
              <div className="text-lg font-bold text-gray-800">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl transform hover:scale-105 transition-transform">
              <div className="text-4xl font-black text-purple-600 mb-2">4.9★ ⭐</div>
              <div className="text-lg font-bold text-gray-800">Super Rating</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl transform hover:scale-105 transition-transform">
              <div className="text-4xl font-black text-yellow-600 mb-2">24/7 🚀</div>
              <div className="text-lg font-bold text-gray-800">Fun Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-800 mb-4">🌟 Our Favorites! 🌟</h2>
            <p className="text-xl font-bold text-gray-600">The products that make us dance with joy!</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white/70 animate-pulse rounded-3xl h-96 shadow-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-3xl transform hover:scale-105 hover:rotate-1"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={250}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Fun Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-black rounded-full px-6 py-3 transform -rotate-3 hover:rotate-0 transition-transform shadow-lg">
                        🛒 Add Me!
                      </Button>
                    </div>

                    {/* Fun Badge */}
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-3 py-1 rounded-full transform rotate-12">
                        ✨ {product.badge}
                      </Badge>
                    )}

                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-black px-3 py-1 rounded-full animate-pulse">
                        🔥 {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF!
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-black text-lg text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm font-bold text-gray-600 ml-1">(Amazing! 🎉)</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through font-semibold">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold rounded-full">
                        {product.weight}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Fun Features */}
      <section className="py-20 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-800 mb-4">🎊 Why We're Awesome! 🎊</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">⚡ Super Fast!</h3>
              <p className="font-semibold text-gray-600">Lightning speed delivery that'll make you smile!</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">💖 Made with Love!</h3>
              <p className="font-semibold text-gray-600">Every product is crafted with pure love and care!</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
                <Sun className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">☀️ Pure Joy!</h3>
              <p className="font-semibold text-gray-600">Products that bring sunshine to your day!</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Smile className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">😊 Happy Vibes!</h3>
              <p className="font-semibold text-gray-600">Spreading happiness one product at a time!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl font-black mb-8 drop-shadow-lg">🎉 Join Our Fun Family! 🎉</h2>
          <p className="text-2xl font-bold mb-12 drop-shadow">Get the coolest updates and exclusive goodies!</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your awesome email! ✨"
              className="flex-1 px-6 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 font-semibold"
            />
            <Button className="bg-white text-purple-600 hover:bg-gray-100 font-black px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all">
              Let's Go! 🚀
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 p-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full">
                  <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Freshco
                  </span>
                  <span className="text-xs text-gray-400 font-bold">✨ FEEL GOOD FOOD ✨</span>
                </div>
              </div>
              <p className="text-gray-400 font-semibold">🌟 Making healthy eating fun and delicious! 🌟</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-orange-400">🔗 Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors font-bold">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-pink-400">📞 Say Hello!</h3>
              <div className="space-y-2 text-gray-400 font-semibold">
                <p>📱 +91 98765 43210</p>
                <p>📧 freshconatural.14@gmail.com</p>
                <p>📍 123 Green Street, Natural City</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-purple-400">💌 Stay Connected</h3>
              <p className="text-gray-400 font-semibold">Follow us for daily doses of fun! 🎉</p>
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white font-bold">i</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white font-bold">y</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-bold">
              © 2025 Freshco. All rights reserved. Made with 💖 and lots of fun!
            </p>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
