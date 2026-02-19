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
    const allProducts: Record<string, Product[]> = {
      Shoes: [
        { id: 1, name: "Sport Shoes", price: 50, image: "shoes" },
        { id: 2, name: "Casual Shoes", price: 60, image: "casual shoes" },
        { id: 3, name: "Sneakers", price: 70, image: "sneakers" },
        { id: 4, name: "Formal Shoes", price: 80, image: "formal shoes" },
        { id: 5, name: "Boots", price: 90, image: "boots shoes" },
        { id: 6, name: "Sandals", price: 40, image: "sandals shoes" },
      ],
      Furniture: [
        { id: 7, name: "Sofa", price: 300, image: "sofa furniture" },
        { id: 8, name: "Chair", price: 50, image: "chair furniture" },
        { id: 9, name: "Table", price: 100, image: "table furniture" },
        { id: 10, name: "Bed", price: 400, image: "bed furniture" },
        { id: 11, name: "Cupboard", price: 200, image: "cupboard furniture" },
        { id: 12, name: "Bookshelf", price: 120, image: "bookshelf furniture" },
      ],
    }

    const selectedProducts = purchasedCategory
      ? allProducts[purchasedCategory] || []
      : Object.values(allProducts).flat()

    setProducts(selectedProducts.slice(0, 6))
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
              <img
                src={`https://source.unsplash.com/400x400/?${encodeURIComponent(p.image)}`}
                alt={p.name}
                className="w-full h-24 object-cover mb-2 rounded"
              />
              <div className="font-bold text-sm">${p.price}</div>
              <Button size="sm" className="mt-2 w-full">View</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
