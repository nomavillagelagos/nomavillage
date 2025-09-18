/// <reference types="node" />

// Optional: narrow down NEXT_PUBLIC env keys for client usage
// This helps TS understand process.env usage in client components
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  }
}
