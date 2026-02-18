"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Plus, Minus, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { getProductById, getProductsByCategory, categoryNames, type CategorySlug } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"

export default function ProductPage() {
  const params = useParams()
  const id = Number(params.id)
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/"><Button>Back to Home</Button></Link>
        </div>
        <Footer />
      </div>
    )
  }

  const catName = categoryNames[product.category as CategorySlug] || product.category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const addToCart = () => {
    if (product.stock <= 0) return
    dispatch({
      type: "ADD_ITEM",
      payload: { id: product.id, name: product.name, price: product.price, image: product.image, quantity },
    })
    dispatch({ type: "TOGGLE_CART" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ArrowRight className="h-3 w-3" />
            <Link href={`/category/${product.category}`} className="hover:text-primary transition-colors">{catName}</Link>
            <ArrowRight className="h-3 w-3" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">{catName}</Badge>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground text-balance mb-3">{product.name}</h1>
                <p className="text-3xl font-bold text-primary">${product.price}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Stock</span>
                  <p className="font-semibold">{product.stock} units</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Total Sold</span>
                  <p className="font-semibold">{product.totalSold} units</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={addToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Truck className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Fast Delivery</p>
                    <p className="text-xs text-muted-foreground">2-5 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Shield className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Quality Guaranteed</p>
                    <p className="text-xs text-muted-foreground">1 year warranty</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <RotateCcw className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Free Returns</p>
                    <p className="text-xs text-muted-foreground">Within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
