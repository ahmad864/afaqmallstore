import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, phone, city, note, receiptUrl } = await req.json()
    console.log("Telegram payload:", { name, phone, city, note, receiptUrl }) // ✨

    const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

    const message = `
📦 *New Order Received*
*Name:* ${name}
*Phone:* ${phone}
*City:* ${city}
*Note:* ${note || "-"}
*Receipt:* ${receiptUrl || "-"}
    `

    const res = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text: message, parse_mode: "Markdown" }),
    })

    const data = await res.json()
    console.log("Telegram response:", data) // ✨
    if (!data.ok) throw new Error(JSON.stringify(data))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Telegram error:", err)
    return NextResponse.json({ success: false, error: err.message })
  }
}
