import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import ConditionsGenerales from './pages/ConditionsGenerales'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Partenaires from './pages/Partenaires'
import Telecharger from './pages/Telecharger'
import Blog from './pages/Blog'
import Events, { loader as eventsLoader } from './pages/Events'
import EventDetail, { loader as eventDetailLoader } from './pages/EventDetail'
import NotFound from './pages/NotFound'
import Maintenance from './pages/Maintenance'

// Chaque route ici est pré-rendue en HTML statique à la build par vite-react-ssg
// (pas juste livrée vide en attendant le JS), ce qui est ce dont on a besoin
// pour rester lisible par les moteurs de recherche classiques ET les crawlers IA.
export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      // même chemin que sur le site actuel, pour ne pas casser le SEO existant
      { path: 'mentions-legales', Component: MentionsLegales },
      { path: 'politique-de-confidentialite', Component: PolitiqueConfidentialite },
      { path: 'conditions-generales-dutilisation', Component: ConditionsGenerales },
      { path: 'contact', Component: Contact },
      { path: 'faq', Component: Faq },
      { path: 'partenaires', Component: Partenaires },
      // Destination du QR code du widget StickyQR (05/09/2026, "je voudrais que le QR
      // code ramène vers une page où il y a les deux logos [...] parce que là, ça ramène
      // que sur Android") : URL dédiée plutôt qu'une simple ancre vers la home, à la fois
      // pour l'attente "nouvelle page" au scan et pour rendre ce trafic traçable plus tard.
      { path: 'telecharger', Component: Telecharger },
      // Page d'accueil du blog WordPress reconstruite avec notre nav/footer (05/09/2026,
      // "il y a aussi un blog wordpress a recuperer donc il faudrait la page mais pas le
      // menu") : même chemin que l'ancien site pour ne pas casser les liens/le SEO
      // existants, mais les 21 articles restent sur WordPress (voir Blog.tsx) — chaque
      // carte pointe vers l'article original en lien externe.
      { path: 'blog-les-martines', Component: Blog },
      // Prête mais pas encore reliée au menu (02/09/2026, "il faudrait la créer mais pas
      // l'afficher tout de suite [...] branchée à un back-office [...] que ma
      // développeuse derrière puisse brancher") : voir src/data/events.ts pour le point
      // de branchement exact. Le Nav garde "Events" en "Bientôt" tant que Marine n'a pas
      // décidé de publier — cette route existe déjà pour que tout soit prêt côté front.
      // `loader` (02/09/2026, "ça doit ressortir dans les recherches IA [...] et google
      // SEO") : exécuté à la build par vite-react-ssg, son résultat est injecté dans le
      // HTML statique — sans lui, le contenu ne dépendait que d'un fetch client (voir le
      // commentaire détaillé dans Events.tsx), invisible pour les moteurs de recherche.
      { path: 'events', Component: Events, loader: eventsLoader },
      // Page détail par event (03/09/2026, "faire la page derrière en reprenant les
      // elements de la cards [...] le but c'est de telecharger l'appli") : route
      // dynamique, pas encore reliée depuis les cards de la liste ("Non, pas tout de
      // suite" — Marine). Voir vite.config.ts (includedRoutes) pour comment chaque
      // /events/:id/ est quand même pré-rendu en HTML statique malgré le segment
      // dynamique, vite-react-ssg ne les inclut pas par défaut.
      { path: 'events/:id', Component: EventDetail, loader: eventDetailLoader },
      // "404" (pas de wildcard "*") : vite-react-ssg pré-rend cette route en dist/404.html,
      // le nom de fichier attendu par les hébergeurs statiques (Netlify, Vercel, GitHub
      // Pages...) pour toute URL qui ne correspond à aucun fichier existant.
      { path: '404', Component: NotFound },
      { path: '*', Component: NotFound },
    ],
  },
  // Hors du <Layout> (pas de Nav/Footer) : voir Maintenance.module.css — si le site est
  // en travaux, un menu vers d'autres pages potentiellement indisponibles n'a pas de sens.
  { path: 'maintenance', Component: Maintenance },
]
