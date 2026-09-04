import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import StoreButtons from './StoreButtons'
import styles from './Hero.module.css'
import phoneChloe from '../assets/hero/phone-chloe.webp'
import bubbleAssure from '../assets/hero/bubble-assure.png'
import bubbleMeuf from '../assets/hero/bubble-meuf.png'
import bubbleMaisNon from '../assets/hero/bubble-mais-non.png'
import pin1 from '../assets/hero/pin-1.png'
import pin2 from '../assets/hero/pin-2.png'
import pin3 from '../assets/hero/pin-3.png'
import cardMia from '../assets/hero/card-mia.webp'
import cardJulie from '../assets/hero/card-julie.webp'
import cardQueenEnergy from '../assets/hero/card-queen-energy.webp'
import cardAmitie from '../assets/hero/card-amitie.webp'
// Nouvelle compo mobile (04/09/2026, "on va refaire la compo pour le mobile, voici le
// lien figma [...] et les images") : remplace l'ancienne version simplifiée à 3 écrans
// (.mobilePhones) par un vrai collage repris du frame Figma node 12119:6050, avec les
// exports PNG fournis par Marine (déjà recadrés/inclinés pour la plupart directement
// dans l'asset, seuls quelques éléments — event card, post Lou_Lou, pins, cœur —
// gardent une rotation appliquée ici en CSS, comme dans le fichier source).
// Réutilisés aussi dans le collage DESKTOP (04/09/2026, "tous les elements sont deja
// sur le desktop en fait tu peux les remplacer") : phoneMap, phonePapotage, badge19
// Martines, le post Lou_Lou, la carte Café&Networking et le cœur pointaient vers
// d'anciens exports moins nets — remplacés par ces mêmes fichiers Figma partout où un
// équivalent existe (phoneChloe, les pins génériques, cardMia/cardJulie/cardQueenEnergy
// et cardAmitie n'ont pas d'équivalent dans la compo mobile, laissés tels quels).
import mobilePhoneMap from '../assets/hero/mobile-compo/phone-map-tilted.png'
import mobilePhonePapotage from '../assets/hero/mobile-compo/phone-papotage-empty.png'
import mobileCardLeaDreamer from '../assets/hero/mobile-compo/card-lea-dreamer.png'
import mobileCardLoulou from '../assets/hero/mobile-compo/card-loulou.png'
import mobileCardEvent from '../assets/hero/mobile-compo/card-event-cafe.png'
import mobileBadge19 from '../assets/hero/mobile-compo/badge-19-martines-coin.png'
import mobilePin2 from '../assets/hero/mobile-compo/pin-2.png'
import mobileHeart from '../assets/hero/mobile-compo/heart-solid.png'

