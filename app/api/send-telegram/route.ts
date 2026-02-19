import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, city, note, receiptUrl } = await req.json();

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    const message = `
📦 *New Order Received*
*Name:* ${name}
*Phone:* ${phone}
*City:* ${city}
*Note:* ${note || "-"}
*Receipt:* ${receiptUrl || "-"}
    `;

    const res = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text: message, parse_mode: "Markdown" }),
    });

    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.description || "Telegram API error");
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Telegram Error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
