'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-app-bg flex">
      <aside className="hidden md:flex w-64 bg-primary-container text-white flex-col shrink-0">
        <div className="p-md border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary-fixed-dim text-3xl">
              quiz
            </span>
            <div>
              <p className="font-bold text-label-lg leading-tight">
                Company Quiz
              </p>
              <p className="text-label-md text-on-primary-container opacity-80">
                Admin Portal
              </p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-sm space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-sm px-sm py-3 rounded-xl bg-soft-cream text-on-surface font-semibold text-label-md"
          >
            <span className="material-symbols-outlined">library_books</span>
            Bộ câu hỏi
          </Link>
          <Link
            href="/"
            className="flex items-center gap-sm px-sm py-3 rounded-xl text-white/80 hover:bg-white/10 transition-colors text-label-md"
          >
            <span className="material-symbols-outlined">home</span>
            Trang chủ Player
          </Link>
        </nav>
        <div className="p-sm border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-sm px-sm py-3 rounded-xl text-white/80 hover:bg-white/10 transition-colors text-label-md"
          >
            <span className="material-symbols-outlined">logout</span>
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-surface-white border-b border-border-subtle h-16 flex items-center justify-between px-md md:px-lg">
          <div className="md:hidden flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary-container">
              quiz
            </span>
            <span className="font-bold text-primary">Admin</span>
          </div>
          <h2 className="hidden md:block text-headline-sm text-on-surface">
            Quản lý nội dung
          </h2>
          <button
            onClick={handleLogout}
            className="md:hidden text-label-md text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-container"
          >
            Đăng xuất
          </button>
          <Link
            href="/admin/quizzes/new"
            className="hidden sm:inline-flex h-11 px-md bg-primary-container hover:bg-primary text-white text-label-md rounded-xl items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tạo bộ câu hỏi
          </Link>
        </header>

        <main className="flex-1 w-full max-w-container-max mx-auto px-md md:px-lg py-md md:py-lg">
          {children}
        </main>
      </div>
    </div>
  )
}
