import { Participant, supabase } from '@/types/types'
import { FormEvent, useEffect, useState } from 'react'
import {
  DEFAULT_AVATAR_ID,
  PLAYER_AVATARS,
} from '@/constants/avatars'
import { AvatarOptionButton, FlagAvatar } from '@/components/FlagAvatar'

export default function Lobby({
  gameId,
  onRegisterCompleted,
}: {
  gameId: string
  onRegisterCompleted: (participant: Participant) => void
}) {
  const [participant, setParticipant] = useState<Participant | null>(null)
  const [checking, setChecking] = useState(true)
  const [pin, setPin] = useState<string>('')
  const [playerCount, setPlayerCount] = useState(0)

  useEffect(() => {
    const fetchParticipant = async () => {
      setChecking(true)
      let userId: string | null = null

      const { data: sessionData } = await supabase.auth.getSession()

      if (sessionData.session) {
        userId = sessionData.session?.user.id ?? null
      } else {
        const { data, error } = await supabase.auth.signInAnonymously()
        if (error) console.error(error)
        userId = data?.user?.id ?? null
      }

      if (!userId) {
        setChecking(false)
        return
      }

      const [{ data: participantData, error }, { data: game }, { count }] =
        await Promise.all([
          supabase
            .from('participants')
            .select()
            .eq('game_id', gameId)
            .eq('user_id', userId)
            .maybeSingle(),
          supabase.from('games').select('pin').eq('id', gameId).single(),
          supabase
            .from('participants')
            .select('*', { count: 'exact', head: true })
            .eq('game_id', gameId),
        ])

      if (game?.pin) setPin(game.pin)
      if (count !== null) setPlayerCount(count)

      if (error) {
        alert(error.message)
      } else if (participantData) {
        setParticipant(participantData)
        onRegisterCompleted(participantData)
      }
      setChecking(false)
    }

    fetchParticipant()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  if (checking) {
    return (
      <div className="bg-soft-cream flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-sm">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-secondary-container rounded-full animate-spin" />
          <p className="text-on-surface-variant text-label-md">
            Đang kiểm tra thông tin...
          </p>
        </div>
      </div>
    )
  }

  if (!participant) {
    return (
      <Register
        gameId={gameId}
        pin={pin}
        onRegisterCompleted={(p) => {
          onRegisterCompleted(p)
          setParticipant(p)
        }}
      />
    )
  }

  const formattedPin = pin
    ? `${pin.slice(0, 3)} ${pin.slice(3)}`
    : '--- ---'

  return (
    <div className="bg-soft-cream min-h-screen flex flex-col font-sans overflow-hidden text-on-surface">
      <header className="flex justify-between items-center px-sm py-xs w-full z-10">
        <div className="flex items-center gap-xs">
          <span
            className="material-symbols-outlined text-success-green"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            wifi
          </span>
          <span className="text-label-md text-success-green">Kết nối: Tốt</span>
        </div>
        <div className="bg-primary-container/20 px-sm py-1 rounded-full flex items-center gap-xs">
          <span
            className="material-symbols-outlined text-primary text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            group
          </span>
          <span className="text-label-md text-primary font-bold">
            {playerCount}/60
          </span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-md text-center relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[80vw] h-[80vw] max-w-md max-h-md bg-white rounded-full animate-pulse-ring blur-3xl" />
        </div>

        <div className="relative z-10 mb-lg">
          <div className="mx-auto mb-sm flex justify-center">
            <FlagAvatar
              avatarId={participant.avatar}
              size="xl"
              className="border-2 border-primary-container shadow-lg"
            />
          </div>
          <h1 className="text-headline-sm text-primary mb-xs">
            {participant.nickname}
          </h1>
          <div className="bg-primary/5 px-sm py-1 rounded-full inline-block">
            <p className="text-label-md text-on-surface-variant">
              Sẵn sàng thi đấu!
            </p>
          </div>
        </div>

        <div className="relative z-10 mb-lg w-full max-w-xs">
          <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-xs">
            Mã phòng
          </p>
          <div className="bg-surface-white rounded-xl shadow-sm border border-outline-variant p-md flex flex-col items-center justify-center gap-xs">
            <span className="text-display-lg-mobile text-primary tracking-[0.2em] font-bold">
              {formattedPin}
            </span>
            <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary-container w-3/4 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-md">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-secondary-container rounded-full animate-spin" />
            <span className="material-symbols-outlined text-secondary-container text-[32px] animate-bounce-slow">
              sports_esports
            </span>
          </div>
          <div className="space-y-xs">
            <p className="text-headline-sm text-on-surface animate-pulse">
              Đang chờ người tổ chức bắt đầu
            </p>
            <p className="text-body-md text-on-surface-variant px-md">
              Hãy chuẩn bị kiến thức để giành ngôi quán quân nhé!
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full px-md pb-lg pt-sm z-10">
        <div className="bg-surface-white/60 backdrop-blur-md rounded-xl p-sm flex items-center justify-between border border-white/40 shadow-sm">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-on-secondary">
              <span className="material-symbols-outlined">quiz</span>
            </div>
            <div className="text-left">
              <p className="text-label-md font-bold text-on-surface">
                Company Quiz Game
              </p>
              <p className="text-label-md text-on-surface-variant opacity-70">
                Đang chờ trong phòng
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Register({
  onRegisterCompleted,
  gameId,
  pin,
}: {
  onRegisterCompleted: (player: Participant) => void
  gameId: string
  pin: string
}) {
  const [nickname, setNickname] = useState('')
  const [avatarId, setAvatarId] = useState(DEFAULT_AVATAR_ID)
  const [sending, setSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setErrorMsg(null)

    const cleanNickname = nickname.trim()
    if (!cleanNickname) {
      setErrorMsg('Vui lòng nhập Nickname')
      setSending(false)
      return
    }

    if (!PLAYER_AVATARS.some((a) => a.id === avatarId)) {
      setErrorMsg('Vui lòng chọn avatar')
      setSending(false)
      return
    }

    const { count, error: countError } = await supabase
      .from('participants')
      .select('*', { count: 'exact', head: true })
      .eq('game_id', gameId)

    if (countError) {
      setErrorMsg('Lỗi kiểm tra số lượng người chơi')
      setSending(false)
      return
    }

    if (count !== null && count >= 60) {
      setErrorMsg('Rất tiếc! Phòng đã đầy (tối đa 60 người).')
      setSending(false)
      return
    }

    const { data: existingPlayer } = await supabase
      .from('participants')
      .select('id')
      .eq('game_id', gameId)
      .ilike('nickname', cleanNickname)
      .maybeSingle()

    if (existingPlayer) {
      setErrorMsg('Nickname này đã được sử dụng. Vui lòng chọn tên khác.')
      setSending(false)
      return
    }

    const { data: newParticipant, error } = await supabase
      .from('participants')
      .insert({
        nickname: cleanNickname,
        game_id: gameId,
        avatar: avatarId,
      })
      .select()
      .single()

    if (error) {
      setErrorMsg('Lỗi đăng ký: ' + error.message)
      setSending(false)
      return
    }

    onRegisterCompleted(newParticipant)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-sm bg-soft-cream relative overflow-hidden">
      <div className="background-blob bg-primary w-64 h-64 -top-20 -left-20" />
      <div className="background-blob bg-secondary w-72 h-72 -bottom-20 -right-20" />

      <main className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="bg-surface-white rounded-xl shadow-card p-md border border-outline-variant/30">
          <div className="text-center mb-md">
            <div className="mx-auto mb-sm flex justify-center">
              <FlagAvatar avatarId={avatarId} size="xl" className="shadow-md" />
            </div>
            <h1 className="text-headline-sm text-on-surface mb-xs">
              Nhập nickname
            </h1>
            <p className="text-body-md text-on-surface-variant">
              {pin
                ? `Phòng ${pin.slice(0, 3)} ${pin.slice(3)}`
                : 'Chọn tên hiển thị của bạn'}
            </p>
          </div>

          <form onSubmit={onFormSubmit} className="space-y-sm">
            <div>
              <label className="block text-label-md text-on-surface-variant mb-xs">
                Tên hiển thị
              </label>
              <input
                className="w-full h-14 text-center text-label-lg p-3 border-2 border-[#CBD5CB] rounded-xl focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none transition-all text-on-surface bg-app-bg"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nhập Nickname"
                maxLength={30}
                autoComplete="off"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-label-md text-on-surface-variant mb-xs">
                Chọn avatar (Top 10 FIFA + Việt Nam)
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 justify-items-center bg-app-bg rounded-xl p-sm border border-[#CBD5CB]">
                {PLAYER_AVATARS.map((avatar) => (
                  <AvatarOptionButton
                    key={avatar.id}
                    avatar={avatar}
                    selected={avatarId === avatar.id}
                    onSelect={setAvatarId}
                  />
                ))}
              </div>
              <p className="mt-xs text-center text-label-md text-on-surface-variant">
                {
                  PLAYER_AVATARS.find((a) => a.id === avatarId)?.name
                }
              </p>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-xs text-error-red">
                <span className="material-symbols-outlined text-[18px]">
                  error
                </span>
                <span className="text-label-md">{errorMsg}</span>
              </div>
            )}

            <button
              disabled={sending || !nickname.trim()}
              className="w-full h-[56px] bg-secondary-container hover:bg-secondary text-surface-white text-label-lg rounded-xl shadow-md transition-all btn-press disabled:opacity-50"
            >
              {sending ? 'Đang xử lý...' : 'Vào phòng'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
