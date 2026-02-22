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
import { supabase } from "@/lib/supabase"

import ProductRating from "@/components/ProductRating"
import RecommendedProducts from "@/components/RecommendedProducts"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = "info" | "payment" | "success"

export function CheckoutDialog({ open, onOpenChange }: Props) {
  const { state: cartState, dispatch } = useCart()
  const [step, setStep] = useState<Step>("info")
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    paypal: "",
  })

  const [payment, setPayment] = useState<"paypal" | "shamcash">("paypal")
  const [proof, setProof] = useState<File | null>(null)

  const total = cartState.items.reduce((s, i) => s + i.price * i.quantity, 0)

  const syrianGovernorates = [
    "Damascus","Rif Dimashq","Aleppo","Homs","Hama","Latakia","Tartus",
    "Idlib","Deir ez-Zor","Al-Hasakah","Ar-Raqqah","Daraa","As-Suwayda","Quneitra",
  ]

  const validate = () => form.name && form.phone && form.city && form.address

  const purchasedCategory =
    cartState.items.length > 0 ? (cartState.items[0] as any).category : ""

  const handleSend = async () => {
    if (payment === "paypal" && !form.paypal) {
      alert("يجب إدخال بريد PayPal لإتمام الطلب")
      return
    }
    if (payment === "shamcash" && !proof) {
      alert("يجب رفع صورة إشعار الدفع لإتمام الطلب")
      return
    }

    setLoading(true)

    const productsText = cartState.items
      .map(i => `• ${i.name} x${i.quantity} = $${i.price * i.quantity}`)
      .join("\n")

    const message = `
🛒 New Order

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🏙 City: ${form.city}
📍 Address: ${form.address}
💳 Payment: ${payment}
${payment === "paypal" ? `PayPal Email: ${form.paypal}` : ""}

📦 Products:
${productsText}

💰 Total: $${total}
`

    try {
      // إرسال بيانات + صورة إلى Telegram
      const formData = new FormData()
      formData.append("message", message)
      if (proof) formData.append("proof", proof)

      await fetch("/api/send-telegram", {
        method: "POST",
        body: formData,
      })

      // ✅ إرسال الطلب إلى Supabase
      const orderData = {
        name: form.name,
        phone: form.phone,
        city: form.city,
        address: form.address,
        payment: payment,
        paypal: form.paypal || null,
        total: total,
        items: cartState.items,
        receipt_url: null, // ✅ تم إضافة هذا السطر لتجنب خطأ NOT NULL
        created_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from("orders")
        .insert([orderData])

      if (error) console.log("Supabase error:", error)
      else console.log("Supabase data:", data)

      dispatch({ type: "CLEAR_CART" })
      setStep("success")
    } catch (err) {
      console.log("Error sending order:", err)
      alert("Failed to send order")
    }

    setLoading(false)
  }

  const closeAll = () => {
    setStep("info")
    setForm({ name: "", phone: "", city: "", address: "", paypal: "" })
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

        {step === "success" && (
          <div className="space-y-6 py-6">
            <div className="text-center">
              <p className="text-green-600 font-semibold">
                Order sent successfully ✅
              </p>
            </div>

            <ProductRating />
            <RecommendedProducts category={purchasedCategory} />

            <Button onClick={closeAll} className="w-full">
              Back to Store
            </Button>
          </div>
        )}

        {step === "info" && (
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />

            <Select
              value={form.city}
              onValueChange={v => setForm({ ...form, city: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {syrianGovernorates.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Full Address"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
            />

            <div className="bg-muted/50 p-3 rounded">
              <div className="font-semibold text-sm mb-2">Order Summary</div>
              {cartState.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <Button
              onClick={() => validate() && setStep("payment")}
              className="w-full"
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <RadioGroup
              value={payment}
              onValueChange={v => setPayment(v as any)}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem value="shamcash" id="shamcash" />
                <Label htmlFor="shamcash">ShamCash</Label>
              </div>
            </RadioGroup>

            {payment === "paypal" && (
              <div className="flex flex-col gap-2 border p-2 rounded">
                <Label>PayPal Email *</Label>
                <Input
                  placeholder="Enter your PayPal email"
                  value={form.paypal || ""}
                  onChange={e => setForm({ ...form, paypal: e.target.value })}
                />
              </div>
            )}

            {payment === "shamcash" && (
              <div className="flex flex-col gap-2 border p-3 rounded items-center">
                <p className="font-bold text-gray-800 text-center text-lg">
                  محفظة Sham Cash
                </p>
                <p className="font-bold text-gray-800 text-center text-lg">
                  fe9456d8af5c4599f1c4407fa97df0fc
                </p>

                <label className="flex flex-col gap-2 mt-2 cursor-pointer w-full">
                  <div className="flex items-center justify-center gap-2 p-2 border rounded">
                    <Upload className="h-4 w-4" />
                    <span>{proof ? proof.name : "Upload Payment Proof *"}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => setProof(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep("info")}
                className="flex-1"
              >
                Back
              </Button>

              <Button
                onClick={handleSend}
                disabled={loading || (payment === "paypal" && !form.paypal) || (payment === "shamcash" && !proof)}
                className="flex-1"
              >
                {loading ? "Sending..." : "Confirm Order"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
