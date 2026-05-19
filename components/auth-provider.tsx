"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initUser } = useAuth()

  useEffect(() => {
    initUser()
  }, [])

  return <>{children}</>
}
