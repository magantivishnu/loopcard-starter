import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase, hasSupabase } from '@/lib/supabaseClient'
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js'

type Ctx = { ready: boolean; session: Session|null; user: User|null; signInWithGoogle: () => Promise<void>; signOut: () => Promise<void> }
const AuthContext = createContext<Ctx>({ ready: !hasSupabase, session: null, user: null, signInWithGoogle: async () => {}, signOut: async () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(!hasSupabase)
  const [session, setSession] = useState<Session|null>(null)

  useEffect(() => {
    if (!hasSupabase) return
    supabase.auth.getSession().then(({ data }: { data: { session: Session|null }}) => {
      setSession(data.session ?? null); setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e: AuthChangeEvent, s: Session|null) => setSession(s))
    return () => { sub.subscription.unsubscribe() }
  }, [])

  const signInWithGoogle = async () => { if (hasSupabase) await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } }) }
  const signOut = async () => { if (hasSupabase) await supabase.auth.signOut() }
  return <AuthContext.Provider value={{ ready, session, user: session?.user ?? null, signInWithGoogle, signOut }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
