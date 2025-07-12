import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturesSection from "@/components/features-section"
import FeaturedProducts from "@/components/featured-products"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <FeaturedProducts />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
