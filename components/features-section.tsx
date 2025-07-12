import { Leaf, Shield, Truck, Heart, Award, Users } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "All our products are certified organic, grown without harmful pesticides or chemicals.",
    color: "text-green-600 bg-green-100",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every product undergoes rigorous quality checks and lab testing before reaching you.",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas. Fresh products delivered to your doorstep.",
    color: "text-orange-600 bg-orange-100",
  },
  {
    icon: Heart,
    title: "Health First",
    description: "Nutrient-rich products that support your healthy lifestyle and well-being.",
    color: "text-red-600 bg-red-100",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Award-winning products sourced from the finest farms and producers.",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Supporting local farmers and communities while bringing you the best products.",
    color: "text-indigo-600 bg-indigo-100",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose Freshco?</h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            We're committed to bringing you the freshest, highest quality natural products while supporting sustainable
            farming practices and local communities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{feature.title}</h3>

                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center space-x-2 text-green-600 font-medium">
            <Leaf className="w-5 h-5" />
            <span>Trusted by 50,000+ customers nationwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}
