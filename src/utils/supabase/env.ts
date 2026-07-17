/**
 * Resolve Supabase public env for browser/server clients.
 * During Vercel/Next build, env may be unset — use placeholders so prerender
 * can finish. Runtime still needs real values set in the host (Vercel → Env).
 */
export function getSupabaseEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (url && anonKey) {
    return { url, anonKey }
  }

  // Allow Next.js build/prerender without crashing when env is not injected yet
  return {
    url: url || 'https://placeholder.supabase.co',
    anonKey: anonKey || 'public-anon-key',
  }
}

export function hasSupabaseEnv(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  return Boolean(
    url &&
      anonKey &&
      !url.includes('placeholder.supabase.co') &&
      anonKey !== 'public-anon-key'
  )
}
