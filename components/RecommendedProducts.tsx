"use client"

import { useProducts } from "@/context/products-context"
import type { Product } from "@/lib/data"

interface RecommendedProps {
  currentProduct: Product
}

export default function RecommendedProducts({ currentProduct }: RecommendedProps) {
  const { state } = useProducts()

  // اختيار 6 منتجات من نفس الفئة باستثناء المنتج الحالي
  const recommended = state.products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 6)

  if (recommended.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">منتجات مشابهة</h3>
      <div className="grid grid-cols-3 gap-4">
        {recommended.map(product => (
          <div key={product.id} className="border p-2 rounded shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded"
            />
            <h4 className="font-medium mt-2">{product.name}</h4>
            <p className="text-sm text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
