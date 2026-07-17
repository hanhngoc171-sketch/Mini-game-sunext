'use client'

import { Game, Participant, QuizSet } from '@/types/types'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useMemo, useState } from 'react'
import Lobby from './lobby'
import LiveLeaderboard from './quiz'
import Results from './results'

enum AdminScreens {
  lobby = 'lobby',
  quiz = 'quiz',
  result = 'result',
}

export default function Home({
  params: { id: gameId },
}: {
  params: { id: string }
}) {
  const supabase = useMemo(() => createClient(), [])
  const [currentScreen, setCurrentScreen] = useState<AdminScreens>(
    AdminScreens.lobby
  )
  const [participants, setParticipants] = useState<Participant[]>([])
  const [quizSet, setQuizSet] = useState<QuizSet>()
  const [pin, setPin] = useState<string | null>(null)

  useEffect(() => {
    const getQuestions = async () => {
      const { data: gameData, error: gameError } = await supabase
        .from('games')
        .select()
        .eq('id', gameId)
        .single()
      if (gameError) {
        console.error(gameError.message)
        alert('Error getting game data')
        return
      }
      setPin(gameData.pin)
      setCurrentScreen(gameData.phase as AdminScreens)

      const { data, error } = await supabase
        .from('quiz_sets')
        .select(`*, questions(*, choices(*))`)
        .eq('id', gameData.quiz_set_id)
        .order('order', {
          ascending: true,
          referencedTable: 'questions',
        })
        .single()
      if (error) {
        console.error('Lỗi khi tải bộ câu hỏi:', error.message)
        alert('Lỗi tải dữ liệu: ' + error.message)
        return
      }
      setQuizSet(data)
    }

    const setGameListner = async () => {
      const { data } = await supabase
        .from('participants')
        .select()
        .eq('game_id', gameId)
        .order('created_at')
      if (data) setParticipants(data)

      const channel = supabase
        .channel(`host_game_${gameId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'participants',
            filter: `game_id=eq.${gameId}`,
          },
          (payload) => {
            setParticipants((currentParticipants) => {
              return [...currentParticipants, payload.new as Participant]
            })
          }
        )
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
            setCurrentScreen(game.phase as AdminScreens)
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }

    getQuestions()
    const cleanupPromise = setGameListner()
    return () => {
      cleanupPromise.then((cleanup) => cleanup?.())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  return (
    <main className="min-h-screen bg-app-bg">
      {currentScreen == AdminScreens.lobby && (
        <Lobby
          participants={participants}
          gameId={gameId}
          pin={pin || undefined}
          onGameStarted={() => setCurrentScreen(AdminScreens.quiz)}
        />
      )}
      {currentScreen == AdminScreens.quiz && quizSet && (
        <LiveLeaderboard
          participants={participants}
          quizSet={quizSet}
          gameId={gameId}
        />
      )}
      {currentScreen == AdminScreens.result && quizSet && (
        <Results
          participants={participants}
          quizSet={quizSet}
          gameId={gameId}
        />
      )}
    </main>
  )
}
