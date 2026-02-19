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
  })

  const [payment, setPayment] = useState<"paypal" | "shamcash">("paypal")
  const [proof, setProof] = useState<File | null>(null)

  const total = cartState.items.reduce((s, i) => s + i.price * i.quantity, 0)

  const validate = () =>
    form.name && form.phone && form.city && form.address

  const handleSend = async () => {
    setLoading(true)

    const products = cartState.items
      .map(i => `• ${i.name} x${i.quantity} = $${i.price * i.quantity}`)
      .join("\n")

    const message = `
🛒 New Order

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🏙 City: ${form.city}
📍 Address: ${form.address}

📦 Products:
${products}

💰 Total: $${total}
💳 Payment: ${payment}
`

    try {
      await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

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

        {/* SUCCESS */}
        {step === "success" && (
          <div className="text-center space-y-4 py-6">
            <p className="text-green-600 font-semibold">
              Order sent successfully ✅
            </p>
            <Button onClick={closeAll}>Back to Store</Button>
          </div>
        )}

        {/* STEP 1 */}
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
                <SelectItem value="Damascus">Damascus</SelectItem>
                <SelectItem value="Aleppo">Aleppo</SelectItem>
                <SelectItem value="Homs">Homs</SelectItem>
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

        {/* STEP 2 */}
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

            {payment === "shamcash" && (
              <label className="flex items-center gap-2 border p-2 rounded cursor-pointer">
                <Upload className="h-4 w-4" />
                {proof ? proof.name : "Upload Payment Proof"}
                <input
                  type="file"
                  className="hidden"
                  onChange={e => setProof(e.target.files?.[0] || null)}
                />
              </label>
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
                disabled={loading}
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
