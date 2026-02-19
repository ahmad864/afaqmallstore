"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-store"
import { useProducts } from "@/lib/products-store"
import { getProductsByCategory } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { ShoppingBag, Upload, ChevronLeft, ChevronRight } from "lucide-react"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const syrianGovernorates = [
  "Damascus", "Rif Dimashq", "Aleppo", "Homs", "Hama",
  "Latakia", "Tartus", "Idlib", "Deir ez-Zor", "Al-Hasakah",
  "Ar-Raqqah", "Daraa", "As-Suwayda", "Quneitra",
]

type Step = "info" | "payment" | "success"

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { state: cartState, dispatch: cartDispatch } = useCart()
  const productsContext = useProducts()
  const { dispatch: productsDispatch, state: productsState } = productsContext

  const [step, setStep] = useState<Step>("info")
  const [customerInfo, setCustomerInfo] = useState({ fullName: "", phone: "", governorate: "", address: "" })
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "shamcash">("paypal")
  const [proofImage, setProofImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [purchasedCategories, setPurchasedCategories] = useState<string[]>([])
  const [purchasedItemIds, setPurchasedItemIds] = useState<number[]>([])

  const totalPrice = cartState.items.reduce((s, i) => s + i.price * i.quantity, 0)

  const validateInfo = () => {
    const e: Record<string, string> = {}
    if (!customerInfo.fullName.trim()) e.fullName = "Full name is required"
    if (!customerInfo.phone.trim()) e.phone = "Phone number is required"
    if (!customerInfo.governorate) e.governorate = "Governorate is required"
    if (!customerInfo.address.trim()) e.address = "Address is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validateInfo()) setStep("payment")
  }

  const handlePaymentComplete = async () => {
    setIsSubmitting(true)
    try {
      // معالجة الطلبات داخلياً
      cartState.items.forEach((item) => {
        productsDispatch({ type: "PROCESS_ORDER", payload: { id: item.id, quantity: item.quantity } })
      })

      // رسالة Telegram
      const productLines = cartState.items
        .map((i) => `- ${i.name} x${i.quantity} = $${i.price * i.quantity}`)
        .join("\n")

      const msg = `📦 New Order from AfaqMall!\n\nCustomer: ${customerInfo.fullName}\nPhone: ${customerInfo.phone}\nGovernorate: ${customerInfo.governorate}\nAddress: ${customerInfo.address}\n\nProducts:\n${productLines}\n\nTotal: $${totalPrice}\nPayment: ${paymentMethod === "paypal" ? "PayPal" : "Sham Cash"}${proofImage ? "\nPayment proof uploaded" : ""}`

      // إرسال Telegram
      const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
      const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg }),
      })

      // حفظ الفئات والمنتجات للـ SuggestedProducts
      const cats = cartState.items
        .map((item) => productsState.products.find((p) => p.id === item.id)?.category || "")
        .filter(Boolean)
      setPurchasedCategories([...new Set(cats)])
      setPurchasedItemIds(cartState.items.map((i) => i.id))

      setStep("success")
      cartDispatch({ type: "CLEAR_CART" })
    } catch (err) {
      console.error(err)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep("info")
    setCustomerInfo({ fullName: "", phone: "", governorate: "", address: "" })
    setPaymentMethod("paypal")
    setProofImage(null)
    setErrors({})
    onOpenChange(false)
  }

  if (step === "success") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Order Confirmed!</h2>
            <p className="text-muted-foreground">
              Thank you for your purchase. We will contact you soon to confirm your order.
            </p>

            <RatingSection />
            <SuggestedProducts categories={purchasedCategories} excludeIds={purchasedItemIds} />

            <Button onClick={handleClose} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Back to Store
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            {step === "info" ? "Customer Information" : "Payment"}
          </DialogTitle>
        </DialogHeader>

        {step === "info" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={customerInfo.fullName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                className={errors.fullName ? "border-destructive" : ""}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className={errors.phone ? "border-destructive" : ""}
                placeholder="+963 xxx xxx xxxx"
                dir="ltr"
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="governorate">Syrian Governorate *</Label>
              <Select
                value={customerInfo.governorate}
                onValueChange={(v) => setCustomerInfo({ ...customerInfo, governorate: v })}
              >
                <SelectTrigger className={errors.governorate ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select governorate" />
                </SelectTrigger>
                <SelectContent>
                  {syrianGovernorates.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.governorate && <p className="text-sm text-destructive">{errors.governorate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address *</Label>
              <Textarea
                id="address"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className={errors.address ? "border-destructive" : ""}
                placeholder="Street, building, floor..."
                rows={3}
              />
              {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-sm">Order Summary</h4>
              {cartState.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="truncate flex-1">{item.name} x{item.quantity}</span>
                  <span className="font-medium ml-2">${item.price * item.quantity}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary">${totalPrice}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleNext} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Next: Payment
              </Button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "paypal" | "shamcash")} className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="cursor-pointer flex-1">
                  <span className="font-semibold">PayPal</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Send payment to: afaqmall@paypal.com. Include your order number in the note.
                  </p>
                </Label>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="shamcash" id="shamcash" />
                <Label htmlFor="shamcash" className="cursor-pointer flex-1">
                  <span className="font-semibold">Sham Cash</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Send to wallet: <code className="bg-muted px-1 rounded font-mono">SC-AFAQ-2026-MALL</code>
                  </p>
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "shamcash" && (
              <div className="space-y-2">
                <Label>Upload Payment Proof</Label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">{proofImage ? proofImage.name : "Choose file"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setProofImage(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between font-bold text-lg">
                <span>Total to pay</span>
                <span className="text-primary">${totalPrice}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("info")} className="flex-1">Back</Button>
              <Button
                onClick={handlePaymentComplete}
                disabled={isSubmitting}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? "Processing..." : "Payment Completed"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// باقي الدوال مثل RatingSection, Separator, SuggestedProducts كما هي
