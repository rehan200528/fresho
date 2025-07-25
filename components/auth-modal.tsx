"use client"

import React from "react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Eye, EyeOff, CheckCircle, UserPlus, Mail, Lock, ArrowLeft, RefreshCw, Shield, Clock } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthStep = "login" | "register" | "otp-verify" | "forgot-password" | "reset-password"

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    newPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const { login, register, verifyOTP, resendOTP, forgotPassword, resetPassword } = useAuth()
  const { toast } = useToast()

  // Timer for OTP resend
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpTimer])

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
      newPassword: "",
    })
    setCurrentStep("login")
    setOtpTimer(0)
    setLoading(false)
    setShowPassword(false)
    setShowConfirmPassword(false)
    setShowNewPassword(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      toast({
        title: (
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Welcome Back! 🎉</span>
          </div>
        ),
        description: "You have successfully logged in to your account.",
        className: "border-green-200 bg-green-50",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        toast({
          title: "Missing Information",
          description: "Please enter your first and last name.",
          variant: "destructive",
        })
        return
      }

      if (!formData.email.trim()) {
        toast({
          title: "Missing Email",
          description: "Please enter your email address.",
          variant: "destructive",
        })
        return
      }

      if (!formData.password) {
        toast({
          title: "Missing Password",
          description: "Please enter a password.",
          variant: "destructive",
        })
        return
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        })
        return
      }

      if (formData.password.length < 6) {
        toast({
          title: "Weak Password",
          description: "Password must be at least 6 characters long.",
          variant: "destructive",
        })
        return
      }

      await register(
        `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        formData.email.trim(),
        formData.password,
      )

      // Move to OTP verification step
      setCurrentStep("otp-verify")
      setOtpTimer(60)

      toast({
        title: (
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>OTP Sent to Gmail! 📧</span>
          </div>
        ),
        description: `Please check your Gmail inbox (${formData.email}) for the verification code.`,
        className: "border-blue-200 bg-blue-50",
      })
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.otp.trim()) {
        toast({
          title: "Missing Code",
          description: "Please enter the verification code.",
          variant: "destructive",
        })
        return
      }

      if (formData.otp.trim().length !== 6) {
        toast({
          title: "Invalid Code",
          description: "Verification code must be 6 digits.",
          variant: "destructive",
        })
        return
      }

      await verifyOTP(formData.email, formData.otp)

      toast({
        title: (
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-green-500" />
            <span>Account Created! 🚀</span>
          </div>
        ),
        description: "Welcome to Freshco! Your account has been verified successfully.",
        className: "border-green-200 bg-green-50",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Please check your verification code.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.email.trim()) {
        toast({
          title: "Missing Email",
          description: "Please enter your email address.",
          variant: "destructive",
        })
        return
      }

      await forgotPassword(formData.email)
      setCurrentStep("reset-password")
      setOtpTimer(60)

      toast({
        title: (
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>Reset Code Sent to Gmail! 📧</span>
          </div>
        ),
        description: `Please check your Gmail inbox (${formData.email}) for the password reset code.`,
        className: "border-blue-200 bg-blue-50",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.otp.trim()) {
        toast({
          title: "Missing Code",
          description: "Please enter the reset code.",
          variant: "destructive",
        })
        return
      }

      if (!formData.newPassword) {
        toast({
          title: "Missing Password",
          description: "Please enter your new password.",
          variant: "destructive",
        })
        return
      }

      if (formData.newPassword.length < 6) {
        toast({
          title: "Weak Password",
          description: "Password must be at least 6 characters long.",
          variant: "destructive",
        })
        return
      }

      await resetPassword(formData.email, formData.otp, formData.newPassword)

      toast({
        title: (
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Password Reset! ✅</span>
          </div>
        ),
        description: "Your password has been reset successfully. Please login with your new password.",
        className: "border-green-200 bg-green-50",
      })

      // Reset form and go back to login
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
        otp: "",
        newPassword: "",
      }))
      setCurrentStep("login")
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: error instanceof Error ? error.message : "Please check your reset code.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setLoading(true)
    try {
      await resendOTP(formData.email)
      setOtpTimer(60)
      toast({
        title: (
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-blue-500" />
            <span>New OTP Sent to Gmail! 📧</span>
          </div>
        ),
        description: "A new verification code has been sent to your Gmail inbox.",
        className: "border-blue-200 bg-blue-50",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to resend OTP.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderContent = () => {
    switch (currentStep) {
      case "login":
        return (
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                Password *
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500 pr-12 h-11 sm:h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 sm:py-4 rounded-lg transition-all transform hover:scale-[1.02] h-12 sm:h-14"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentStep("forgot-password")}
                className="text-green-600 hover:text-green-700 text-sm transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        )

      case "register":
        return (
          <div className="space-y-4 sm:space-y-5">
            {/* Gmail OTP Info Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-blue-900 mb-1">Gmail OTP Verification Required</h4>
                  <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                    After registration, we'll send a 6-digit verification code to your Gmail inbox to secure your
                    account.
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-blue-600">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>10 min validity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700 font-medium text-sm">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    required
                    className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700 font-medium text-sm">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    required
                    className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                  Gmail Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your Gmail address"
                  required
                  className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
                />
                <p className="text-xs text-gray-500 mt-1">We'll send the OTP to this Gmail address</p>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                  Password *
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password (min 6 characters)"
                    required
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 pr-12 h-11 sm:h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm">
                  Confirm Password *
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 pr-12 h-11 sm:h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 sm:py-4 rounded-lg transition-all transform hover:scale-[1.02] h-12 sm:h-14"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account & Sending OTP...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Create Account & Send OTP</span>
                  </div>
                )}
              </Button>
            </form>
          </div>
        )

      case "otp-verify":
        return (
          <form onSubmit={handleOTPVerify} className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Verify Your Gmail</h3>
              <p className="text-sm text-gray-600 mb-3">We've sent a 6-digit verification code to:</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-green-700 break-all">{formData.email}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2 text-blue-700">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Check your Gmail inbox</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">The email might be in your spam folder</p>
              </div>
            </div>

            <div>
              <Label htmlFor="otp" className="text-gray-700 font-medium text-sm">
                Gmail Verification Code *
              </Label>
              <Input
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit code"
                required
                maxLength={6}
                className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 text-center text-lg sm:text-xl tracking-widest font-mono h-12 sm:h-14"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 sm:py-4 rounded-lg transition-all transform hover:scale-[1.02] h-12 sm:h-14"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verify & Complete Registration</span>
                </div>
              )}
            </Button>

            <div className="text-center space-y-3">
              {otpTimer > 0 ? (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    Resend code in <span className="font-medium text-green-600">{otpTimer}s</span>
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 text-sm transition-colors font-medium px-4 py-2 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Resend OTP to Gmail</span>
                  </div>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setCurrentStep("register")}
              className="flex items-center justify-center w-full text-gray-500 hover:text-gray-700 text-sm transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Registration
            </button>
          </form>
        )

      case "forgot-password":
        return (
          <form onSubmit={handleForgotPassword} className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Forgot Password?</h3>
              <p className="text-sm text-gray-600">Enter your Gmail address and we'll send you a reset code</p>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                Gmail Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your Gmail address"
                required
                className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 sm:py-4 rounded-lg transition-all transform hover:scale-[1.02] h-12 sm:h-14"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending to Gmail...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Send Reset Code to Gmail</span>
                </div>
              )}
            </Button>

            <button
              type="button"
              onClick={() => setCurrentStep("login")}
              className="flex items-center justify-center w-full text-gray-500 hover:text-gray-700 text-sm transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </button>
          </form>
        )

      case "reset-password":
        return (
          <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Reset Password</h3>
              <p className="text-sm text-gray-600 mb-3">Enter the code sent to your Gmail:</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-700 break-all">{formData.email}</p>
              </div>
            </div>

            <div>
              <Label htmlFor="otp" className="text-gray-700 font-medium text-sm">
                Gmail Reset Code *
              </Label>
              <Input
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit code"
                required
                maxLength={6}
                className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500 text-center text-lg sm:text-xl tracking-widest font-mono h-12 sm:h-14"
              />
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-gray-700 font-medium text-sm">
                New Password *
              </Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password (min 6 characters)"
                  required
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500 pr-12 h-11 sm:h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 sm:py-4 rounded-lg transition-all transform hover:scale-[1.02] h-12 sm:h-14"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Resetting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Reset Password</span>
                </div>
              )}
            </Button>

            <div className="text-center">
              {otpTimer > 0 ? (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    Resend code in <span className="font-medium text-blue-600">{otpTimer}s</span>
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 text-sm transition-colors font-medium px-4 py-2 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Resend Code to Gmail</span>
                  </div>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setCurrentStep("forgot-password")}
              className="flex items-center justify-center w-full text-gray-500 hover:text-gray-700 text-sm transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
          </form>
        )

      default:
        return null
    }
  }

  const getTitle = () => {
    switch (currentStep) {
      case "login":
        return "Welcome Back!"
      case "register":
        return "Join Freshco"
      case "otp-verify":
        return "Gmail Verification"
      case "forgot-password":
        return "Reset Password"
      case "reset-password":
        return "Create New Password"
      default:
        return "Authentication"
    }
  }

  const getDescription = () => {
    switch (currentStep) {
      case "login":
        return "Sign in to continue your healthy journey"
      case "register":
        return "Create your account with Gmail OTP verification"
      case "otp-verify":
        return "Please verify your Gmail to complete registration"
      case "forgot-password":
        return "We'll send a reset code to your Gmail"
      case "reset-password":
        return "Enter your new password"
      default:
        return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw] bg-white border-0 shadow-xl p-0 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center py-4 sm:py-6 px-4 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <div className="relative w-16 h-8 sm:w-20 sm:h-12">
              <Image src="https://i.ibb.co/3mqR8CP4/logof.png" alt="Freshco Logo" fill className="object-contain" />
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">{getTitle()}</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{getDescription()}</p>
        </div>

        {/* Tab Navigation - Only show for login/register */}
        {(currentStep === "login" || currentStep === "register") && (
          <div className="flex border-b mx-4">
            <button
              onClick={() => setCurrentStep("login")}
              className={`flex-1 py-3 text-center font-medium transition-colors text-sm sm:text-base ${
                currentStep === "login"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentStep("register")}
              className={`flex-1 py-3 text-center font-medium transition-colors text-sm sm:text-base ${
                currentStep === "register"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* Form Content */}
        <div className="p-4 sm:p-6">
          {renderContent()}

          {/* Demo Credentials - Only show on login */}
          {currentStep === "login" && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2 text-sm">🎯 Demo Credentials</h4>
              <p className="text-xs sm:text-sm text-blue-700">
                <strong>Email:</strong> demo@freshco.com
                <br />
                <strong>Password:</strong> demo123
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
