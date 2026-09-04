import HighlightedText from './HighlightedText'
import Reveal from './Reveal'
import { PARTENAIRES, type Partenaire } from '../data/partenaires'
import styles from './Partenaires.module.css'

const HALF = Math.ceil(PARTENAIRES.length / 2)
const ROW_1 = PARTENAIRES.slice(0, HALF)
const ROW_2 = PARTENAIRES.slice(HALF)

function LogoCard({ p }: { p: Partenaire }) {
  const img = <img src={p.logo} alt={p.name} className={styles.logo} loading="lazy" />
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={styles.card} aria-label={p.name}>
      {img}
    </a>
  ) : (
    <span className={styles.card} aria-label={p.name}>
      {img}
    </span>
  )
}

function LogoList({ items, hidden }: { items: Partenaire[]; hidden?: boolean }) {
  return (
    <ul className={styles.list} aria-hidden={hidden ? 'true' : undefined}>
      {items.map((p, i) => (
        <li key={`${p.name}-${i}`} className={styles.item}>
          <LogoCard p={p} />
        </li>
      ))}
    </ul>
  )
}

// Défilement sur 2 lignes, sens opposés (31/08/2026, "trop petits, on arrivait pas à les
// lire [...] que ça fasse la même chose que pour nos green flags") : même mécanique que
// MarqueeRow dans ValeursBloc.tsx (3 copies par ligne pour boucler sans coupure visible,
// pause au survol, fondu sur les bords). Logos bien plus grands que dans l'ancienne
// grille statique puisqu'on n'a plus besoin de tous les montrer en même temps.
function MarqueeRow({ items, reverse }: { items: Partenaire[]; reverse?: boolean }) {
  return (
    <div className={styles.marqueeWrap}>
      <div className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        <LogoList items={items} />
        <LogoList items={items} hidden />
        <LogoList items={items} hidden />
      </div>
    </div>
  )
}

export default function Partenaires() {
  return (
    <section id="partenaires" className={styles.section} aria-labelledby="partenaires-title">
      <div className="container">
        <Reveal>
          {/* Écusson repris de /partenaires/ (03/09/2026, "on pourrait ajouter l'écusson
              +30 marques sur la home aussi non") : donne le même chiffre concret et
              mémorisable dès le teaser de la home, avant même que la visiteuse aille sur
              la page dédiée. */}
          <div className={styles.titleWrap}>
            <div className={styles.titleWrapInner}>
              <h2 id="partenaires-title" className={styles.title}>
                <HighlightedText text="Nos partenaires sûrs" highlight="partenaires" />
              </h2>
              {/* "partenaires" retiré du badge (04/09/2026, "on a une répétition avec
                  le badge [...] je n'ai pas envie de changer le titre") : le titre
                  juste à côté dit déjà "Nos partenaires sûrs", inutile de répéter le
                  mot dans les 2 endroits. */}
              <span className={styles.seal} aria-hidden="true">
                <span className={styles.sealNumber}>{PARTENAIRES.length}+</span>
                <span className={styles.sealLabel}>
                  marques
                  <br />
                  choisies
                </span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className={styles.rows}>
          <MarqueeRow items={ROW_1} />
          <MarqueeRow items={ROW_2} reverse />
        </div>
      </Reveal>

      <div className="container">
        <Reveal delay={0.15}>
          {/* Wording plus vendeur + vrai bouton discret (03/09/2026, "changer le wording
              par un truc plus vendeur et mettre un plus jolie bouton discret") : le
              chiffre concret (déjà utilisé dans l'écusson juste au-dessus) remplace un
              "toutes les marques" vague, et un pill bordé (même famille que
              .successReset dans Contact.module.css) remplace le simple lien souligné —
              plus soigné, mais toujours secondaire face au CTA "Je candidate" de la
              vraie page /partenaires/. */}
          <div className={styles.cta}>
            <a href="/partenaires/" className={styles.ctaButton}>
              Voir les {PARTENAIRES.length}+ marques partenaires
              <span aria-hidden="true">→</span>
            </a>
            {/* Invitation dédiée aux marques (03/09/2026, "changer le wording pour que
                les marques aient envie de nous contacter") : le bouton ci-dessus
                s'adresse aux visiteuses (parcourir les marques déjà là), pas aux marques
                elles-mêmes — sans cette ligne, une marque intéressée n'a ici aucun signe
                que candidater est possible avant d'aller sur /partenaires/. */}
            {/* "découvrir" à la ligne (04/09/2026, "tu n'as pas mis de découvrir à la
                ligne") : espace insécable avant pour garder "te découvrir" ensemble au
                lieu de laisser "te" seul en fin de ligne. */}
            <p className={styles.ctaBrand}>
              Toi aussi tu représentes une marque&nbsp;?{' '}
              <a href="/contact/?type=marque">On a hâte de te&nbsp;découvrir →</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
