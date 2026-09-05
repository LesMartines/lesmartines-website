import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import StoreButtons from '../components/StoreButtons'
import groupePhoto from '../assets/hero/groupe-meufs.webp'
import { StarRating } from './Events'
import styles from './Telecharger.module.css'

// Page dédiée (05/09/2026, "je voudrais que le QR code ramène vers une page où il y a les
// deux logos [...] parce que là ça ramène que sur Android, c'est un problème" puis "les
// gens s'attendent à avoir une nouvelle page sur mobile" — une popup a été envisagée puis
// écartée au profit d'une simple page : "on peut faire juste une page") : le widget
// StickyQR (voir StickyQR.tsx) pointait jusqu'ici vers un lien Google Play en dur dans le
// PNG du QR code, invisible/cassé pour toute personne sur iPhone qui scanne. Cette page
// affiche les 2 badges (StoreButtons ne fait jamais de détection d'OS, voir son fichier),
// et donne au QR une VRAIE destination web dédiée plutôt qu'une simple ancre de la home
// (#appli) — nécessaire aussi pour la traçabilité (05/09/2026, "je voudrais qu'on puisse
// le tracker aussi") : une URL propre à elle seule (plutôt qu'un scroll sur la home) est
// ce qui permet de distinguer un jour le trafic du QR dans un outil d'analytics, si un
// outil est ajouté au site (aucun n'est branché actuellement, voir index.html).
// Habillage "premium" essayé puis retiré (05/09/2026, "je la trouve chiante" -> bandeau
// texturé + collage -> "non reviens comme avant") : retour à la mise en page simple
// d'origine, avec juste 2 retouches gardées : l'icône réelle de l'appli (favicon.png, le
// même visuel que sur l'App Store/Google Play) à la place du cœur générique, et un texte
// repensé pour être plus percutant ("le texte qui est pas hyper impactant").
export default function Telecharger() {
  useHead({
    title: 'Télécharge l’appli',
    description:
      "Télécharge Les Martines sur l'App Store ou Google Play : le réseau social 100% féminin et sécurisé, noté 4,8/5 par plus de 450 avis.",
    path: '/telecharger/',
  })

  return (
    <section className={styles.section} aria-labelledby="telecharger-title">
      <div className="container">
        <Reveal immediate>
          <div className={styles.header}>
            <span className={styles.appIconWrap}>
              <img src="/favicon.png" alt="" className={styles.appIcon} />
            </span>
            <h1 id="telecharger-title" className={styles.title}>
              <HighlightedText text="Ta place t'attend" highlight="t'attend" />
            </h1>
            <p className={styles.subtitle}>
              <strong>Des milliers de meufs</strong> qui s&rsquo;écoutent, se soutiennent
              et se retrouvent, <strong>en toute sécurité</strong>. Rejoins-les{' '}
              <strong>en 2 minutes</strong>.
            </p>
            <div className={styles.trustRow}>
              <StarRating className={styles.trustStars} />
              <strong>4,8/5</strong>
              <span className={styles.trustDot} aria-hidden="true">
                ·
              </span>
              450+ avis
            </div>
          </div>
        </Reveal>

        {/* Taille par défaut plutôt que "large" (05/09/2026, "les visuels pour
            télécharger sont énormes") : 68px de haut (recette pensée pour le Hero, seul
            CTA au-dessus d'une compo très chargée) écrasait tout sur cette page bien plus
            sobre — 52px reste net et lisible sans dominer toute la mise en page. Une
            carte blanche autour a été essayée puis retirée le même jour ("c'est moche"). */}
        <Reveal immediate delay={0.1}>
          <div className={styles.actions}>
            <StoreButtons />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <img src={groupePhoto} alt="" className={styles.groupPhoto} />
        </Reveal>
      </div>
    </section>
  )
}
