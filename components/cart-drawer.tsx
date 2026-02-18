"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { useState } from "react"
import { CheckoutDialog } from "@/components/checkout-dialog"

export function CartDrawer() {
  const { state, dispatch } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <>
      <Sheet open={state.isOpen} onOpenChange={() => dispatch({ type: "TOGGLE_CART" })}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
          </SheetHeader>

          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add products to get started</p>
                <Button onClick={() => dispatch({ type: "TOGGLE_CART" })}>Continue Shopping</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-sm text-primary font-semibold">${item.price}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } })
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">${item.price * item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${totalPrice}</span>
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  onClick={() => setShowCheckout(true)}
                >
                  Confirm Order
                </Button>
                <Button variant="outline" className="w-full" onClick={() => dispatch({ type: "TOGGLE_CART" })}>
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog open={showCheckout} onOpenChange={setShowCheckout} />
    </>
  )
}
