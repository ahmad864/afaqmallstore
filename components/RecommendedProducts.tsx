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
  allProducts: Product[] // كل منتجات الموقع يجب تمريرها من الـ checkout أو من الـ store
}

export default function RecommendedProducts({ purchasedCategory, allProducts }: Props) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!purchasedCategory || !allProducts || !allProducts.length) {
      setProducts([])
      return
    }

    // تصفية المنتجات حسب الفئة المشتراة
    let filtered = allProducts.filter(p => p.category === purchasedCategory)

    // إذا كان عدد المنتجات أقل من 6 نكررها حتى نملأ الست منتجات
    while (filtered.length < 6 && filtered.length > 0) {
      filtered = filtered.concat(filtered)
    }

    setProducts(filtered.slice(0, 6))
  }, [purchasedCategory, allProducts])

  if (!products.length) return null

  return (
    <div className="mt-4">
      <h4 className="font-bold mb-2 text-sm">Recommended for you</h4>
      <div className="grid grid-cols-2 gap-3">
        {products.map(p => (
          <Card key={p.id} className="border">
            <CardHeader className="p-2">
              <CardTitle className="text-xs font-semibold">{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <img src={p.image} alt={p.name} className="w-full h-24 object-cover mb-2 rounded" />
              <div className="font-bold text-sm">${p.price}</div>
              <Button size="sm" className="mt-2 w-full">View</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
