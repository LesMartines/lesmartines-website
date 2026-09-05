import type { ReactNode } from 'react'
import { LazyMotion, domAnimation, m } from 'motion/react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  /* Ajouté le 30/08/2026 ("la composition bouge quand je scroll") : par défaut
     l'animation se déclenche via whileInView (au scroll, quand l'élément entre dans le
     viewport) — adapté à du contenu plus bas dans la page. Mais pour le Hero, qui est
     déjà à l'écran à l'arrivée, ce déclenchement au scroll pouvait se produire APRÈS le
     montage (si le bas d'une compo haute n'est pas encore dans la marge de -80px), donc
     l'animation se jouait pendant que Marine scrollait, créant un décalage visible et
     inattendu. immediate=true joue l'animation une seule fois au montage (via `animate`
     plutôt que `whileInView`), indépendamment du scroll — comportement voulu pour tout ce
     qui est au-dessus de la ligne de flottaison. */
  immediate?: boolean
}

/**
 * Petite animation d'apparition, en LazyMotion + domAnimation
 * (charge un sous-ensemble minimal de Motion, autour de 15ko) plutôt que
 * la lib complète. Le contenu reste dans le HTML dans tous les cas (juste
 * l'opacité qui change), donc ça ne gêne ni le SEO ni la lecture par les IA.
 */
export default function Reveal({ children, delay = 0, className, immediate = false }: RevealProps) {
  const motionProps = immediate
    ? { animate: { opacity: 1, y: 0, scale: 1 } }
    : {
        whileInView: { opacity: 1, y: 0, scale: 1 },
        // Marge asymétrique (05/09/2026, "il y a un espèce de bug quand on slide, ça
        // fait des trous dans les cards, ça s'affiche pas au fur et à mesure en
        // desktop") : sur une grille dense (ex. les 30 cartes de /partenaires/), une
        // marge négative sur TOUS les côtés (l'ancienne '-20px', voir 04/09/2026)
        // rétrécit aussi la zone de déclenchement en bas — le bord par lequel les
        // cartes arrivent en scrollant. Un scroll rapide/momentum (trackpad) peut alors
        // faire "sauter" un élément de "pas encore dans la zone" à "déjà remonté au-
        // dessus" entre 2 callbacks IntersectionObserver, sans jamais déclencher son
        // whileInView : la carte reste bloquée à opacity:0 pour toujours (once:true).
        // Élargir seulement le bas (au lieu de le rétrécir) donne plus de marge à
        // l'observer pour l'attraper avant qu'il ne soit trop tard, sans réintroduire
        // le souci du 04/09 (top/left/right restent resserrés).
        viewport: { once: true, margin: '-20px -20px 60px -20px' },
      }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        // Apparition plus marquée (04/09/2026, "est-ce qu'on peut améliorer
        // l'apparition des sections") : translateY et durée augmentés (24px/0.5s ->
        // 32px/0.65s) + un léger scale (0.97 -> 1) en plus du fondu, pour une entrée
        // qui se remarque davantage qu'un simple fondu-glissé. Un seul endroit à
        // ajuster : tout le site réutilise ce composant partagé.
        initial={{ opacity: 0, y: 32, scale: 0.92 }}
        {...motionProps}
        transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
