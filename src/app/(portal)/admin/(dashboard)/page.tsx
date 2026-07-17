'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase'

type QuizSetWithQuestions = Database['public']['Tables']['quiz_sets']['Row'] & {
  questions: { id: string }[]
}

export default function AdminDashboard() {
  const [quizSets, setQuizSets] = useState<QuizSetWithQuestions[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchQuizSets()
  }, [])

  const fetchQuizSets = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('quiz_sets')
      .select('*, questions(id)')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setQuizSets(data as unknown as QuizSetWithQuestions[])
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bộ câu hỏi này không?')) return

    const { error } = await supabase.from('quiz_sets').delete().eq('id', id)
    if (error) {
      alert(
        'Không thể xóa. Có thể bộ câu hỏi này đã được sử dụng trong một trò chơi.'
      )
    } else {
      fetchQuizSets()
    }
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'draft' : 'active'
    const { error } = await supabase
      .from('quiz_sets')
      .update({ status: newStatus })
      .eq('id', id)
    if (error) {
      alert('Lỗi cập nhật trạng thái: ' + error.message)
    } else {
      fetchQuizSets()
    }
  }

  const generatePin = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const startGame = async (quizSetId: string) => {
    const pin = generatePin()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.')
      router.push('/admin/login')
      return
    }

    const { data, error } = await supabase
      .from('games')
      .insert({
        quiz_set_id: quizSetId,
        pin: pin,
        host_user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Lỗi khi tạo phòng:', error)
      alert('Không thể tạo phòng chơi. Lỗi: ' + error.message)
      return
    }

    router.push(`/host/game/${data.id}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-3 py-1 bg-success-green/15 text-success-green rounded-full text-label-md font-medium">
            Đang hoạt động
          </span>
        )
      case 'archived':
        return (
          <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-label-md font-medium">
            Đã tắt
          </span>
        )
      default:
        return (
          <span className="px-3 py-1 bg-tertiary-fixed/60 text-on-tertiary-fixed rounded-full text-label-md font-medium">
            Đang soạn
          </span>
        )
    }
  }

  return (
    <div>
      <div className="mb-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-sm">
        <div>
          <h1 className="text-headline-md text-on-surface">Bộ câu hỏi</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Quản lý và tổ chức các phiên quiz nội bộ
          </p>
        </div>
        <Link
          href="/admin/quizzes/new"
          className="sm:hidden h-12 px-md bg-primary-container hover:bg-primary text-white text-label-md rounded-xl inline-flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tạo mới
        </Link>
      </div>

      {loading ? (
        <div className="bg-surface-white rounded-xl shadow-sm border border-border-subtle p-lg text-center text-on-surface-variant">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary-container rounded-full animate-spin mx-auto mb-sm" />
          Đang tải dữ liệu...
        </div>
      ) : quizSets.length === 0 ? (
        <div className="bg-soft-cream rounded-xl border border-primary-container/20 p-lg text-center">
          <span className="material-symbols-outlined text-primary-container text-5xl mb-sm">
            quiz
          </span>
          <p className="text-on-surface text-label-lg mb-sm">
            Chưa có bộ câu hỏi nào
          </p>
          <Link
            href="/admin/quizzes/new"
            className="inline-flex h-12 px-md bg-secondary-container text-white text-label-md rounded-xl items-center gap-1"
          >
            Tạo bộ câu hỏi đầu tiên
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
          {quizSets.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-surface-white rounded-xl shadow-sm border border-border-subtle border-t-4 border-t-primary-container p-md flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2 mb-sm">
                <h2 className="text-headline-sm text-on-surface leading-tight">
                  {quiz.name}
                </h2>
                {getStatusBadge(quiz.status)}
              </div>
              {quiz.description && (
                <p className="text-body-md text-on-surface-variant mb-sm line-clamp-2">
                  {quiz.description}
                </p>
              )}
              <div className="flex items-center gap-xs text-label-md text-on-surface-variant mb-md">
                <span className="material-symbols-outlined text-[18px]">
                  help
                </span>
                {quiz.questions?.length || 0} câu hỏi
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-sm border-t border-border-subtle">
                <button
                  onClick={() => startGame(quiz.id)}
                  disabled={quiz.status !== 'active'}
                  className={`flex-1 min-w-[100px] h-11 rounded-xl text-label-md font-semibold transition-colors ${
                    quiz.status === 'active'
                      ? 'bg-secondary-container text-white hover:brightness-110'
                      : 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed'
                  }`}
                >
                  Tổ chức
                </button>
                <Link
                  href={`/admin/quizzes/${quiz.id}`}
                  className="h-11 px-4 rounded-xl border border-primary-container text-primary-container text-label-md font-semibold inline-flex items-center hover:bg-surface-container-low transition-colors"
                >
                  Sửa
                </Link>
                <button
                  onClick={() => toggleStatus(quiz.id, quiz.status)}
                  className="h-11 px-3 rounded-xl text-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  {quiz.status === 'active' ? 'Tắt' : 'Bật'}
                </button>
                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="h-11 px-3 rounded-xl text-label-md text-error-red hover:bg-error-container/40 transition-colors"
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
