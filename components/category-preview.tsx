"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CATEGORIES, getProductsByCategory } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

export function CategoryPreview() {
  return (
    <section id="categories" className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {CATEGORIES.map((cat) => {
          const products = getProductsByCategory(cat.slug).slice(0, 6)
          return (
            <div key={cat.slug} className="mb-16 last:mb-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{cat.name}</h2>
                <Link href={`/category/${cat.slug}`}>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
