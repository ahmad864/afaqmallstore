import type React from "react"
import type { Metadata, Viewport } from "next"
import { Tajawal, Amiri } from "next/font/google"
import { CartProvider } from "@/lib/cart-store"
import { ProductsProvider } from "@/lib/products-store"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
})

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

export const metadata: Metadata = {
  title: "AfaqMall - Your Modern Shopping Destination",
  description:
    "AfaqMall is your one-stop e-commerce destination for Clothing, Shoes, Electronics, Makeup, Furniture, and Food. Shop smart, shop AfaqMall.",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1C71E6",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${amiri.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ProductsProvider>
            <CartProvider>
              <Suspense fallback={null}>{children}</Suspense>
            </CartProvider>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
