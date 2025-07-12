import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { Leaf, Award, Truck, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-16 sm:mt-20">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4">About Freshco</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for premium natural products. We bring you the finest quality organic foods directly
            from farms to your table.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 sm:mb-6">Our Story</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Founded with a passion for natural and organic living, Freshco has been serving customers with premium
              quality products for over a decade. We believe in the power of nature and strive to bring you the purest,
              most nutritious foods.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Our journey began with a simple mission: to make healthy, organic food accessible to everyone. Today, we
              work directly with farmers and producers who share our commitment to quality and sustainability.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every product in our collection is carefully selected and tested to ensure it meets our high standards of
              quality, purity, and nutritional value.
            </p>
          </div>
          <div className="bg-green-50 p-6 sm:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-3 sm:mb-4">Our Mission</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              To provide premium natural products that promote healthy living while supporting sustainable farming
              practices and local communities.
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-3 sm:mb-4">Our Vision</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              To become the most trusted brand for natural and organic products, creating a healthier world for future
              generations.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-8 sm:mb-12">
            Why Choose Freshco?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">100% Natural</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                All our products are sourced from certified organic farms with no artificial additives.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Rigorous quality checks ensure only the finest products reach your doorstep.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Quick and reliable delivery service to ensure freshness and convenience.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">Trusted Brand</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Thousands of satisfied customers trust us for their daily natural food needs.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-green-50 p-6 sm:p-8 rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-6 sm:mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2 sm:mb-3">Sustainability</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We support eco-friendly farming practices and sustainable packaging to protect our planet.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2 sm:mb-3">Transparency</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Complete transparency in our sourcing, processing, and pricing to build trust with our customers.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2 sm:mb-3">Community</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Supporting local farmers and communities while promoting healthy living for all.
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
