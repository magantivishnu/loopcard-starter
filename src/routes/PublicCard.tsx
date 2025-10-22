import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { useAnalytics } from '@/store/useAnalytics'

import {
  PhoneIcon, WhatsAppIcon, MailIcon, InstagramIcon,
  FacebookIcon, SnapchatIcon, XIcon, ThreadsIcon, GlobeIcon
} from '@/components/Icons'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function socialHref(platform: string, value: string) {
  switch (platform) {
    case 'instagram': return `https://instagram.com/${value.replace(/^@/, '')}`
    case 'facebook':  return `https://facebook.com/${value}`
    case 'threads':   return `https://threads.net/@${value.replace(/^@/, '')}`
    case 'snapchat':  return `https://snapchat.com/add/${value}`
    case 'x':         return `https://x.com/${value.replace(/^@/, '')}`
    case 'website':   return value.startsWith('http') ? value : `https://${value}`
    case 'email':     return `mailto:${value}`
    default:          return '#'
  }
}

function socialIcon(platform: string) {
  switch (platform) {
    case 'instagram': return <InstagramIcon />
    case 'facebook':  return <FacebookIcon />
    case 'threads':   return <ThreadsIcon />
    case 'snapchat':  return <SnapchatIcon />
    case 'x':         return <XIcon />
    case 'website':   return <GlobeIcon />
    case 'email':     return <MailIcon />
    default:          return null
  }
}

export default function PublicCard() {
  const beltRef = useScrollReveal()
  const { slug } = useParams()
  const { profile } = useAppStore()
  const log = useAnalytics(s => s.log)

  useEffect(() => {
    log('view', { slug: slug ?? profile?.slug })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  if (!profile) return <div className="card">No card configured yet.</div>
  if (slug && slug !== profile.slug) {
    return (
      <div className="card">
        This slug doesn’t match the local profile. Open your configured card at{' '}
        <a className="text-brand-700 underline" href={profile.cardUrl}>{profile.cardUrl}</a>.
      </div>
    )
  }

  const showCall = profile.showPhone && profile.phone
  const showWA   = profile.showWhatsApp && profile.whatsapp
  const showMail = profile.showEmail && profile.email
  const isBiz    = profile.category === 'small' || profile.category === 'enterprise'

  return (
    <div className="card text-center space-y-4">
      {/* Profile Picture */}
      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-gray-100">
        {profile.avatarDataUrl ? (
          <img src={profile.avatarDataUrl} className="w-full h-full object-cover" />
        ) : null}
      </div>

      <h1 className="text-xl font-semibold">{profile.fullName}</h1>

      {/* Company logo + role for business users */}
      {isBiz && (profile.companyLogoDataUrl || profile.businessName || profile.role) ? (
        <div className="flex flex-col items-center gap-1">
          {profile.companyLogoDataUrl ? (
            <div className="w-14 h-14 rounded-xl overflow-hidden border">
              <img src={profile.companyLogoDataUrl} className="w-full h-full object-cover" />
            </div>
          ) : null}
          {profile.businessName ? (
            <div className="text-gray-700 font-medium text-sm">{profile.businessName}</div>
          ) : null}
          {profile.role ? <div className="text-gray-500 text-xs">{profile.role}</div> : null}
        </div>
      ) : null}

      {profile.bio ? <p className="text-sm">{profile.bio}</p> : null}

      {/* Contact icons row */}
      {(showCall || showWA || showMail) && (
        <div className="flex justify-center gap-3 mt-3">
          {showCall ? (
            <div className="icon-btn whatsapp">
              <a href={`tel:${profile.phone}`} aria-label="Call">
                <PhoneIcon />
              </a>
            </div>
          ) : null}
          {showWA ? (
            <div className="icon-btn whatsapp">
              <a href={`https://wa.me/${profile.whatsapp}`} aria-label="WhatsApp" target="_blank" rel="noreferrer">
                <WhatsAppIcon />
              </a>
            </div>
          ) : null}
          {showMail ? (
            <div className="icon-btn email">
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <MailIcon />
              </a>
            </div>
          ) : null}
        </div>
      )}

      {/* --- Compact social belt --- */}
      {profile.socials.length > 0 && (
  <div ref={beltRef} className="social-belt animate-on-scroll">
    {profile.socials
      .filter(s => s.visible && s.handleOrUrl)
      .map(s => (
        <a
          key={s.id}
          href={socialHref(s.platform, s.handleOrUrl)}
          aria-label={s.platform}
          target="_blank"
          rel="noreferrer"
          className={`icon-btn ${s.platform}`}
        >
          {socialIcon(s.platform)}
        </a>
      ))}
  </div>
)}


      <div className="text-xs text-gray-400 mt-2">Powered by LoopCard</div>
    </div>
  )
}
