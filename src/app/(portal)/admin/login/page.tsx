'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email hoặc mật khẩu không chính xác.')
      setLoading(false)
    } else {
      window.location.href = '/admin'
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-app-bg p-sm relative overflow-hidden">
      <div className="background-blob bg-primary w-64 h-64 -top-20 -left-20" />
      <div className="background-blob bg-secondary w-72 h-72 -bottom-20 -right-20" />

      <div className="w-full max-w-md bg-surface-white p-md rounded-xl shadow-card border border-outline-variant/30 relative z-10 animate-fade-in">
        <div className="text-center mb-md">
          <div className="w-16 h-16 bg-primary-container rounded-xl flex items-center justify-center mx-auto mb-sm shadow-md">
            <span className="material-symbols-outlined text-on-primary-container text-3xl">
              admin_panel_settings
            </span>
          </div>
          <h1 className="text-headline-sm text-on-surface">
            Đăng nhập Quản trị
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Company Quiz Game Admin
          </p>
        </div>

        {error && (
          <div className="mb-sm p-sm bg-error-container text-error-red rounded-xl text-label-md flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-sm">
          <div>
            <label className="block text-label-md text-on-surface-variant mb-xs">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 px-sm border-2 border-[#CBD5CB] rounded-xl focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none text-on-surface bg-app-bg transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-label-md text-on-surface-variant mb-xs">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 px-sm border-2 border-[#CBD5CB] rounded-xl focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none text-on-surface bg-app-bg transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary-container hover:bg-primary text-white text-label-lg rounded-xl disabled:opacity-50 transition-colors btn-press"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-md text-center">
          <Link
            href="/"
            className="text-label-md text-primary-container hover:underline"
          >
            ← Về trang tham gia
          </Link>
        </div>
      </div>
    </main>
  )
}
