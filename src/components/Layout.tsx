import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()

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
    </>
  )
}
