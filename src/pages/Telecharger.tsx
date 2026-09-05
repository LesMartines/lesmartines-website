import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import StoreButtons from '../components/StoreButtons'
import heartIcon from '../assets/hero/heart.png'
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
            <img src={heartIcon} alt="" className={styles.heart} />
            <h1 id="telecharger-title" className={styles.title}>
              <HighlightedText text="Télécharge l'appli" highlight="l'appli" />
            </h1>
            <p className={styles.subtitle}>
              Le réseau social 100% féminin et sécurisé. Sors de la solitude, prends
              confiance, libère la parole&nbsp;: télécharge Les Martines sur ton téléphone.
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

        <Reveal immediate delay={0.1}>
          <div className={styles.actions}>
            <StoreButtons size="large" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <img src={groupePhoto} alt="" className={styles.groupPhoto} />
        </Reveal>
      </div>
    </section>
  )
}
