import { useEffect, useRef } from 'react'

/**
 * Adds a 'visible' class to the element when it scrolls into view.
 * Usage:
 *   const ref = useScrollReveal()
 *   <div ref={ref} className="animate-on-scroll">...</div>
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            observer.unobserve(el) // reveal once
          }
        })
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
