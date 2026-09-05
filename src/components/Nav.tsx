import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

// "Ambassadrices" et "Espace pro" retirés pour le lancement V0 (décision Marine du 27/08/2026).
// "Events" n'a pas encore de page dédiée : affiché en "Bientôt" plutôt que retiré, pour ne
// pas perdre l'intention de la maquette.
// "On papote ?" ajouté le 31/08/2026 (nouvelle page /contact/, voir src/pages/Contact.tsx).
// "Le Martine Mag" repassé en lien normal le 31/08/2026 ("on va le brancher nous-même") :
// pointe pour l'instant vers le blog du site en prod, en attendant que Marine le remplace
// par une page dédiée sur ce site.
// "What the FAQ" (nouvelle page /faq/, voir src/pages/Faq.tsx) reste dans le footer
// seulement (31/08/2026, "on le laisse en bas, pas besoin de l'avoir dans le menu") :
// présent dans le nav du site en prod, mais Marine préfère ne pas l'ajouter ici.
// "Partenaires" pointait vers l'ancre #partenaires (bandeau défilant de l'accueil) avant
// le 01/09/2026 : pointe maintenant vers la vraie page dédiée /partenaires/ (voir
// src/pages/Partenaires.tsx, "fais moi la page partenaire"), qui détaille chaque marque —
// le bandeau de l'accueil reste un teaser qui renvoie lui aussi vers cette page.
// `activeOn` : chemin(s) pour lesquels ce lien doit s'afficher en actif (couleur primaire),
// pas juste au survol. "L'appli" pointe en fait vers la page d'accueil elle-même
// ("l'appli c'est la page accueil en fait, donc faut que ça reste violet quand on est
// dessus") — maintenant que le site a une vraie 2e page (/contact/), un simple lien
// d'ancre ne suffit plus à indiquer "on est déjà ici".
// href '/' plutôt que l'ancre '#appli' (01/09/2026, bug rapporté "quand je clique sur
// l'appli je n'arrive pas sur l'accueil") : un lien en #ancre ne fait QUE scroller la page
// courante vers cet id — depuis une autre page que l'accueil (FAQ, Contact, Partenaires),
// ça ajoutait juste "#appli" à l'URL en cours sans jamais naviguer vers "/". Le Hero (id
// "appli") est de toute façon tout en haut de l'accueil, donc "/" y amène pareil.
interface NavLink {
  label: string
  href: string | null
  activeOn?: string[]
}

const links: NavLink[] = [
  { label: "L'appli", href: '/', activeOn: ['/'] },
  { label: 'Events', href: null },
  { label: 'Devenir partenaire', href: '/partenaires/', activeOn: ['/partenaires/'] },
  { label: 'Le Martine Mag', href: 'https://www.lesmartines.app/blog-les-martines/' },
  { label: 'On papote ?', href: '/contact/', activeOn: ['/contact/'] },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navRef = useRef<HTMLElement | null>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

  // Soulignement animé qui glisse sous le lien survolé/actif (31/08/2026, "améliorer le
  // menu et le rendre plus premium") : une seule pastille repositionnée en JS (left/width
  // calculés depuis le lien visé, relatifs à <nav>) plutôt que 5 traits CSS indépendants,
  // pour avoir la transition de GLISSEMENT d'un lien à l'autre plutôt que 2 apparitions/
  // disparitions instantanées.
  const moveIndicatorTo = (label: string) => {
    const el = linkRefs.current[label]
    const nav = navRef.current
    if (!el || !nav) return
    const elRect = el.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()
    setIndicator({ left: elRect.left - navRect.left, width: elRect.width, opacity: 1 })
  }

  const activeLink = links.find((l) => l.activeOn?.includes(location.pathname))

  // Position de repli : sous le lien actif (la page où on est déjà) s'il y en a un,
  // sinon masqué. Recalculé au montage et à chaque changement de page — pas au resize
  // (le menu passe en dropdown vertical sous 860px, voir Nav.module.css, où le
  // soulignement est de toute façon caché).
  useLayoutEffect(() => {
    if (activeLink) {
      moveIndicatorTo(activeLink.label)
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Nav qui se rétracte légèrement une fois qu'on a quitté le tout haut de la page
  // (28/08/2026, "un petit élément cool qui donne du dynamisme"), rAF-throttlé comme le
  // parallax de FeatureShowcase pour ne pas coûter cher au scroll. Seuil à 40px : assez
  // tôt pour que ce soit un vrai retour au clic/scroll, pas juste au premier pixel.
  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      setScrolled(window.scrollY > 40)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo}>
          Les Martines
        </a>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="nav-menu"
          ref={navRef}
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Navigation principale"
          onMouseLeave={() => (activeLink ? moveIndicatorTo(activeLink.label) : setIndicator((prev) => ({ ...prev, opacity: 0 })))}
        >
          {links.map((link) =>
            link.href ? (
              <a
                key={link.label}
                ref={(el) => {
                  linkRefs.current[link.label] = el
                }}
                href={link.href}
                className={`${styles.link} ${link.activeOn?.includes(location.pathname) ? styles.linkActive : ''}`}
                onMouseEnter={() => moveIndicatorTo(link.label)}
                onFocus={() => moveIndicatorTo(link.label)}
              >
                {link.label}
              </a>
            ) : (
              <span key={link.label} className={styles.linkSoon}>
                {link.label}
                <span className={styles.badge}>Bientôt</span>
              </span>
            ),
          )}
          <span
            className={styles.indicator}
            aria-hidden="true"
            style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width, opacity: indicator.opacity }}
          />
        </nav>
      </div>
    </header>
  )
}
