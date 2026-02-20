"use client"

import React from "react"
import Image from "next/image"
import { allProducts, Product } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-store" // تأكد من المسار الصحيح

// دالة لاختيار n عنصر عشوائي من مصفوفة
function getRandomProducts(products: Product[], count: number): Product[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default function RecommendedProducts() {
  const recommendedProducts: Product[] = getRandomProducts(allProducts, 6) // 6 منتجات عشوائية
  const { dispatch } = useCart() // استخدام dispatch للسلة

  // دالة لإضافة منتج للسلة عند الضغط على الزر
  const handleAddToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      },
    })
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">منتجات مقترحة</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendedProducts.map((product) => (
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
              <Button
                className="mt-2 w-full"
                onClick={() => handleAddToCart(product)} // الزر الآن يعمل ويضيف للسلة
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
