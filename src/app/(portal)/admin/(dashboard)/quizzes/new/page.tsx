'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewQuizPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!name.trim()) {
      setError('Vui lòng nhập tên bộ câu hỏi')
      setLoading(false)
      return
    }

    const { data, error: insertError } = await supabase
      .from('quiz_sets')
      .insert({
        name: name.trim(),
        description: description.trim() || null,
        status: 'draft',
      })
      .select('id')
      .single()

    if (insertError) {
      setError('Đã xảy ra lỗi khi tạo bộ câu hỏi: ' + insertError.message)
      setLoading(false)
    } else if (data) {
      router.push(`/admin/quizzes/${data.id}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-md flex items-center justify-between">
        <h1 className="text-headline-md text-on-surface">Tạo bộ câu hỏi mới</h1>
        <Link
          href="/admin"
          className="h-11 px-4 rounded-xl border border-primary-container text-primary-container text-label-md font-semibold inline-flex items-center hover:bg-surface-container-low transition-colors"
        >
          Quay lại
        </Link>
      </div>

      <div className="bg-surface-white rounded-xl shadow-sm border border-border-subtle p-md">
        {error && (
          <div className="mb-sm p-sm bg-error-container text-error-red rounded-xl text-label-md flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-md">
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
              placeholder="VD: Kiến thức nội bộ 2024"
            />
          </div>

          <div>
            <label className="block text-label-md text-on-surface-variant mb-xs">
              Mô tả
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-sm py-3 border-2 border-[#CBD5CB] rounded-xl focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none text-on-surface bg-app-bg transition-all"
              placeholder="Thông tin thêm về bộ câu hỏi..."
            />
          </div>

          <div className="flex justify-end pt-sm border-t border-border-subtle">
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-md bg-primary-container hover:bg-primary text-white text-label-md rounded-xl disabled:opacity-50 transition-colors"
            >
              {loading ? 'Đang tạo...' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
