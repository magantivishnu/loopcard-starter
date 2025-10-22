import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { hasSupabase } from '@/lib/supabaseClient'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { ready, user } = useAuth()
  if (!hasSupabase) return children
  if (!ready) return <div className="card">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}
