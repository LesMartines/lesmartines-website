import { useEffect, useRef, useState } from 'react'
import styles from './EventsPromo.module.css'
import mapEvents from '../assets/events/map-events.webp'
import pinDot from '../assets/events/pin-dot.png'
import pinLime1 from '../assets/events/pin-lime-1.png'
import pinLime2 from '../assets/events/pin-lime-2.png'
import badgeCount from '../assets/events/badge-count.webp'
import cardYoga from '../assets/events/card-yoga-tartines.webp'
import cardCafe from '../assets/events/card-cafe-virtuel.webp'
import cardMains from '../assets/events/card-mains-terre.webp'

// Marqueurs de la carte (28/08, "on va l'intégrer seul, puis intégrer plusieurs pins et
// plusieurs ronds dessus [...] pour mettre un effet grossissant qui monte les points sur
// la carte") : Marine a remplacé la carte par une version nue (sans pins) + 3 visuels de
// marqueurs séparés (rond bleu, pin citron vert "1", pin citron vert "2"), pour que chaque
// point soit un élément DOM animable indépendamment plutôt qu'un pixel figé dans la carte.
// Les 4 premiers pins/4 premiers ronds reprennent les positions (x/y en % de la carte)
// mesurées par détection de couleur sur l'ancienne carte "à plat". Densité augmentée le
// 28/08 ("on en a pas assez") : +1 pin "2" et +2 ronds sur des zones vides de la carte.
const PINS = [
  { img: pinLime2, x: 58.6, y: 21.8 },
  { img: pinLime1, x: 44.7, y: 32.5 },
  { img: pinLime1, x: 20.9, y: 38.4 },
  { img: pinLime1, x: 66.6, y: 64.4 },
  { img: pinLime2, x: 36, y: 49 },
]

const DOTS = [
  { x: 20.5, y: 25.2 },
  { x: 62.6, y: 32.6 },
  { x: 46.4, y: 56.0 },
  { x: 47.3, y: 76.6 },
  { x: 58, y: 48 },
  { x: 30, y: 68 },
]

// Texte repris de la maquette Figma (bandeau indigo juste après le bandeau presse).
// Le CTA pointe vers le téléchargement de l'app (#appli) tant qu'il n'y a pas de page
// /events dédiée : la nav traite déjà "Events" en "Bientôt" pour la même raison.
export default function EventsPromo() {
  const visualRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  // Déclenche le "pop" des pins seulement quand la compo entre dans le viewport (28/08,
  // suite : "il faudrait qu'il se déclenche quand on arrive au niveau de la page, sinon
  // on ne le voit pas" — la section est sous la ligne de flottaison, l'ancien pop au
  // montage du DOM se jouait donc hors champ, avant que quiconque ne scrolle jusque-là).
  // Un seul déclenchement (disconnect après le premier isIntersecting) : la classe .inView
  // reste acquise ensuite, pas de replay à chaque scroll up/down.
  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} aria-labelledby="events-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          {/* Bandeau "coming soon" (29/08/2026, "il faudrait un bandeau... pour prevenir") :
              les events ne sont pas encore live, le CTA plus bas mène en réalité au
              téléchargement de l'appli (#appli), donc on prévient avant que quiconque ne
              clique en pensant réserver un event tout de suite. Placé dans la colonne
              texte plutôt que dans la compo carte : Marine a déjà demandé de réduire le
              nombre d'éléments qui flottent dans la compo, pas d'en rajouter un de plus. */}
          <span className={styles.comingSoon}>
            <span aria-hidden="true">👀</span> Ça arrive bientôt
          </span>
          <h2 id="events-title" className={styles.title}>
            Découvre les events 100% entre meufs près de chez toi
          </h2>
          <p className={styles.body}>
            Brunchs, ateliers créatifs, yoga, coaching, marches… Rejoins des events safe et
            curatés dans ta ville ou en ligne. Prix négociés, ambiance chill, rencontres
            garanties.
          </p>
          <a href="#appli" className={styles.cta}>
            Je découvre les events
          </a>
        </div>

        {/*
          Collage carte + fiches events (28/08/2026), assets envoyés par Marine (visuels
          finaux, exportés en PNG avec ombre déjà intégrée dans le fichier) : la carte des
          events à proximité, le badge de comptage, et 3 fiches events (Yoga & Tartines,
          Café virtuel & papotage, Mains dans la terre). Positionnement en pourcentages du
          conteneur .visual pour rester fidèle à la maquette envoyée tout en restant fluide
          à toutes les tailles d'écran.

          Flottement idle (badge + 3 fiches) + effets sur les marqueurs de la carte, chacun
          différencié pour coller à sa forme (28/08, "des effets plus cool sur ces pin dot
          et lime") : les ronds (cercles) ont un ping radar (anneau qui grossit et
          s'estompe derrière le rond, façon position live sur une carte) + une légère
          respiration sur le rond lui-même ; les pins (forme goutte) font un petit "saut"
          vers le haut en grossissant plutôt qu'un anneau, qui rendrait mal sur une forme
          non circulaire. Même famille de technique que le collage du Hero (floatA/floatB) :
          chaque élément a son propre wrapper de positionnement et son image/anneau porte
          l'animation, jamais les deux sur le même élément (cf. la leçon .visualFloat de
          FeatureShowcase) — évite tout conflit entre un hover statique et une animation
          infinie sur la même propriété transform. Le ping radar est un `<span>` séparé
          (pas un ::after sur l'<img>) car les pseudo-éléments ne se rendent pas sur les
          éléments remplacés (img, video...).
        */}
        <div
          ref={visualRef}
          className={`${styles.visual}${inView ? ` ${styles.inView}` : ''}`}
          role="img"
          aria-label="Aperçu : carte des events à proximité avec ses points d'intérêt, et les fiches Yoga & Tartines, Café virtuel & papotage, et Mains dans la terre"
        >
          <div className={styles.mapGroup}>
            <img src={mapEvents} alt="" className={styles.map} />
            {DOTS.map((d, i) => (
              <span
                key={`dot-${i}`}
                className={styles.dotWrap}
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
              >
                <span className={styles.dotRing} style={{ animationDelay: `${i * 0.4}s` }} />
                <img src={pinDot} alt="" className={styles.dot} style={{ animationDelay: `${i * 0.4}s` }} />
              </span>
            ))}
            {PINS.map((p, i) => (
              <img
                key={`pin-${i}`}
                src={p.img}
                alt=""
                className={styles.pin}
                style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${i * 0.3 + 0.15}s` }}
              />
            ))}
          </div>

          <div className={`${styles.badgePos} ${styles.floatWrap}`}>
            <img src={badgeCount} alt="" className={styles.badgeFloat} />
          </div>

          <div className={`${styles.cardCafePos} ${styles.floatWrap}`}>
            <img src={cardCafe} alt="" className={styles.cardCafeFloat} />
          </div>

          <div className={`${styles.cardMainsPos} ${styles.floatWrap}`}>
            <img src={cardMains} alt="" className={styles.cardMainsFloat} />
          </div>

          <div className={`${styles.cardYogaPos} ${styles.floatWrap}`}>
            <img src={cardYoga} alt="" className={styles.cardYogaFloat} />
          </div>
        </div>
      </div>
    </section>
  )
}
