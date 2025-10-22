import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, Profile, SocialItem, Category } from '@/store/useAppStore'
import FormField from '@/components/FormField'
import AvatarUpload from '@/components/AvatarUpload'
import ProgressSteps from '@/components/ProgressSteps'
import SocialHandlesEditor from '@/components/SocialHandlesEditor'

type Step1 = {
  category: Category
  fullName: string
  businessName?: string
  role?: string
  bio?: string
  avatarDataUrl?: string
  companyLogoDataUrl?: string
}
type Step2 = {
  phone?: string
  whatsapp?: string
  email?: string
  showPhone: boolean
  showWhatsApp: boolean
  showEmail: boolean
}
type Step3 = { slug: string; socials: SocialItem[] }

const TOTAL = 3

// Mandatories (as requested): Full Name AND at least one of Phone/WhatsApp, plus Slug
const REQUIRED = {
  fullName: true,
  primaryContact: true,
  slug: true,
}

export default function SetupWizard() {
  const { setProfile } = useAppStore()
  const nav = useNavigate()

  const [step, setStep] = useState(1)
  const [s1, setS1] = useState<Step1>({
    category: 'individual',
    fullName: '',
    businessName: '',
    role: '',
    bio: '',
    avatarDataUrl: undefined,
    companyLogoDataUrl: undefined,
  })
  const [s2, setS2] = useState<Step2>({
    phone: '',
    whatsapp: '',
    email: '',
    showPhone: true,
    showWhatsApp: true,
    showEmail: false,
  })
  const [s3, setS3] = useState<Step3>({ slug: 'demo', socials: [] })

  const cardUrl = useMemo(() => {
    const base = typeof location !== 'undefined' ? location.origin : ''
    return `${base}/card/${(s3.slug || 'demo').trim()}`
  }, [s3.slug])

  const valid1 = (!REQUIRED.fullName || s1.fullName.trim().length > 0)
  const valid2 = (!REQUIRED.primaryContact || Boolean((s2.phone && s2.phone.trim()) || (s2.whatsapp && s2.whatsapp.trim())))
  const valid3 = (!REQUIRED.slug || s3.slug.trim().length > 0)

  const next = () => {
    if (step === 1 && !valid1) return alert('Please add your Full Name.')
    if (step === 2 && !valid2) return alert('Add at least one primary contact: Phone or WhatsApp.')
    if (step < TOTAL) setStep(step + 1)
  }
  const back = () => setStep(Math.max(1, step - 1))

  const finish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid3) return alert('Please choose a public slug.')

    const payload: Profile = {
      category: s1.category,
      fullName: s1.fullName,
      businessName: s1.businessName || undefined,
      role: s1.role || undefined,
      bio: s1.bio || undefined,
      avatarDataUrl: s1.avatarDataUrl,
      companyLogoDataUrl: s1.companyLogoDataUrl,
      phone: s2.phone || undefined,
      whatsapp: s2.whatsapp || undefined,
      email: s2.email || undefined,
      showPhone: s2.showPhone,
      showWhatsApp: s2.showWhatsApp,
      showEmail: s2.showEmail,
      socials: s3.socials,
      slug: s3.slug,
      cardUrl,
    }

    setProfile(payload)
    nav('/dashboard')
  }

  const isBiz = s1.category === 'small' || s1.category === 'enterprise'

  return (
    <form onSubmit={finish} className="card space-y-4">
      <h1 className="text-xl font-semibold">Create Your LoopCard</h1>
      <ProgressSteps step={step} total={TOTAL} />

      {step === 1 && (
        <div className="space-y-4">
          {/* Category */}
          <FormField label="I am a">
            <select
              className="input"
              value={s1.category}
              onChange={e => setS1({ ...s1, category: e.target.value as Category })}
            >
              <option value="individual">Individual</option>
              <option value="small">Small Business</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </FormField>

          {/* Profile picture (optional but recommended) */}
          <FormField label="Profile Picture">
            <AvatarUpload value={s1.avatarDataUrl} onChange={(v) => setS1({ ...s1, avatarDataUrl: v })} />
          </FormField>

          {/* Company logo & role only shown for small/enterprise */}
          {isBiz && (
            <>
              <FormField label="Company Logo">
                <AvatarUpload value={s1.companyLogoDataUrl} onChange={(v) => setS1({ ...s1, companyLogoDataUrl: v })} />
              </FormField>
              <FormField label="Role (e.g., Founder, Sales Manager)">
                <input className="input" value={s1.role} onChange={e => setS1({ ...s1, role: e.target.value })} />
              </FormField>
            </>
          )}

          {/* Name and optional business info */}
          <FormField label={`Full Name${REQUIRED.fullName ? ' *' : ''}`}>
            <input className="input" value={s1.fullName} onChange={e => setS1({ ...s1, fullName: e.target.value })} />
          </FormField>

          <FormField label="Company / Business Name (optional)">
            <input className="input" value={s1.businessName} onChange={e => setS1({ ...s1, businessName: e.target.value })} />
          </FormField>

          <FormField label="Short Bio (optional)">
            <textarea className="input" value={s1.bio} onChange={e => setS1({ ...s1, bio: e.target.value })} />
          </FormField>

          <div className="flex gap-2">
            <button type="button" className="btn" disabled>Back</button>
            <button type="button" className="btn btn-primary flex-1" onClick={next} disabled={!valid1}>Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <FormField label={`Telephone${REQUIRED.primaryContact ? ' * (Phone or WhatsApp)' : ''}`}>
            <input className="input" value={s2.phone} onChange={e => setS2({ ...s2, phone: e.target.value })} />
          </FormField>
          <FormField label={`WhatsApp${REQUIRED.primaryContact ? ' * (Phone or WhatsApp)' : ''}`}>
            <input className="input" value={s2.whatsapp} onChange={e => setS2({ ...s2, whatsapp: e.target.value })} />
          </FormField>
          <FormField label="Email (optional)">
            <input className="input" type="email" value={s2.email} onChange={e => setS2({ ...s2, email: e.target.value })} />
          </FormField>

          {/* Visibility toggles */}
          <div className="grid grid-cols-3 gap-2 text-sm">
            <label className="flex items-center gap-2 border rounded-xl p-2">
              <input type="checkbox" checked={s2.showPhone} onChange={e => setS2({ ...s2, showPhone: e.target.checked })} />
              Show Call
            </label>
            <label className="flex items-center gap-2 border rounded-xl p-2">
              <input type="checkbox" checked={s2.showWhatsApp} onChange={e => setS2({ ...s2, showWhatsApp: e.target.checked })} />
              Show WhatsApp
            </label>
            <label className="flex items-center gap-2 border rounded-xl p-2">
              <input type="checkbox" checked={s2.showEmail} onChange={e => setS2({ ...s2, showEmail: e.target.checked })} />
              Show Email
            </label>
          </div>

          <div className="flex gap-2">
            <button type="button" className="btn" onClick={back}>Back</button>
            <button type="button" className="btn btn-primary flex-1" onClick={next} disabled={!valid2}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <SocialHandlesEditor
            items={s3.socials}
            onChange={(next) => setS3({ ...s3, socials: next })}
          />

          <FormField label={`Public Slug${REQUIRED.slug ? ' *' : ''} (e.g., vishnu)`}>
            <input
              className="input"
              value={s3.slug}
              onChange={e => setS3({ ...s3, slug: e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase() })}
            />
          </FormField>

          <div className="text-sm text-gray-600">Public URL (auto): <span className="font-medium">{cardUrl}</span></div>

          <div className="flex gap-2">
            <button type="button" className="btn" onClick={back}>Back</button>
            <button className="btn btn-primary flex-1" disabled={!valid3}>Finish & Go to Dashboard</button>
          </div>
        </div>
      )}
    </form>
  )
}
