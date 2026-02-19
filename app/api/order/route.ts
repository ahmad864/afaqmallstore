import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, phone, city, note, receiptUrl } = await req.json()

    // تحقق من المتغيرات
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (!telegramBotToken || !telegramChatId) {
      throw new Error("Telegram bot token or chat ID is missing")
    }

    const message = `
📦 *New Order Received*
*Name:* ${name}
*Phone:* ${phone}
*City:* ${city}
*Note:* ${note || "-"}
*Receipt:* ${receiptUrl || "-"}
    `

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    )

    const telegramData = await telegramRes.json()
    if (!telegramData.ok) throw new Error(JSON.stringify(telegramData))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ success: false, error: err.message })
  }
}
