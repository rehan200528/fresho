"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  verifyOTP: (email: string, otp: string) => Promise<void>
  resendOTP: (email: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>
  logout: () => void
  sendOTP: (email: string, type: "register" | "reset") => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database - in production, this would be a real database
const mockUsers: Array<{
  id: string
  name: string
  email: string
  password: string
  isVerified: boolean
}> = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@freshco.com",
    password: "demo123",
    isVerified: true,
  },
]

// OTP storage - in production, this would be Redis or database
const otpStorage: { [key: string]: { otp: string; expires: number; type: "register" | "reset" } } = {}

// Pending registrations - in production, this would be database
const pendingRegistrations: { [key: string]: { name: string; email: string; password: string } } = {}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("freshco-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("freshco-user")
      }
    }
  }, [])

  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const sendEmailOTP = async (email: string, otp: string, type: "register" | "reset"): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if Email service is available
      if (typeof window !== "undefined" && (window as any).Email) {
        const subject = type === "register" ? "Freshco - Email Verification Code" : "Freshco - Password Reset Code"

        const body =
          type === "register"
            ? `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #16a34a;">Welcome to Freshco!</h1>
              </div>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #333; margin-bottom: 15px;">Email Verification Required</h2>
                <p style="color: #666; margin-bottom: 20px;">Thank you for joining Freshco! Please use the verification code below to complete your registration:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <span style="background-color: #16a34a; color: white; padding: 15px 30px; font-size: 24px; font-weight: bold; border-radius: 8px; letter-spacing: 3px;">${otp}</span>
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes for security reasons.</p>
              </div>
              <p style="color: #666; font-size: 12px; text-align: center;">If you didn't request this verification, please ignore this email.</p>
            </div>
          `
            : `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #dc2626;">Password Reset Request</h1>
              </div>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #333; margin-bottom: 15px;">Reset Your Password</h2>
                <p style="color: #666; margin-bottom: 20px;">You requested to reset your password. Please use the code below:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <span style="background-color: #dc2626; color: white; padding: 15px 30px; font-size: 24px; font-weight: bold; border-radius: 8px; letter-spacing: 3px;">${otp}</span>
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes for security reasons.</p>
              </div>
              <p style="color: #666; font-size: 12px; text-align: center;">If you didn't request this reset, please ignore this email.</p>
            </div>
          `

        console.log("Sending email with OTP:", otp, "to:", email)
        ;(window as any).Email.send({
          SecureToken: "c8e9ec37-1417-416d-a498-5f1ae5796083",
          To: email,
          From: "freshconatural.14@gmail.com",
          Subject: subject,
          Body: body,
        })
          .then((message: string) => {
            console.log("Email send result:", message)
            if (message === "OK") {
              resolve()
            } else {
              reject(new Error(`Failed to send email: ${message}`))
            }
          })
          .catch((error: any) => {
            console.error("Email send error:", error)
            reject(new Error("Failed to send email. Please check your internet connection."))
          })
      } else {
        console.error("Email service not available")
        reject(new Error("Email service not available. Please refresh the page and try again."))
      }
    })
  }

  const sendOTP = async (email: string, type: "register" | "reset"): Promise<void> => {
    const otp = generateOTP()
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

    try {
      await sendEmailOTP(email, otp, type)
      otpStorage[email] = { otp, expires, type }
      console.log("OTP stored for", email, ":", otp) // For debugging - remove in production
    } catch (error) {
      console.error("Failed to send OTP:", error)
      throw error
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!existingUser) {
      throw new Error("No account found with this email address")
    }

    if (existingUser.password !== password) {
      throw new Error("Invalid password. Please check your password and try again.")
    }

    if (!existingUser.isVerified) {
      throw new Error("Please verify your email address before logging in")
    }

    const userData = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      isVerified: existingUser.isVerified,
    }

    setUser(userData)
    localStorage.setItem("freshco-user", JSON.stringify(userData))
  }

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      throw new Error("An account with this email already exists")
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address")
    }

    // Validate password strength
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long")
    }

    // Store pending registration
    pendingRegistrations[email] = { name, email, password }

    // Send OTP
    await sendOTP(email, "register")
  }

  const verifyOTP = async (email: string, otp: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const storedOTP = otpStorage[email]
    if (!storedOTP) {
      throw new Error("No verification code found. Please request a new code.")
    }

    if (Date.now() > storedOTP.expires) {
      delete otpStorage[email]
      throw new Error("Verification code has expired. Please request a new code.")
    }

    if (storedOTP.otp !== otp.trim()) {
      throw new Error("Invalid verification code. Please check and try again.")
    }

    if (storedOTP.type === "register") {
      const pendingUser = pendingRegistrations[email]
      if (!pendingUser) {
        throw new Error("Registration session expired. Please start registration again.")
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password,
        isVerified: true,
      }

      mockUsers.push(newUser)

      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isVerified: true,
      }

      setUser(userData)
      localStorage.setItem("freshco-user", JSON.stringify(userData))

      // Clean up
      delete otpStorage[email]
      delete pendingRegistrations[email]
    }
  }

  const resendOTP = async (email: string): Promise<void> => {
    const storedOTP = otpStorage[email]
    if (!storedOTP) {
      throw new Error("No active verification session found")
    }

    await sendOTP(email, storedOTP.type)
  }

  const forgotPassword = async (email: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!existingUser) {
      throw new Error("No account found with this email address")
    }

    await sendOTP(email, "reset")
  }

  const resetPassword = async (email: string, otp: string, newPassword: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const storedOTP = otpStorage[email]
    if (!storedOTP || storedOTP.type !== "reset") {
      throw new Error("Invalid password reset session")
    }

    if (Date.now() > storedOTP.expires) {
      delete otpStorage[email]
      throw new Error("Reset code has expired. Please request a new code.")
    }

    if (storedOTP.otp !== otp.trim()) {
      throw new Error("Invalid reset code. Please check and try again.")
    }

    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters long")
    }

    // Update password
    const userIndex = mockUsers.findIndex((u) => u.email.toLowerCase() === email.toLowerCase())
    if (userIndex !== -1) {
      mockUsers[userIndex].password = newPassword
    }

    // Clean up
    delete otpStorage[email]
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("freshco-user")
    localStorage.removeItem("freshco-cart")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        verifyOTP,
        resendOTP,
        forgotPassword,
        resetPassword,
        logout,
        sendOTP,
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
