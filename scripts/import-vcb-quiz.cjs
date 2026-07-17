/**
 * Import Vietcombank Data Decision Matrix into Supabase.
 * Usage: node scripts/import-vcb-quiz.cjs
 */
const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env.local')
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    })
)

const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const questions = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'vcb_quiz.json'), 'utf8')
)

const QUIZ_NAME = 'Vietcombank Data Decision Matrix'
const QUIZ_DESC =
  'Bộ trắc nghiệm phân loại cấp dữ liệu VCB (24 tình huống). Import từ Bo_trac_nghiem_VCB_tich_hop_dap_an.xlsx'

async function req(pathname, { method = 'GET', token, body, prefer } = {}) {
  const headers = {
    apikey: key,
    Authorization: `Bearer ${token || key}`,
  }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (prefer) headers.Prefer = prefer
  const res = await fetch(`${url}${pathname}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  return { ok: res.ok, status: res.status, data }
}

async function main() {
  console.log('Auth: anonymous...')
  const authRes = await fetch(`${url}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: {} }),
  })
  const authJson = await authRes.json()
  const token = authJson.access_token
  if (!token) {
    console.error('Auth failed', authJson)
    process.exit(1)
  }
  console.log('Authenticated OK')

  let quizId
  const existing = await req(
    `/rest/v1/quiz_sets?name=eq.${encodeURIComponent(QUIZ_NAME)}&select=id,status`,
    { token }
  )
  if (Array.isArray(existing.data) && existing.data[0]) {
    quizId = existing.data[0].id
    console.log('Found quiz set', quizId)
    await req(`/rest/v1/quiz_sets?id=eq.${quizId}`, {
      method: 'PATCH',
      token,
      body: { status: 'active', description: QUIZ_DESC, name: QUIZ_NAME },
      prefer: 'return=minimal',
    })
  } else {
    const created = await req('/rest/v1/quiz_sets', {
      method: 'POST',
      token,
      body: { name: QUIZ_NAME, description: QUIZ_DESC, status: 'active' },
      prefer: 'return=representation',
    })
    if (!created.ok) {
      console.error('Create quiz_set failed', created.status, created.data)
      process.exit(1)
    }
    quizId = created.data[0].id
    console.log('Created quiz set', quizId)
  }

  const qCheck = await req(
    `/rest/v1/questions?quiz_set_id=eq.${quizId}&select=id`,
    { token }
  )
  const existingCount = Array.isArray(qCheck.data) ? qCheck.data.length : 0
  if (existingCount > 0) {
    console.log(`Deleting ${existingCount} old questions for re-import...`)
    const del = await req(`/rest/v1/questions?quiz_set_id=eq.${quizId}`, {
      method: 'DELETE',
      token,
      prefer: 'return=minimal',
    })
    if (!del.ok) {
      console.error('Delete failed', del.status, del.data)
      process.exit(1)
    }
  }

  let ok = 0
  for (const q of questions) {
    const createdQ = await req('/rest/v1/questions', {
      method: 'POST',
      token,
      body: {
        body: q.body,
        order: q.order,
        quiz_set_id: quizId,
        time_limit: 20,
        base_score: 100,
      },
      prefer: 'return=representation',
    })
    if (!createdQ.ok) {
      console.error('Question failed', q.order, createdQ.status, createdQ.data)
      process.exit(1)
    }
    const qid = createdQ.data[0].id
    const choices = q.choices.map((c) => ({
      question_id: qid,
      body: c.body,
      is_correct: c.is_correct,
    }))
    const createdC = await req('/rest/v1/choices', {
      method: 'POST',
      token,
      body: choices,
      prefer: 'return=minimal',
    })
    if (!createdC.ok) {
      console.error('Choices failed', q.order, createdC.status, createdC.data)
      process.exit(1)
    }
    ok += 1
    console.log(`✓ Q${q.order} (${q.code}) đáp án ${q.answer}`)
  }

  console.log(`\nXong! Đã import ${ok}/${questions.length} câu.`)
  console.log(`Tên bộ: ${QUIZ_NAME}`)
  console.log(`ID: ${quizId}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
