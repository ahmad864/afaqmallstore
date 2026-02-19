import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { name, phone, city, note, receiptUrl } = await req.json();

    // حفظ الأوردر في Supabase
    const { error: supabaseError } = await supabase
      .from("orders")
      .insert([{ name, phone, city, note, receipt_url: receiptUrl }]);
    if (supabaseError) throw supabaseError;

    // إرسال رسالة للتليجرام
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    const message = `
📦 *New Order Received*
*Name:* ${name}
*Phone:* ${phone}
*City:* ${city}
*Note:* ${note || "-"}
*Receipt:* ${receiptUrl ? `[View](${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${receiptUrl})` : "-"}
    `;

    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text: message, parse_mode: "Markdown" }),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
