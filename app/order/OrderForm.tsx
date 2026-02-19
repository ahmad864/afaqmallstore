"use client"

import { useState } from "react"
import { uploadReceipt } from "@/lib/utils"

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    note: "",
    receipt: null as File | null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      let receiptUrl = ""
      if (form.receipt) {
        receiptUrl = await uploadReceipt(form.receipt, Date.now().toString())
      }

      // إرسال البيانات إلى Telegram بشكل مستقل
      const resTelegram = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          city: form.city,
          note: form.note,
          receiptUrl,
        }),
      })

      const dataTelegram = await resTelegram.json()
      if (!dataTelegram.success) throw new Error(dataTelegram.error || "Failed to send Telegram notification")

      setSuccess("Order submitted successfully!")
      setForm({ name: "", phone: "", city: "", note: "", receipt: null })

    } catch (err: any) {
      console.error(err)
      setError(err.message || "Something went wrong")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        required
      />

      <textarea
        placeholder="Note (optional)"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, receipt: e.target.files?.[0] || null })}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Order"}
      </button>
    </form>
  )
}
