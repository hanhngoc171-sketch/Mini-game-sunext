import { GameResult, Participant, QuizSet, supabase } from '@/types/types'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { useRouter } from 'next/navigation'

export default function Results({
  quizSet,
  gameId,
}: {
  participants: Participant[]
  quizSet: QuizSet
  gameId: string
}) {
  const [gameResults, setGameResults] = useState<GameResult[]>([])
  const { width, height } = useWindowSize()
  const router = useRouter()

  useEffect(() => {
    const getResults = async () => {
      const { data, error } = await supabase
        .from('game_results')
        .select()
        .eq('game_id', gameId)
        .order('total_score', { ascending: false })
        .limit(5)

      if (error) {
        return alert(error.message)
      }
      setGameResults(data)
    }
    getResults()
  }, [gameId])

  const firstPlace = gameResults[0]
  const secondPlace = gameResults[1]
  const thirdPlace = gameResults[2]
  const runnerUps = gameResults.slice(3)

  const Avatar = ({
    name,
    size = 'md',
    highlight = false,
  }: {
    name: string
    size?: 'md' | 'lg' | 'xl'
    highlight?: boolean
  }) => {
    const sizeClass =
      size === 'xl'
        ? 'w-40 h-40 text-5xl border-4 border-soft-cream'
        : size === 'lg'
          ? 'w-24 h-24 text-3xl border-4 border-outline-variant'
          : 'w-12 h-12 text-lg border border-white/20'
    return (
      <div
        className={`${sizeClass} rounded-full overflow-hidden bg-primary-container flex items-center justify-center text-white font-bold ${
          highlight ? 'shadow-[0_0_40px_rgba(255,244,164,0.4)]' : ''
        }`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-container flex flex-col items-center overflow-hidden relative">
      {firstPlace && (
        <Confetti
          width={width}
          height={height}
          recycle
          numberOfPieces={80}
          colors={['#FFF4A4', '#F97A00', '#afe2b3', '#ffffff', '#FED16A']}
        />
      )}

      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-soft-cream/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary-container/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="w-full z-10 flex justify-between items-center px-md py-sm max-w-container-max mx-auto">
        <div className="text-headline-sm font-bold text-primary-fixed-dim">
          Company Quiz Game
        </div>
      </header>

      <main className="relative z-20 flex flex-col items-center justify-center flex-grow p-md w-full animate-fade-in">
        <div className="text-center mb-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-sm rounded-full bg-white/10 border border-white/20">
            <span
              className="material-symbols-outlined text-[48px] text-soft-cream"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>
          </div>
          <h1 className="text-headline-md text-white mb-xs tracking-tight uppercase">
            Kết quả chung cuộc
          </h1>
          <p className="text-body-lg text-primary-fixed-dim opacity-80">
            Chúc mừng những cá nhân xuất sắc nhất!
          </p>
          <p className="text-label-md text-white/50 mt-1">{quizSet.name}</p>
        </div>

        <div className="flex items-end justify-center gap-md mb-xl w-full max-w-5xl">
          {secondPlace && (
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-sm">
                <Avatar name={secondPlace.nickname || '?'} size="lg" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-outline-variant text-on-surface font-bold px-4 py-1 rounded-full text-label-md">
                  2
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-t-xl w-full h-40 flex flex-col items-center justify-start pt-sm border-x border-t border-white/10">
                <p className="text-label-lg text-white font-bold px-2 text-center">
                  {secondPlace.nickname}
                </p>
                <p className="text-label-md text-primary-fixed-dim">
                  {(secondPlace.total_score ?? 0).toLocaleString('vi-VN')} pts
                </p>
              </div>
            </div>
          )}

          {firstPlace && (
            <div className="flex flex-col items-center flex-[1.4]">
              <div className="relative mb-sm">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce">
                  <span
                    className="material-symbols-outlined text-soft-cream text-[56px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                </div>
                <Avatar name={firstPlace.nickname || '?'} size="xl" highlight />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-soft-cream text-on-tertiary-fixed font-bold px-8 py-2 rounded-full text-headline-sm shadow-xl z-40">
                  1
                </div>
              </div>
              <div className="bg-soft-cream/90 backdrop-blur-md rounded-t-2xl w-full h-64 flex flex-col items-center justify-start pt-md border-x border-t border-white/30 shadow-2xl">
                <p className="text-headline-md text-on-tertiary-fixed font-bold px-2 text-center mt-4">
                  {firstPlace.nickname}
                </p>
                <p className="text-headline-sm text-secondary font-extrabold">
                  {(firstPlace.total_score ?? 0).toLocaleString('vi-VN')} pts
                </p>
              </div>
            </div>
          )}

          {thirdPlace && (
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-sm">
                <Avatar name={thirdPlace.nickname || '?'} size="lg" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary-fixed-dim text-on-secondary-fixed font-bold px-4 py-1 rounded-full text-label-md">
                  3
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-t-xl w-full h-32 flex flex-col items-center justify-start pt-sm border-x border-t border-white/10">
                <p className="text-label-lg text-white font-bold px-2 text-center">
                  {thirdPlace.nickname}
                </p>
                <p className="text-label-md text-primary-fixed-dim">
                  {(thirdPlace.total_score ?? 0).toLocaleString('vi-VN')} pts
                </p>
              </div>
            </div>
          )}
        </div>

        {runnerUps.length > 0 && (
          <div className="flex flex-col md:flex-row gap-md w-full max-w-2xl">
            {runnerUps.map((gameResult, index) => (
              <div
                key={gameResult.participant_id}
                className="flex-1 flex items-center gap-sm bg-white/5 border border-white/10 p-sm rounded-xl"
              >
                <div className="w-10 h-10 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center font-bold text-white">
                  {index + 4}
                </div>
                <Avatar name={gameResult.nickname || '?'} size="md" />
                <div className="flex-1">
                  <p className="text-white font-bold">{gameResult.nickname}</p>
                  <p className="text-primary-fixed-dim text-sm">
                    {(gameResult.total_score ?? 0).toLocaleString('vi-VN')} pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {gameResults.length === 0 && (
          <div className="text-primary-fixed-dim mt-20 text-xl">
            Chưa có kết quả.
          </div>
        )}

        <div className="mt-xl">
          <button
            className="h-[64px] px-xl bg-secondary-container text-white font-bold text-headline-sm rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-sm"
            onClick={() => router.push('/admin')}
          >
            Về trang quản trị
            <span className="material-symbols-outlined">home</span>
          </button>
        </div>
      </main>
    </div>
  )
}
