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
    // جميع المنتجات التجريبية لكل الأقسام الموجودة في الموقع
    const allProducts: Product[] = [
      { id: 1, name: "Sport Shoes", price: 50, image: "https://via.placeholder.com/150?text=Shoes1", category: "Shoes" },
      { id: 2, name: "Casual Shoes", price: 60, image: "https://via.placeholder.com/150?text=Shoes2", category: "Shoes" },
      { id: 3, name: "T-Shirt", price: 20, image: "https://via.placeholder.com/150?text=Clothes1", category: "Clothes" },
      { id: 4, name: "Jeans", price: 40, image: "https://via.placeholder.com/150?text=Clothes2", category: "Clothes" },
      { id: 5, name: "Foundation", price: 25, image: "https://via.placeholder.com/150?text=Makeup1", category: "Makeup" },
      { id: 6, name: "Lipstick", price: 30, image: "https://via.placeholder.com/150?text=Makeup2", category: "Makeup" },
      { id: 7, name: "Laptop", price: 500, image: "https://via.placeholder.com/150?text=Electronics1", category: "Electronics" },
      { id: 8, name: "Headphones", price: 80, image: "https://via.placeholder.com/150?text=Electronics2", category: "Electronics" },
      { id: 9, name: "Sofa", price: 300, image: "https://via.placeholder.com/150?text=Furniture1", category: "Furniture" },
      { id: 10, name: "Chair", price: 100, image: "https://via.placeholder.com/150?text=Furniture2", category: "Furniture" },
      { id: 11, name: "Pizza", price: 15, image: "https://via.placeholder.com/150?text=Food1", category: "Food" },
      { id: 12, name: "Burger", price: 10, image: "https://via.placeholder.com/150?text=Food2", category: "Food" },
    ]

    // ✅ اختيار المنتجات بناء على القسم الذي اشترى منه الزبون
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
