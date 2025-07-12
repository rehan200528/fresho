"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  mobile?: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, mobile: string, password: string) => Promise<void>
  logout: () => void
  verifyOTP: (email: string, otp: string) => Promise<void>
  resendOTP: (email: string) => Promise<void>
  sendMobileOTP: (mobile: string) => Promise<void>
  verifyMobileOTP: (mobile: string, otp: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database
const mockUsers: Array<User & { password: string; pendingVerification?: boolean }> = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@freshco.com",
    mobile: "9876543210",
    password: "demo123",
    isVerified: true,
  },
]

// Mock OTP storage
const mockOTPs: Record<string, { otp: string; expires: number; type: "email" | "mobile" | "reset" }> = {}

// Generate random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

// Mock email sending function
const sendEmailOTP = async (email: string, otp: string, type: "verification" | "reset" = "verification") => {
  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Log OTP for demo purposes (in production, this would send actual email)
  console.log(`📧 Email OTP for ${email}: ${otp} (${type})`)

  // For demo purposes, show a notification that email was "sent"
  if (typeof window !== "undefined") {
    // Create a temporary notification
    const notification = document.createElement("div")
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: system-ui;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `
    notification.textContent = `📧 Email OTP sent to ${email}: ${otp}`
    document.body.appendChild(notification)

    setTimeout(() => {
      document.body.removeChild(notification)
    }, 5000)
  }

  return Promise.resolve()
}

// Mock SMS sending function
const sendSMSOTP = async (mobile: string, otp: string) => {
  // Simulate SMS sending delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Log OTP for demo purposes (in production, this would send actual SMS)
  console.log(`📱 SMS OTP for +91${mobile}: ${otp}`)

  // For demo purposes, show a notification that SMS was "sent"
  if (typeof window !== "undefined") {
    // Create a temporary notification
    const notification = document.createElement("div")
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #3b82f6;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: system-ui;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `
    notification.textContent = `📱 SMS OTP sent to +91${mobile}: ${otp}`
    document.body.appendChild(notification)

    setTimeout(() => {
      document.body.removeChild(notification)
    }, 5000)
  }

  return Promise.resolve()
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("freshco_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("freshco_user")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)
    if (!foundUser) {
      throw new Error("Invalid email or password")
    }
    if (!foundUser.isVerified) {
      throw new Error("Please verify your account first")
    }

    const userSession = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      mobile: foundUser.mobile,
      isVerified: foundUser.isVerified,
    }

    setUser(userSession)
    localStorage.setItem("freshco_user", JSON.stringify(userSession))
  }

  const register = async (name: string, email: string, mobile: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email || u.mobile === mobile)
    if (existingUser) {
      throw new Error("User with this email or mobile already exists")
    }

    // Validate inputs
    if (!email.includes("@")) {
      throw new Error("Please enter a valid email address")
    }

    if (!/^\d{10}$/.test(mobile)) {
      throw new Error("Please enter a valid 10-digit mobile number")
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long")
    }

    // Create new user (not verified yet)
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      mobile,
      password,
      isVerified: false,
      pendingVerification: true,
    }

    mockUsers.push(newUser)

    // Send email OTP
    const emailOtp = generateOTP()
    mockOTPs[email] = {
      otp: emailOtp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      type: "email",
    }

    await sendEmailOTP(email, emailOtp, "verification")
  }

  const verifyOTP = async (email: string, otp: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const storedOTP = mockOTPs[email]
    if (!storedOTP || storedOTP.type !== "email") {
      throw new Error("No OTP found for this email")
    }

    if (Date.now() > storedOTP.expires) {
      delete mockOTPs[email]
      throw new Error("OTP has expired")
    }

    if (storedOTP.otp !== otp) {
      throw new Error("Invalid OTP")
    }

    // Email verified, remove email OTP
    delete mockOTPs[email]
  }

  const sendMobileOTP = async (mobile: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const mobileOtp = generateOTP()
    mockOTPs[mobile] = {
      otp: mobileOtp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      type: "mobile",
    }

    await sendSMSOTP(mobile, mobileOtp)
  }

  const verifyMobileOTP = async (mobile: string, otp: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const storedOTP = mockOTPs[mobile]
    if (!storedOTP || storedOTP.type !== "mobile") {
      throw new Error("No OTP found for this mobile number")
    }

    if (Date.now() > storedOTP.expires) {
      delete mockOTPs[mobile]
      throw new Error("OTP has expired")
    }

    if (storedOTP.otp !== otp) {
      throw new Error("Invalid OTP")
    }

    // Mobile verified, complete registration
    const user = mockUsers.find((u) => u.mobile === mobile && u.pendingVerification)
    if (!user) {
      throw new Error("User not found")
    }

    // Mark user as verified and log them in
    user.isVerified = true
    user.pendingVerification = false

    const userSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isVerified: user.isVerified,
    }

    setUser(userSession)
    localStorage.setItem("freshco_user", JSON.stringify(userSession))

    // Clean up OTPs
    delete mockOTPs[mobile]
  }

  const resendOTP = async (email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const emailOtp = generateOTP()
    mockOTPs[email] = {
      otp: emailOtp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      type: "email",
    }

    await sendEmailOTP(email, emailOtp, "verification")
  }

  const forgotPassword = async (email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const foundUser = mockUsers.find((u) => u.email === email)
    if (!foundUser) {
      throw new Error("No account found with this email address")
    }

    const resetOtp = generateOTP()
    mockOTPs[email] = {
      otp: resetOtp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      type: "reset",
    }

    await sendEmailOTP(email, resetOtp, "reset")
  }

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const storedOTP = mockOTPs[email]
    if (!storedOTP || storedOTP.type !== "reset") {
      throw new Error("No reset code found for this email")
    }

    if (Date.now() > storedOTP.expires) {
      delete mockOTPs[email]
      throw new Error("Reset code has expired")
    }

    if (storedOTP.otp !== otp) {
      throw new Error("Invalid reset code")
    }

    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters long")
    }

    // Update password
    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      throw new Error("User not found")
    }

    user.password = newPassword
    delete mockOTPs[email]
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("freshco_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        verifyOTP,
        resendOTP,
        sendMobileOTP,
        verifyMobileOTP,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
