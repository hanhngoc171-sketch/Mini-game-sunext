import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { hasSupabaseEnv } from '@/utils/supabase/env'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    if (!hasSupabaseEnv()) {
      return NextResponse.json(
        {
          error:
            'Thiếu cấu hình Supabase trên server. Hãy thêm NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY rồi deploy lại.',
        },
        { status: 500 }
      )
    }

    const body = await request.json().catch(() => null)
    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const description =
      typeof body?.description === 'string' ? body.description.trim() : ''

    if (!name) {
      return NextResponse.json(
        { error: 'Vui lòng nhập tên bộ câu hỏi' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('quiz_sets')
      .insert({
        name,
        description: description || null,
        status: 'draft',
      })
      .select('id')
      .single()

    if (error) {
      // Fallback if status column not migrated yet
      if (error.message?.toLowerCase().includes('status')) {
        const fallback = await supabase
          .from('quiz_sets')
          .insert({
            name,
            description: description || null,
          })
          .select('id')
          .single()

        if (fallback.error) {
          return NextResponse.json(
            { error: fallback.error.message },
            { status: 400 }
          )
        }

        return NextResponse.json({ id: fallback.data.id })
      }

      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ id: data.id })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Không thể tạo bộ câu hỏi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
