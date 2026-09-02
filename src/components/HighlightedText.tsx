interface HighlightedTextProps {
  text: string
  highlight: string
}

/**
 * Decoupe `text` autour de la premiere occurrence de `highlight` et l'entoure d'un
 * <mark class="highlight"> (soulignement citron vert defini dans global.css). Traitement
 * "imposant" demande par Marine le 27/08/2026 pour les titres cles (FeatureShowcase,
 * ValeursBloc, CommunityStats). Simple recherche de sous-chaine : suffisant tant que les
 * titres sont ecrits a la main dans le code, pas besoin d'un parseur markdown.
 */
export default function HighlightedText({ text, highlight }: HighlightedTextProps) {
  const idx = text.indexOf(highlight)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="highlight">{highlight}</mark>
      {text.slice(idx + highlight.length)}
    </>
  )
}
