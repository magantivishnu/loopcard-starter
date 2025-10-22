import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase, hasSupabase } from '@/lib/supabaseClient'
import { useAuth } from '@/auth/AuthProvider'

type Mode = 'email' | 'phone'
type Stage = 'collect' | 'verify'

export default function Signup() {
  const nav = useNavigate()
  const { user } = useAuth()
  const [mode, setMode] = useState<Mode>('email')
  const [stage, setStage] = useState<Stage>('collect')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => { if (user) nav('/dashboard', { replace: true }) }, [user, nav])

  if (!hasSupabase) {
    return (
      <div className="card space-y-4">
        <h1 className="text-xl font-semibold">Create account</h1>
        <p className="text-gray-600">Supabase isn’t configured. Try app without an account.</p>
        <Link to="/setup" className="btn btn-primary w-full">Continue without account</Link>
      </div>
    )
  }

  const resetFeedback = () => { setMsg(null); setErr(null) }

  const sendEmailOtp = async () => {
    resetFeedback()
    if (!email) return setErr('Enter a valid email.')
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/dashboard' }
    })
    setLoading(false)
    if (error) return setErr(error.message)
    setStage('verify')
    setMsg('We sent a code to your email.')
  }

  const sendPhoneOtp = async () => {
    resetFeedback()
    if (!phone) return setErr('Enter a valid phone (e.g. +91XXXXXXXXXX).')
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ phone })
    setLoading(false)
    if (error) return setErr(error.message)
    setStage('verify')
    setMsg('We sent an SMS code to your phone.')
  }

  const verifyEmailOtp = async () => {
    resetFeedback()
    if (!email || !code) return setErr('Enter the code.')
    setLoading(true)
    const { data, error } = await supabase.auth.verifyOtp({
      email, token: code, type: 'email'
    })
    setLoading(false)
    if (error) return setErr(error.message)
    if (data?.session) nav('/dashboard', { replace: true })
  }

  const verifyPhoneOtp = async () => {
    resetFeedback()
    if (!phone || !code) return setErr('Enter the code.')
    setLoading(true)
    const { data, error } = await supabase.auth.verifyOtp({
      phone, token: code, type: 'sms'
    })
    setLoading(false)
    if (error) return setErr(error.message)
    if (data?.session) nav('/dashboard', { replace: true })
  }

  const signInGoogle = async () => {
    resetFeedback()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
    if (error) setErr(error.message)
  }

  const signInApple = async () => {
    resetFeedback()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: { redirectTo: window.location.origin }
    })
    if (error) setErr(error.message)
  }

  const onSend = () => (mode === 'email' ? sendEmailOtp() : sendPhoneOtp())
  const onVerify = () => (mode === 'email' ? verifyEmailOtp() : verifyPhoneOtp())

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold text-center">Create your account</h1>

      {/* mode switch */}
      <div className="grid grid-cols-2 gap-2">
        <button className={`btn ${mode==='email' ? 'btn-primary' : ''}`} onClick={() => { setMode('email'); setStage('collect'); resetFeedback() }}>Email</button>
        <button className={`btn ${mode==='phone' ? 'btn-primary' : ''}`} onClick={() => { setMode('phone'); setStage('collect'); resetFeedback() }}>Mobile</button>
      </div>

      {/* collect identifier */}
      {stage === 'collect' && (
        <>
          {mode === 'email' ? (
            <div>
              <label className="text-sm block mb-1">Email</label>
              <input className="input" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          ) : (
            <div>
              <label className="text-sm block mb-1">Mobile (E.164)</label>
              <input className="input" type="tel" placeholder="+91XXXXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          )}
          <button className="btn btn-primary w-full" onClick={onSend} disabled={loading}>
            {loading ? 'Sending…' : 'Send OTP'}
          </button>
        </>
      )}

      {/* verify code */}
      {stage === 'verify' && (
        <>
          <div>
            <label className="text-sm block mb-1">Enter the code</label>
            <input className="input" inputMode="numeric" maxLength={8} placeholder="6-digit code" value={code} onChange={e => setCode(e.target.value)} />
          </div>
          <button className="btn btn-primary w-full" onClick={onVerify} disabled={loading}>
            {loading ? 'Verifying…' : 'Verify & Continue'}
          </button>
          <button className="btn w-full" onClick={() => { setStage('collect'); setCode('') }}>
            Resend / Change
          </button>
        </>
      )}

      {/* social sign-in */}
      <div className="text-center text-sm text-gray-500">or</div>
      <div className="grid gap-2">
        <button className="btn w-full" onClick={signInGoogle}>Continue with Google</button>
        <button className="btn w-full" onClick={signInApple}>Continue with Apple</button>
      </div>

      {msg ? <div className="text-green-600 text-sm">{msg}</div> : null}
      {err ? <div className="text-red-600 text-sm">{err}</div> : null}

      <div className="text-xs text-gray-500 text-center">
        By continuing, you agree to our Terms & Privacy.
      </div>
    </div>
  )
}
