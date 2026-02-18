"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { uploadReceipt } from "@/lib/utils"

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    note: "",
    receipt: null as File | null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // رفع الايصال
      let receiptUrl = ""
      if (form.receipt) {
        receiptUrl = await uploadReceipt(form.receipt, Date.now().toString())
      }

      // حفظ الأوردر في Supabase
      const { data, error: supabaseError } = await supabase
        .from("orders")
        .insert([{
          name: form.name,
          phone: form.phone,
          city: form.city,
          note: form.note,
          receipt_url: receiptUrl
        }])

      if (supabaseError) throw supabaseError

      // إرسال رسالة للتليجرام
      const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
      const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

      const message = `
📦 *New Order Received*
*Name:* ${form.name}
*Phone:* ${form.phone}
*City:* ${form.city}
*Note:* ${form.note || "-"}
*Receipt:* ${receiptUrl ? `[View](${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${receiptUrl})` : "-"}
      `

      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: message, parse_mode: "Markdown" })
      })

      alert("Order submitted successfully!")
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

      <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      <input type="text" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
      <input type="text" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
      <textarea placeholder="Note (optional)" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />

      <input type="file" accept="image/*" onChange={e => setForm({ ...form, receipt: e.target.files?.[0] || null })} required />

      <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Order"}</button>
    </form>
  )
}
