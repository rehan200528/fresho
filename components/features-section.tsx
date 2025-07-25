import { Recycle, Truck, Shield, Heart } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Recycle,
      title: "100% Organic",
      description: "Certified organic products sourced directly from trusted farms",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery service to your doorstep",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Rigorous quality checks ensure only the best products",
    },
    {
      icon: Heart,
      title: "Fresh & Healthy",
      description: "Nutritious products that promote a healthy lifestyle",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
