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
  // During build/server, don't crash the build – just warn.
  if (typeof window === 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('Supabase env vars missing at build/server time: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY')
  } else {
    // In the browser (runtime), fail fast so we notice misconfiguration.
    throw new Error('Missing Supabase environment variables')
  }
}

// After the guard above, we assert non-null for TypeScript.
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
