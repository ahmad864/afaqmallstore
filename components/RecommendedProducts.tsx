"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface Props {
  purchasedCategory?: string
  allProducts: Product[]
  cartItems?: Product[] // ✅ لإخفاء المنتج المشتَرى (اختياري لكن أفضل)
}

export default function RecommendedProducts({
  purchasedCategory,
  allProducts,
  cartItems = [],
}: Props) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!purchasedCategory || !allProducts?.length) {
      setProducts([])
      return
    }

    // ✅ منتجات من نفس الفئة
    let filtered = allProducts.filter(
      p => p.category === purchasedCategory
    )

    // ✅ استبعاد المنتجات الموجودة في السلة (المنتج المشتَرى)
    if (cartItems.length) {
      filtered = filtered.filter(
        p => !cartItems.some(item => item.id === p.id)
      )
    }

    // ✅ خلط المنتجات (لمنع عرض نفس الترتيب دائماً)
    filtered = filtered.sort(() => Math.random() - 0.5)

    // ✅ ضمان وجود 6 عناصر
    if (filtered.length >= 6) {
      setProducts(filtered.slice(0, 6))
    } else if (filtered.length > 0) {
      const repeated = [...filtered]

      while (repeated.length < 6) {
        repeated.push(filtered[repeated.length % filtered.length])
      }

      setProducts(repeated)
    } else {
      setProducts([])
    }
  }, [purchasedCategory, allProducts, cartItems])

  if (!products.length) return null

  return (
    <div className="mt-4">
      <h4 className="font-bold mb-2 text-sm">Recommended for you</h4>

      <div className="grid grid-cols-2 gap-3">
        {products.map(p => (
          <Card key={p.id} className="border">
            <CardHeader className="p-2">
              <CardTitle className="text-xs font-semibold">
                {p.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-24 object-cover mb-2 rounded"
              />

              <div className="font-bold text-sm">
                ${p.price}
              </div>

              <Button size="sm" className="mt-2 w-full">
                View
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
