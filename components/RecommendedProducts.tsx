"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface Props {
  purchasedCategory?: string
}

export default function RecommendedProducts({ purchasedCategory }: Props) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // توليد منتجات تجريبية حسب الفئة
    const allProducts: Record<string, Product[]> = {
      Shoes: [
        { id: 1, name: "Sport Shoes", price: 50, image: "https://picsum.photos/200/200?random=1" },
        { id: 2, name: "Casual Shoes", price: 60, image: "https://picsum.photos/200/200?random=2" },
        { id: 3, name: "Sneakers", price: 70, image: "https://picsum.photos/200/200?random=3" },
        { id: 4, name: "Formal Shoes", price: 80, image: "https://picsum.photos/200/200?random=4" },
        { id: 5, name: "Boots", price: 90, image: "https://picsum.photos/200/200?random=5" },
        { id: 6, name: "Sandals", price: 40, image: "https://picsum.photos/200/200?random=6" },
      ],
      Furniture: [
        { id: 7, name: "Sofa", price: 300, image: "https://picsum.photos/200/200?random=7" },
        { id: 8, name: "Chair", price: 50, image: "https://picsum.photos/200/200?random=8" },
        { id: 9, name: "Table", price: 100, image: "https://picsum.photos/200/200?random=9" },
        { id: 10, name: "Bed", price: 400, image: "https://picsum.photos/200/200?random=10" },
        { id: 11, name: "Cupboard", price: 200, image: "https://picsum.photos/200/200?random=11" },
        { id: 12, name: "Bookshelf", price: 120, image: "https://picsum.photos/200/200?random=12" },
      ],
    }

    // إذا لا توجد فئة محددة، نجلب كل المنتجات كمقترحات عامة
    const selectedProducts = purchasedCategory
      ? allProducts[purchasedCategory] || []
      : Object.values(allProducts).flat()

    setProducts(selectedProducts.slice(0, 6)) // عرض 6 منتجات فقط
  }, [purchasedCategory])

  if (!products.length) return null

  return (
    <div>
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
