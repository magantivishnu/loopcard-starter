import { create } from 'zustand'

const isBrowser = typeof window !== 'undefined' && !!window.localStorage

export type Profile = {
  fullName: string
  businessName: string
  bio: string
  phone: string
  whatsapp: string
  instagram?: string
  email?: string
  website?: string
  slug: string
  cardUrl: string
  avatarDataUrl?: string
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

// hydrate once (browser only)
if (isBrowser) {
  const raw = localStorage.getItem('loopcard_profile')
  if (raw) {
    try { useAppStore.setState({ profile: JSON.parse(raw) }) } catch {}
  }
}
