"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-store"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const { loginUser } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const success = loginUser(form.email, form.password)
    if (success) {
      router.push("/")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold text-primary">AfaqMall</Link>
          <p className="text-muted-foreground mt-2">Login to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/signup" className="text-primary hover:underline font-medium">Sign Up</Link>
          </p>
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowLeft className="h-3 w-3" />
            Back to Store
          </Link>
        </div>
      </div>
    </div>
  )
}
