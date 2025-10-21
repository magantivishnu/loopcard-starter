
import { useAppStore } from '@/store/useAppStore'

export default function Settings() {
  const { profile, setProfile } = useAppStore()
  if (!profile) return <div className="card">No profile yet.</div>

  const clear = () => {
    localStorage.removeItem('loopcard_profile')
    setProfile({ ...profile, fullName: '', businessName: '', bio: '', phone: '', whatsapp: '', cardUrl: '' })
  }

  return (
    <div className="card space-y-3">
      <div className="font-semibold">Settings</div>
      <button className="btn" onClick={() => clear()}>Reset Profile (local)</button>
      <div className="text-sm text-gray-500">This demo stores data only in your browser (localStorage). Supabase can be wired later via <code>src/lib/supabaseClient.ts</code>.</div>
    </div>
  )
}
