"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1C71E6] to-[#1558b8] text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-balance mb-6">
            Welcome to <span className="block">AfaqMall</span>
          </h1>
          <p className="text-lg lg:text-xl text-primary-foreground/85 mb-8 text-pretty leading-relaxed">
            Your modern one-stop shopping destination. Discover thousands of products across Clothing, Shoes, Electronics, Makeup, Furniture, and Food.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#categories">
              <Button size="lg" variant="secondary" className="text-primary font-semibold px-8">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
