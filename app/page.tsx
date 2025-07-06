import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import FeaturesSection from "@/components/features-section"
import HeroCTA from "@/components/hero-cta"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <FeaturedProducts />
        <HeroCTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
