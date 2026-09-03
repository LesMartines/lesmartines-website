import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { useCountUp } from '../lib/useCountUp'
import styles from './Avis.module.css'

// Vrais avis (27/08/2026), récupérés sur les fiches App Store et Google Play de l'appli
// (liens fournis par Marine) : 175 notes sur l'App Store + 264 sur Google Play = 439,
// moyenne 4,8/5 sur les deux stores. Textes reformulés à partir des avis publics (pas de
// copie mot pour mot) et recalibrés à une longueur homogène (~85-92 caractères) pour que
// les cartes soient visuellement alignées. Seuls des avis 5 étoiles ont été retenus.
// NB (28/08/2026) : les fiches App Store / Google Play n'exposent que ces 6 avis dans le
// HTML accessible sans interaction (le reste nécessite de cliquer "voir plus" dans l'appli
// ou d'être connecté) — on ne peut pas en extraire davantage sans risquer d'en inventer.
// Si Marine veut plus de témoignages, le plus fiable est qu'elle en copie-colle d'autres
// depuis les stores et me les transmette.
const TESTIMONIALS = [
  {
    text: 'Une vraie safe place où on peut parler de tout sans jugement, avec plein de bienveillance.',
    author: 'loû39640',
    source: 'App Store',
  },
  {
    text: "Le concept est génial, on se sent vraiment en sécurité pour s'exprimer librement ici.",
    author: 'Lyz0u',
    source: 'App Store',
  },
  {
    text: "Un réseau 100% bienveillant, rempli de femmes incroyables. Merci d'avoir créé ce projet.",
    author: 'LoubSd',
    source: 'App Store',
  },
  {
    text: "Une vraie safe place, exactement ce qu'il fallait pour se sentir enfin écoutée et soutenue.",
    author: 'Marie Potiron',
    source: 'App Store',
  },
  {
    text: 'Vérification super rapide et une communauté qui soutient vraiment, même dans les coups durs.',
    author: 'Lovered Gwen',
    source: 'Google Play',
  },
  {
    text: 'Une appli où on peut vraiment être soi-même, partager son quotidien sans trolls ni jugement.',
    author: 'Léa H',
    source: 'Google Play',
  },
]

// Boucle infinie (28/08/2026, "il faut que ce soit illimité sur l'horizontale donc à
// chaque fois le 1er revient quand ça se termine") : le tableau est rendu 3 fois de
// suite (copie précédente / copie réelle / copie suivante). On démarre sur la copie du
// milieu, et un listener de scroll re-saute silencieusement (scrollLeft assigné
// directement = toujours instantané, jamais animé, même si un clic sur les flèches est
// en train de faire un scroll "smooth" juste à côté) vers la copie du milieu dès qu'on
// dérive dans une copie voisine. Comme les 3 copies sont pixel pour pixel identiques, le
// saut est invisible : on a l'impression d'un défilement sans fin dans les deux sens.
// Seule la copie du milieu (index 1) reste annoncée aux lecteurs d'écran (aria-hidden sur
// les 2 autres) pour ne pas leur faire lire 3x les mêmes avis.
const COPIES = 3
const REAL_COPY_INDEX = 1

