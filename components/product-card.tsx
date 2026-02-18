"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Plus, Minus, Star } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import type { Product } from "@/lib/data"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  const addToCart = () => {
    if (product.stock <= 0) return
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      },
    })
    dispatch({ type: "TOGGLE_CART" })
    setQuantity(1)
  }

  const outOfStock = product.stock <= 0

  return (
    <Card className="group overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              crossOrigin="anonymous"
            />
            {outOfStock && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <span className="text-sm font-bold text-destructive bg-background/80 px-3 py-1 rounded-md">Out of Stock</span>
              </div>
            )}
          </div>
        </Link>
        <div className="p-3">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold mb-1 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          {/* Star Rating */}
          <div className="flex items-center gap-0.5 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3.5 w-3.5 ${
                  star <= Math.round(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.rating.toFixed(1)})</span>
          </div>
          <p className="text-lg font-bold text-primary mb-3">${product.price}</p>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={outOfStock}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-6 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => setQuantity(quantity + 1)}
                disabled={outOfStock}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
          </div>

          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="sm"
            onClick={addToCart}
            disabled={outOfStock}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
