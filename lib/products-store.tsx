"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import { allProducts as initialData, type Product } from "@/lib/data"

interface ProductsState {
  products: Product[]
}

type ProductsAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "UPDATE_STOCK"; payload: { id: number; stock: number } }
  | { type: "PROCESS_ORDER"; payload: { id: number; quantity: number } }

function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] }
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) => (p.id === action.payload.id ? action.payload : p)),
      }
    case "DELETE_PRODUCT":
      return { ...state, products: state.products.filter((p) => p.id !== action.payload) }
    case "UPDATE_STOCK":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id
            ? {
                ...p,
                stock: action.payload.stock,
                totalPurchased: p.totalPurchased + Math.max(0, action.payload.stock - p.stock),
              }
            : p,
        ),
      }
    case "PROCESS_ORDER":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id
            ? {
                ...p,
                stock: Math.max(0, p.stock - action.payload.quantity),
                totalSold: p.totalSold + action.payload.quantity,
              }
            : p,
        ),
      }
    default:
      return state
  }
}

const ProductsContext = createContext<{
  state: ProductsState
  dispatch: React.Dispatch<ProductsAction>
} | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productsReducer, { products: initialData })
  return <ProductsContext.Provider value={{ state, dispatch }}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) throw new Error("useProducts must be used within a ProductsProvider")
  return context
}