export default function Avis() {
  // Même traitement "chiffre qui bouge" que le bandeau CommunityStats (27/08/2026) :
  // compte de 0 à 450 quand le bloc entre dans le viewport, plutôt qu'un chiffre figé.
  // Chiffre arrondi à la demande de Marine le 28/08/2026 ("mettre 450+ avis") : le total
  // réel mesuré (App Store + Google Play, cf. commentaire ci-dessus) est 439.
  const { ref, value } = useCountUp<HTMLHeadingElement>(450)
  const sliderRef = useRef<HTMLDivElement>(null)
  const copyWidthRef = useRef(0)
  const statsRef = useRef<HTMLDivElement>(null)
  const [starsInView, setStarsInView] = useState(false)

  // "Petit effet sur les etoiles" (31/08/2026) : pop déclenché au scroll, même recette
  // que .pin dans EventsPromo.tsx — indépendant du Reveal qui fait déjà fondre tout le
  // bloc .stats en un morceau, ce pop est un mouvement propre aux étoiles.
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Largeur d'une copie = distance entre la 1re carte de la copie 0 et la 1re carte de la
  // copie 1 (mesurée via getBoundingClientRect, insensible au scroll en cours puisque les
  // deux cartes défilent ensemble) : plus fiable que scrollWidth/3, qui serait faussé par
  // le padding gauche/droite du slider (appliqué une seule fois, pas par copie).
  const measureCopyWidth = () => {
    const slider = sliderRef.current
    if (!slider) return
    const first = slider.children[0] as HTMLElement | undefined
    const secondCopyFirst = slider.children[TESTIMONIALS.length] as HTMLElement | undefined
    if (!first || !secondCopyFirst) return
    copyWidthRef.current = secondCopyFirst.getBoundingClientRect().left - first.getBoundingClientRect().left
  }

  useLayoutEffect(() => {
    measureCopyWidth()
    const slider = sliderRef.current
    if (slider && copyWidthRef.current > 0) {
      // Position de départ : le début de la copie du milieu, visuellement identique à un
      // scrollLeft de 0 sur la copie 0 puisque le contenu est dupliqué à l'identique.
      slider.scrollLeft = copyWidthRef.current * REAL_COPY_INDEX
    }

    const onResize = () => measureCopyWidth()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    // Correction de boucle appliquée seulement une fois le scroll COMPLÈTEMENT arrêté
    // (via 'scrollend', ou un repli "scroll silencieux depuis Xms" si le navigateur ne le
    // supporte pas). Bug corrigé le 28/08/2026 : la 1re version corrigeait sur CHAQUE
    // event 'scroll', y compris en plein milieu de l'animation "smooth" lancée par les
    // flèches — assigner slider.scrollLeft pendant cette animation l'interrompt net
    // (comportement standard des navigateurs), ce qui pouvait laisser le slider sur une
    // position ni alignée sur une carte ni corrigée, et donnait l'impression que ça
    // "bloquait" en bout de liste au clic sur la flèche droite. En attendant l'arrêt
    // complet du scroll, on ne touche jamais à une animation en cours.
    const correct = () => {
      const cw = copyWidthRef.current
      if (!cw) return
      if (slider.scrollLeft < cw) {
        // Dérive dans la copie précédente (index 0) : re-saute d'une copie vers l'avant.
        slider.scrollLeft += cw
      } else if (slider.scrollLeft >= cw * 2) {
        // Dérive dans la copie suivante (index 2) : re-saute d'une copie vers l'arrière.
        slider.scrollLeft -= cw
      }
    }

    if ('onscrollend' in window) {
      slider.addEventListener('scrollend', correct)
      return () => slider.removeEventListener('scrollend', correct)
    }

    // Repli pour les navigateurs sans 'scrollend' : on considère le scroll terminé après
    // 120ms sans nouvel event 'scroll'.
    let idleTimer: number | undefined
    const onScroll = () => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(correct, 120)
    }
    slider.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(idleTimer)
      slider.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section className={styles.section} aria-labelledby="avis-title">
      <div className="container">
        <Reveal>
          {/* Étoiles entre le nombre d'avis et la note (03/09/2026, "mets les etoiles
              entre les avis et la note") : même .stats flex-column pour desktop et
              responsive, donc un seul réordonnancement du JSX suffit pour les deux. */}
          <div ref={statsRef} className={`${styles.stats} ${starsInView ? styles.inView : ''}`}>
            <h2 id="avis-title" ref={ref} className={styles.count}>
              {value}+ avis
            </h2>
            <p className={styles.stars} aria-hidden="true">
              ★★★★★
            </p>
            <p className={styles.breakdown}>
              <span className={styles.score}>4,8/5</span> App Store &amp; Google Play
            </p>
          </div>
        </Reveal>
      </div>

      {/* Hors du .container (pleine largeur d'écran), comme les marquees PressLogos et
          ValeursBloc, sur demande de Marine le 28/08/2026 ("mettre les avis sur toute la
          longueur à l'horizontal") : avant, le slider restait bridé à 1200px (largeur du
          container) même en le mettant à 100%. Flèches prev/next retirées le 28/08 ("vire
          les flèches [...] on comprend qu'on peut scroller") : le scroll-snap au doigt/à
          la molette suffit, plus besoin de boutons dédiés. */}
      <div className={styles.sliderOuter}>
        <div className={styles.slider} ref={sliderRef}>
          {Array.from({ length: COPIES }, (_, copyIndex) =>
            TESTIMONIALS.map((t, i) => (
              <div
                key={`${copyIndex}-${i}`}
                className={styles.slide}
                aria-hidden={copyIndex !== REAL_COPY_INDEX ? 'true' : undefined}
              >
                <Reveal delay={i * 0.06}>
                  <blockquote className={styles.card}>
                    <p className={styles.cardStars} aria-hidden="true">
                      ★★★★★
                    </p>
                    <p className={styles.quote}>&ldquo;{t.text}&rdquo;</p>
                    <footer className={styles.author}>
                      {t.author}
                      <span className={styles.source}>{t.source}</span>
                    </footer>
                  </blockquote>
                </Reveal>
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  )
}
