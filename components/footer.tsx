import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-24 h-12">
                <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted source for fresh, organic, and premium quality products delivered right to your doorstep 🛡️
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Viralimalai, Pudukkottai-621316, Tamilnadu, India</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a href="tel:+917708661788" className="hover:text-green-600 transition-colors">
                    +91 7708661788
                  </a>
                  <a href="tel:+919629151788" className="hover:text-green-600 transition-colors">
                    +91 9629151788
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                <a href="mailto:freshconatural.14@gmail.com" className="hover:text-green-600 transition-colors">
                  freshconatural.14@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us & Customer Support Combined */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/16a76w2H7H/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/freshconatural?igsh=MTR3eTU0OHZ0ZzU5cw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://youtube.com/@freshco-i6o?si=jmaQBn6dsZaCHDd5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Customer Support</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Mon-Fri: 9AM-8PM</p>
                <p>Sat: 9AM-5PM</p>
                <p>Sun: 10AM-4PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">All rights reserved © 2025 FreshCo.</p>
        </div>
      </div>
    </footer>
  )
}
