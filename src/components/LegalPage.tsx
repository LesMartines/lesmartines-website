import { useEffect, useRef, useState } from 'react'
import styles from './LegalPage.module.css'

interface LegalSection {
  id: string
  label: string
}

interface LegalPageProps {
  title: string
  subtitle?: string
  updated: string
  sections: LegalSection[]
  children: React.ReactNode
}

// Refonte "plus moderne" des 3 pages légales (29/08/2026, "c'est pas très moderne là") :
// après la première passe (juste une carte blanche sur le fond pêche), Marine voulait
// vraiment autre chose. On passe donc à un gabarit type doc/legal moderne (esprit
// Stripe/Notion) : en-tête avec sous-titre + badge de dernière mise à jour, sommaire
// collant à gauche avec suivi de scroll (l'entrée active se surligne au fur et à mesure
// qu'on lit), contenu à droite sur une surface claire. Un seul composant partagé par les
// 3 pages pour que le layout reste identique partout et ne se décale pas si on retouche
// un des trois plus tard.
export default function LegalPage({ title, subtitle, updated, sections, children }: LegalPageProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')
  const tocRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveId((current) => {
          const visible = entries.filter((e) => e.isIntersecting)
          if (visible.length === 0) return current
          const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
          return top.target.id
        })
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [sections])

  // Fait défiler l'entrée active dans le sommaire lui-même si elle sort de la zone
  // visible (utile sur les CGU, sommaire plus long que la fenêtre).
  useEffect(() => {
    const active = tocRef.current?.querySelector(`.${styles.tocActive}`)
    active?.scrollIntoView({ block: 'nearest' })
  }, [activeId])

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="Sommaire">
          <p className={styles.tocLabel}>Sommaire</p>
          <ul ref={tocRef}>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={activeId === s.id ? styles.tocActive : undefined}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.main}>
          <header className={styles.header}>
            <span className={styles.updatedPill}>Mis à jour le {updated}</span>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>

          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  )
}
