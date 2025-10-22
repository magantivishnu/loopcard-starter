import { create } from 'zustand'

export type AnalyticsEventType =
  | 'view'               // public card viewed
  | 'click_call'
  | 'click_whatsapp'
  | 'click_instagram'
  | 'click_website'
  | 'click_qr_download'

export type AnalyticsEvent = {
  id: string
  type: AnalyticsEventType
  ts: string           // ISO timestamp
  slug?: string
  meta?: Record<string, any>
}

type State = {
  events: AnalyticsEvent[]
  log: (type: AnalyticsEventType, data?: Omit<AnalyticsEvent, 'id' | 'type' | 'ts'>) => void
  clear: () => void
}

const STORAGE_KEY = 'loopcard_events'
const MAX_EVENTS = 500
const isBrowser = typeof window !== 'undefined' && !!window.localStorage

const load = (): AnalyticsEvent[] => {
  if (!isBrowser) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : []
  } catch {
    return []
  }
}

const save = (events: AnalyticsEvent[]) => {
  if (!isBrowser) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

export const useAnalytics = create<State>((set, get) => ({
  events: load(),
  log: (type, data) => {
    const evt: AnalyticsEvent = {
      id: uid(),
      type,
      ts: new Date().toISOString(),
      slug: data?.slug,
      meta: data?.meta,
    }
    const next = [...get().events, evt].slice(-MAX_EVENTS)
    save(next)
    set({ events: next })
  },
  clear: () => {
    save([])
    set({ events: [] })
  },
}))

// Helpers (optional)
export const countByType = (type: AnalyticsEventType, sinceISO?: string) => {
  const list = useAnalytics.getState().events
  const since = sinceISO ? Date.parse(sinceISO) : 0
  return list.filter(e => e.type === type && Date.parse(e.ts) >= since).length
}

export const lastN = (n = 10) => {
  const list = useAnalytics.getState().events
  return list.slice(-n).reverse()
}
