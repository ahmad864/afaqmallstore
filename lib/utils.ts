import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { supabase } from './supabase'  // إضافة استيراد supabase

// دالة موجودة سابقاً
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// دالة رفع إيصال الدفع إلى Supabase Storage
export async function uploadReceipt(file: File, orderId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${orderId}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('receipts')          // اسم الـ Bucket
    .upload(filePath, file)

  if (error) {
    throw error
  }

  const { publicUrl, error: urlError } = supabase
    .storage
    .from('receipts')
    .getPublicUrl(filePath)

  if (urlError) {
    throw urlError
  }

  return publicUrl
}
