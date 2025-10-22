import { ReactNode } from 'react'

type Props = {
  href?: string
  onClick?: () => void
  label: string           // accessible name
  newTab?: boolean
  children: ReactNode     // the icon
  primary?: boolean
}

export default function IconButton({ href, onClick, label, newTab, children, primary }: Props) {
  const cls = `icon-btn ${primary ? 'icon-btn-primary' : ''}`
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={label}
        className={cls}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noreferrer' : undefined}
      >
        <span className="sr-only">{label}</span>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} className={cls}>
      <span className="sr-only">{label}</span>
      {children}
    </button>
  )
}
