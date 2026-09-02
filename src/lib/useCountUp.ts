import { useEffect, useRef, useState } from 'react'

/**
 * Fait défiler un nombre de 0 jusqu'à `target` quand l'élément référencé entre dans le
 * viewport ("les chiffres qui bougent" demandé par Marine le 27/08/2026). IntersectionObserver
 * + requestAnimationFrame seulement, aucune librairie : se déclenche une seule fois (once) et
 * respecte prefers-reduced-motion en affichant directement la valeur finale sans animation.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(target: number, durationMs = 1400) {
  const ref = useRef<T | null>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(target)
      return
    }

    let frame = 0
    let started = false

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started) return
          started = true
          const start = performance.now()

          const tick = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1)
            // easeOutCubic : démarre vite, ralentit en approchant du chiffre final.
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) {
              frame = requestAnimationFrame(tick)
            }
          }

          frame = requestAnimationFrame(tick)
          observer.disconnect()
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [target, durationMs])

  return { ref, value }
}
