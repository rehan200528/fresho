import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-16 sm:mt-20">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our products or need assistance? We're here to help! Get in touch with our friendly
            team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8">Get in Touch</h2>
              <div className="space-y-4 sm:space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Address</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Viralimalai, Pudukkottai-621316
                      <br />
                      Tamilnadu, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Phone</h3>
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base text-gray-600">
                        <a href="tel:+917708661788" className="hover:text-green-600 transition-colors">
                          +91 7708661788
                        </a>
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        <a href="tel:+919629151788" className="hover:text-green-600 transition-colors">
                          +91 9629151788
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      <a
                        href="mailto:freshconatural.14@gmail.com"
                        className="hover:text-green-600 transition-colors break-all"
                      >
                        freshconatural.14@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Business Hours</h3>
                    <div className="text-sm sm:text-base text-gray-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/16a76w2H7H/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/freshconatural?igsh=MTR3eTU0OHZ0ZzU5cw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.559-.748-.948-1.197-2.25-1.197-3.688 0-1.438.449-2.74 1.197-3.688.749-.948 1.9-1.559 3.197-1.559s2.448.611 3.197 1.559c.748.948 1.197 2.25 1.197 3.688 0 1.438-.449 2.74-1.197 3.688-.749.948-1.9 1.559-3.197 1.559zm7.718 0c-1.297 0-2.448-.611-3.197-1.559-.748-.948-1.197-2.25-1.197-3.688 0-1.438.449-2.74 1.197-3.688.749-.948 1.9-1.559 3.197-1.559s2.448.611 3.197 1.559c.748.948 1.197 2.25 1.197 3.688 0 1.438-.449 2.74-1.197 3.688-.749.948-1.9 1.559-3.197 1.559z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@freshco-i6o?si=jmaQBn6dsZaCHDd5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8">Send us a Message</h2>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700 font-medium text-sm">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    required
                    className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700 font-medium text-sm">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    required
                    className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium text-sm">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-gray-700 font-medium text-sm">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  required
                  className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-700 font-medium text-sm">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  required
                  rows={5}
                  className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium h-12 sm:h-14"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Send Message
              </Button>
            </form>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 text-center">
              We'll get back to you within 24 hours during business days.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 sm:mb-3">
                Are your products really organic?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Yes, all our products are certified organic and sourced directly from trusted farms. We maintain strict
                quality standards and provide certificates upon request.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 sm:mb-3">
                What is your delivery time?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We deliver within 2-3 business days for local areas and 3-5 business days for other locations. Express
                delivery options are also available.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 sm:mb-3">
                Do you offer bulk discounts?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Yes, we offer attractive discounts for bulk orders. Contact us directly for custom pricing on large
                quantities.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 sm:mb-3">
                What is your return policy?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We offer a 100% satisfaction guarantee. If you're not happy with your purchase, contact us within 7 days
                for a full refund or replacement.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
