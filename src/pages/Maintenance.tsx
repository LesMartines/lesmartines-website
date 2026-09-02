import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import heartIcon from '../assets/hero/heart.png'
import { SOCIALS } from '../components/SocialIcons'
import styles from './Maintenance.module.css'

// Page maintenance (01/09/2026, à la suite de la 404 : "je parle au niveau des pages
// d'erreur" -> "oui fais la maintenance"), même recette visuelle que NotFound.tsx (grain +
// dégradé, gros mot en filigrane, cœur qui bat) pour rester cohérente avec le reste du
// site plutôt que la page blanche générique qu'on voit trop souvent.
// IMPORTANT : le site est 100% statique (pas de backend, voir Contact.tsx) — il n'y a pas
// de "mode maintenance" qui s'active tout seul. Cette page est prête à être utilisée mais
// ne remplace PAS automatiquement le site : le jour où il faut vraiment l'afficher, il
// faudra soit la mettre à la racine (index) le temps des travaux, soit configurer une
// redirection côté hébergeur (Netlify _redirects, Vercel rewrites...) vers /maintenance/.
export default function Maintenance() {
  useHead({
    title: 'On fait des travaux',
    description: 'Les Martines sont en pleine rénovation. On revient très vite !',
    path: '/maintenance/',
    noindex: true,
  })

  return (
    <section className={styles.section} aria-labelledby="maintenance-title">
      <div className="container">
        <Reveal immediate>
          <div className={styles.content}>
            <span className={styles.watermark} aria-hidden="true">
              ⚒
            </span>
            <img src={heartIcon} alt="" className={styles.heart} />
            <h1 id="maintenance-title" className={styles.title}>
              <HighlightedText text="On fait des travaux !" highlight="travaux" />
            </h1>
            <p className={styles.subtitle}>
              Les Martines sont en pleine rénovation pour te préparer quelque chose
              d&rsquo;encore mieux. On revient très vite, promis&nbsp;!
            </p>
            <div className={styles.socialLinks}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Icon />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
