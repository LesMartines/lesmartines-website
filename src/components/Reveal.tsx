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
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
      }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        {...motionProps}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
