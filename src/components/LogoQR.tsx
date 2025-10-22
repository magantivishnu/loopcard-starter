export default function LogoQR({ className = "w-14 h-14 text-white/95" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="currentColor" opacity="0.18" />
      <rect x="10" y="10" width="16" height="16" rx="4" fill="currentColor" />
      <rect x="38" y="10" width="16" height="16" rx="4" fill="currentColor" />
      <rect x="38" y="38" width="16" height="16" rx="4" fill="currentColor" />
      <circle cx="18" cy="46" r="8" fill="currentColor" />
    </svg>
  )
}
