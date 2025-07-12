"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User, Home, Package, Phone } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "./auth-modal"

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { items } = useCart()
  const { user, logout } = useAuth()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  const handleAuthClick = () => {
    if (user) {
      logout()
    } else {
      setIsAuthModalOpen(true)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image src="/placeholder-logo.svg" alt="Freshco Logo" fill className="object-contain" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-green-600">Freshco</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/about"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/templates"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
              >
                Templates
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAuthClick}
                className="text-gray-700 hover:text-green-600"
              >
                <User className="w-4 h-4 mr-2" />
                {user ? `Hi, ${user.name.split(" ")[0]}` : "Sign In"}
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {totalItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {totalItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center space-x-2 pb-6 border-b">
                      <div className="relative w-8 h-8">
                        <Image src="/placeholder-logo.svg" alt="Freshco Logo" fill className="object-contain" />
                      </div>
                      <span className="text-xl font-bold text-green-600">Freshco</span>
                    </div>

                    {/* User Section */}
                    <div className="py-6 border-b">
                      <Button
                        variant="ghost"
                        onClick={handleAuthClick}
                        className="w-full justify-start text-left p-0 h-auto"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            {user ? (
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500">Tap to logout</p>
                              </div>
                            ) : (
                              <div>
                                <p className="font-medium text-gray-900">Sign In</p>
                                <p className="text-sm text-gray-500">Access your account</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Button>
                    </div>

                    {/* Mobile Navigation - Only Home, Products, Contact */}
                    <nav className="flex-1 py-6">
                      <div className="space-y-1">
                        {navigationItems.map((item) => {
                          const IconComponent = item.icon
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center space-x-3 px-3 py-4 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                            >
                              <IconComponent className="w-5 h-5" />
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </nav>

                    {/* Mobile Footer */}
                    <div className="pt-6 border-t">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Freshco - Premium Natural Products</p>
                        <p className="text-xs text-gray-400 mt-1">© 2024 All rights reserved</p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
