"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingBag, Menu, User, LayoutDashboard } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { CATEGORIES } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { state, dispatch } = useCart()
  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#1C71E6]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-primary-foreground">
              AfaqMall
            </span>
          </Link>

          {/* Desktop: Categories in navbar */}
          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/admin/login">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <LayoutDashboard className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary-foreground text-primary">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            {/* Mobile: Hamburger menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="text-primary font-extrabold text-xl">AfaqMall</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-6">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium rounded-lg hover:bg-muted transition-colors"
                  >
                    Home
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-base font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium rounded-lg hover:bg-muted transition-colors"
                  >
                    Login / Sign Up
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
