"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Crown, Diamond, Sparkles, Award, Menu, X, User, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getProducts } from "@/lib/firebase"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "@/components/auth-modal"
import type { Product } from "@/types"

export default function ElegantDarkTemplate() {
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Elegant Dark Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800" : "bg-gray-900/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-16 h-16 p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full">
                <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif text-gold-400">Freshco</span>
                <span className="text-xs text-gray-400 tracking-widest">PREMIUM COLLECTION</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-light tracking-widest uppercase transition-colors hover:text-gold-400 ${
                    isActive(item.href) ? "text-gold-400" : "text-gray-300"
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
                  <span className="text-sm text-gray-300 font-light">Welcome, {user.name}</span>
                  <Button variant="ghost" size="sm" onClick={logout} className="text-gray-400 hover:text-red-400">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                  className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-gray-900 bg-transparent"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}

              {user && (
                <Link href="/cart">
                  <Button
                    variant="outline"
                    className="relative border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-gray-900 bg-transparent"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {getCartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gold-400 text-gray-900 text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                        {getCartCount()}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Crown className="w-16 h-16 text-gold-400" />
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-gold-400 mb-8 tracking-tight">
            Luxury
            <br />
            <span className="text-white">Redefined</span>
          </h1>
          <p className="text-xl font-light text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the pinnacle of organic luxury. Our exclusive collection represents the finest in premium natural
            products, crafted for the discerning connoisseur.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gold-400 hover:bg-gold-500 text-gray-900 px-12 py-4 text-lg font-semibold">
              <Diamond className="w-5 h-5 mr-2" />
              Explore Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-12 py-4 text-lg font-light bg-transparent"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Our Heritage
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Award className="w-12 h-12 text-gold-400" />
            </div>
            <h2 className="text-4xl font-serif text-gold-400 mb-4">Curated Excellence</h2>
            <p className="text-lg text-gray-400 font-light">Handpicked treasures from our premium collection</p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-8"></div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-700 animate-pulse rounded-lg h-96"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group bg-gray-900 border border-gray-700 hover:border-gold-400 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-6 left-6 right-6">
                        <Button className="w-full bg-gold-400 hover:bg-gold-500 text-gray-900 font-semibold">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Collection
                        </Button>
                      </div>
                    </div>
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-gold-400 text-gray-900 font-semibold">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl text-white mb-2 group-hover:text-gold-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 font-light line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                      ))}
                      <span className="text-sm text-gray-400 ml-2 font-light">(Exceptional)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-serif text-gold-400">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through font-light">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Badge variant="outline" className="border-gray-600 text-gray-400 font-light">
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

      {/* Luxury Features */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gold-400 mb-4">The Freshco Promise</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700 hover:border-gold-400 transition-colors">
              <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-serif text-gold-400 mb-3">Royal Quality</h3>
              <p className="text-gray-400 font-light">Only the finest ingredients, fit for royalty</p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700 hover:border-gold-400 transition-colors">
              <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Diamond className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-serif text-gold-400 mb-3">Rare Selection</h3>
              <p className="text-gray-400 font-light">Exclusive products sourced from premium locations</p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700 hover:border-gold-400 transition-colors">
              <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-serif text-gold-400 mb-3">Artisan Crafted</h3>
              <p className="text-gray-400 font-light">Handcrafted with traditional methods</p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700 hover:border-gold-400 transition-colors">
              <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-serif text-gold-400 mb-3">Award Winning</h3>
              <p className="text-gray-400 font-light">Recognized excellence in organic luxury</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <Sparkles className="w-12 h-12 text-gold-400" />
          </div>
          <h2 className="text-4xl font-serif text-gold-400 mb-4">Join the Elite</h2>
          <p className="text-lg text-gray-300 mb-12 font-light">
            Become part of our exclusive community and receive first access to our luxury collections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 font-light"
            />
            <Button className="bg-gold-400 hover:bg-gold-500 text-gray-900 px-8 py-4 font-semibold">Join Now</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full">
                  <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-serif text-gold-400">Freshco</span>
                  <span className="text-xs text-gray-500 tracking-widest">PREMIUM COLLECTION</span>
                </div>
              </div>
              <p className="text-gray-400 font-light">Luxury organic products for the discerning connoisseur.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-serif text-gold-400">Navigation</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-gold-400 transition-colors font-light">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-serif text-gold-400">Contact</h3>
              <div className="space-y-2 text-gray-400 font-light">
                <p>+91 98765 43210</p>
                <p>freshconatural.14@gmail.com</p>
                <p>123 Green Street, Natural City</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-serif text-gold-400">Follow Us</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold-400 hover:text-gray-900 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold-400 hover:text-gray-900 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">i</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold-400 hover:text-gray-900 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">y</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500 font-light">© 2025 Freshco Premium Collection. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
