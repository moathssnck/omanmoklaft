"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Menu } from "lucide-react"
import Link from "next/link"

export default function PaymentHistory() {
  const [searchData, setSearchData] = useState({
    referenceNumber: "",
    fromDate: "",
    toDate: "",
  })

  const [searchResults] = useState([
    {
      status: "SUCCESSFUL",
      amount: "20.000",
      referenceNumber: "100309119638030691580",
      date: "10:47 03-11-2021 AM",
      serialNumber: "1",
    },
  ])

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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center bg-gray-50">
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">الخدمات الإلكترونية</CardTitle>
            <p className="text-lg text-red-600 font-semibold">الاستفسار ودفع المخالفات المرورية</p>
          </CardHeader>

          <CardContent className="p-8">
            <div className="mb-8">
              <p className="text-center text-gray-700 mb-2">
                عرض عمليات الدفع السابقة على صاحب الهوية رقم: <span className="font-bold text-blue-600">4146922</span>
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-4 text-right">البحث المتقدم</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reference" className="text-right block font-semibold">
                    الرقم المرجعي
                  </Label>
                  <Input
                    id="reference"
                    value={searchData.referenceNumber}
                    onChange={(e) => setSearchData({ ...searchData, referenceNumber: e.target.value })}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="from-date" className="text-right block font-semibold">
                    من تاريخ
                  </Label>
                  <Input
                    id="from-date"
                    type="date"
                    value={searchData.fromDate}
                    onChange={(e) => setSearchData({ ...searchData, fromDate: e.target.value })}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to-date" className="text-right block font-semibold">
                    إلى تاريخ
                  </Label>
                  <Input
                    id="to-date"
                    type="date"
                    value={searchData.toDate}
                    onChange={(e) => setSearchData({ ...searchData, toDate: e.target.value })}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">ابحث</Button>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-100">
                    <TableHead className="text-right font-bold">حالة المعاملة</TableHead>
                    <TableHead className="text-right font-bold">المبلغ</TableHead>
                    <TableHead className="text-right font-bold">الرقم المرجعي</TableHead>
                    <TableHead className="text-right font-bold">تاريخ</TableHead>
                    <TableHead className="text-right font-bold">م</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((result, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="text-right">
                        <span className="text-green-600 font-semibold">{result.status}</span>
                      </TableCell>
                      <TableCell className="text-right">{result.amount}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{result.referenceNumber}</TableCell>
                      <TableCell className="text-right">{result.date}</TableCell>
                      <TableCell className="text-right">{result.serialNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                ملاحظة: في حالة عدم تمام عملية الدفع وتم استقطاع المبلغ من حسابك، لطفاً قم
                <br />
                بمراجعة البنك (جهة إصدار) لبطاقة الصرف المستخدمة
              </p>
            </div>

            <div className="mt-8 text-center space-x-4 space-x-reverse">
              <Link href="/">
                <Button variant="outline" className="px-6 py-2 bg-transparent">
                  استفسار آخر
                </Button>
              </Link>
              <span className="text-gray-400">|</span>
              <Button variant="outline" className="px-6 py-2 bg-transparent">
                طباعة التفاصيل
              </Button>
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
