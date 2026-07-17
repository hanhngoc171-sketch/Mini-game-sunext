import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './supabase'
import { getSupabaseEnv } from '@/utils/supabase/env'

let _supabase: SupabaseClient<Database> | null = null

export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    if (!_supabase) {
      const { url, anonKey } = getSupabaseEnv()
      _supabase = createClient<Database>(url, anonKey)
    }
    const value = Reflect.get(_supabase, prop, receiver)
    return typeof value === 'function' ? value.bind(_supabase) : value
  },
})

export type Participant = Database['public']['Tables']['participants']['Row']

export type Choice = Database['public']['Tables']['choices']['Row']

export type Question = Database['public']['Tables']['questions']['Row'] & {
  choices: Choice[]
}

export type QuizSet = Database['public']['Tables']['quiz_sets']['Row'] & {
  questions: Question[]
}

export type Answer = Database['public']['Tables']['answers']['Row']

export type Game = Database['public']['Tables']['games']['Row']

export type GameResult = Database['public']['Views']['game_results']['Row']
