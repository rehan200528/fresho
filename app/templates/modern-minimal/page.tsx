"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Leaf, Award, Truck, Shield, Menu, X, User, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getProducts } from "@/lib/firebase"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "@/components/auth-modal"
import type { Product } from "@/types"

export default function ModernMinimalTemplate() {
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
      setProducts(productsData.slice(0, 6))
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
    <div className="min-h-screen bg-white">
      {/* Modern Minimal Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-16 h-16">
                <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
              </div>
              <span className="text-2xl font-light text-gray-800">Freshco</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-light tracking-wide transition-colors hover:text-green-600 ${
                    isActive(item.href) ? "text-green-600" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 font-light">Hi, {user.name}</span>
                  <Button variant="ghost" size="sm" onClick={logout} className="text-gray-600 hover:text-red-600">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="text-gray-600 hover:text-green-600 font-light"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}

              {user && (
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="relative text-gray-600 hover:text-green-600">
                    <ShoppingCart className="w-5 h-5" />
                    {getCartCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-3 text-base font-light transition-colors hover:text-green-600 ${
                      isActive(item.href) ? "text-green-600" : "text-gray-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-7xl md:text-8xl font-extralight text-gray-800 mb-8 tracking-tight">
            Pure
            <br />
            <span className="text-green-600">Natural</span>
          </h1>
          <p className="text-xl font-light text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover the essence of organic living with our carefully curated collection of premium natural products.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 px-12 py-4 text-lg font-light">
              Explore Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-12 py-4 text-lg font-light bg-transparent"
            >
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-4">Featured Selection</h2>
            <div className="w-24 h-px bg-green-600 mx-auto"></div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white animate-pulse rounded h-96"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative mb-6 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
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
                  <div className="text-center space-y-2">
                    <h3 className="font-light text-lg text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</p>
                    <p className="text-lg font-light text-gray-800">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-4">Our Values</h2>
            <div className="w-24 h-px bg-green-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-light text-gray-800 mb-3">100% Natural</h3>
              <p className="text-gray-600 font-light">Pure, organic ingredients sourced directly from nature</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-light text-gray-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600 font-light">Rigorous quality standards ensure excellence</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-light text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 font-light">Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-light text-gray-800 mb-3">Trusted Brand</h3>
              <p className="text-gray-600 font-light">Thousands of satisfied customers trust us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12">
                  <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
                </div>
                <span className="text-xl font-light">Freshco</span>
              </div>
              <p className="text-gray-400 font-light">Premium natural products for healthy living.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-light">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors font-light">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-light">Contact</h3>
              <div className="space-y-2 text-gray-400 font-light">
                <p>+91 98765 43210</p>
                <p>freshconatural.14@gmail.com</p>
                <p>123 Green Street, Natural City</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-light">Newsletter</h3>
              <p className="text-gray-400 font-light">Stay updated with our latest products</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                />
                <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-light">© 2025 Freshco. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
