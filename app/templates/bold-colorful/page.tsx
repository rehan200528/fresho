"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Zap, Target, Globe, Users, Menu, X, User, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getProducts } from "@/lib/firebase"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "@/components/auth-modal"
import type { Product } from "@/types"

export default function BoldColorfulTemplate() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      {/* Bold Colorful Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-80">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-20 h-20 p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
                <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-green-600 ${
                    isActive(item.href) ? "text-green-600" : "text-gray-800"
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
                  <span className="text-sm font-semibold text-gray-800">Hi, {user.name}</span>
                  <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:text-red-800">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}

              {user && (
                <Link href="/cart">
                  <Button className="relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <ShoppingCart className="w-5 h-5" />
                    {getCartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
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
      <section className="pt-32 pb-20 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 drop-shadow-lg">
            FRESH
            <br />
            <span className="text-yellow-300">REVOLUTION</span>
          </h1>
          <p className="text-xl font-semibold mb-12 max-w-3xl mx-auto drop-shadow">
            🌟 Experience the ULTIMATE in organic living! Premium natural products that will TRANSFORM your lifestyle!
            🌟
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all"
            >
              🚀 SHOP NOW!
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black px-12 py-6 text-xl rounded-full font-bold bg-transparent"
            >
              💫 DISCOVER MORE
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-green-600 mb-2">500+</div>
              <div className="text-lg font-bold text-gray-800">PRODUCTS</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-600 mb-2">50K+</div>
              <div className="text-lg font-bold text-gray-800">CUSTOMERS</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-purple-600 mb-2">4.9★</div>
              <div className="text-lg font-bold text-gray-800">RATING</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-pink-600 mb-2">24/7</div>
              <div className="text-lg font-bold text-gray-800">SUPPORT</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-800 mb-4">🔥 HOT PRODUCTS 🔥</h2>
            <p className="text-xl font-bold text-gray-600">The most AMAZING products you'll ever try!</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white animate-pulse rounded-2xl h-96 shadow-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white rounded-2xl transform hover:scale-105"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={250}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Colorful Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-full px-6 py-3 transform rotate-3 hover:rotate-0 transition-transform">
                        🛒 ADD TO CART!
                      </Button>
                    </div>

                    {/* Colorful Badge */}
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1 rounded-full">
                        ⭐ {product.badge}
                      </Badge>
                    )}

                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black px-3 py-1 rounded-full animate-pulse">
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
                      <span className="text-sm font-bold text-gray-600 ml-1">(4.8) 🎉</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-green-600">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through font-semibold">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-800 mb-4">💪 WHY CHOOSE US? 💪</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl text-white transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-black mb-3">⚡ SUPER FAST!</h3>
              <p className="font-semibold">Lightning-fast delivery to your door!</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl text-white transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-black mb-3">🎯 100% QUALITY!</h3>
              <p className="font-semibold">Premium quality guaranteed!</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl text-white transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-black mb-3">🌍 ECO-FRIENDLY!</h3>
              <p className="font-semibold">Saving the planet, one product at a time!</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl text-white transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black mb-3">👥 TRUSTED!</h3>
              <p className="font-semibold">50,000+ happy customers!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl font-black mb-8 drop-shadow-lg">🎉 JOIN THE REVOLUTION! 🎉</h2>
          <p className="text-2xl font-bold mb-12 drop-shadow">Don't miss out on the BEST organic products!</p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 font-black px-16 py-8 text-2xl rounded-full shadow-2xl transform hover:scale-110 transition-all"
          >
            🚀 START SHOPPING NOW!
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
                  <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Freshco
                </span>
              </div>
              <p className="text-gray-400 font-semibold">
                🌟 The ULTIMATE destination for premium natural products! 🌟
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-yellow-400">🔗 QUICK LINKS</h3>
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
              <h3 className="text-xl font-black text-green-400">📞 CONTACT US</h3>
              <div className="space-y-2 text-gray-400 font-semibold">
                <p>📱 +91 98765 43210</p>
                <p>📧 freshconatural.14@gmail.com</p>
                <p>📍 123 Green Street, Natural City</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-pink-400">💌 NEWSLETTER</h3>
              <p className="text-gray-400 font-semibold">Get the HOTTEST deals first! 🔥</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 font-semibold"
                />
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-bold rounded-full">
                  GO! 🚀
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-bold">© 2025 Freshco. All rights reserved. Made with 💚 for you!</p>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
