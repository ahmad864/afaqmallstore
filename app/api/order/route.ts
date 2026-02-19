import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { name, phone, city, note, receiptUrl } = await req.json()

    const { error } = await supabase
      .from('orders')
      .insert([{ name, phone, city, note, receipt_url: receiptUrl }])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ success: false, error: err.message })
  }
}
