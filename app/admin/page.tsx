"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Package, Plus, Edit, Trash2, TrendingUp, AlertTriangle, ArrowLeft, LogOut, ShoppingCart,
} from "lucide-react"
import { useProducts } from "@/lib/products-store"
import { useAuth } from "@/lib/auth-store"
import { categoryNames, type CategorySlug, type Product } from "@/lib/data"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminDashboard() {
  const { state: { products }, dispatch } = useProducts()
  const { currentAdmin, logoutAdmin } = useAuth()
  const router = useRouter()

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, stock: 0, image: "" })

  // Redirect if not logged in
  if (!currentAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Admin Access Required</h1>
          <p className="text-muted-foreground">Please log in to access the admin dashboard.</p>
          <Link href="/admin/login">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Go to Admin Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  const adminCategory = currentAdmin.role as CategorySlug
  const adminCategoryName = categoryNames[adminCategory]
  const categoryProducts = products.filter((p) => p.category === adminCategory)

  const totalProducts = categoryProducts.length
  const lowStockProducts = categoryProducts.filter((p) => p.stock <= 5).length
  const outOfStock = categoryProducts.filter((p) => p.stock === 0).length
  const totalValue = categoryProducts.reduce((s, p) => s + p.price * p.stock, 0)
  const totalSoldAll = categoryProducts.reduce((s, p) => s + p.totalSold, 0)

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return
    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: newProduct.price,
      image: newProduct.image || `https://picsum.photos/seed/new${Date.now()}/400/400`,
      category: adminCategory,
      stock: newProduct.stock,
      totalPurchased: newProduct.stock,
      totalSold: 0,
    }
    dispatch({ type: "ADD_PRODUCT", payload: product })
    setNewProduct({ name: "", price: 0, stock: 0, image: "" })
    setIsAddOpen(false)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return
    dispatch({ type: "UPDATE_PRODUCT", payload: editingProduct })
    setEditingProduct(null)
    setIsEditOpen(false)
  }

  const handleDeleteProduct = (id: number) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id })
  }

  const handleUpdateStock = (id: number, stock: number) => {
    dispatch({ type: "UPDATE_STOCK", payload: { id, stock: Math.max(0, stock) } })
  }

  const handleLogout = () => {
    logoutAdmin()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-foreground text-sm">AfaqMall Admin</h1>
              <p className="text-xs text-muted-foreground">{adminCategoryName} Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary">{adminCategoryName}</Badge>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="inventory">Inventory & Sales</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent><div className="text-2xl font-bold">{totalProducts}</div></CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium">Low Stock</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent><div className="text-2xl font-bold text-yellow-500">{lowStockProducts}</div></CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium">Out of Stock</CardTitle>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent><div className="text-2xl font-bold text-destructive">{outOfStock}</div></CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium">Inventory Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent><div className="text-2xl font-bold text-green-500">${totalValue.toLocaleString()}</div></CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium">Total Sold</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent><div className="text-2xl font-bold text-primary">{totalSoldAll}</div></CardContent>
              </Card>
            </div>

            {/* Products needing attention */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Products Needing Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryProducts.filter((p) => p.stock <= 5).length === 0 ? (
                    <p className="text-sm text-muted-foreground">All products have sufficient stock.</p>
                  ) : (
                    categoryProducts.filter((p) => p.stock <= 5).map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" crossOrigin="anonymous" />
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground">${p.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={p.stock === 0 ? "destructive" : "secondary"}>
                            {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                          </Badge>
                          <Input
                            type="number"
                            value={p.stock}
                            onChange={(e) => handleUpdateStock(p.id, parseInt(e.target.value) || 0)}
                            className="w-20 h-8 text-sm"
                            min="0"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Products</h2>
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Product Name</Label>
                      <Input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Stock</Label>
                        <Input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL (optional)</Label>
                      <Input value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddProduct} className="bg-primary text-primary-foreground hover:bg-primary/90">Add</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="aspect-video mb-3 overflow-hidden rounded-lg bg-muted">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-primary">${product.price}</span>
                      <Badge variant={product.stock <= 5 ? "destructive" : "secondary"}>{product.stock} in stock</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => { setEditingProduct({ ...product }); setIsEditOpen(true) }}
                      >
                        <Edit className="mr-1 h-3 w-3" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="mr-1 h-3 w-3" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
                {editingProduct && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Product Name</Label>
                      <Input value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Stock</Label>
                        <Input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input value={editingProduct.image} onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })} />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                      <Button onClick={handleUpdateProduct} className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Inventory & Sales Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <h2 className="text-xl font-bold">Inventory & Sales Tracking</h2>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead className="text-right">Total Purchased</TableHead>
                        <TableHead className="text-right">Total Sold</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryProducts.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover" crossOrigin="anonymous" />
                              <span className="text-sm font-medium truncate max-w-[200px]">{p.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${p.price}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={p.stock === 0 ? "destructive" : p.stock <= 5 ? "secondary" : "outline"}>
                              {p.stock}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{p.totalPurchased}</TableCell>
                          <TableCell className="text-right font-semibold text-primary">{p.totalSold}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
