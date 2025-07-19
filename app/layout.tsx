import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'الموقع الرسمي',
  description: 'يمكنك من هنا انجاز جميع معاملاتك الالكترونية',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir='ltr'>
      <body>{children}</body>
    </html>
  )
}
