import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase, hasSupabase } from '@/lib/supabaseClient'
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js'

type AuthContextType = {
  ready: boolean
  session: Session | null
  user: User | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  ready: !hasSupabase,
  session: null,
  user: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState<boolean>(!hasSupabase)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    if (!hasSupabase) return

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      setSession(data.session ?? null)
      setReady(true)
    })

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, sess: Session | null) => {
        setSession(sess)
      }
    )

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    if (!hasSupabase) return
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  const signOut = async () => {
    if (!hasSupabase) return
    await supabase.auth.signOut()
  }

  const user: User | null = session?.user ?? null

  return (
    <AuthContext.Provider value={{ ready, session, user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
