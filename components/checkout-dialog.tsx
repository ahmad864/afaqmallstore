"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-store"

import { RatingSection } from "@/components/RatingSection"
import RecommendedProducts from "@/components/RecommendedProducts"
import { allProducts } from "@/lib/data" // ← البيانات من ملف data مباشرة

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = "info" | "payment" | "success"

export function CheckoutDialog({ open, onOpenChange }: Props) {
  const { state: cartState, dispatch } = useCart()
  const [step, setStep] = useState<Step>("info")
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" })
  const [payment, setPayment] = useState<"paypal" | "shamcash">("paypal")
  const [proof, setProof] = useState<File | null>(null)

  const total = cartState.items.reduce((s, i) => s + i.price * i.quantity, 0)
  const syrianGovernorates = [
    "Damascus","Rif Dimashq","Aleppo","Homs","Hama","Latakia","Tartus",
    "Idlib","Deir ez-Zor","Al-Hasakah","Ar-Raqqah","Daraa","As-Suwayda","Quneitra"
  ]

  const validate = () => form.name && form.phone && form.city && form.address

  // تحديد أول منتج تم شراؤه للعرض المقترح
  const purchasedItem = cartState.items[0]

  const handleSend = async () => {
    if (payment === "shamcash" && !proof) { 
      alert("يجب رفع صورة إشعار الدفع لإتمام الطلب"); 
      return 
    }
    setLoading(true)

    const productsText = cartState.items.map(i => `• ${i.name} x${i.quantity} = $${i.price * i.quantity}`).join("\n")
    const message = `
🛒 New Order
👤 Name: ${form.name}
📞 Phone: ${form.phone}
🏙 City: ${form.city}
📍 Address: ${form.address}
💳 Payment: ${payment}
📦 Products:
${productsText}
💰 Total: $${total}
`

    try {
      const formData = new FormData()
      formData.append("message", message)
      if (proof) formData.append("proof", proof)
      await fetch("/api/send-telegram", { method: "POST", body: formData })

      dispatch({ type: "CLEAR_CART" })
      setStep("success")
    } catch {
      alert("Failed to send order")
    }

    setLoading(false)
  }

  const closeAll = () => {
    setStep("info")
    setForm({ name: "", phone: "", city: "", address: "" })
    setProof(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={closeAll}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {step === "info" && "Customer Information"}
            {step === "payment" && "Payment"}
            {step === "success" && "Order Confirmed"}
          </DialogTitle>
        </DialogHeader>

        {step === "success" && purchasedItem && (
          <div className="space-y-6 py-6">
            <div className="text-center">
              <p className="text-green-600 font-semibold">Order sent successfully ✅</p>
            </div>

            {/* تقييم المنتج */}
            <RatingSection />

            {/* عرض 6 منتجات من نفس القسم باستثناء المنتج الذي تم شراؤه */}
            <RecommendedProducts 
              purchasedCategory={purchasedItem.category} 
              purchasedId={purchasedItem.id} 
              allProducts={allProducts} 
            />

            <Button onClick={closeAll} className="w-full">Back to Store</Button>
          </div>
        )}

        {step === "info" && (
          <div className="space-y-4">
            <Input placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
            <Input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}/>
            <Select value={form.city} onValueChange={v => setForm({ ...form, city: v })}>
              <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
              <SelectContent>
                {syrianGovernorates.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
            <Textarea placeholder="Full Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}/>
            <Button onClick={() => validate() && setStep("payment")} className="w-full">Continue to Payment</Button>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <RadioGroup value={payment} onValueChange={v => setPayment(v as any)}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="paypal" id="paypal"/>
                <Label htmlFor="paypal">PayPal</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="shamcash" id="shamcash"/>
                <Label htmlFor="shamcash">ShamCash</Label>
              </div>
            </RadioGroup>

            {payment === "shamcash" && (
              <label className="flex flex-col gap-2 border p-2 rounded cursor-pointer">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4"/>
                  <span>{proof ? proof.name : "Upload Payment Proof *"}</span>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={e => setProof(e.target.files?.[0] || null)}/>
              </label>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("info")} className="flex-1">Back</Button>
              <Button onClick={handleSend} disabled={loading} className="flex-1">{loading ? "Sending..." : "Confirm Order"}</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
