"use client"

import { useState } from "react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CATEGORIES } from "@/lib/data"

interface Comment {
  id: number
  name: string
  text: string
  timestamp: string
}

export function Footer() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, name: "Ahmad", text: "Great store with amazing products!", timestamp: "2026-02-15" },
    { id: 2, name: "Sara", text: "Fast delivery and excellent quality.", timestamp: "2026-02-16" },
  ])
  const [newName, setNewName] = useState("")
  const [newComment, setNewComment] = useState("")

  const submitComment = () => {
    if (!newName.trim() || !newComment.trim()) return
    setComments((prev) => [
      {
        id: Date.now(),
        name: newName.trim(),
        text: newComment.trim(),
        timestamp: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ])
    setNewName("")
    setNewComment("")
  }

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Footer top - Logo & Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-extrabold text-primary mb-3">AfaqMall</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your modern one-stop shopping destination. Quality products, great prices, fast delivery.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Categories</h4>
            <nav className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Login</Link>
              <Link href="/signup" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sign Up</Link>
              <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin</Link>
            </nav>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Public Comment Section */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-foreground">Customer Comments</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Comment form */}
            <div className="space-y-3">
              <Input
                placeholder="Your name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <Button onClick={submitComment} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Submit Comment
              </Button>
            </div>
            {/* Comments list */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {comments.map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-card border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 AfaqMall. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
