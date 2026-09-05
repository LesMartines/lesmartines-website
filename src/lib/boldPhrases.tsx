import type { ReactNode } from 'react'

/**
 * Découpe `text` autour de chaque `phrase` de `phrases` (dans l'ordre où elles
 * apparaissent dans le texte) et les entoure d'un <strong> (05/09/2026, "mets des mots
 * en gras dans le texte et fait ça partout dans le site où on a des paragraphes").
 * Utilisé pour les textes stockés en simple string (FAQ_ITEMS...), qui doivent rester du
 * texte brut ailleurs (ex. le JSON-LD schema.org/FAQPage généré à partir du même texte) —
 * les paragraphes déjà écrits en JSX dans les pages utilisent directement <strong> inline,
 * pas besoin de ce helper là.
 */
export function boldPhrases(text: string, phrases: string[]): ReactNode[] {
  let remaining = text
  let offset = 0
  const matches: { start: number; end: number }[] = []

  for (const phrase of phrases) {
    if (!phrase) continue
    const idx = remaining.indexOf(phrase, offset)
    if (idx === -1) continue
    matches.push({ start: idx, end: idx + phrase.length })
    offset = idx + phrase.length
  }

  matches.sort((a, b) => a.start - b.start)

  const nodes: ReactNode[] = []
  let cursor = 0
  matches.forEach((m, i) => {
    if (m.start > cursor) nodes.push(text.slice(cursor, m.start))
    nodes.push(<strong key={i}>{text.slice(m.start, m.end)}</strong>)
    cursor = m.end
  })
  if (cursor < text.length) nodes.push(text.slice(cursor))

  return nodes
}
