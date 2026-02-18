"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "CLEAR_CART" }

const initialState: CartState = { items: [], isOpen: false }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const qty = action.payload.quantity ?? 1
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + qty } : i,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: qty }],
      }
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) }
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i,
        ),
      }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }
    case "CLEAR_CART":
      return { ...state, items: [] }
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
