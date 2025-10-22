// Simple inline SVG icon set (no external deps)
type Props = { className?: string }

export const PhoneIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M3 5c0-1.1.9-2 2-2h2c.9 0 1.7.6 1.9 1.5l.7 2.8c.2.8-.1 1.6-.7 2.1L8 10c1.4 2.8 3.7 5.1 6.5 6.5l.6-1c.5-.6 1.3-.9 2.1-.7l2.8.7c.9.2 1.5 1 1.5 1.9v2c0 1.1-.9 2-2 2h-1C9.7 22 2 14.3 2 5V5c0-1.1.9-2 2-2h-1z" fill="currentColor"/>
  </svg>
)

export const WhatsAppIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 2.6 17.3L2 22l4.8-1.3A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 1 1 7.6-4.3c-.2.4-1.7 2.7-5.7 2.7H12Zm4.2-6.3c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.9 1-.2.2-.3.2-.6.1s-1.2-.4-2.3-1.5c-.9-.9-1.5-2-1.6-2.3s0-.4.1-.6l.7-.9c.1-.2.1-.3 0-.5l-.8-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.7.4-.8.8-1.2 1.9-1.2 3 0 1 .3 2 1 2.9 1.2 1.7 2.9 3 4.8 3.7.7.3 1.5.5 2.2.6.9.2 1.8-.1 2.4-.7.3-.3.6-.8.7-1.2.1-.3 0-.5-.2-.6Z"/>
  </svg>
)

export const MailIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v.3L12 12 2 6.3V6Zm0 2.7V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.7l-9.4 5.6a2 2 0 0 1-2.2 0L2 8.7Z"/>
  </svg>
)

export const InstagramIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.75-2.5a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75Z"/>
  </svg>
)

export const FacebookIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M13 22v-8h3l1-4h-4V7.5c0-1.2.4-2 2-2H17V2.2C16.6 2.1 15.5 2 14.3 2 11.7 2 10 3.6 10 6.6V10H7v4h3v8h3Z"/>
  </svg>
)

export const SnapchatIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 2c3 0 5 2.3 5 5.2 0 1.3-.4 2.4-.3 3 .1.7.6 1.7 2.2 2 0 .2-.1.6-.4.9-.4.4-1 .6-1.6.7-.6.2-1 .4-1.1.8-.1.4.2.8.8 1.2.6.4 1.5.7 2.4.9-.3.7-.9 1.1-1.8 1.1-.3 0-.7 0-1.1-.1-.6-.1-1.2-.2-1.7 0-.4.2-.7.6-.9 1.1-.7.2-1.5.3-2.4.3s-1.7-.1-2.4-.3c-.2-.5-.5-.9-.9-1.1-.5-.2-1.1-.1-1.7 0-.4.1-.8.1-1.1.1-.9 0-1.5-.4-1.8-1.1.9-.2 1.8-.5 2.4-.9.6-.4.9-.8.8-1.2-.1-.4-.5-.6-1.1-.8-.6-.2-1.2-.4-1.6-.7-.3-.3-.4-.7-.4-.9 1.6-.3 2.1-1.3 2.2-2 .1-.6-.3-1.7-.3-3C7 4.3 9 2 12 2Z"/>
  </svg>
)

export const XIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M3 3h4.6l5 6.7L18.7 3H21l-6.7 8.5L21 21h-4.6l-5.2-7-5 7H3l7.3-9.4L3 3Z"/>
  </svg>
)

export const ThreadsIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 2c5.6 0 10 4.4 10 10s-4.4 10-10 10S2 17.6 2 12 6.4 2 12 2Zm4.9 9.2c-.3-2.6-2.2-4.2-5-4.2-2.8 0-4.9 1.7-4.9 4.3 0 2.4 1.8 4 4.5 4.2-.3.8-1 1.3-2.2 1.3h-.6v1.9l.7.1c2.6 0 4.4-1.2 5-3.2 1.7-.4 2.7-1.5 2.5-4.4ZM12 8.9c1.5 0 2.6.8 2.9 2.1-1-.2-2.2-.3-3.5-.3-1.4 0-2.7.1-3.9.4.1-1.3 1.7-2.2 3.5-2.2Z"/>
  </svg>
)

export const GlobeIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3.3a12.5 12.5 0 0 0-1.2-4.2A8.03 8.03 0 0 1 19.9 11Zm-5.2 0H9.3c.2-1.7.8-3.3 1.6-4.6.5-.7 1-.9 1.3-.9s.8.2 1.3.9c.8 1.3 1.4 2.9 1.6 4.6ZM4.1 13h3.3c.2 1.7.8 3.3 1.6 4.6.5.7 1 .9 1.3.9s.8-.2 1.3-.9c.8-1.3 1.4-2.9 1.6-4.6h3.3a8.03 8.03 0 0 1-6.1 6.2A8.03 8.03 0 0 1 4.1 13Zm3.3-2H4.1A8.03 8.03 0 0 1 10.2 4.8c-.5.9-1 2-1.2 3.2-.2.7-.3 1.3-.4 2Z"/>
  </svg>
)
