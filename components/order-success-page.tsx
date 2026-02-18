"use client"

import { CheckCircle, ShoppingBag, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCurrency } from "@/lib/currency-store"

interface OrderSuccessPageProps {
  orderData: {
    items: any[]
    customerInfo: any
    total: number
    shippingCost: number
    currency: string
  }
  onClose: () => void
}

export function OrderSuccessPage({ orderData, onClose }: OrderSuccessPageProps) {
  const { convertPrice } = useCurrency()

  const getCurrencySymbol = () => {
    switch (orderData.currency) {
      case "USD":
        return "$"
      case "SYP":
        return "ل.س"
      case "TRY":
        return "₺"
      default:
        return "$"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f5c7e]/10 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#7f5c7e] rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-white fill-current" />
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#7f5c7e]">تم إرسال طلبك بنجاح! 🎉</h1>
          <p className="text-xl text-gray-600">شكراً لك على اختيار متجرنا</p>
          <p className="text-lg text-gray-500">نقدر ثقتك بنا وسنتواصل معك قريباً لتأكيد التفاصيل والتسليم</p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-gradient-to-r from-[#7f5c7e]/5 to-purple-50 p-6 rounded-xl text-right">
          <h3 className="text-xl font-semibold text-[#7f5c7e] mb-6 text-center">ملخص طلبك</h3>

          {/* Customer Info */}
          <div className="bg-white p-4 rounded-lg mb-4 space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">الاسم:</span>
              <span>{orderData.customerInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">الهاتف:</span>
              <span dir="ltr">{orderData.customerInfo.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">المدينة:</span>
              <span>{orderData.customerInfo.city}</span>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-3 mb-4">
            {orderData.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-[#7f5c7e]">
                  {convertPrice(item.price * item.quantity)} {getCurrencySymbol()}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="bg-white p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>رسوم الشحن:</span>
              <span>
                {convertPrice(orderData.shippingCost)} {getCurrencySymbol()}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>الإجمالي:</span>
              <span className="text-[#7f5c7e]">
                {convertPrice(orderData.total)} {getCurrencySymbol()}
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">ماذا بعد؟</h4>
          <ul className="text-sm text-blue-700 space-y-1 text-right">
            <li>• سنتواصل معك خلال 24 ساعة لتأكيد الطلب</li>
            <li>• سيتم تحضير طلبك وشحنه في أسرع وقت</li>
            <li>• ستحصل على رقم تتبع للشحنة</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={onClose} className="bg-[#7f5c7e] hover:bg-[#6d4d6c] px-8 py-3 text-lg">
            <ShoppingBag className="mr-2 h-5 w-5" />
            العودة للتسوق
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center text-gray-500 text-sm">
          <p>شكراً لثقتك بنا ❤️</p>
          <p>فريق خدمة العملاء</p>
        </div>
      </div>
    </div>
  )
}
