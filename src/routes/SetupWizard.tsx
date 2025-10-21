import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, Profile } from '@/store/useAppStore'
import FormField from '@/components/FormField'
import AvatarUpload from '@/components/AvatarUpload'

export default function SetupWizard() {
  const { setProfile } = useAppStore()
  const nav = useNavigate()
  const [form, setForm] = useState<Omit<Profile, 'cardUrl'>>({
    fullName: '',
    businessName: '',
    bio: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    email: '',
    website: '',
    slug: 'demo',
    avatarDataUrl: undefined
  })

  const cardUrl = useMemo(() => {
    const base = typeof location !== 'undefined' ? location.origin : ''
    return `${base}/card/${(form.slug || 'demo').trim()}`
  }, [form.slug])

  const requiredOk =
    form.fullName.trim() &&
    form.businessName.trim() &&
    form.bio.trim() &&
    form.phone.trim() &&
    form.whatsapp.trim() &&
    form.slug.trim()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!requiredOk) return alert('Please fill all required fields.')
    const payload: Profile = { ...form, cardUrl }
    setProfile(payload)
    nav('/dashboard')
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4">
      <h1 className="text-xl font-semibold">Setup Wizard</h1>

      <AvatarUpload value={form.avatarDataUrl} onChange={(v) => setForm({ ...form, avatarDataUrl: v })} />

      <FormField label="Full Name *">
        <input className="input" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
      </FormField>

      <FormField label="Business Name *">
        <input className="input" value={form.businessName} onChange={e => setForm({ ...form, businessName: e.target.value })} />
      </FormField>

      <FormField label="Bio *">
        <textarea className="input" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
      </FormField>

      <FormField label="Phone *">
        <input className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      </FormField>

      <FormField label="WhatsApp *">
        <input className="input" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField label="Instagram">
          <input className="input" value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} />
        </FormField>
        <FormField label="Email">
          <input className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField label="Website">
          <input className="input" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
        </FormField>
        <FormField label="Public Slug * (e.g., vishnu)">
          <input className="input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase() })} />
        </FormField>
      </div>

      <div className="text-sm text-gray-600">Public URL (auto): <span className="font-medium">{cardUrl}</span></div>

      <button className="btn btn-primary w-full" disabled={!requiredOk}>
        Save & Continue
      </button>
    </form>
  )
}
