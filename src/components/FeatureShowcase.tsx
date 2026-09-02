import { useEffect, useRef, useState } from 'react'
import HighlightedText from './HighlightedText'
import sororiteImage from '../assets/features/sororite-dans-la-poche.webp'
import thematiquesImage from '../assets/features/thematiques.webp'
import commentairesImage from '../assets/features/commentaires.webp'
import dmImage from '../assets/features/dm.webp'
import maptineImage from '../assets/features/maptine.webp'
import styles from './FeatureShowcase.module.css'

interface Feature {
  id: string
  title: string
  /** Sous-chaîne de `title` à souligner en citron vert (traitement "imposant" du 27/08/2026). */
  highlight: string
  text: string
  /** Visuel réel (collage complet, pas juste une capture d'écran) fourni par Marine. */
  image?: string
}

// Textes réels de la maquette, confirmés par Marine le 28/08/2026 (elle a collé les 6
// textes complets dans le chat, ce qui a d'abord résolu le doute ouvert depuis le 27/08
// entre "safe place" et "Map'tine" (2 cartes distinctes, pas un mismatch) — puis Marine a
// demandé de retirer la carte "safe place" (même jour), donc la section repasse à 5
// cartes : sororite, thematiques, good-vibes, dm, maptine.
const FEATURES: Feature[] = [
  {
    id: 'sororite',
    title: 'La sororité dans ta poche',
    highlight: 'sororité',
    text: "Papoter 24h/24 & 7j/7, c'est possible. Y'a toujours une Martine connectée pour t'écouter, te soutenir ou juste rigoler avec toi.",
    // Visuel réel envoyé par Marine le 27/08/2026 : collage complet (téléphone + fil de
    // discussion + éléments décoratifs), pas une simple capture d'écran à recadrer dans un
    // cadre de téléphone factice. Rendu tel quel via .collageImage (object-fit: contain),
    // sans le bezel CSS charcoal utilisé pour les placeholders des autres cartes.
    image: sororiteImage,
  },
  {
    id: 'thematiques',
    title: 'Des thématiques pour toutes',
    highlight: 'thématiques',
    text: "Ici, tu papotes santé, sexualité, société, love, amitiés, loisirs, voyages… Peu importe ce que t'as en tête : y'a une conversation pour ça (et si y'en a pas, tu la lances !)",
    // Visuel réel envoyé par Marine le 27/08/2026 (grille de tags thématiques).
    image: thematiquesImage,
  },
  {
    id: 'good-vibes',
    title: 'Des good vibes à volonté',
    highlight: 'good vibes',
    text: "Ici, on s'encourage, on rigole et on se relève ensemble. Entre Martines, c'est love, sororité et gros boost d'estime.",
    // Visuel réel envoyé par Marine le 27/08/2026 (fil de commentaires d'encouragement).
    image: commentairesImage,
  },
  {
    id: 'dm',
    title: 'Glisse dans les DM de tes Martines sûres',
    highlight: 'Martines sûres',
    text: 'Pour papoter en one-to-one. Et surtout, te sentir entourée. Même à distance.',
    // Visuel réel envoyé par Marine le 27/08/2026 (conversation privée chiffrée).
    image: dmImage,
  },
  {
    id: 'maptine',
    title: "Map'tine pour trouver tes Martines",
    highlight: "Map'tine",
    text: 'Ta nouvelle bande de Martines sûres est peut-être à deux rues…',
    // Visuel réel envoyé par Marine le 27/08/2026 (carte + "Martines autour de toi"),
    // branché maintenant que le texte du 28/08/2026 confirme que c'est bien cette 6e carte.
    image: maptineImage,
  },
]

/**
 * Scroll-linked feature showcase (façon Stripe / Apple / Linear) : le mockup à gauche
 * reste "sticky" pendant que la liste de fonctionnalités défile normalement à droite.
 * IntersectionObserver seulement, aucun preventDefault ni scroll hijacking : le scroll
 * du navigateur n'est jamais intercepté, la vitesse reste 100% contrôlée par l'utilisatrice.
 */
