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
import { getProductsByCategory, type CategorySlug } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { ShoppingBag, Upload, ChevronLeft, ChevronRight } from "lucide-react"
import { uploadReceipt } from "@/lib/utils" // تأكد من وجود هذه الدالة

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
  const { dispatch: productsDispatch } = productsContext
  const [step, setStep] = useState<Step>("info")
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    governorate: "",
    address: "",
  })
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
      // Process orders - decrease stock, increase totalSold
      cartState.items.forEach((item) => {
        productsDispatch({ type: "PROCESS_ORDER", payload: { id: item.id, quantity: item.quantity } })
      })

      // رفع الصورة إن وجدت
      let receiptUrl = ""
      if (proofImage) {
        receiptUrl = await uploadReceipt(proofImage, Date.now().toString())
      }

      // إرسال البيانات مباشرة إلى API route send-telegram
      const res = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerInfo.fullName,
          phone: customerInfo.phone,
          city: customerInfo.governorate,
          note: `Address: ${customerInfo.address}\nPayment: ${paymentMethod}${receiptUrl ? "\nPayment proof uploaded" : ""}`,
          receiptUrl,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to send Telegram notification")

      // Save purchased categories and item IDs for suggestions
      const { state: productsState } = productsContext
      const cats = cartState.items.map((item) => {
        const prod = productsState.products.find((p) => p.id === item.id)
        return prod?.category || ""
      }).filter(Boolean)
      setPurchasedCategories([...new Set(cats)])
      setPurchasedItemIds(cartState.items.map((i) => i.id))

      setStep("success")
      cartDispatch({ type: "CLEAR_CART" })
    } catch (err: any) {
      console.error(err)
      alert(err.message || "An error occurred. Please try again.")
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

  // --- Rest of your JSX remains completely unchanged ---
  // أي شيء تحت هذا السطر، اتركه كما هو: Step info، payment، success، RatingSection، SuggestedProducts، Separator
  // الكود بالكامل من CheckoutDialog JSX لا يتغير، فقط تم تعديل handlePaymentComplete ليتصل بـ /api/send-telegram
}
