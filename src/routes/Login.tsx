import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'
import { hasSupabase } from '@/lib/supabaseClient'

export default function Login() {
  const { user, signInWithGoogle } = useAuth()
  const nav = useNavigate()

  useEffect(() => { if (user) nav('/dashboard', { replace: true }) }, [user, nav])

  if (!hasSupabase) {
    return (
      <div className="card space-y-4 text-center">
        <h1 className="text-xl font-semibold">Login</h1>
        <p className="text-gray-600">Supabase not configured. Continue as guest.</p>
        <Link to="/setup" className="btn btn-primary">Continue Without Account</Link>
        <div className="text-sm text-gray-500">To enable Google login, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.</div>
      </div>
    )
  }

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold">Welcome</h1>
      <p className="text-gray-600">Sign in to save your profile across devices.</p>
      <button className="btn btn-primary w-full" onClick={signInWithGoogle}>Continue with Google</button>
      <div className="text-sm text-gray-500 text-center">
        Prefer to try without signing in? <Link to="/setup" className="text-brand-700 underline">Create a card locally</Link>
      </div>
    </div>
  )
}
