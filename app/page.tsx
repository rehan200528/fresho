import Hero from "@/components/hero"
import FeaturesSection from "@/components/features-section"
import FeaturedProducts from "@/components/featured-products"
import HeroCTA from "@/components/hero-cta"
import BackToTop from "@/components/back-to-top"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturesSection />
      <FeaturedProducts />
      <HeroCTA />
      <BackToTop />
    </main>
  )
}
