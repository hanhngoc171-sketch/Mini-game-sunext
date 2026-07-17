'use client'

import { useCallback, useEffect, useState } from 'react'
import StartCountdown from '@/components/StartCountdown'
import { startTensionBgm, stopTensionBgm, unlockGameAudio } from '@/utils/gameAudio'

/**
 * Gates quiz UI behind a one-time countdown per game session,
 * then starts tension BGM for both host & player.
 */
export function useQuizStartSequence(gameId: string, active: boolean) {
  const [ready, setReady] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)

  useEffect(() => {
    if (!active) {
      setReady(false)
      setShowCountdown(false)
      stopTensionBgm()
      return
    }

    const key = `quiz_start_cd_${gameId}`
    const alreadyDone =
      typeof window !== 'undefined' && sessionStorage.getItem(key) === '1'

    if (alreadyDone) {
      setReady(true)
      setShowCountdown(false)
      void unlockGameAudio().then(() => startTensionBgm())
      return
    }

    setReady(false)
    setShowCountdown(true)
  }, [active, gameId])

  useEffect(() => {
    return () => {
      stopTensionBgm()
    }
  }, [])

  const onCountdownComplete = useCallback(() => {
    try {
      sessionStorage.setItem(`quiz_start_cd_${gameId}`, '1')
    } catch {
      /* ignore */
    }
    setShowCountdown(false)
    setReady(true)
    startTensionBgm()
  }, [gameId])

  const countdownEl = showCountdown ? (
    <StartCountdown onComplete={onCountdownComplete} />
  ) : null

  return { ready, countdownEl }
}
