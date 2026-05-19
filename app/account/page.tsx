"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Heart, ShoppingBag, Settings } from "lucide-react"
import { useFavorites } from "@/lib/favorites-store"
import { useProducts } from "@/lib/products-store"
import { useAuth } from "@/lib/auth-store"
import Link from "next/link"

export default function AccountPage() {
  const { currentUser, logout } = useAuth()
  const { favorites, getFavoritesCount } = useFavorites()
  const { state: { products } } = useProducts()

  const favoriteProducts = products.filter((product) => favorites.includes(product.id))

  // إذا مو مسجل يظهر له شاشة تسجيل الدخول
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">حسابي</CardTitle>
              <p className="text-muted-foreground">سجل دخولك أو أنشئ حساب جديد</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/login">
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent">
                  إنشاء حساب جديد
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">مرحباً، {currentUser.name}</h1>
            <p className="text-muted-foreground">{currentUser.email}</p>
          </div>
          <Button variant="outline" className="text-red-500 border-red-300 hover:bg-red-50" onClick={() => logout()}>
            تسجيل الخروج
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="orders">طلباتي</TabsTrigger>
            <TabsTrigger value="favorites">المفضلة ({getFavoritesCount()})</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  المعلومات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>الاسم</Label>
                  <Input defaultValue={currentUser.name} />
                </div>
                <div>
                  <Label>البريد الإلكتروني</Label>
                  <Input defaultValue={currentUser.email} disabled />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" placeholder="+966 xxx xxx xxx" />
                </div>
                <div>
                  <Label htmlFor="address">العنوان</Label>
                  <Input id="address" placeholder="أدخل عنوانك" />
                </div>
                <Button className="bg-primary text-white hover:bg-primary/90">حفظ التغييرات</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  طلباتي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">لا توجد طلبات حتى الآن</p>
                  <Link href="/products">
                    <Button className="mt-4 bg-primary text-white hover:bg-primary/90">تسوق الآن</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  المنتجات المفضلة ({getFavoritesCount()})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteProducts.map((product) => (
                      <Card key={product.id} className="hover:shadow-lg transition-all">
                        <CardContent className="p-4">
                          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                          <p className="text-primary font-bold">{product.price} ر.س</p>
                          <Link href={`/product/${product.id}`}>
                            <Button size="sm" className="w-full mt-2 bg-primary hover:bg-primary/90">عرض المنتج</Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">لا توجد منتجات مفضلة حتى الآن</p>
                    <Link href="/products">
                      <Button className="mt-4 bg-primary text-white hover:bg-primary/90">استكشف المنتجات</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  إعدادات الحساب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="bg-primary text-white hover:bg-primary/90">تحديث كلمة المرور</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
