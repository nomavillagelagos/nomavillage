import { createClient } from '@supabase/supabase-js'

// Types: Define a minimal shape if needed later
export type NomaSignupRow = {
  id?: number
  email: string
  is_entrepreneur?: string | null
  colive_prefer?: string | null
  first_name: string
  last_name: string
  country_code?: string | null
  phone_numb?: string | null
  created_at?: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  // This throws at runtime on the client if env vars are missing
  // Keep it non-fatal in production by logging only
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
