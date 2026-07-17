'use client'

import { useState } from 'react'
import { supabase } from '@/types/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomeHubPage() {
  const [pinInput, setPinInput] = useState('')
  const [error, setError] = useState('')
  const [joining, setJoining] = useState(false)
  const router = useRouter()

  const handleJoin = async () => {
    const pin = pinInput.trim()
    if (pin.length < 4) {
      setError('Mã phòng không hợp lệ')
      return
    }

    setJoining(true)
    setError('')

    const { data, error: fetchError } = await supabase
      .from('games')
      .select('id, pin, phase')
      .eq('pin', pin)
      .neq('phase', 'result')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (fetchError || !data) {
      setError('Mã phòng không hợp lệ hoặc phòng đã kết thúc')
      setJoining(false)
      return
    }

    router.push(`/game/${data.id}`)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-sm py-lg relative overflow-hidden"
      style={{ backgroundColor: '#FFF4A4' }}
    >
      {/* Soft atmosphere — palette only */}
      <div
        className="pointer-events-none absolute -top-24 -left-20 w-72 h-72 rounded-full blur-[80px] opacity-35"
        style={{ backgroundColor: '#386641' }}
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-16 w-80 h-80 rounded-full blur-[90px] opacity-30"
        style={{ backgroundColor: '#F97A00' }}
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 w-40 h-40 rounded-full blur-[60px] opacity-40"
        style={{ backgroundColor: '#FED16A' }}
      />

      <main className="relative z-10 w-full max-w-md flex flex-col items-center gap-md animate-fade-in">
        {/* Brand */}
        <header className="flex flex-col items-center text-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mb-sm"
            style={{ backgroundColor: '#386641' }}
          >
            <span
              className="material-symbols-outlined text-5xl"
              style={{
                color: '#AFE2B3',
                fontVariationSettings: "'FILL' 1",
              }}
            >
              quiz
            </span>
          </div>
          <h1
            className="text-headline-sm tracking-tight font-bold"
            style={{ color: '#204E2B' }}
          >
            Company Quiz Game
          </h1>
          <p className="mt-1 text-body-md" style={{ color: '#526052' }}>
            Quiz nội bộ · Tham gia hoặc quản trị
          </p>
        </header>

        {/* Phòng chơi — primary */}
        <section className="w-full bg-white rounded-3xl shadow-card border border-[#386641]/10 p-md flex flex-col gap-md">
          <div className="text-center">
            <p
              className="text-label-md font-bold tracking-[0.12em] uppercase mb-1"
              style={{ color: '#386641' }}
            >
              Phòng chơi
            </p>
            <h2
              className="text-headline-sm font-bold"
              style={{ color: '#273027' }}
            >
              Tham gia trò chơi
            </h2>
            <p className="mt-1 text-body-md" style={{ color: '#526052' }}>
              Nhập mã PIN trên màn hình Host
            </p>
          </div>

          <div>
            <input
              className={`pin-input w-full h-[72px] text-center text-headline-md rounded-xl border-2 focus:outline-none transition-all ${
                error
                  ? 'border-[#D92D20]'
                  : 'border-[#CBD5CB] focus:border-[#386641]'
              }`}
              style={{
                backgroundColor: '#F8FAF8',
                color: '#273027',
                boxShadow: error
                  ? undefined
                  : '0 0 0 0 rgba(56,102,65,0)',
              }}
              inputMode="numeric"
              placeholder="000000"
              type="text"
              maxLength={6}
              value={pinInput}
              autoFocus
              onChange={(e) => {
                setPinInput(e.target.value.replace(/[^0-9]/g, ''))
                setError('')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleJoin()
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 0 4px rgba(56,102,65,0.15)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            {error && (
              <div className="flex items-center gap-xs mt-xs text-[#D92D20]">
                <span className="material-symbols-outlined text-[18px]">
                  error
                </span>
                <span className="text-label-md">{error}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleJoin}
            disabled={joining}
            className="w-full h-[56px] rounded-xl text-label-lg font-semibold text-white shadow-md transition-all btn-press flex items-center justify-center gap-xs disabled:opacity-60"
            style={{ backgroundColor: '#F97A00' }}
          >
            {joining ? (
              <>
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
                Đang kết nối...
              </>
            ) : (
              <>
                Tham gia
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>

          <p
            className="text-center text-label-md flex items-center justify-center gap-1"
            style={{ color: '#727970' }}
          >
            <span className="material-symbols-outlined text-[16px]">
              devices
            </span>
            Không cần cài ứng dụng
          </p>
        </section>

        {/* Admin — secondary, same palette */}
        <section className="w-full">
          <Link
            href="/admin"
            className="group flex items-center gap-sm w-full p-sm rounded-2xl bg-white/80 border-2 border-[#386641]/20 hover:border-[#386641] hover:bg-white transition-all duration-200 shadow-sm"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#386641' }}
            >
              <span className="material-symbols-outlined text-white">
                admin_panel_settings
              </span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p
                className="text-label-lg font-bold"
                style={{ color: '#204E2B' }}
              >
                Admin
              </p>
              <p className="text-label-md" style={{ color: '#526052' }}>
                Quản lý câu hỏi · Tổ chức phòng chơi
              </p>
            </div>
            <span
              className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
              style={{ color: '#386641' }}
            >
              arrow_forward
            </span>
          </Link>
        </section>

        {/* Tiny trust row */}
        <div className="flex items-center justify-center gap-lg pt-xs">
          {[
            { icon: 'security', label: 'Bảo mật' },
            { icon: 'bolt', label: 'Nhanh' },
            { icon: 'groups', label: 'Đồng đội' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ color: '#386641' }}
                >
                  {item.icon}
                </span>
              </div>
              <span className="text-label-md" style={{ color: '#526052' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