export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const blockRefs = useRef<(HTMLElement | null)[]>([])
  const sectionRef = useRef<HTMLElement | null>(null)
  const visualRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = blockRefs.current.findIndex((el) => el === entry.target)
          if (index !== -1) setActiveIndex(index)
        })
      },
      {
        // Ne déclenche que quand un bloc traverse une fine bande centrale de l'écran.
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      },
    )

    const currentRefs = blockRefs.current
    currentRefs.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Léger effet de tilt/parallax sur le visuel sticky pendant le scroll (demande du
  // 27/08/2026 : "un effet wow sans alourdir la page"). Volontairement en dehors de
  // React state (mutation directe du style via ref) pour ne provoquer aucun re-render à
  // 60fps ; rAF-throttlé et coupé dès que la section quitte l'écran ou si l'utilisatrice
  // a demandé moins d'animations. Aucune librairie, juste getBoundingClientRect.
  useEffect(() => {
    const section = sectionRef.current
    const visual = visualRef.current
    if (!section || !visual) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false

    const update = () => {
      ticking = false
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 = la section vient d'apparaître en bas d'écran, 1 = elle vient de sortir en haut.
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1)
      const tilt = (progress - 0.5) * 6 // -3deg .. 3deg
      const lift = (progress - 0.5) * -24 // léger décalage vertical, en px
      visual.style.transform = `translateY(${lift}px) rotate(${tilt}deg)`
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          update()
          window.addEventListener('scroll', onScroll, { passive: true })
        } else {
          window.removeEventListener('scroll', onScroll)
        }
      },
      { threshold: 0 },
    )
    visibilityObserver.observe(section)

    return () => {
      visibilityObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="features-title">
      <div className="container">
        <h2 id="features-title" className={styles.sectionTitle}>
          Les Martines késako&nbsp;?
        </h2>

        <div className={styles.grid}>
          {/* Colonne sticky : purement visuelle, redondante avec le texte de droite,
              donc masquée aux lecteurs d'écran pour ne pas dupliquer l'information. */}
          <div className={styles.stickyCol} aria-hidden="true">
            {/* Halo qui pulse doucement derrière le visuel (28/08/2026, "ça manque des
                trucs waouh" -> plus de mouvement demandé sur cette section) : purement
                décoratif, coupé sous prefers-reduced-motion via .glow ci-dessous en CSS. */}
            <div className={styles.glow} />

            {/* Flottement idle continu en plus du tilt/parallax au scroll : porté par un
                wrapper séparé (.visualFloat) exprès, pour ne jamais entrer en conflit avec
                le transform muté en JS sur .visual (même piège que le bug de l'Avis :
                deux sources de transform sur le MÊME élément se marchent dessus). */}
            <div className={styles.visualFloat}>
              <div ref={visualRef} className={styles.visual}>
                {FEATURES.map((feature, i) => (
                  <div
                    key={feature.id}
                    className={styles.visualContent}
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      transform: i === activeIndex ? 'scale(1)' : 'scale(0.96)',
                    }}
                  >
                    {feature.image ? (
                      <img src={feature.image} alt="" className={styles.collageImage} />
                    ) : (
                      <div className={styles.phoneFrame}>
                        <div className={styles.mockupPlaceholder}>
                          <span>{feature.title}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.progress}>
              {FEATURES.map((feature, i) => (
                <button
                  key={feature.id}
                  type="button"
                  tabIndex={-1}
                  className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                  aria-label={`Aller à : ${feature.title}`}
                  onClick={() =>
                    blockRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                />
              ))}
            </div>
          </div>

          {/* Contenu réel, toujours dans le flux du DOM, jamais caché ni reconstruit. */}
          <div className={styles.list}>
            {FEATURES.map((feature, i) => (
              <article
                key={feature.id}
                ref={(el) => {
                  blockRefs.current[i] = el
                }}
                className={`${styles.block} ${i === activeIndex ? styles.blockActive : ''}`}
              >
                {/* Visuel dédié par carte, affiché uniquement sous 900px (voir
                    .blockVisual dans le CSS) : sous ce seuil le visuel sticky partagé
                    passe en display:none (plus de place pour qu'il reste sticky sans
                    recouvrir le texte qui défile dessous), donc chaque carte porte ici
                    sa propre image plutôt que de dépendre du crossfade du visuel sticky. */}
                <div className={styles.blockVisual} aria-hidden="true">
                  {feature.image ? (
                    <img src={feature.image} alt="" className={styles.collageImage} />
                  ) : (
                    <div className={styles.phoneFrame}>
                      <div className={styles.mockupPlaceholder}>
                        <span>{feature.title}</span>
                      </div>
                    </div>
                  )}
                </div>
                <h3 className={styles.blockTitle}>
                  <HighlightedText text={feature.title} highlight={feature.highlight} />
                </h3>
                <p className={styles.blockText}>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
