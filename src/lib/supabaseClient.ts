import { createClient } from '@supabase/supabase-js'

const URL_RAW = import.meta.env.VITE_SUPABASE_URL?.trim()
const KEY_RAW = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

const isValidHttpUrl = (u?: string) => {
  if (!u) return false
  try {
    const x = new URL(u)
    return x.protocol === 'http:' || x.protocol === 'https:'
  } catch {
    return false
  }
}

export const hasSupabase = Boolean(URL_RAW && KEY_RAW && isValidHttpUrl(URL_RAW))

if (!hasSupabase && import.meta.env.DEV) {
  // Don’t crash app if misconfigured; just run in guest mode
  console.warn(
    '[LoopCard] Supabase disabled: missing/invalid VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY'
  )
}

export const supabase = hasSupabase
  ? createClient(URL_RAW!, KEY_RAW!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : (null as any)
