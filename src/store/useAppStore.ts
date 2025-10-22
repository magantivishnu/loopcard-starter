import { create } from 'zustand'

const isBrowser = typeof window !== 'undefined' && !!window.localStorage

export type Category = 'individual' | 'small' | 'enterprise'
export type SocialPlatform = 'instagram' | 'facebook' | 'threads' | 'snapchat' | 'email' | 'website' | 'x'
export type SocialItem = {
  id: string
  platform: SocialPlatform
  handleOrUrl: string
  visible: boolean
}

export type Profile = {
  // identity
  category: Category
  fullName: string

  // company/info (optional for all; recommended for small/enterprise)
  businessName?: string
  role?: string
  bio?: string

  // contacts (at least one of phone/whatsapp is required)
  phone?: string
  whatsapp?: string
  email?: string

  // visibility toggles
  showPhone: boolean
  showWhatsApp: boolean
  showEmail: boolean

  // socials (user can add/remove/toggle)
  socials: SocialItem[]

  // public identity
  slug: string
  cardUrl: string

  // media
  avatarDataUrl?: string          // profile picture
  companyLogoDataUrl?: string     // company logo for small/enterprise
}

type State = {
  profile: Profile | null
  setProfile: (p: Profile) => void
}

export const useAppStore = create<State>((set) => ({
  profile: null,
  setProfile: (p) => {
    if (isBrowser) localStorage.setItem('loopcard_profile', JSON.stringify(p))
    set({ profile: p })
  }
}))

if (isBrowser) {
  const raw = localStorage.getItem('loopcard_profile')
  if (raw) {
    try { useAppStore.setState({ profile: JSON.parse(raw) }) } catch {}
  }
}
