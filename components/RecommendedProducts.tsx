"use client"

import React from "react"
import Image from "next/image"
import { getProductsByCategory, Product } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SuggestedProductsProps {
  category: string // اسم الفئة المطلوبة
}

export default function SuggestedProducts({ category }: SuggestedProductsProps) {
  const products: Product[] = getProductsByCategory(category).slice(0, 6) // نأخذ أول 6 منتجات فقط

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="shadow-md hover:shadow-lg transition p-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500">${product.price}</CardDescription>
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
