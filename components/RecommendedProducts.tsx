"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-store"
import { products } from "@/lib/products"

interface Props {
  category: string
}

export default function RecommendedProducts({ category }: Props) {
  const { state, dispatch } = useCart()

  // استثناء المنتجات التي اشتراها
  const purchasedIds = state.items.map((i) => i.id)

  const recommended = products
    .filter(
      (p) => p.category === category && !purchasedIds.includes(p.id)
    )
    .slice(0, 6)

  if (recommended.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">You may also like</h3>

      <div className="grid grid-cols-2 gap-4">
        {recommended.map((p) => (
          <div key={p.id} className="border rounded p-2 space-y-2">
            <div className="relative w-full h-32">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover rounded"
              />
            </div>

            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-xs text-muted-foreground">${p.price}</div>

            <Button
              size="sm"
              className="w-full"
              onClick={() =>
                dispatch({
                  type: "ADD_ITEM",
                  payload: {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: 1,
                  },
                })
              }
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
