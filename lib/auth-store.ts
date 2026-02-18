"use client"

import { create } from "zustand"
import type { CategorySlug } from "@/lib/data"
import { supabase } from "./supabase"  // إضافة استيراد Supabase

export interface User {
  id: string
  name: string
  email: string
  password: string
}

export interface Admin {
  id: string
  name: string
  email: string
  password: string
  role: CategorySlug
}

interface AuthState {
  currentUser: User | null
  currentAdmin: Admin | null
  users: User[]
  admins: Admin[]
  loginUser: (email: string, password: string) => boolean
  registerUser: (name: string, email: string, password: string) => boolean
  loginAdmin: (email: string, password: string) => Promise<boolean>  // تعديل لتصبح async
  logout: () => void
  logoutAdmin: () => void
}

export const useAuth = create<AuthState>((set, get) => ({
  currentUser: null,
  currentAdmin: null,
  users: [],
  admins: [],  // حذف الـ mock admins

  loginUser: (email, password) => {
    const user = get().users.find((u) => u.email === email && u.password === password)
    if (user) {
      set({ currentUser: user })
      return true
    }
    return false
  },

  registerUser: (name, email, password) => {
    const exists = get().users.find((u) => u.email === email)
    if (exists) return false
    const newUser: User = { id: Date.now().toString(), name, email, password }
    set((state) => ({ users: [...state.users, newUser], currentUser: newUser }))
    return true
  },

  loginAdmin: async (email, password) => {  // تعديل loginAdmin للعمل مع Supabase
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single()

    if (data) {
      set({ currentAdmin: data })
      return true
    }

    return false
  },

  logout: () => set({ currentUser: null }),
  logoutAdmin: () => set({ currentAdmin: null }),
}))
