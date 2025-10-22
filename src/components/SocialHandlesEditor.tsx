import { useId } from 'react'
import type { SocialItem, SocialPlatform } from '@/store/useAppStore'

const PLATFORMS: { label: string; value: SocialPlatform; placeholder: string }[] = [
  { label: 'Instagram', value: 'instagram', placeholder: 'username' },
  { label: 'Facebook',  value: 'facebook',  placeholder: 'username or page' },
  { label: 'Threads',   value: 'threads',   placeholder: 'username' },
  { label: 'Snapchat',  value: 'snapchat',  placeholder: 'username' },
  { label: 'X (Twitter)', value: 'x',       placeholder: 'username' },
  { label: 'Website',   value: 'website',   placeholder: 'https://example.com' },
  { label: 'Email',     value: 'email',     placeholder: 'you@example.com' },
]

type Props = {
  items: SocialItem[]
  onChange: (next: SocialItem[]) => void
}

export default function SocialHandlesEditor({ items, onChange }: Props) {
  const uid = useId()

  const update = (idx: number, patch: Partial<SocialItem>) => {
    const next = items.slice()
    next[idx] = { ...next[idx], ...patch }
    onChange(next)
  }

  const add = () => {
    const id = `${uid}-${Math.random().toString(36).slice(2)}`
    onChange([...items, { id, platform: 'instagram', handleOrUrl: '', visible: true }])
  }

  const remove = (idx: number) => {
    const next = items.slice()
    next.splice(idx, 1)
    onChange(next)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="label">Social Handles</div>
        <button type="button" className="btn" onClick={add}>Add Social</button>
      </div>

      {items.length === 0 ? <div className="text-sm text-gray-500">No socials yet.</div> : null}

      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={it.id} className="grid grid-cols-12 gap-2 items-center">
            <select
              className="input col-span-3"
              value={it.platform}
              onChange={e => update(idx, { platform: e.target.value as SocialItem['platform'] })}
            >
              {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>

            <input
              className="input col-span-7"
              placeholder={PLATFORMS.find(p => p.value === it.platform)?.placeholder}
              value={it.handleOrUrl}
              onChange={e => update(idx, { handleOrUrl: e.target.value })}
            />

            <label className="col-span-1 flex items-center justify-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={it.visible}
                onChange={e => update(idx, { visible: e.target.checked })}
              />
              <span className="hidden sm:inline">Show</span>
            </label>

            <button type="button" className="btn col-span-1" onClick={() => remove(idx)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}
