"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getProductsByCategory, categoryNames, type CategorySlug } from "@/lib/data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as CategorySlug
  const products = getProductsByCategory(slug)
  const name = categoryNames[slug] || slug

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ArrowRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{name}</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{name}</h1>
            <p className="text-muted-foreground">{products.length} products available</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No products in this category yet.</p>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
