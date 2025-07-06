// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGcHAMwFJg1egvkq-Ds17MCurpuxjsvBs",
  authDomain: "freshco-521c8.firebaseapp.com",
  projectId: "freshco-521c8",
  storageBucket: "freshco-521c8.firebasestorage.app",
  messagingSenderId: "739484994357",
  appId: "1:739484994357:web:10b2e0d9bab53998fc9a7c",
}

// Mock Firebase functions for demo purposes
// In a real app, you would use the actual Firebase SDK

import type { Product } from "@/types"

// Mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Basmati Rice 1kg",
    description: "Premium quality organic basmati rice, aged to perfection",
    price: 299,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    category: "rice",
    weight: "1kg",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Pure Turmeric Powder 500g",
    description: "Fresh ground turmeric powder with natural curcumin",
    price: 149,
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=300&h=300&fit=crop",
    category: "spices",
    weight: "500g",
  },
  {
    id: "3",
    name: "Cold Pressed Coconut Oil 1L",
    description: "Virgin coconut oil extracted using traditional methods",
    price: 450,
    originalPrice: 500,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
    category: "oil",
    weight: "1L",
    badge: "Organic",
  },
  {
    id: "4",
    name: "Organic Moong Dal 1kg",
    description: "Premium quality organic moong dal, rich in protein",
    price: 180,
    image: "https://images.unsplash.com/photo-1599909533730-f8b3c6e3d1c1?w=300&h=300&fit=crop",
    category: "pulses",
    weight: "1kg",
  },
  {
    id: "5",
    name: "Red Chili Powder 250g",
    description: "Spicy red chili powder made from finest red chilies",
    price: 120,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop",
    category: "spices",
    weight: "250g",
  },
  {
    id: "6",
    name: "Organic Brown Rice 2kg",
    description: "Nutritious brown rice packed with fiber and nutrients",
    price: 380,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    category: "rice",
    weight: "2kg",
    badge: "Healthy",
  },
  {
    id: "7",
    name: "Mustard Oil 1L",
    description: "Pure mustard oil with authentic taste and aroma",
    price: 220,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
    category: "oil",
    weight: "1L",
  },
  {
    id: "8",
    name: "Organic Toor Dal 1kg",
    description: "High quality organic toor dal, perfect for daily cooking",
    price: 200,
    image: "https://images.unsplash.com/photo-1599909533730-f8b3c6e3d1c1?w=300&h=300&fit=crop",
    category: "pulses",
    weight: "1kg",
  },
  {
    id: "9",
    name: "Garam Masala Powder 100g",
    description: "Aromatic blend of traditional Indian spices",
    price: 80,
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=300&h=300&fit=crop",
    category: "spices",
    weight: "100g",
  },
  {
    id: "10",
    name: "Organic Quinoa 500g",
    description: "Superfood quinoa rich in protein and essential amino acids",
    price: 350,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    category: "rice",
    weight: "500g",
    badge: "Superfood",
  },
  {
    id: "11",
    name: "Sesame Oil 500ml",
    description: "Cold pressed sesame oil with natural goodness",
    price: 280,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
    category: "oil",
    weight: "500ml",
  },
  {
    id: "12",
    name: "Organic Chana Dal 1kg",
    description: "Premium quality organic chana dal, high in protein",
    price: 160,
    image: "https://images.unsplash.com/photo-1599909533730-f8b3c6e3d1c1?w=300&h=300&fit=crop",
    category: "pulses",
    weight: "1kg",
  },
]

// Mock Firebase functions
export const getProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts
}

export const getProduct = async (id: string): Promise<Product | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProducts.find((product) => product.id === id) || null
}

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const newProduct = {
    ...product,
    id: Date.now().toString(),
  }
  mockProducts.push(newProduct)
  return newProduct
}

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = mockProducts.findIndex((product) => product.id === id)
  if (index === -1) return null

  mockProducts[index] = { ...mockProducts[index], ...updates }
  return mockProducts[index]
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = mockProducts.findIndex((product) => product.id === id)
  if (index === -1) return false

  mockProducts.splice(index, 1)
  return true
}
