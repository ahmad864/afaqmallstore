import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // تحقق مما إذا كانت البيانات json أو FormData
    const contentType = req.headers.get("content-type") || ""
    let message = ""
    let proof: File | null = null

    if (contentType.includes("application/json")) {
      // البيانات json
      const body = await req.json()
      message = body.message || ""
      proof = null
    } else {
      // بيانات FormData (لإرسال ShamCash)
      const formData = await req.formData()
      message = formData.get("message") as string
      proof = formData.get("proof") as File | null
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID!

    // إرسال الرسالة النصية أولاً
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

    // إرسال الصورة إذا موجودة
    if (proof) {
      const photoForm = new FormData()
      photoForm.append("chat_id", CHAT_ID)
      photoForm.append("photo", proof, proof.name)

      const responsePhoto = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
        {
          method: "POST",
          body: photoForm as any,
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
