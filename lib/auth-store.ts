"use client"

import { create } from "zustand"
import type { CategorySlug } from "@/lib/data"

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

// Mock admin accounts - one per category
const adminAccounts: Admin[] = [
  { id: "a1", name: "Clothing Admin", email: "clothing@afaqmall.com", password: "admin123", role: "clothing" },
  { id: "a2", name: "Shoes Admin", email: "shoes@afaqmall.com", password: "admin123", role: "shoes" },
  { id: "a3", name: "Electronics Admin", email: "electronics@afaqmall.com", password: "admin123", role: "electronics" },
  { id: "a4", name: "Makeup Admin", email: "makeup@afaqmall.com", password: "admin123", role: "makeup" },
  { id: "a5", name: "Furniture Admin", email: "furniture@afaqmall.com", password: "admin123", role: "furniture" },
  { id: "a6", name: "Food Admin", email: "food@afaqmall.com", password: "admin123", role: "food" },
]

interface AuthState {
  currentUser: User | null
  currentAdmin: Admin | null
  users: User[]
  admins: Admin[]
  loginUser: (email: string, password: string) => boolean
  registerUser: (name: string, email: string, password: string) => boolean
  loginAdmin: (email: string, password: string) => boolean
  logout: () => void
  logoutAdmin: () => void
}

export const useAuth = create<AuthState>((set, get) => ({
  currentUser: null,
  currentAdmin: null,
  users: [],
  admins: adminAccounts,

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

  loginAdmin: (email, password) => {
    const admin = get().admins.find((a) => a.email === email && a.password === password)
    if (admin) {
      set({ currentAdmin: admin })
      return true
    }
    return false
  },

  logout: () => set({ currentUser: null }),
  logoutAdmin: () => set({ currentAdmin: null }),
}))
