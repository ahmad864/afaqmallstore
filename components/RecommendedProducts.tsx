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
}

export default function RecommendedProducts({ purchasedCategory }: Props) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // مثال: جميع المنتجات التجريبية لجميع الأقسام
    const allProducts: Product[] = [
      { id: 1, name: "Sport Shoes", price: 50, image: "https://via.placeholder.com/150?text=Shoes1", category: "Shoes" },
      { id: 2, name: "Casual Shoes", price: 60, image: "https://via.placeholder.com/150?text=Shoes2", category: "Shoes" },
      { id: 3, name: "T-Shirt", price: 20, image: "https://via.placeholder.com/150?text=Clothes1", category: "Clothes" },
      { id: 4, name: "Jeans", price: 40, image: "https://via.placeholder.com/150?text=Clothes2", category: "Clothes" },
      { id: 5, name: "Watch", price: 120, image: "https://via.placeholder.com/150?text=Accessory1", category: "Accessories" },
      { id: 6, name: "Ring", price: 80, image: "https://via.placeholder.com/150?text=Accessory2", category: "Accessories" },
      { id: 7, name: "Backpack", price: 50, image: "https://via.placeholder.com/150?text=Bag1", category: "Bags" },
      { id: 8, name: "Handbag", price: 70, image: "https://via.placeholder.com/150?text=Bag2", category: "Bags" },
      { id: 9, name: "Baseball Cap", price: 20, image: "https://via.placeholder.com/150?text=Hat1", category: "Hats" },
      { id: 10, name: "Beanie", price: 15, image: "https://via.placeholder.com/150?text=Hat2", category: "Hats" },
      { id: 11, name: "Leather Jacket", price: 100, image: "https://via.placeholder.com/150?text=Jacket1", category: "Jackets" },
      { id: 12, name: "Denim Jacket", price: 80, image: "https://via.placeholder.com/150?text=Jacket2", category: "Jackets" },
      // أضف المزيد من المنتجات لكل قسم...
    ]

    // اختيار المنتجات حسب الفئة المشتراة
    const selectedProducts = purchasedCategory
      ? allProducts.filter(p => p.category === purchasedCategory).slice(0, 6)
      : []

    setProducts(selectedProducts)
  }, [purchasedCategory])

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
