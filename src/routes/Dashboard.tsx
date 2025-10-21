import { Link } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import QRCard from '@/components/QRCard'

export default function Dashboard() {
  const { profile } = useAppStore()
  if (!profile) {
    return <div className="card">No profile yet. <Link to="/setup" className="text-brand-700 underline">Create one</Link>.</div>
  }
  const publicHref = `/card/${profile.slug}`
  return (
    <div className="space-y-4">
      <div className="card flex items-center gap-3">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
          {profile.avatarDataUrl ? <img src={profile.avatarDataUrl} className="w-full h-full object-cover" /> : null}
        </div>
        <div className="flex-1">
          <div className="font-semibold">{profile.fullName} — {profile.businessName}</div>
          <div className="text-sm text-gray-600">{profile.bio}</div>
          <div className="text-sm text-gray-600">Public: <a className="text-brand-700 underline" href={profile.cardUrl} target="_blank">{profile.cardUrl}</a></div>
        </div>
        <Link to={publicHref} className="btn">Open Card</Link>
      </div>

      <QRCard url={profile.cardUrl} />

      <div className="card">
        <div className="font-medium mb-2">Quick Actions</div>
        <div className="grid grid-cols-2 gap-2">
          <a className="btn" href={`tel:${profile.phone}`}>Call</a>
          <a className="btn" href={`https://wa.me/${profile.whatsapp}`} target="_blank">WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
