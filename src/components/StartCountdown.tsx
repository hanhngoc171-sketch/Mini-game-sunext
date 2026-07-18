'use client'

import { useEffect, useState } from 'react'
import {
  playCountdownTick,
  playGoFanfare,
  unlockGameAudio,
} from '@/utils/gameAudio'

type Props = {
  onComplete: () => void
}

/**
 * Full-screen 5→1 countdown, then “BẮT ĐẦU!” popup, then onComplete.
 */
export default function StartCountdown({ onComplete }: Props) {
  const [value, setValue] = useState<number | 'go'>(5)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let cancelled = false
    const timers: number[] = []

    const run = async () => {
      await unlockGameAudio()
      if (cancelled) return

      playCountdownTick(5)

      for (let n = 4; n >= 1; n--) {
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return
            setValue(n)
            playCountdownTick(n)
          }, (5 - n) * 1000)
        )
      }

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          setValue('go')
          playGoFanfare()
        }, 5000)
      )

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          setVisible(false)
          onComplete()
        }, 6500)
      )
    }

    run()

    return () => {
      cancelled = true
      timers.forEach((id) => clearTimeout(id))
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-container overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-16 w-72 h-72 bg-soft-cream/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-16 w-80 h-80 bg-secondary-container/20 rounded-full blur-[110px] animate-pulse" />
      </div>

      {value === 'go' ? (
        <div className="relative z-10 animate-fade-in flex flex-col items-center gap-md px-md text-center">
          <div className="bg-surface-white rounded-[28px] shadow-2xl px-lg py-lg border-4 border-soft-cream max-w-md w-full">
            <div className="w-20 h-20 mx-auto mb-sm rounded-2xl bg-secondary-container flex items-center justify-center shadow-lg">
              <span
                className="material-symbols-outlined text-white text-[48px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                rocket_launch
              </span>
            </div>
            <p className="text-headline-md text-primary font-extrabold tracking-wide">
              BẮT ĐẦU!
            </p>
            <p className="text-body-md text-on-surface-variant mt-xs">
              Chúc bạn chơi vui và ghi điểm cao nhất!
            </p>
          </div>
        </div>
      ) : (
        <div
          key={value}
          className="relative z-10 select-none animate-fade-in w-full flex flex-col items-center justify-center px-md text-center"
        >
          <p className="w-full text-center text-[120px] sm:text-[140px] md:text-[200px] leading-none font-extrabold text-white drop-shadow-2xl tabular-nums">
            {value}
          </p>
          <p className="text-center text-label-lg text-primary-fixed-dim mt-sm uppercase tracking-[0.25em]">
            Sẵn sàng...
          </p>
        </div>
      )}
    </div>
  )
}
