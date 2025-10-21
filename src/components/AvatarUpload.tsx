
import { useRef } from 'react'

type Props = {
  value?: string
  onChange: (dataUrl?: string) => void
}

export default function AvatarUpload({ value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null)

  const onFile = async (file: File) => {
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
        {value ? <img src={value} className="w-full h-full object-cover" /> : null}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="btn"
          onClick={() => ref.current?.click()}
        >
          Upload
        </button>
        {value ? (
          <button type="button" className="btn" onClick={() => onChange(undefined)}>
            Remove
          </button>
        ) : null}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onFile(f)
        }}
      />
    </div>
  )
}
