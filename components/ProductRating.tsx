"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function ProductRating() {
  const [rating, setRating] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!rating) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center text-green-600 font-medium">
        Thank you for your feedback ⭐
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold">Rate Your Experience</div>

      <div className="flex gap-2 justify-center">
        {[1,2,3,4,5].map((star) => (
          <Star
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer ${
              rating && star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
            }`}
          />
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={!rating} className="w-full">
        Submit Rating
      </Button>
    </div>
  )
}
