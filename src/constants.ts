/** Time until the choices for the question are revealed in ms */
export const TIME_TIL_CHOICE_REVEAL = 3000

/** Default countdown per question (seconds) — scoring tiers assume 20s */
export const QUESTION_ANSWER_TIME_SEC = 20

/**
 * Điểm theo giây còn lại trên đồng hồ đếm ngược (khi trả lời đúng):
 * - 20–19s → 100 điểm
 * - 18–15s → 90 điểm
 * - 14–11s → 80 điểm
 * - 10–6s  → 70 điểm
 * - 5–1s   → 50 điểm
 * - 0 / hết giờ / sai → 0 điểm
 */
export function getScoreByRemainingSeconds(
  remainingSeconds: number,
  isCorrect: boolean
): number {
  if (!isCorrect || remainingSeconds <= 0) return 0
  if (remainingSeconds >= 19) return 100
  if (remainingSeconds >= 15) return 90
  if (remainingSeconds >= 11) return 80
  if (remainingSeconds >= 6) return 70
  if (remainingSeconds >= 1) return 50
  return 0
}