export default function Hero() {
  const collageRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  // Déclenche le "pop" du badge/des pins/des cartes Mia+Julie au scroll plutôt qu'au
  // montage (31/08/2026, "il manque des effets sur les pin qui apparaissent au scroll" +
  // "le bandeau 19 martines + les card julie et mia") : même recette que .pin dans
  // EventsPromo.tsx. Un seul déclenchement (disconnect après le premier isIntersecting).
  // Explicitement PAS de flottement en continu sur ces éléments (demande du même jour,
  // "sinon ca fait les mm anim partout") : cardQueen/cardAmitie/les posts du fil portent
  // déjà l'animation floatSoft*, inutile de la dupliquer ici.
  useEffect(() => {
    const el = collageRef.current
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
    <section id="appli" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        {/* Reveal ici fait aussi office d'animation d'entrée : le Hero est visible dès
            l'arrivée sur la page, donc le déclenchement "au scroll" de whileInView se
            produit en pratique dès le montage (demande Marine 28/08/2026, "un petit effet
            sur le texte ... quand t'arrive"). Les blocs suivants (boutons, collage) sont
            eux aussi enveloppés dans un Reveal avec un delay croissant (0 / 0.1 / 0.2s)
            pour une arrivée en cascade plutôt que tout d'un bloc — demandé le même jour
            ("ça manque des trucs waouh"). Sous-titre à mots qui défilent retiré le
            29/08/2026 sur demande de Marine. */}
        <Reveal immediate>
          <h1 className={styles.title}>
            {/* Coupure différente en mobile (03/09/2026, "faut que tu mette Le club des
                meufs à la ligne qui prennent toute la place") : .breakMobile casse après
                "meufs" sous 640px, .breakDesktop garde la coupure existante après "qui"
                à partir de 640px — les deux <br> ne sont jamais visibles en même temps. */}
            {/* "la place" avec espace insécable (04/09/2026, "mettre 'la place' toujours
                accroché ensemble pour que ça revienne a la ligne") : évite que "la" et
                "place" se retrouvent séparés par un retour à la ligne, "la" en fin
                d'une ligne et "place" seul au début de la suivante. */}
            Le club des meufs
            <br className={styles.breakMobile} /> qui <br className={styles.breakDesktop} />
            prennent toute la&nbsp;place
          </h1>
        </Reveal>

        <Reveal immediate delay={0.1} className={styles.actions}>
          <StoreButtons size="large" />
          <p className={styles.rating}>
            {/* Chiffre harmonisé avec la section avis plus bas, décision Marine du
                27/08/2026. À rafraîchir avec les vrais totaux App Store / Google Play
                avant mise en prod. Transformé en badge (29/08/2026, "vraiment pas mis
                assez en valeur") : c'était une simple ligne de texte gris 13px sous les
                boutons de stores, qui passait complètement inaperçue alors que c'est un
                des arguments de confiance les plus forts de la page. Étoiles avec le même
                traitement (contour + citron vert) que le gros chiffre de la section Avis
                plus bas, pour que les deux se répondent visuellement. */}
            {/* Restructuré en 2 groupes (04/09/2026, "on peut faire plus
                compréhensible") : "note · nombre d'avis" d'un côté, puis la source des
                avis à part — l'ancienne phrase enchaînait tout d'un bloc ("450+ avis
                App Store & Google Play"), ambiguë à lire vite (les stores donnent
                l'impression de qualifier autre chose que "avis"). */}
            <span className={styles.ratingStars} aria-hidden="true">
              ★★★★★
            </span>
            <span className={styles.ratingScore}>4,8/5</span>
            <span className={styles.ratingSep} aria-hidden="true">
              ·
            </span>
            450+ avis
            <span className={styles.ratingSource}>(App Store &amp; Google Play)</span>
          </p>
        </Reveal>

        {/*
          Vraie compo (29/08/2026, "faut vraiment que ca pete, c'est le 1er truc qu'on
          voit en arrivant"), recalée le 30/08/2026 sur les coordonnées EXACTES du frame
          Figma "hero-composition" (node 11953:32990, via Figma MCP get_design_context) :
          chaque élément reprend précisément le left/top/width (en % du frame source
          801x349px) et l'ordre d'empilement (z-index) du fichier Figma, plutôt qu'une
          estimation au pixel près sur une capture d'écran aplatie. Rotations et ombres
          restent cuites dans chaque PNG exporté par Marine (le cadre de export Figma
          correspond déjà à la bounding box post-rotation), donc pas de rotate en CSS ici.
          Le pin "1" et le pin "3" apparaissent chacun deux fois dans le frame Figma (5
          pins au total, 3 visuels distincts) : on réutilise le même asset aux deux
          endroits plutôt que d'en demander un nouveau. Deux éléments du frame Figma n'ont
          pas d'asset correspondant côté Marine et restent donc absents pour l'instant :
          la carte "Julie, 32 ans · 75002" (équivalent de card-mia mais avec un autre
          prénom/une autre ville) et une 4e bulle de conversation "La Quenne".
        */}
        <Reveal immediate delay={0.2} className={styles.collageWrap}>
          {/* role="img" porté par CE wrapper (plutôt que .collage directement) : il reste
              toujours présent dans le DOM que .collage ou .mobilePhones soit affiché
              (l'un des deux passe en display:none selon le breakpoint, voir le CSS), donc
              la description reste exposée aux lecteurs d'écran dans les deux cas. */}
          <div
            className={styles.collageInner}
            role="img"
            aria-label="Apercu de l'application Les Martines : conversation entre Martines, carte des Martines a proximite, fil Papotage, cartes Queen energy et Amitie, posts du fil (Cafe & Networking, Lea_Dreamer, Lou_Lou), et badge indiquant 19 Martines a proximite"
          >
            <div ref={collageRef} className={`${styles.collage} ${inView ? styles.inView : ''}`}>
              <img src={mobilePhoneMap} alt="" className={`${styles.el} ${styles.phoneMap}`} />
              <img src={pin3} alt="" className={`${styles.el} ${styles.pinPos1}`} />
              <img src={pin1} alt="" className={`${styles.el} ${styles.pinPos2}`} />
              <img src={cardMia} alt="" className={`${styles.el} ${styles.cardMia}`} />
              <img src={pin1} alt="" className={`${styles.el} ${styles.pinPos3}`} />
              <img src={pin3} alt="" className={`${styles.el} ${styles.pinPos4}`} />
              <img src={cardJulie} alt="" className={`${styles.el} ${styles.cardJulie}`} />
              <img src={pin2} alt="" className={`${styles.el} ${styles.pinPos5}`} />

              <img src={phoneChloe} alt="" className={`${styles.el} ${styles.phoneChloe}`} />
              <img src={bubbleAssure} alt="" className={`${styles.el} ${styles.bubbleAssure}`} />
              <img src={bubbleMeuf} alt="" className={`${styles.el} ${styles.bubbleMeuf}`} />
              <img src={bubbleMaisNon} alt="" className={`${styles.el} ${styles.bubbleMaisNon}`} />

              <img src={cardQueenEnergy} alt="" className={`${styles.el} ${styles.cardQueen}`} />
              <img src={mobilePhonePapotage} alt="" className={`${styles.el} ${styles.phonePapotage}`} />
              <img src={mobileHeart} alt="" className={`${styles.el} ${styles.heart}`} />
              <img src={mobileCardLoulou} alt="" className={`${styles.el} ${styles.postLoulou}`} />
              <img src={cardAmitie} alt="" className={`${styles.el} ${styles.cardAmitie}`} />
              <img src={mobileCardLeaDreamer} alt="" className={`${styles.el} ${styles.postLea}`} />
              <img src={mobileCardEvent} alt="" className={`${styles.el} ${styles.postCafe}`} />
              <img src={mobileBadge19} alt="" className={`${styles.el} ${styles.badge}`} />
            </div>

            {/* Version mobile simplifiée (30/08/2026, "on voit rien" sur la compo complète) :
                les 18 éléments de .collage ci-dessus sont calibrés pour ~800px de large,
                donc réduits à la largeur d'un téléphone (~350-400px) ils deviennent
                minuscules et illisibles, quel que soit le padding qu'on regagne autour.
                Plutôt que de rogner arbitrairement la compo existante (les éléments se
                chevauchent, impossible de recadrer proprement sans couper un élément en
                plein milieu), on affiche ici seulement les 3 vrais écrans d'appli, en
                grand. Caché au-delà de 640px (voir .mobilePhones dans le CSS), où
                .collage ci-dessus reprend la main.
                phone-papotage.webp et phone-chloe.webp sont des écrans "vides" (juste
                l'en-tête) dans leur fichier source : dans la compo desktop, ce sont les
                cartes de post et bulles de conversation flottantes qui les remplissent
                visuellement. Repris ici en miniature (1 post, 2 bulles) pour que chaque
                téléphone montre autre chose qu'un écran vide une fois isolé et agrandi. */}
            <div className={styles.mobilePhones} aria-hidden="true">
              <img src={mobilePhoneMap} alt="" className={styles.mobileMapPhone} />
              <img src={mobilePhonePapotage} alt="" className={styles.mobilePapotagePhone} />
              <img src={mobileHeart} alt="" className={styles.mobileHeart} />
              {/* Le pin "1" (mobilePin1) n'est PAS un élément séparé dans le frame Figma :
                  il fait partie du contenu du téléphone map lui-même (deux instances
                  "Icon/Pin Map" posées SUR le screenshot map, à l'intérieur du groupe
                  exporté en un seul PNG) — déjà inclus dans mobilePhoneMap, pas besoin
                  de le superposer une 2e fois. Seul le grand pin "2" est un élément à
                  part dans la compo (04/09/2026, vérifié via get_metadata). */}
              <img src={mobilePin2} alt="" className={styles.mobilePin2} />
              <img src={mobileCardLeaDreamer} alt="" className={styles.mobileCardLea} />
              <img src={mobileCardLoulou} alt="" className={styles.mobileCardLoulou} />
              <img src={mobileBadge19} alt="" className={styles.mobileBadge19} />
              <img src={mobileCardEvent} alt="" className={styles.mobileCardEvent} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
