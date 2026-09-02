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
          <h2 id="partenaires-title" className={styles.title}>
            <HighlightedText text="Nos partenaires sûrs" highlight="partenaires" />
          </h2>
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
          <div className={styles.cta}>
            <a href="/partenaires/">Je découvre toutes les marques</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
