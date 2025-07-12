"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "@/components/auth-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const pathname = usePathname()
  const { getCartCount } = useCart()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-shadow ${isScrolled ? "shadow-md" : ""}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo - Responsive sizing */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative w-24 h-10 sm:w-28 sm:h-12 lg:w-32 lg:h-16">
                <Image
                  src="https://i.ibb.co/3mqR8CP4/logof.png"
                  alt="Freshco Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm xl:text-base font-medium transition-colors hover:text-green-600 ${
                    isActive(item.href) ? "text-green-600" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              {user ? (
                <div className="flex items-center space-x-2 xl:space-x-3">
                  <Link href="/cart">
                    <Button variant="ghost" size="sm" className="relative text-gray-600 hover:text-green-600">
                      <ShoppingCart className="w-4 h-4 xl:w-5 xl:h-5" />
                      {getCartCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {getCartCount()}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 xl:w-5 xl:h-5 text-gray-600" />
                    <span className="text-sm xl:text-base text-gray-600 max-w-24 truncate">{user.name}</span>
                    <Button variant="ghost" size="sm" onClick={logout} className="text-gray-600 hover:text-red-600">
                      <LogOut className="w-4 h-4 xl:w-5 xl:h-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="text-gray-600 hover:text-green-600 flex items-center space-x-1"
                >
                  <User className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span className="text-sm xl:text-base">Login</span>
                </Button>
              )}
            </div>

            {/* Mobile/Tablet Actions */}
            <div className="flex lg:hidden items-center space-x-2">
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

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t bg-white shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-3 text-base font-medium transition-colors hover:text-green-600 hover:bg-green-50 rounded-md ${
                      isActive(item.href) ? "text-green-600 bg-green-50" : "text-gray-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="border-t pt-3 mt-3">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-md">Hi, {user.name}</div>
                      <Link
                        href="/cart"
                        className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Cart ({getCartCount()})
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 w-full text-left rounded-md"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAuthModal(true)
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 w-full text-left rounded-md"
                    >
                      <User className="w-5 h-5 mr-3" />
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}
