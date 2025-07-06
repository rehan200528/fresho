"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Star } from "lucide-react"
import Image from "next/image"

const templates = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean, minimalist design with elegant typography and subtle animations",
    image: "/placeholder.svg?height=300&width=400",
    category: "Modern",
    rating: 4.9,
    downloads: 1580,
    features: ["Minimal Design", "Clean Typography", "Subtle Animations", "Full Website"],
    preview: "/templates/modern-minimal",
  },
  {
    id: "bold-colorful",
    name: "Bold & Colorful",
    description: "Vibrant, energetic design with bold colors and dynamic elements",
    image: "/placeholder.svg?height=300&width=400",
    category: "Creative",
    rating: 4.8,
    downloads: 1250,
    features: ["Bold Colors", "Dynamic Design", "Energetic Vibe", "Full Website"],
    preview: "/templates/bold-colorful",
  },
  {
    id: "elegant-dark",
    name: "Elegant Dark",
    description: "Sophisticated dark theme with gold accents and luxury feel",
    image: "/placeholder.svg?height=300&width=400",
    category: "Luxury",
    rating: 4.9,
    downloads: 980,
    features: ["Dark Theme", "Gold Accents", "Luxury Design", "Full Website"],
    preview: "/templates/elegant-dark",
  },
  {
    id: "playful-modern",
    name: "Playful Modern",
    description: "Fun and engaging design with playful elements and bright colors",
    image: "/placeholder.svg?height=300&width=400",
    category: "Fun",
    rating: 4.7,
    downloads: 1100,
    features: ["Playful Design", "Bright Colors", "Fun Elements", "Full Website"],
    preview: "/templates/playful-modern",
  },
  // Keep the existing product-only templates
  {
    id: "modern-grid",
    name: "Modern Grid Layout",
    description: "Clean and modern grid-based design with card layouts",
    image: "/placeholder.svg?height=300&width=400",
    category: "Modern",
    rating: 4.8,
    downloads: 1250,
    features: ["Responsive Grid", "Card Design", "Modern Typography", "Product Focus"],
    preview: "/templates/modern-grid",
  },
  {
    id: "classic-list",
    name: "Classic List View",
    description: "Traditional list-based layout with detailed product information",
    image: "/placeholder.svg?height=300&width=400",
    category: "Classic",
    rating: 4.6,
    downloads: 980,
    features: ["List Layout", "Detailed Info", "Classic Design", "Easy Navigation"],
    preview: "/templates/classic-list",
  },
  {
    id: "minimal-cards",
    name: "Minimal Card Design",
    description: "Minimalist approach with clean card-based product display",
    image: "/placeholder.svg?height=300&width=400",
    category: "Minimal",
    rating: 4.9,
    downloads: 1580,
    features: ["Minimal Design", "Clean Cards", "White Space", "Focus on Products"],
    preview: "/templates/minimal-cards",
  },
  {
    id: "magazine-style",
    name: "Magazine Style Layout",
    description: "Editorial-style layout with featured products and stories",
    image: "/placeholder.svg?height=300&width=400",
    category: "Editorial",
    rating: 4.7,
    downloads: 750,
    features: ["Magazine Layout", "Featured Content", "Story Telling", "Rich Media"],
    preview: "/templates/magazine-style",
  },
  {
    id: "masonry-grid",
    name: "Masonry Grid Layout",
    description: "Pinterest-style masonry grid with varying card heights",
    image: "/placeholder.svg?height=300&width=400",
    category: "Creative",
    rating: 4.5,
    downloads: 650,
    features: ["Masonry Grid", "Dynamic Heights", "Creative Layout", "Visual Appeal"],
    preview: "/templates/masonry-grid",
  },
  {
    id: "carousel-hero",
    name: "Carousel Hero Template",
    description: "Hero section with product carousel and featured categories",
    image: "/placeholder.svg?height=300&width=400",
    category: "Dynamic",
    rating: 4.8,
    downloads: 1100,
    features: ["Hero Carousel", "Featured Categories", "Dynamic Content", "Interactive"],
    preview: "/templates/carousel-hero",
  },
]

const categories = ["All", "Modern", "Classic", "Minimal", "Editorial", "Creative", "Dynamic", "Luxury", "Fun"]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const filteredTemplates =
    selectedCategory === "All" ? templates : templates.filter((template) => template.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Template Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of beautiful, responsive templates designed specifically for Freshco
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-green-800">{template.name}</CardTitle>
                    <CardDescription className="mt-1">{template.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{template.downloads}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => window.open(template.preview, "_blank")}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No templates found in this category.</p>
            <Button onClick={() => setSelectedCategory("All")} className="mt-4 bg-green-600 hover:bg-green-700">
              View All Templates
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
