"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-store"

export default function RecommendedProducts() {
  const { dispatch } = useCart()

  const recommended = [
    { id: "r1", name: "Premium Headphones", price: 25 },
    { id: "r2", name: "Wireless Mouse", price: 15 },
  ]

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold">You May Also Like</div>

      {recommended.map((p) => (
        <div
          key={p.id}
          className="flex justify-between items-center border p-2 rounded"
        >
          <div>
            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-xs text-muted-foreground">${p.price}</div>
          </div>

          <Button
            size="sm"
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
            Add
          </Button>
        </div>
      ))}
    </div>
  )
}
