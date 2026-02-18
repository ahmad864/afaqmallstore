import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { supabase } from './supabase' // استدعاء supabase صحيح

// دالة موجودة سابقاً للجمع بين كلاسات tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// دالة رفع إيصال الدفع إلى Supabase Storage
export async function uploadReceipt(file: File, orderId: string): Promise<string> {
  const fileExt = file.name.split('.').pop() // امتداد الملف
  const fileName = `${orderId}.${fileExt}`
  const filePath = fileName // يمكن تعديل المجلد إذا أحببت، مثلا "receipts/${fileName}"

  // رفع الملف
  const { data, error } = await supabase.storage
    .from('receipts')       // تأكد أن لديك bucket باسم "receipts" في Supabase
    .upload(filePath, file)

  if (error) throw error

  // الحصول على رابط عام
  const { data: urlData, error: urlError } = supabase
    .storage
    .from('receipts')
    .getPublicUrl(filePath)

  if (urlError) throw urlError

  return urlData.publicUrl
}
