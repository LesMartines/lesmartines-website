import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import bubbleMaisNon from '../assets/hero/bubble-mais-non.png'
import styles from './NotFound.module.css'

// Page 404 (01/09/2026, "il faudra faire une page 404 un peu stylé aussi") : servie par
// les hébergeurs statiques (Netlify/Vercel/GitHub Pages...) qui cherchent un fichier
// "404.html" à la racine pour toute URL qui ne correspond à aucune route connue — d'où la
// route littérale 'path: 404' dans routes.tsx plutôt qu'un wildcard '*' (vite-react-ssg
// pré-rend chaque route déclarée en fichier .html à la build, "404" devient "404.html").
// Réutilise bubble-mais-non.png (déjà présent dans les assets du Hero de l'accueil,
// "Mais non ! Et alors ?") plutôt qu'une nouvelle illustration : le ton "mais non, cette
// page n'existe pas" colle parfaitement sans avoir besoin d'un nouveau visuel.
export default function NotFound() {
  useHead({
    title: 'Page introuvable',
    description: "Cette page n'existe pas ou plus. Retourne vite chez Les Martines !",
    path: '/404/',
    noindex: true,
  })

  return (
    <section className={styles.section} aria-labelledby="notfound-title">
      <div className="container">
        <Reveal immediate>
          <div className={styles.content}>
            <span className={styles.code}>404</span>
            <img src={bubbleMaisNon} alt="" className={styles.bubble} />
            <h1 id="notfound-title" className={styles.title}>
              <HighlightedText text="Oups, perdue ?" highlight="perdue" />
            </h1>
            <p className={styles.subtitle}>
              Cette page n&rsquo;existe pas, plus, ou tu t&rsquo;es juste un peu
              trompée de chemin. Ça arrive aux meilleures.
            </p>
            <div className={styles.actions}>
              <a href="/" className={styles.primaryButton}>
                Je retourne à l&rsquo;accueil
              </a>
              <a href="/contact/" className={styles.secondaryButton}>
                Un souci&nbsp;? On papote&nbsp;💌
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
