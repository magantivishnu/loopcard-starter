import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { hasSupabase } from '@/lib/supabaseClient'

/**
 * Protects a route when Supabase is configured.
 * If Supabase isn't configured, route is always allowed (guest mode).
 */
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { ready, user } = useAuth()

  if (!hasSupabase) return children // guest mode, don't block
  if (!ready) return <div className="card">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}
