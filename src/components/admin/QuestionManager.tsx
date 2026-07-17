'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Question, Choice } from '@/types/types'

export default function QuestionManager({ quizId }: { quizId: string }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  
  const [isEditing, setIsEditing] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question> | null>(null)
  const [currentChoices, setCurrentChoices] = useState<Partial<Choice>[]>([])
  
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchQuestions()
  }, [quizId])

  const fetchQuestions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('questions')
      .select('*, choices(*)')
      .eq('quiz_set_id', quizId)
      .order('order', { ascending: true })

    if (error) {
      console.error(error)
    } else if (data) {
      setQuestions(data as Question[])
    }
    setLoading(false)
  }

  const handleAddQuestion = () => {
    setCurrentQuestion({
      quiz_set_id: quizId,
      time_limit: 20,
      base_score: 1000,
      order: questions.length + 1,
      body: ''
    })
    setCurrentChoices([
      { body: '', is_correct: true },
      { body: '', is_correct: false },
      { body: '', is_correct: false },
      { body: '', is_correct: false }
    ])
    setIsEditing(true)
    setFormError(null)
  }

  const handleEditQuestion = (q: Question) => {
    setCurrentQuestion({ ...q })
    // Ensure we have 4 choices slots in UI
    const choices = [...q.choices]
    while (choices.length < 4) {
      choices.push({ body: '', is_correct: false } as Choice)
    }
    setCurrentChoices(choices)
    setIsEditing(true)
    setFormError(null)
  }

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa câu hỏi này?')) return
    await supabase.from('questions').delete().eq('id', id)
    fetchQuestions()
  }

  const saveQuestion = async () => {
    setFormError(null)
    
    // Validation
    if (!currentQuestion?.body?.trim()) {
      setFormError('Nội dung câu hỏi không được để trống.')
      return
    }

    const validChoices = currentChoices.filter(c => c.body?.trim())
    if (validChoices.length < 2) {
      setFormError('Phải có ít nhất 2 đáp án hợp lệ (không trống).')
      return
    }

    const correctCount = validChoices.filter(c => c.is_correct).length
    if (correctCount !== 1) {
      setFormError('Phải có đúng 1 đáp án đúng.')
      return
    }

    setSaving(true)

    let savedQuestionId = currentQuestion.id

    if (savedQuestionId) {
      // Update existing question
      const { error: qError } = await supabase
        .from('questions')
        .update({
          body: currentQuestion.body,
          time_limit: currentQuestion.time_limit,
          base_score: currentQuestion.base_score,
        })
        .eq('id', savedQuestionId)
      
      if (qError) {
        setFormError('Lỗi cập nhật câu hỏi: ' + qError.message)
        setSaving(false)
        return
      }

      // Delete old choices and insert new ones (simpler than syncing)
      await supabase.from('choices').delete().eq('question_id', savedQuestionId)
    } else {
      // Insert new question
      const { data: newQ, error: qError } = await supabase
        .from('questions')
        .insert({
          quiz_set_id: currentQuestion.quiz_set_id!,
          body: currentQuestion.body,
          time_limit: currentQuestion.time_limit || 20,
          base_score: currentQuestion.base_score || 1000,
          order: currentQuestion.order || 1
        })
        .select('id')
        .single()

      if (qError) {
        setFormError('Lỗi thêm câu hỏi: ' + qError.message)
        setSaving(false)
        return
      }
      savedQuestionId = newQ.id
    }

    // Insert choices
    const choicesToInsert = validChoices.map(c => ({
      question_id: savedQuestionId!,
      body: c.body!.trim(),
      is_correct: !!c.is_correct
    }))

    const { error: cError } = await supabase.from('choices').insert(choicesToInsert)
    if (cError) {
      setFormError('Lỗi thêm đáp án: ' + cError.message)
      setSaving(false)
      return
    }

    setIsEditing(false)
    setSaving(false)
    fetchQuestions()
  }

  const setChoiceCorrect = (index: number) => {
    const newChoices = [...currentChoices]
    newChoices.forEach((c, i) => c.is_correct = (i === index))
    setCurrentChoices(newChoices)
  }

  const updateChoiceBody = (index: number, body: string) => {
    const newChoices = [...currentChoices]
    newChoices[index].body = body
    setCurrentChoices(newChoices)
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return
    const current = questions[index]
    const above = questions[index - 1]
    
    // Swap order
    await supabase.from('questions').update({ order: above.order }).eq('id', current.id)
    await supabase.from('questions').update({ order: current.order }).eq('id', above.id)
    fetchQuestions()
  }

  const handleMoveDown = async (index: number) => {
    if (index === questions.length - 1) return
    const current = questions[index]
    const below = questions[index + 1]
    
    // Swap order
    await supabase.from('questions').update({ order: below.order }).eq('id', current.id)
    await supabase.from('questions').update({ order: current.order }).eq('id', below.id)
    fetchQuestions()
  }

  return (
    <div>
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-sm z-50">
          <div className="bg-surface-white rounded-2xl p-md w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
            <h3 className="text-headline-sm text-on-surface mb-md">
              {currentQuestion?.id ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}
            </h3>

            {formError && (
              <div className="mb-sm p-sm bg-error-container text-error-red rounded-xl text-label-md flex items-center gap-xs">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {formError}
              </div>
            )}

            <div className="space-y-md">
              <div>
                <label className="block text-label-md text-on-surface-variant mb-xs">
                  Nội dung câu hỏi <span className="text-error-red">*</span>
                </label>
                <textarea
                  value={currentQuestion?.body || ''}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      body: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-sm py-3 border-2 border-[#CBD5CB] rounded-xl focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none text-on-surface bg-app-bg"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-sm">
                <div className="flex-1">
                  <label className="block text-label-md text-on-surface-variant mb-xs">
                    Thời gian (giây)
                  </label>
                  <select
                    value={currentQuestion?.time_limit || 20}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        time_limit: Number(e.target.value),
                      })
                    }
                    className="w-full h-12 px-sm border-2 border-[#CBD5CB] rounded-xl text-on-surface bg-app-bg outline-none focus:border-primary"
                  >
                    <option value={10}>10 giây</option>
                    <option value={15}>15 giây</option>
                    <option value={20}>20 giây</option>
                    <option value={30}>30 giây</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-label-md text-on-surface-variant mb-xs">
                    Điểm cơ bản
                  </label>
                  <select
                    value={currentQuestion?.base_score || 1000}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        base_score: Number(e.target.value),
                      })
                    }
                    className="w-full h-12 px-sm border-2 border-[#CBD5CB] rounded-xl text-on-surface bg-app-bg outline-none focus:border-primary"
                  >
                    <option value={500}>500 điểm</option>
                    <option value={1000}>1000 điểm</option>
                    <option value={2000}>2000 điểm</option>
                  </select>
                </div>
              </div>

              <div className="pt-sm border-t border-border-subtle">
                <label className="block text-label-md text-on-surface-variant mb-sm">
                  Các đáp án (ít nhất 2 đáp án, chọn 1 đáp án đúng)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  {currentChoices.map((choice, idx) => (
                    <div
                      key={idx}
                      className={`p-sm border-2 rounded-xl flex flex-col gap-2 ${
                        choice.is_correct
                          ? 'bg-success-green/10 border-primary-container'
                          : 'bg-app-bg border-border-subtle'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-label-md font-semibold text-on-surface-variant">
                          Đáp án {['A', 'B', 'C', 'D'][idx]}
                        </span>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="correct_choice"
                            checked={choice.is_correct || false}
                            onChange={() => setChoiceCorrect(idx)}
                            className="accent-primary-container"
                          />
                          <span className="text-label-md text-success-green">
                            Đúng
                          </span>
                        </label>
                      </div>
                      <textarea
                        value={choice.body || ''}
                        onChange={(e) => updateChoiceBody(idx, e.target.value)}
                        placeholder={`Nhập đáp án ${['A', 'B', 'C', 'D'][idx]}...`}
                        rows={2}
                        className="w-full p-2 border border-border-subtle rounded-lg text-on-surface bg-surface-white outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-md flex justify-end gap-sm">
              <button
                onClick={() => setIsEditing(false)}
                className="h-11 px-md rounded-xl border border-primary-container text-primary-container text-label-md font-semibold hover:bg-surface-container-low transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={saveQuestion}
                disabled={saving}
                className="h-11 px-md bg-primary-container hover:bg-primary text-white text-label-md rounded-xl disabled:opacity-50 transition-colors"
              >
                {saving ? 'Đang lưu...' : 'Lưu câu hỏi'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-md gap-sm">
        <h2 className="text-headline-sm text-on-surface">
          Danh sách câu hỏi ({questions.length})
        </h2>
        <button
          onClick={handleAddQuestion}
          className="h-11 px-md bg-primary-container hover:bg-primary text-white text-label-md rounded-xl transition-colors shrink-0"
        >
          + Thêm câu hỏi
        </button>
      </div>

      {loading ? (
        <div className="text-center py-lg text-on-surface-variant">
          Đang tải câu hỏi...
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-lg border-2 border-dashed border-border-subtle rounded-xl bg-soft-cream/40 text-on-surface-variant">
          Bộ câu hỏi chưa có câu hỏi nào.
        </div>
      ) : (
        <div className="space-y-sm">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-app-bg p-sm rounded-xl border border-border-subtle flex gap-sm"
            >
              <div className="flex flex-col items-center justify-center gap-1 text-outline">
                <button
                  onClick={() => handleMoveUp(idx)}
                  disabled={idx === 0}
                  className="hover:text-primary disabled:opacity-30"
                >
                  ▲
                </button>
                <span className="font-bold text-on-surface">{idx + 1}</span>
                <button
                  onClick={() => handleMoveDown(idx)}
                  disabled={idx === questions.length - 1}
                  className="hover:text-primary disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-label-lg text-on-surface mb-1">
                  {q.body}
                </div>
                <div className="text-label-md text-on-surface-variant mb-sm flex gap-md">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      timer
                    </span>
                    {q.time_limit}s
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      stars
                    </span>
                    {q.base_score} điểm
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {q.choices.map((c) => (
                    <div
                      key={c.id}
                      className={`text-label-md p-2 rounded-lg ${
                        c.is_correct
                          ? 'bg-success-green/15 text-success-green font-medium border border-success-green/30'
                          : 'bg-surface-white text-on-surface-variant border border-border-subtle'
                      }`}
                    >
                      {c.body} {c.is_correct && '✓'}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => handleEditQuestion(q)}
                  className="px-3 py-2 bg-surface-container-low text-primary-container rounded-lg text-label-md hover:bg-surface-container transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="px-3 py-2 border border-error-red text-error-red rounded-lg text-label-md hover:bg-error-container/40 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
