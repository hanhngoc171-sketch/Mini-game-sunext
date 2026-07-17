'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import QuestionManager from '@/components/admin/QuestionManager'

export default function EditQuizPage({ params }: { params: { id: string } }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('draft')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchQuiz()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const fetchQuiz = async () => {
    const { data, error } = await supabase
      .from('quiz_sets')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      setError('Không tìm thấy bộ câu hỏi')
    } else if (data) {
      setName(data.name)
      setDescription(data.description || '')
      setStatus(data.status)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    if (!name.trim()) {
      setError('Vui lòng nhập tên bộ câu hỏi')
      setSaving(false)
      return
    }

    const { error: updateError } = await supabase
      .from('quiz_sets')
      .update({
        name: name.trim(),
        description: description.trim() || null,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)

    if (updateError) {
      setError('Đã xảy ra lỗi khi lưu: ' + updateError.message)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="text-center p-lg text-on-surface-variant">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary-container rounded-full animate-spin mx-auto mb-sm" />
        Đang tải...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-md">
      <div className="flex items-center justify-between gap-sm">
        <h1 className="text-headline-md text-on-surface">Chi tiết bộ câu hỏi</h1>
        <Link
          href="/admin"
          className="h-11 px-4 rounded-xl border border-primary-container text-primary-container text-label-md font-semibold inline-flex items-center hover:bg-surface-container-low transition-colors shrink-0"
        >
          Quay lại
        </Link>
      </div>

      <div className="bg-surface-white rounded-xl shadow-sm border border-border-subtle p-md">
        <h2 className="text-label-lg text-on-surface mb-md border-b border-border-subtle pb-sm">
          Thông tin chung
        </h2>

        {error && (
          <div className="mb-sm p-sm bg-error-container text-error-red rounded-xl text-label-md flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        {success && (
          <div className="mb-sm p-sm bg-success-green/15 text-success-green rounded-xl text-label-md flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px]">
              check_circle
            </span>
            Đã lưu thay đổi thành công!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-md">
              <div>
                <label className="block text-label-md text-on-surface-variant mb-xs">
                  Tên bộ câu hỏi <span className="text-error-red">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-12 px-sm border-2 border-[#CBD5CB] rounded-xl focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none text-on-surface bg-app-bg transition-all"
                />
              </div>

              <div>
                <label className="block text-label-md text-on-surface-variant mb-xs">
                  Trạng thái
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-12 px-sm border-2 border-[#CBD5CB] rounded-xl focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none text-on-surface bg-app-bg transition-all"
                >
                  <option value="draft">Đang soạn (Draft)</option>
                  <option value="active">Đang hoạt động (Active)</option>
                  <option value="archived">Đã tắt (Archived)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-label-md text-on-surface-variant mb-xs">
                Mô tả
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-sm py-3 border-2 border-[#CBD5CB] rounded-xl focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none text-on-surface bg-app-bg transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-sm border-t border-border-subtle">
            <button
              type="submit"
              disabled={saving}
              className="h-12 px-md bg-primary-container hover:bg-primary text-white text-label-md rounded-xl disabled:opacity-50 transition-colors"
            >
              {saving ? 'Đang lưu...' : 'Lưu thông tin'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-surface-white rounded-xl shadow-sm border border-border-subtle p-md">
        <QuestionManager quizId={params.id} />
      </div>
    </div>
  )
}
