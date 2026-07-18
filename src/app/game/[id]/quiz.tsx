'use client'

import { getScoreByRemainingSeconds, QUESTION_ANSWER_TIME_SEC } from '@/constants'
import { Choice, Question, supabase } from '@/types/types'
import { useState, useEffect, useCallback, useRef } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {
  playCorrectSfx,
  playTimeoutSfx,
  playWrongSfx,
  unlockGameAudio,
} from '@/utils/gameAudio'

const ANSWER_STYLES = [
  { bg: 'bg-primary text-white', labelBg: 'bg-white/20' },
  { bg: 'bg-secondary-container text-white', labelBg: 'bg-white/20' },
  { bg: 'bg-tertiary-container text-white', labelBg: 'bg-white/20' },
  {
    bg: 'bg-tertiary-fixed text-on-tertiary-fixed',
    labelBg: 'bg-on-tertiary-fixed/10',
  },
]

const ANSWER_LABELS = ['A', 'B', 'C', 'D']

type FeedbackState = {
  kind: 'correct' | 'wrong' | 'timeout'
  score: number
  correctBody?: string
}

type Feedback = FeedbackState | null

export default function Quiz({
  questions,
  participantId,
  onFinished,
}: {
  questions: Question[]
  participantId: string
  onFinished: () => void
}) {
  const [ready, setReady] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set())
  const [timerKey, setTimerKey] = useState(0)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [submitting, setSubmitting] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const remainingRef = useRef(QUESTION_ANSWER_TIME_SEC)

  const loadProgress = useCallback(async () => {
    const { data } = await supabase
      .from('answers')
      .select('question_id, score')
      .eq('participant_id', participantId)

    const answered = new Set((data || []).map((a) => a.question_id!))
    const scoreSum = (data || []).reduce((sum, a) => sum + (a.score || 0), 0)
    setAnsweredIds(answered)
    setTotalScore(scoreSum)

    const firstUnanswered = questions.findIndex((q) => !answered.has(q.id))
    if (firstUnanswered === -1) {
      onFinished()
      return
    }
    setCurrentIndex(firstUnanswered)
    setReady(true)
    remainingRef.current = QUESTION_ANSWER_TIME_SEC
    setTimerKey((k) => k + 1)
  }, [participantId, questions, onFinished])

  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  const question = questions[currentIndex]
  const timeLimit = QUESTION_ANSWER_TIME_SEC

  const goNext = (nextAnswered: Set<string>) => {
    setFeedback(null)
    const nextIndex = questions.findIndex((q) => !nextAnswered.has(q.id))
    if (nextIndex === -1) {
      onFinished()
      return
    }
    setCurrentIndex(nextIndex)
    remainingRef.current = timeLimit
    setTimerKey((k) => k + 1)
  }

  const submitAnswer = async (choice: Choice | null) => {
    if (!question || submitting || feedback) return
    setSubmitting(true)

    const remaining = Math.max(0, remainingRef.current)
    const timedOut = choice === null || remaining <= 0
    const isCorrect = !timedOut && !!choice?.is_correct
    const score = getScoreByRemainingSeconds(remaining, isCorrect)

    let choiceToSave = choice
    if (!choiceToSave) {
      choiceToSave =
        question.choices.find((c) => !c.is_correct) || question.choices[0]
    }

    const { error } = await supabase.from('answers').insert({
      participant_id: participantId,
      question_id: question.id,
      choice_id: choiceToSave.id,
      score,
    })

    if (error) {
      if (!error.message.includes('duplicate') && error.code !== '23505') {
        alert(error.message)
        setSubmitting(false)
        return
      }
    }

    const nextAnswered = new Set(answeredIds).add(question.id)
    setAnsweredIds(nextAnswered)
    setTotalScore((s) => s + score)

    const kind: FeedbackState['kind'] = timedOut
      ? 'timeout'
      : isCorrect
        ? 'correct'
        : 'wrong'

    void unlockGameAudio().then(() => {
      if (kind === 'correct') playCorrectSfx()
      else if (kind === 'wrong') playWrongSfx()
      else playTimeoutSfx()
    })

    setFeedback({
      kind,
      score,
      correctBody: question.choices.find((c) => c.is_correct)?.body,
    })
    setSubmitting(false)

    // Hết giờ: chuyển câu nhanh; còn lại hiện feedback ngắn
    const delay = timedOut ? 800 : 1600
    setTimeout(() => {
      goNext(nextAnswered)
    }, delay)
  }

  if (!ready || !question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-bg">
        <div className="flex flex-col items-center gap-sm">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-secondary-container rounded-full animate-spin" />
          <p className="text-on-surface-variant text-label-md">
            Đang tải câu hỏi...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-stretch bg-app-bg relative">
      <header className="sticky top-0 z-50 flex justify-between items-center px-md py-sm bg-surface-white border-b border-outline-variant/30">
        <span className="text-headline-sm font-bold text-primary">
          Company Quiz
        </span>
        <div className="bg-surface-container-high px-sm py-xs rounded-full flex items-center gap-xs">
          <span
            className="material-symbols-outlined text-primary text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            stars
          </span>
          <span className="text-label-lg text-on-surface">
            {totalScore.toLocaleString('vi-VN')} pts
          </span>
        </div>
      </header>

      {feedback ? (
        <div className="flex-grow flex justify-center items-center flex-col px-sm py-lg">
          <div
            className={`w-full max-w-md rounded-xl shadow-lg p-md flex flex-col items-center gap-md border-2 ${
              feedback.kind === 'correct'
                ? 'bg-soft-cream border-success-green/20'
                : feedback.kind === 'timeout'
                  ? 'bg-soft-cream border-secondary-container/30'
                  : 'bg-surface-white border-error-red/20'
            }`}
          >
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl ${
                feedback.kind === 'correct'
                  ? 'bg-success-green'
                  : feedback.kind === 'timeout'
                    ? 'bg-secondary-container'
                    : 'bg-error-red'
              }`}
            >
              <span
                className="material-symbols-outlined text-white text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {feedback.kind === 'correct'
                  ? 'check_circle'
                  : feedback.kind === 'timeout'
                    ? 'timer_off'
                    : 'cancel'}
              </span>
            </div>
            <h1
              className={`text-headline-lg-mobile tracking-tight ${
                feedback.kind === 'correct'
                  ? 'text-success-green'
                  : feedback.kind === 'timeout'
                    ? 'text-secondary-container'
                    : 'text-error-red'
              }`}
            >
              {feedback.kind === 'correct'
                ? 'Chính xác!'
                : feedback.kind === 'timeout'
                  ? 'Hết giờ!'
                  : 'Sai rồi!'}
            </h1>
            {feedback.kind === 'correct' ? (
              <div className="inline-flex items-center bg-white/60 px-sm py-1 rounded-full">
                <span className="text-label-lg text-secondary-container font-bold">
                  +{feedback.score} điểm
                </span>
              </div>
            ) : (
              <div className="w-full space-y-sm">
                <div className="inline-flex items-center bg-white px-sm py-1 rounded-full border border-outline-variant/30">
                  <span className="text-label-lg text-on-surface-variant font-bold">
                    +0 điểm
                  </span>
                </div>
                {feedback.kind !== 'timeout' && feedback.correctBody && (
                  <div className="bg-soft-cream rounded-lg p-sm text-left">
                    <p className="text-label-md text-on-surface-variant mb-1">
                      Đáp án đúng
                    </p>
                    <p className="text-label-lg text-primary font-semibold">
                      {feedback.correctBody}
                    </p>
                  </div>
                )}
              </div>
            )}
            <p className="text-label-md text-on-surface-variant">
              {answeredIds.size >= questions.length
                ? 'Đang tính xếp hạng...'
                : 'Câu tiếp theo...'}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col px-sm pt-sm pb-md max-w-lg mx-auto w-full">
          <div className="w-full flex justify-between items-end mb-sm">
            <div>
              <span className="text-on-surface-variant text-label-md uppercase tracking-wider">
                Tiến trình
              </span>
              <h1 className="text-headline-md text-on-surface">
                Câu {currentIndex + 1}/{questions.length}
              </h1>
            </div>
            <p className="text-label-md text-on-surface-variant text-right">
              Đúng nhanh = điểm cao
            </p>
          </div>

          <div className="w-full h-1.5 bg-surface-container-highest rounded-full mb-md overflow-hidden">
            <div
              className="h-full bg-primary-container transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <div className="w-full mb-md flex justify-center">
            <CountdownCircleTimer
              key={timerKey}
              isPlaying={!submitting}
              duration={timeLimit}
              colors={['#386641', '#F97A00', '#F97A00', '#D92D20']}
              colorsTime={[timeLimit, 5, 2, 0]}
              size={80}
              strokeWidth={5}
              trailColor="#dbe5d8"
              onComplete={() => {
                submitAnswer(null)
                return { shouldRepeat: false }
              }}
            >
              {({ remainingTime }) => {
                remainingRef.current = remainingTime
                return (
                  <span
                    className={`text-headline-sm font-bold ${
                      remainingTime <= 2
                        ? 'text-error-red'
                        : remainingTime <= 5
                          ? 'text-secondary-container'
                          : 'text-primary'
                    }`}
                  >
                    {remainingTime}
                  </span>
                )
              }}
            </CountdownCircleTimer>
          </div>

          <div className="w-full bg-white rounded-xl p-sm sm:p-md border border-outline-variant/20 mb-md shadow-sm">
            <h2 className="text-[15px] sm:text-base md:text-label-lg text-center text-on-surface font-semibold leading-snug">
              {question.body}
            </h2>
          </div>

          <div className="w-full space-y-3">
            {question.choices.map((choice, index) => {
              const style = ANSWER_STYLES[index % ANSWER_STYLES.length]
              return (
                <button
                  key={choice.id}
                  onClick={() => submitAnswer(choice)}
                  disabled={submitting || !!feedback}
                  className={`w-full min-h-[64px] flex items-center px-md py-sm ${style.bg} rounded-xl transition-all active:scale-[0.98] shadow-sm disabled:opacity-70`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${style.labelBg} flex items-center justify-center mr-md shrink-0`}
                  >
                    <span className="text-headline-sm font-bold">
                      {ANSWER_LABELS[index]}
                    </span>
                  </div>
                  <span className="text-label-lg text-left">{choice.body}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex text-on-surface-variant py-3 px-6 items-center justify-between bg-surface-white border-t border-outline-variant/30">
        <div className="font-semibold text-primary tracking-wide text-label-md">
          Company Quiz
        </div>
        <div className="text-label-md font-bold bg-surface-container-high px-4 py-1 rounded-full text-on-surface">
          {answeredIds.size} / {questions.length} đã trả lời
        </div>
      </div>
    </div>
  )
}
