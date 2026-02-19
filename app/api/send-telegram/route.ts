import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message, proofBase64, proofName } = await req.json() // proofBase64: base64 string للصورة

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID!

    // أولاً نرسل الرسالة النصية
    const responseMsg = await fetch(
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

    const dataMsg = await responseMsg.json()

    if (!dataMsg.ok) {
      return NextResponse.json({ error: dataMsg }, { status: 500 })
    }

    // إذا كان هناك صورة، نرسلها بعد ذلك
    if (proofBase64 && proofName) {
      // Telegram API يحتاج ملف بصيغة "multipart/form-data"
      const formData = new FormData()
      formData.append("chat_id", CHAT_ID)
      // تحويل base64 إلى blob
      const byteCharacters = atob(proofBase64.split(",")[1])
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: "image/png" }) // نوع الصورة png
      formData.append("photo", blob, proofName)

      const responsePhoto = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
        {
          method: "POST",
          body: formData as any,
        }
      )

      const dataPhoto = await responsePhoto.json()
      if (!dataPhoto.ok) {
        return NextResponse.json({ error: dataPhoto }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
