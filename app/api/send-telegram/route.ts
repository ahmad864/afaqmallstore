import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID!

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      }
    )

    const data = await response.json()

    if (!data.ok) {
      return NextResponse.json({ error: data }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
