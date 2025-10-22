import { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, hasSupabase } from '../lib/supabaseClient';

type AuthCtx = { session: Session | null; user: User | null; loading: boolean; signOut: () => Promise<void>; };
const Ctx = createContext<AuthCtx>({ session: null, user: null, loading: true, signOut: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!hasSupabase) {
    return <div style={{padding:16}}>Supabase isn’t configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</div>;
  }

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase!.auth.getSession().then(({ data }) => { setSession(data.session ?? null); setLoading(false); });
    const { data: sub } = supabase!.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <Ctx.Provider value={{ session, user: session?.user ?? null, loading, signOut: () => supabase!.auth.signOut() }}>
      {children}
    </Ctx.Provider>
  );
}
export const useAuth = () => useContext(Ctx);
