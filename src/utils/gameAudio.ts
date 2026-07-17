/**
 * Procedural quiz audio (Web Audio API) — countdown ticks + tension BGM.
 * No external MP3 / copyrighted Kahoot tracks.
 */

let ctx: AudioContext | null = null
let tensionNodes: { stop: () => void } | null = null
let unlocked = false

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  return ctx
}

export async function unlockGameAudio(): Promise<void> {
  const audio = getCtx()
  if (!audio) return
  if (audio.state === 'suspended') {
    try {
      await audio.resume()
    } catch {
      /* ignore */
    }
  }
  unlocked = true
}

function tone(
  audio: AudioContext,
  {
    freq,
    start,
    duration,
    type = 'square',
    gain = 0.08,
    slideTo,
  }: {
    freq: number
    start: number
    duration: number
    type?: OscillatorType
    gain?: number
    slideTo?: number
  }
) {
  const osc = audio.createOscillator()
  const g = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  if (slideTo) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(slideTo, 1),
      start + duration
    )
  }
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.connect(g)
  g.connect(audio.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

/** Rising beeps for 5 → 1 */
export function playCountdownTick(remaining: number): void {
  const audio = getCtx()
  if (!audio || !unlocked) return
  void audio.resume()
  const now = audio.currentTime
  const base = 320 + (5 - remaining) * 70
  tone(audio, {
    freq: base,
    start: now,
    duration: 0.22,
    type: 'square',
    gain: 0.1,
  })
  tone(audio, {
    freq: base * 2,
    start: now,
    duration: 0.18,
    type: 'triangle',
    gain: 0.05,
  })
}

/** Short “GO!” fanfare after countdown */
export function playGoFanfare(): void {
  const audio = getCtx()
  if (!audio || !unlocked) return
  void audio.resume()
  const now = audio.currentTime
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((freq, i) => {
    tone(audio, {
      freq,
      start: now + i * 0.08,
      duration: 0.35,
      type: 'sawtooth',
      gain: 0.07,
    })
  })
}

/** Kahoot-like looping tension bed while quiz is live */
export function startTensionBgm(): void {
  const audio = getCtx()
  if (!audio) return
  void audio.resume()
  stopTensionBgm()

  const master = audio.createGain()
  master.gain.value = 0.045
  master.connect(audio.destination)

  const tempo = 0.22 // beat length
  let stopped = false
  let nextBeat = audio.currentTime + 0.05
  let beat = 0

  // Minor-ish riff (tense quiz vibe)
  const melody = [392, 466.16, 523.25, 466.16, 392, 349.23, 311.13, 349.23]
  const bass = [98, 98, 116.54, 116.54, 130.81, 130.81, 116.54, 98]

  const schedule = () => {
    if (stopped || !ctx) return
    const lookAhead = 0.35
    while (nextBeat < audio.currentTime + lookAhead) {
      const t = nextBeat
      const i = beat % melody.length

      // kick-ish click
      tone(audio, {
        freq: 90,
        start: t,
        duration: 0.08,
        type: 'sine',
        gain: 0.12,
        slideTo: 40,
      })

      // hi-hat tick on offbeats
      if (beat % 2 === 1) {
        tone(audio, {
          freq: 6000,
          start: t,
          duration: 0.03,
          type: 'square',
          gain: 0.015,
        })
      }

      // melody
      tone(audio, {
        freq: melody[i],
        start: t,
        duration: tempo * 0.9,
        type: 'triangle',
        gain: 0.09,
      })

      // bass
      tone(audio, {
        freq: bass[i],
        start: t,
        duration: tempo * 0.85,
        type: 'sawtooth',
        gain: 0.05,
      })

      // connect through master by routing... tones go to destination directly.
      // For simplicity tones already hit destination; master unused for oscs.
      // Keep master for future expansion.
      void master

      nextBeat += tempo
      beat += 1
    }
    if (!stopped) requestAnimationFrame(schedule)
  }

  schedule()
  tensionNodes = {
    stop: () => {
      stopped = true
      try {
        master.disconnect()
      } catch {
        /* ignore */
      }
    },
  }
}

export function stopTensionBgm(): void {
  tensionNodes?.stop()
  tensionNodes = null
}
