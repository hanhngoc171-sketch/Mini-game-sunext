'use client'

import { Participant } from '@/types/types'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useMemo, useState } from 'react'
import QRCode from 'react-qr-code'
import { useRouter } from 'next/navigation'

export default function Lobby({
  participants,
  gameId,
  pin,
  onGameStarted,
}: {
  participants: Participant[]
  gameId: string
  pin?: string
  onGameStarted?: () => void
}) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const maxPlayers = 60
  const currentCount = participants.length
  const [joinUrl, setJoinUrl] = useState('')
  const [starting, setStarting] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setJoinUrl(`${window.location.origin}/game/${gameId}`)
    }
  }, [gameId])

  const onClickStartGame = async () => {
    if (starting) return
    setStarting(true)

    const { data, error } = await supabase
      .from('games')
      .update({ phase: 'quiz' })
      .eq('id', gameId)
      .select('id, phase')
      .maybeSingle()

    if (error) {
      setStarting(false)
      return alert('Không thể bắt đầu trò chơi: ' + error.message)
    }

    if (!data) {
      setStarting(false)
      return alert(
        'Không có quyền bắt đầu phòng này. Hãy đăng nhập Admin rồi tạo phòng lại từ trang Admin.'
      )
    }

    onGameStarted?.()
  }

  const formattedPin = pin
    ? `${pin.slice(0, 3)} ${pin.slice(3)}`
    : '--- ---'

  return (
    <div className="bg-primary-container text-white min-h-screen font-sans overflow-hidden flex flex-col">
      <header className="flex justify-between items-center px-md md:px-xl py-md">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary-fixed-dim scale-125">
            quiz
          </span>
          <h1 className="text-headline-sm tracking-tight text-white">
            Company Quiz Game
          </h1>
        </div>
        <div className="flex items-center gap-sm bg-white/10 px-md py-xs rounded-full border border-white/20">
          <span className="material-symbols-outlined text-soft-cream">
            group
          </span>
          <span className="text-label-lg">
            {currentCount} / {maxPlayers} người đã tham gia
          </span>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-md md:px-lg flex-grow flex flex-col items-center justify-center gap-lg relative w-full pb-24">
        <div className="grid grid-cols-12 gap-md lg:gap-xl w-full items-center">
          <div className="col-span-12 lg:col-span-7 flex flex-col items-center text-center gap-md">
            <div className="bg-white/10 px-md py-sm rounded-xl inline-flex items-center gap-xs">
              <span className="material-symbols-outlined text-soft-cream">
                qr_code_2
              </span>
              <p className="text-label-lg text-white/90">
                Quét mã QR hoặc nhập mã phòng trên website
              </p>
            </div>
            <p className="text-label-md text-primary-fixed-dim max-w-md">
              Khi bắt đầu, người chơi tự trả lời trên điện thoại. Màn hình này
              sẽ hiện bảng xếp hạng trực tiếp.
            </p>

            <div className="space-y-xs">
              <h2 className="text-[72px] md:text-[100px] lg:text-[120px] leading-none text-white drop-shadow-xl tracking-[0.12em] font-bold">
                {formattedPin}
              </h2>
            </div>

            {joinUrl && (
              <div className="bg-surface-white p-md md:p-lg rounded-3xl shadow-2xl flex flex-col items-center gap-sm">
                <QRCode
                  value={joinUrl}
                  size={200}
                  bgColor="#FFFFFF"
                  fgColor="#386641"
                />
                <p className="text-on-surface text-label-lg font-medium">
                  Quét để vào phòng chờ
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-sm mt-sm w-full sm:w-auto justify-center">
              <button
                className="h-[64px] md:h-[72px] px-lg bg-secondary-container text-white text-headline-sm rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-sm disabled:opacity-50"
                onClick={onClickStartGame}
                disabled={currentCount === 0 || starting}
              >
                <span>{starting ? 'Đang bắt đầu...' : 'Bắt đầu trò chơi'}</span>
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
              <button
                className="h-[64px] md:h-[72px] px-lg border-2 border-white/30 text-white text-headline-sm rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-200"
                onClick={() => router.push('/admin')}
              >
                Hủy phòng
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 h-full">
            <div className="bg-white/5 rounded-[32px] p-md md:p-lg border border-white/10 h-[320px] lg:h-[480px] overflow-hidden relative">
              <h3 className="text-label-lg text-white/60 mb-md uppercase tracking-widest">
                {currentCount === 0
                  ? 'Đang chờ người chơi...'
                  : 'Người chơi đã vào phòng'}
              </h3>
              <div className="flex flex-wrap gap-sm content-start overflow-y-auto h-[240px] lg:h-[380px] pr-xs">
                {participants.map((participant) => (
                  <span
                    key={participant.id}
                    className="px-md py-xs bg-soft-cream text-primary text-label-lg rounded-full shadow-sm animate-fade-in"
                  >
                    {participant.nickname}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary-container to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
