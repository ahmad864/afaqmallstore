"use client"

import { create } from "zustand"
import type { CategorySlug } from "@/lib/data"
import { supabase } from "./supabase"

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
  loginUser: (email: string, password: string) => Promise<boolean>
  registerUser: (name: string, email: string, password: string) => Promise<boolean>
  loginAdmin: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  logoutAdmin: () => void
  initUser: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  currentUser: null,
  currentAdmin: null,
  users: [],
  admins: [],

  // استرجاع الجلسة عند تحميل الصفحة
  initUser: async () => {
    const { data } = await supabase.auth.getSession()
    const session = data.session
    if (session?.user) {
      const name = session.user.user_metadata?.name ?? ""
      set({
        currentUser: {
          id: session.user.id,
          name,
          email: session.user.email ?? "",
          password: "",
        },
      })
    }
  },

  registerUser: async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error || !data.user) return false
    set({
      currentUser: {
        id: data.user.id,
        name,
        email,
        password: "",
      },
    })
    return true
  },

  loginUser: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) return false
    const name = data.user.user_metadata?.name ?? ""
    set({
      currentUser: {
        id: data.user.id,
        name,
        email,
        password: "",
      },
    })
    return true
  },

  loginAdmin: async (email, password) => {
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

  logout: async () => {
    await supabase.auth.signOut()
    set({ currentUser: null })
  },

  logoutAdmin: () => set({ currentAdmin: null }),
}))
