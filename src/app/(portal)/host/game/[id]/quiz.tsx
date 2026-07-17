'use client'

import { Participant, QuizSet } from '@/types/types'
import { createClient } from '@/utils/supabase/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type BoardRow = {
  participant_id: string
  nickname: string
  total_score: number
  answered: number
}

export default function LiveLeaderboard({
  participants,
  quizSet,
  gameId,
}: {
  participants: Participant[]
  quizSet: QuizSet
  gameId: string
}) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const questionCount = quizSet.questions?.length || 0
  const [board, setBoard] = useState<BoardRow[]>([])
  const [finishedCount, setFinishedCount] = useState(0)

  const refreshBoard = useCallback(async () => {
    const questionIds = (quizSet.questions || []).map((q) => q.id)
    if (questionIds.length === 0) return

    const { data: answers } = await supabase
      .from('answers')
      .select('participant_id, score, question_id')
      .in('question_id', questionIds)

    const byPlayer = new Map<
      string,
      { score: number; answered: number }
    >()

    for (const a of answers || []) {
      if (!a.participant_id) continue
      const cur = byPlayer.get(a.participant_id) || { score: 0, answered: 0 }
      cur.score += a.score || 0
      cur.answered += 1
      byPlayer.set(a.participant_id, cur)
    }

    const rows: BoardRow[] = participants.map((p) => {
      const stats = byPlayer.get(p.id) || { score: 0, answered: 0 }
      return {
        participant_id: p.id,
        nickname: p.nickname,
        total_score: stats.score,
        answered: stats.answered,
      }
    })

    rows.sort((a, b) => {
      if (b.total_score !== a.total_score) return b.total_score - a.total_score
      return b.answered - a.answered
    })

    setBoard(rows)
    setFinishedCount(
      rows.filter((r) => r.answered >= questionCount && questionCount > 0)
        .length
    )
  }, [participants, quizSet.questions, questionCount, supabase])

  useEffect(() => {
    refreshBoard()

    const channel = supabase
      .channel(`host_leaderboard_${gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'answers',
        },
        () => {
          refreshBoard()
        }
      )
      .subscribe()

    const interval = setInterval(refreshBoard, 2000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(interval)
    }
  }, [gameId, refreshBoard, supabase])

  const endGame = async () => {
    const { data, error } = await supabase
      .from('games')
      .update({ phase: 'result' })
      .eq('id', gameId)
      .select('id')
      .maybeSingle()

    if (error) {
      return alert(error.message)
    }
    if (!data) {
      return alert('Không thể kết thúc phòng. Kiểm tra quyền Admin.')
    }
  }

  return (
    <div className="min-h-screen bg-primary-container text-white flex flex-col">
      <header className="flex flex-wrap justify-between items-center gap-sm px-md md:px-xl py-md">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary-fixed-dim scale-125">
            leaderboard
          </span>
          <div>
            <h1 className="text-headline-sm tracking-tight">
              Bảng xếp hạng trực tiếp
            </h1>
            <p className="text-label-md text-primary-fixed-dim">
              {quizSet.name}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-sm">
          <div className="bg-white/10 px-md py-xs rounded-full border border-white/20 text-label-md">
            {finishedCount}/{participants.length} hoàn thành
          </div>
          <div className="bg-tertiary-fixed text-on-tertiary-fixed px-md py-xs rounded-full text-label-md font-bold">
            {questionCount} câu hỏi
          </div>
          <button
            onClick={endGame}
            className="h-12 px-md bg-secondary-container hover:brightness-110 text-white text-label-md font-bold rounded-xl transition-all flex items-center gap-1"
          >
            Kết thúc
            <span className="material-symbols-outlined">flag</span>
          </button>
        </div>
      </header>

      <main className="flex-grow max-w-4xl w-full mx-auto px-md pb-lg">
        {board.length === 0 ? (
          <div className="bg-white/5 rounded-3xl border border-white/10 p-lg text-center text-primary-fixed-dim">
            Đang chờ người chơi trả lời...
          </div>
        ) : (
          <div className="space-y-2">
            {board.map((row, index) => {
              const rank = index + 1
              const isTop = rank === 1
              const progress =
                questionCount > 0
                  ? Math.min(100, (row.answered / questionCount) * 100)
                  : 0
              const done = row.answered >= questionCount && questionCount > 0

              return (
                <div
                  key={row.participant_id}
                  className={`flex items-center gap-sm md:gap-md p-sm md:p-md rounded-xl transition-all duration-300 ${
                    isTop
                      ? 'bg-soft-cream text-on-surface shadow-lg scale-[1.01]'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-xl shrink-0 ${
                      isTop
                        ? 'bg-secondary-container text-white'
                        : rank <= 3
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                          : 'bg-white/10 text-white'
                    }`}
                  >
                    {rank}
                  </div>

                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${
                      isTop
                        ? 'bg-primary-container text-white'
                        : 'bg-soft-cream/20 text-soft-cream'
                    }`}
                  >
                    {row.nickname.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-label-lg md:text-headline-sm font-bold truncate ${
                          isTop ? 'text-primary' : 'text-white'
                        }`}
                      >
                        {row.nickname}
                      </p>
                      {done && (
                        <span
                          className={`text-label-md px-2 py-0.5 rounded-full shrink-0 ${
                            isTop
                              ? 'bg-success-green/20 text-success-green'
                              : 'bg-success-green/30 text-primary-fixed'
                          }`}
                        >
                          Xong
                        </span>
                      )}
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-black/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isTop ? 'bg-secondary-container' : 'bg-primary-fixed'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p
                      className={`text-label-md mt-1 ${
                        isTop ? 'text-on-surface-variant' : 'text-white/60'
                      }`}
                    >
                      {row.answered}/{questionCount} câu
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`text-headline-sm md:text-headline-md font-bold ${
                        isTop ? 'text-secondary-container' : 'text-soft-cream'
                      }`}
                    >
                      {row.total_score.toLocaleString('vi-VN')}
                    </p>
                    <p
                      className={`text-label-md uppercase tracking-wider ${
                        isTop ? 'text-on-surface-variant' : 'text-white/50'
                      }`}
                    >
                      điểm
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <footer className="px-md py-sm text-center text-label-md text-white/40">
        Người chơi tự trả lời trên điện thoại · Điểm cao sẽ leo hạng realtime
        <button
          onClick={() => router.push('/admin')}
          className="ml-md underline hover:text-white/70"
        >
          Về Admin
        </button>
      </footer>
    </div>
  )
}
