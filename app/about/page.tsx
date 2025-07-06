import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { Leaf, Award, Truck, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">About Freshco</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for premium natural products. We bring you the finest quality organic foods directly
            from farms to your table.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded with a passion for natural and organic living, Freshco has been serving customers with premium
              quality products for over a decade. We believe in the power of nature and strive to bring you the purest,
              most nutritious foods.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey began with a simple mission: to make healthy, organic food accessible to everyone. Today, we
              work directly with farmers and producers who share our commitment to quality and sustainability.
            </p>
            <p className="text-gray-600">
              Every product in our collection is carefully selected and tested to ensure it meets our high standards of
              quality, purity, and nutritional value.
            </p>
          </div>
          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To provide premium natural products that promote healthy living while supporting sustainable farming
              practices and local communities.
            </p>
            <h3 className="text-2xl font-bold text-green-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted brand for natural and organic products, creating a healthier world for future
              generations.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-12">Why Choose Freshco?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">100% Natural</h3>
              <p className="text-gray-600">
                All our products are sourced from certified organic farms with no artificial additives.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Rigorous quality checks ensure only the finest products reach your doorstep.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery service to ensure freshness and convenience.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Trusted Brand</h3>
              <p className="text-gray-600">
                Thousands of satisfied customers trust us for their daily natural food needs.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-green-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We support eco-friendly farming practices and sustainable packaging to protect our planet.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Transparency</h3>
              <p className="text-gray-600">
                Complete transparency in our sourcing, processing, and pricing to build trust with our customers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Community</h3>
              <p className="text-gray-600">
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
