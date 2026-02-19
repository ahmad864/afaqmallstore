"use client"

import React from "react"
import Image from "next/image"
import { allProducts, Product } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SuggestedProductsProps {
  category: string
}

export default function SuggestedProducts({ category }: SuggestedProductsProps) {
  // جلب أول 6 منتجات من القسم المطلوب
  const products: Product[] = allProducts
    .filter((p) => p.category === category)
    .slice(0, 6)

  if (products.length === 0) return <p>لا توجد منتجات في هذا القسم</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="shadow-md hover:shadow-lg transition p-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{product.price} USD</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="object-cover rounded-md mb-2"
            />
            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
            <p className="text-sm text-yellow-500">Rating: {product.rating} ⭐</p>
            <Button className="mt-2 w-full">Add to Cart</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
