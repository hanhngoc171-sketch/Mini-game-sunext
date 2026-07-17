'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Game, Participant, Question, supabase } from '@/types/types'
import Lobby from './lobby'
import Quiz from './quiz'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

enum Screens {
  lobby = 'lobby',
  quiz = 'quiz',
  results = 'result',
}

export default function Home({
  params: { id: gameId },
}: {
  params: { id: string }
}) {
  const [participant, setParticipant] = useState<Participant | null>(null)
  const [currentScreen, setCurrentScreen] = useState(Screens.lobby)
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [playerFinished, setPlayerFinished] = useState(false)
  const [loadingQuiz, setLoadingQuiz] = useState(false)

  const quizSetIdRef = useRef<string | null>(null)
  const questionsRef = useRef<Question[] | null>(null)
  const screenRef = useRef(currentScreen)
  questionsRef.current = questions
  screenRef.current = currentScreen

  const getQuestions = useCallback(async (quizSetId: string) => {
    quizSetIdRef.current = quizSetId
    const { data, error } = await supabase
      .from('questions')
      .select(`*, choices(*)`)
      .eq('quiz_set_id', quizSetId)
      .order('order', { ascending: true })

    if (error) {
      console.error('Lỗi tải câu hỏi:', error.message)
      return null
    }
    setQuestions(data)
    questionsRef.current = data
    return data
  }, [])

  const applyGameState = useCallback(
    async (game: Pick<Game, 'phase' | 'quiz_set_id'>) => {
      const phase = game.phase as Screens

      if (phase === Screens.quiz || phase === Screens.results) {
        const needQuestions =
          !questionsRef.current ||
          questionsRef.current.length === 0 ||
          quizSetIdRef.current !== game.quiz_set_id

        if (needQuestions) {
          setLoadingQuiz(true)
          await getQuestions(game.quiz_set_id)
          setLoadingQuiz(false)
        }
      }

      if (screenRef.current !== phase) {
        setCurrentScreen(phase)
      }
    },
    [getQuestions]
  )

  const syncGame = useCallback(async () => {
    const { data: game, error } = await supabase
      .from('games')
      .select('phase, quiz_set_id')
      .eq('id', gameId)
      .single()

    if (error || !game) {
      console.error('Không đọc được trạng thái phòng:', error?.message)
      return
    }

    await applyGameState(game)
  }, [gameId, applyGameState])

  const onRegisterCompleted = (p: Participant) => {
    setParticipant(p)
  }

  // After nickname is set, sync + keep listening / polling for host start
  useEffect(() => {
    if (!participant) return

    let cancelled = false

    const run = async () => {
      if (!cancelled) await syncGame()
    }
    run()

    const channel = supabase
      .channel(`player_game_${gameId}_${participant.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'games',
          filter: `id=eq.${gameId}`,
        },
        (payload) => {
          const game = payload.new as Game
          applyGameState(game)
        }
      )
      .subscribe()

    const poll = setInterval(() => {
      // Always poll while waiting in lobby; also while quiz loads
      if (
        screenRef.current === Screens.lobby ||
        !questionsRef.current?.length
      ) {
        syncGame()
      }
    }, 1200)

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
      clearInterval(poll)
    }
  }, [gameId, participant, syncGame, applyGameState])

  const showResults = playerFinished || currentScreen === Screens.results

  return (
    <main className="min-h-screen bg-app-bg">
      {currentScreen === Screens.lobby && !playerFinished && (
        <Lobby
          onRegisterCompleted={onRegisterCompleted}
          gameId={gameId}
        />
      )}

      {currentScreen === Screens.quiz &&
        !showResults &&
        (!participant || !questions?.length || loadingQuiz) && (
          <div className="min-h-screen flex flex-col items-center justify-center gap-sm bg-app-bg">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-secondary-container rounded-full animate-spin" />
            <p className="text-label-md text-on-surface-variant">
              Đang vào trò chơi...
            </p>
          </div>
        )}

      {currentScreen === Screens.quiz &&
        !!questions?.length &&
        participant &&
        !showResults &&
        !loadingQuiz && (
          <Quiz
            questions={questions}
            participantId={participant.id}
            onFinished={() => setPlayerFinished(true)}
          />
        )}

      {showResults && participant && (
        <Results participant={participant} />
      )}
    </main>
  )
}

function Results({ participant }: { participant: Participant }) {
  const [rank, setRank] = useState<number | null>(null)
  const [totalScore, setTotalScore] = useState<number | null>(null)
  const [top5, setTop5] = useState<
    { nickname: string; total_score: number; participant_id: string }[]
  >([])
  const [totalPlayers, setTotalPlayers] = useState(0)
  const { width, height } = useWindowSize()

  useEffect(() => {
    const fetchRank = async () => {
      const [{ data }, { count }] = await Promise.all([
        supabase
          .from('game_results')
          .select('participant_id, total_score, nickname')
          .eq('game_id', participant.game_id)
          .order('total_score', { ascending: false }),
        supabase
          .from('participants')
          .select('*', { count: 'exact', head: true })
          .eq('game_id', participant.game_id),
      ])

      if (count !== null) setTotalPlayers(count)

      if (data) {
        setTop5(
          data.slice(0, 5).map((d) => ({
            participant_id: d.participant_id ?? '',
            nickname: d.nickname ?? 'Ẩn danh',
            total_score: d.total_score ?? 0,
          }))
        )
        const index = data.findIndex(
          (d) => d.participant_id === participant.id
        )
        if (index !== -1) {
          setRank(index + 1)
          setTotalScore(data[index].total_score ?? 0)
        } else {
          setRank(null)
          setTotalScore(0)
        }
      }
    }
    fetchRank()
    const interval = setInterval(fetchRank, 3000)
    return () => clearInterval(interval)
  }, [participant.game_id, participant.id])

  return (
    <div className="bg-soft-cream min-h-screen overflow-x-hidden relative">
      {rank !== null && rank <= 5 && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={120}
          colors={['#386641', '#F97A00', '#FFF4A4', '#FED16A', '#204e2b']}
        />
      )}

      <main className="flex flex-col min-h-screen p-sm md:max-w-[480px] mx-auto animate-fade-in">
        <header className="pt-lg pb-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary-container rounded-full mb-sm shadow-lg">
            <span
              className="material-symbols-outlined text-surface-white text-[40px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>
          </div>
          <h1 className="text-headline-lg-mobile text-primary mb-xs">
            Xin chúc mừng!
          </h1>
          <p className="text-body-md text-on-surface-variant px-md">
            Bạn đã hoàn thành tất cả câu hỏi.
          </p>
        </header>

        <section className="mb-md">
          <div className="p-md rounded-2xl bg-primary-container text-on-primary-container shadow-lg flex flex-col items-center text-center">
            <div className="flex items-center gap-xs mb-xs">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <p className="text-label-lg">Kết quả của bạn</p>
            </div>
            <p className="text-headline-md mb-1 text-white">
              Bạn đạt hạng {rank !== null ? rank : '—'}
              {totalPlayers > 0 && (
                <span className="text-primary-fixed text-headline-sm font-normal">
                  {' '}
                  / {totalPlayers}
                </span>
              )}
            </p>
            <div className="w-full h-px bg-on-primary-container/20 my-sm" />
            <p className="text-label-lg text-primary-fixed">
              Tổng điểm:{' '}
              {totalScore !== null
                ? totalScore.toLocaleString('vi-VN')
                : '—'}
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-xs mb-lg">
          <h2 className="text-label-lg text-on-surface mb-xs px-1">
            Bảng xếp hạng tạm thời
          </h2>
          {top5.map((result, index) => {
            const isMe = result.participant_id === participant.id
            return (
              <div
                key={result.participant_id}
                className={`flex items-center justify-between p-sm rounded-xl ${
                  index === 0
                    ? 'bg-gradient-to-r from-soft-cream to-secondary-fixed border-2 border-secondary-container shadow-md'
                    : 'bg-surface-white shadow-sm border border-outline-variant/30'
                } ${isMe ? 'ring-2 ring-primary-container' : ''}`}
              >
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-surface-container text-on-surface">
                    {index + 1}
                  </div>
                  <p className="text-label-lg text-on-surface">
                    {result.nickname}
                    {isMe && (
                      <span className="ml-1 text-label-md text-secondary-container">
                        (Bạn)
                      </span>
                    )}
                  </p>
                </div>
                <p className="font-bold text-label-lg text-primary">
                  {result.total_score.toLocaleString('vi-VN')}
                </p>
              </div>
            )
          })}
        </section>

        <div className="flex-grow" />

        <footer className="pb-safe pt-md">
          <button
            onClick={() => (window.location.href = '/')}
            className="w-full h-[56px] bg-secondary-container text-surface-white rounded-xl shadow-lg flex items-center justify-center gap-sm"
          >
            <span className="text-headline-sm">Về trang chủ</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </footer>
      </main>
    </div>
  )
}
