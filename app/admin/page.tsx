"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogIn, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"

export default function AdminLoginPage() {
  const { user, loading, login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin/vacancies")
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      router.replace("/admin/vacancies")
    } catch {
      setError("Invalid email or password, or this account is not authorized for admin access.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-electric-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deep-navy to-deep-navy/90 p-4">
      <div className="w-full max-w-md bg-card rounded-[2rem] border border-border p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-full bg-white p-4 mb-6 shadow-lg">
            <Image
              src="/images/qk-logo.webp"
              alt="QK Cold Stores"
              width={160}
              height={80}
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Admin Login</h1>
          <p className="text-muted-foreground text-sm font-medium mt-2">
            Sign in to manage vacancies, applications, enquiries and team. A full site guide is
            available in the Guide tab after login.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold text-sm uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-border h-12"
              placeholder="admin@qkcoldstores.co.uk"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold text-sm uppercase tracking-wider">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-border h-12"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm font-medium p-3 rounded-xl bg-destructive/10">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-deep-navy text-white hover:bg-black font-bold py-6 rounded-xl shadow-xl"
          >
            <LogIn className="w-5 h-5 mr-2" />
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  )
}
