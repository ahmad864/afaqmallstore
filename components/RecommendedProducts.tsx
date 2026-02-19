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
  category?: string // الفئة المشتراة
}

export default function RecommendedProducts({ category }: Props) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // منتجات تجريبية لكل فئة
    const allProducts: Record<string, Product[]> = {
      Shoes: [
        { id: 1, name: "Sport Shoes", price: 50, image: "https://via.placeholder.com/150?text=Shoes1" },
        { id: 2, name: "Casual Shoes", price: 60, image: "https://via.placeholder.com/150?text=Shoes2" },
        { id: 3, name: "Sneakers", price: 70, image: "https://via.placeholder.com/150?text=Shoes3" },
        { id: 4, name: "Formal Shoes", price: 80, image: "https://via.placeholder.com/150?text=Shoes4" },
        { id: 5, name: "Boots", price: 90, image: "https://via.placeholder.com/150?text=Shoes5" },
        { id: 6, name: "Sandals", price: 40, image: "https://via.placeholder.com/150?text=Shoes6" },
      ],
      Clothes: [
        { id: 7, name: "T-Shirt", price: 20, image: "https://via.placeholder.com/150?text=Clothes1" },
        { id: 8, name: "Jeans", price: 40, image: "https://via.placeholder.com/150?text=Clothes2" },
        { id: 9, name: "Jacket", price: 80, image: "https://via.placeholder.com/150?text=Clothes3" },
        { id: 10, name: "Dress", price: 60, image: "https://via.placeholder.com/150?text=Clothes4" },
        { id: 11, name: "Sweater", price: 35, image: "https://via.placeholder.com/150?text=Clothes5" },
        { id: 12, name: "Shorts", price: 25, image: "https://via.placeholder.com/150?text=Clothes6" },
      ],
      Accessories: [
        { id: 13, name: "Watch", price: 120, image: "https://via.placeholder.com/150?text=Accessory1" },
        { id: 14, name: "Ring", price: 80, image: "https://via.placeholder.com/150?text=Accessory2" },
        { id: 15, name: "Necklace", price: 90, image: "https://via.placeholder.com/150?text=Accessory3" },
        { id: 16, name: "Bracelet", price: 60, image: "https://via.placeholder.com/150?text=Accessory4" },
        { id: 17, name: "Sunglasses", price: 50, image: "https://via.placeholder.com/150?text=Accessory5" },
        { id: 18, name: "Hat", price: 30, image: "https://via.placeholder.com/150?text=Accessory6" },
      ],
    }

    // نختار المنتجات حسب الفئة المشتراة
    const selectedProducts = category && allProducts[category] ? allProducts[category] : []

    setProducts(selectedProducts.slice(0, 6))
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
