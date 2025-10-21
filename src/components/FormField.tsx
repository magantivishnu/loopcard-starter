
import { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
}

export default function FormField({ label, children }: Props) {
  return (
    <div className="space-y-1">
      <label className="label">{label}</label>
      {children}
    </div>
  )
}
