import { useParams } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

export default function PublicCard() {
  const { slug } = useParams()
  const { profile } = useAppStore()

  if (!profile) return <div className="card">No card configured yet.</div>
  if (slug && slug !== profile.slug) {
    // In a future step, we’ll fetch by slug (Supabase). For now, simple guard:
    return <div className="card">This slug doesn’t match the local profile. Open your configured card at <a className="text-brand-700 underline" href={profile.cardUrl}>{profile.cardUrl}</a>.</div>
  }

  return (
    <div className="card text-center space-y-3">
      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-gray-100">
        {profile.avatarDataUrl ? <img src={profile.avatarDataUrl} className="w-full h-full object-cover" /> : null}
      </div>
      <h1 className="text-xl font-semibold">{profile.fullName}</h1>
      <div className="text-gray-600">{profile.businessName}</div>
      <p className="text-sm">{profile.bio}</p>
      <div className="grid grid-cols-2 gap-2">
        <a className="btn btn-primary" href={`tel:${profile.phone}`}>Call</a>
        <a className="btn btn-primary" href={`https://wa.me/${profile.whatsapp}`} target="_blank">WhatsApp</a>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {profile.instagram ? <a className="btn" href={`https://instagram.com/${profile.instagram}`} target="_blank">Instagram</a> : null}
        {profile.website ? <a className="btn" href={profile.website} target="_blank">Website</a> : null}
      </div>
      <div className="text-xs text-gray-400">Powered by LoopCard</div>
    </div>
  )
}
