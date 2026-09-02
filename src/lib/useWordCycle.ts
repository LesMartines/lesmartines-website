import { useEffect, useState } from 'react'

/**
 * Fait défiler un mot parmi une liste, à intervalle régulier (effet dynamique demandé
 * par Marine le 28/08/2026, "un cycle de mots dans le sous-titre du Hero"). Simple
 * setInterval + state, aucune librairie. Respecte prefers-reduced-motion en restant
 * bloqué sur le premier mot plutôt que de faire défiler du texte en continu.
 */
export function useWordCycle(words: string[], intervalMs = 2200) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [words, intervalMs])

  return words[index]
}
