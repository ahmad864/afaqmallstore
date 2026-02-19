// components/RecommendedProducts.tsx
"use client"

interface Props {
  purchasedCategory: string
  allProducts: Array<{ id: number; name: string; category: string; image: string; price: number }>
}

export default function RecommendedProducts({ purchasedCategory, allProducts }: Props) {
  // جلب المنتجات من نفس القسم وعرض 6 منتجات فقط
  const relatedProducts = allProducts
    .filter(p => p.category === purchasedCategory)
    .slice(0, 6)

  if (relatedProducts.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">You may also like</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {relatedProducts.map(p => (
          <div key={p.id} className="border rounded p-2 flex flex-col items-center">
            <img src={p.image} alt={p.name} className="w-full h-24 object-cover mb-2"/>
            <p className="text-sm font-medium">{p.name}</p>
            <p className="text-primary font-bold">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
