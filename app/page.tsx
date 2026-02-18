import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CategoryPreview } from "@/components/category-preview"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CategoryPreview />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
