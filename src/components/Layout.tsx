import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import StickyAppBar from './StickyAppBar'
import StickyQR from './StickyQR'

export default function Layout() {
  const location = useLocation()
  // /events/:id/ a déjà sa propre barre sticky mobile (fiche event + bouton unique,
  // voir EventDetail.tsx) : éviter d'en empiler une 2e en bas d'écran sur cette page.
  const hasOwnStickyBar = /^\/events\/[^/]+\/?$/.test(location.pathname)
  // Pages sans intention de conversion, ou avec déjà leur propre action principale
  // (05/09/2026, "est-ce que le bouton sticky doit être sur toutes les pages ?") :
  // /contact/ a déjà le bouton "J'envoie" du formulaire (doublon direct, surtout gênant
  // en scrollant vers le bas pour valider) ; les pages légales n'ont rien à vendre ;
  // /404/ n'est pas le bon moment pour relancer du marketing.
  const hidesStickyBar = [
    '/contact/',
    '/mentions-legales/',
    '/politique-de-confidentialite/',
    '/conditions-generales-dutilisation/',
    '/404/',
  ].includes(location.pathname)

  // Retour en haut de page à chaque navigation interne (03/09/2026, "quand je clique sur
  // une carte en bas, il faut que j'arrive en haut de la page") : react-router-dom, en
  // SPA, ne touche jamais au scroll par lui-même contrairement à un vrai changement de
  // page côté navigateur — sans ça, cliquer sur une card en bas d'une page (ex. "Autres
  // events" sur /events/:id/) atterrit sur la nouvelle page À LA MÊME position de scroll
  // qu'avant le clic, ce qui peut tomber n'importe où selon la longueur relative des 2
  // pages. Un seul endroit (Layout, au-dessus de toutes les routes) pour corriger ça
  // partout sur le site, pas juste sur les cards events.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Nav />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
      {!hasOwnStickyBar && !hidesStickyBar && <StickyAppBar />}
      {/* Pendant desktop de StickyAppBar (05/09/2026, "on branche" — composant déjà codé
          le 27/08/2026 mais jamais relié à Layout) : StickyAppBar cible le mobile (voir
          son CSS, masqué au-dessus de 780px), ce widget cible le desktop (masqué en
          dessous de 768px) où les boutons App Store/Google Play ne sont pas cliquables
          depuis l'ordinateur — mêmes pages exclues, même raisonnement. */}
      {!hasOwnStickyBar && !hidesStickyBar && <StickyQR />}
    </>
  )
}
