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
  category?: string
}

export default function RecommendedProducts({ category }: Props) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!category) return

    // إنشاء منتجات تجريبية لكل فئة بشكل تلقائي
    const sampleProducts: Product[] = []
    for (let i = 1; i <= 6; i++) {
      sampleProducts.push({
        id: i,
        name: `${category} Product ${i}`,
        price: Math.floor(Math.random() * 100) + 10, // سعر تجريبي
        image: `https://via.placeholder.com/150?text=${encodeURIComponent(category + i)}`,
        category,
      })
    }

    setProducts(sampleProducts)
  }, [category])

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
