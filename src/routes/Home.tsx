import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import LogoQR from '@/components/LogoQR'

export default function Home() {
  const { profile } = useAppStore()
  const nav = useNavigate()

  const onPrimary = () => nav('/signup') // go to the new Signup screen

  const onLoadExisting = () => {
    if (profile) nav('/dashboard')
    else nav('/setup')
  }

  return (
    <div className="hero-gradient rounded-2xl p-6 min-h-[calc(100vh-2rem)] flex items-center justify-center text-center">
      <div className="max-w-xl w-full space-y-6">
        <div className="flex justify-center">
          <LogoQR className="w-16 h-16 text-white/95 drop-shadow" />
        </div>

        <h1 className="hero-title">LoopCard Pro</h1>
        <p className="hero-subtitle">AI-powered digital cards. Team-ready. Offline-first.</p>

        <div className="grid gap-3">
          <button className="btn btn-primary btn-lg w-full" onClick={onPrimary}>
            Create Free LoopCard
          </button>
          <button className="btn btn-lg btn-contrast w-full" onClick={onLoadExisting}>
            Load Existing Card
          </button>
        </div>

        <ul className="text-left mx-auto grid gap-2 mt-4 max-w-sm text-white/95 text-sm">
          <li className="flex items-center gap-2"><span>✨</span><span>AI-generated taglines</span></li>
          <li className="flex items-center gap-2"><span>👥</span><span>Team management included</span></li>
          <li className="flex items-center gap-2"><span>📊</span><span>Lead capture & analytics</span></li>
          <li className="flex items-center gap-2"><span>🔴</span><span>Works offline</span></li>
        </ul>
      </div>
    </div>
  )
}
