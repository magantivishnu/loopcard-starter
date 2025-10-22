import { Link } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import QRCard from '@/components/QRCard'
import { useAnalytics, countByType, lastN } from '@/store/useAnalytics'
import IconButton from '@/components/IconButton'
import { PhoneIcon, WhatsAppIcon, MailIcon } from '@/components/Icons'

export default function Dashboard() {
  const { profile } = useAppStore()
  const log = useAnalytics(s => s.log)
  const events = useAnalytics(s => s.events)

  if (!profile) {
    return (
      <div className="card">
        No profile yet.{' '}
        <Link to="/setup" className="text-brand-700 underline">
          Create one
        </Link>
        .
      </div>
    )
  }

  const publicHref = `/card/${profile.slug}`
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const views24 = countByType('view', since24h)
  const call24 = countByType('click_call', since24h)
  const wa24 = countByType('click_whatsapp', since24h)

  const onCall = () => {
    if (!profile.phone) return
    log('click_call', { slug: profile.slug, meta: { phone: profile.phone, source: 'dashboard' } })
  }
  const onWhatsApp = () => {
    if (!profile.whatsapp) return
    log('click_whatsapp', { slug: profile.slug, meta: { wa: profile.whatsapp, source: 'dashboard' } })
  }

  return (
    <div className="space-y-4">
      {/* Summary header */}
      <div className="card flex items-center gap-3">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
          {profile.avatarDataUrl ? (
            <img src={profile.avatarDataUrl} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <div className="flex-1">
          <div className="font-semibold">
            {profile.fullName}
            {profile.businessName ? ` — ${profile.businessName}` : ''}
          </div>
          {profile.bio ? <div className="text-sm text-gray-600">{profile.bio}</div> : null}
          <div className="text-sm text-gray-600">
            Public:{' '}
            <a className="text-brand-700 underline" href={profile.cardUrl} target="_blank" rel="noreferrer">
              {profile.cardUrl}
            </a>
          </div>
        </div>
        <Link to={publicHref} className="btn">
          Open Card
        </Link>
      </div>

      {/* QR */}
      <QRCard url={profile.cardUrl} />

      {/* Icon-only quick actions */}
      <div className="card">
        <div className="font-medium mb-2">Quick Actions</div>
        <div className="flex items-center gap-3">
          {profile.showPhone && profile.phone ? (
            <IconButton href={`tel:${profile.phone}`} label="Call" onClick={onCall}>
              <PhoneIcon className="w-6 h-6" />
            </IconButton>
          ) : null}

          {profile.showWhatsApp && profile.whatsapp ? (
            <IconButton href={`https://wa.me/${profile.whatsapp}`} label="WhatsApp" newTab onClick={onWhatsApp}>
              <WhatsAppIcon className="w-6 h-6" />
            </IconButton>
          ) : null}

          {profile.showEmail && profile.email ? (
            <IconButton href={`mailto:${profile.email}`} label="Email">
              <MailIcon className="w-6 h-6" />
            </IconButton>
          ) : null}
        </div>
      </div>

      {/* Lightweight analytics */}
      <div className="card space-y-3">
        <div className="font-medium">Analytics (local-only)</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl border">
            <div className="text-2xl font-semibold">{views24}</div>
            <div className="text-xs text-gray-500">Views (24h)</div>
          </div>
          <div className="p-3 rounded-xl border">
            <div className="text-2xl font-semibold">{call24}</div>
            <div className="text-xs text-gray-500">Calls (24h)</div>
          </div>
          <div className="p-3 rounded-xl border">
            <div className="text-2xl font-semibold">{wa24}</div>
            <div className="text-xs text-gray-500">WhatsApp (24h)</div>
          </div>
        </div>

        <div className="text-sm font-medium mt-2">Recent events</div>
        <ul className="text-sm max-h-48 overflow-auto border rounded-xl divide-y">
          {lastN(12).map(e => (
            <li key={e.id} className="px-3 py-2 flex items-center justify-between">
              <span className="capitalize">{e.type.replace('click_', '').replace('_', ' ')}</span>
              <span className="text-xs text-gray-500">{new Date(e.ts).toLocaleString()}</span>
            </li>
          ))}
          {events.length === 0 ? <li className="px-3 py-2 text-gray-500">No events yet</li> : null}
        </ul>
      </div>
    </div>
  )
}
