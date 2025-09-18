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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
