import { useLayoutEffect } from 'react'

interface HeadOptions {
  title: string
  description: string
  path: string
  /** true pour les pages qui ne doivent jamais apparaître dans les résultats de
      recherche (404, maintenance...) — voir NotFound.tsx/Maintenance.tsx. */
  noindex?: boolean
}

const SITE_URL = 'https://www.lesmartines.app'
const SITE_NAME = 'Les Martines'
// Image de partage par défaut (02/09/2026, "est-ce qu'on peut encore améliorer le seo") :
// avant ça, aucune page n'avait d'og:image — un lien Les Martines partagé sur
// WhatsApp/iMessage/Slack/LinkedIn n'affichait aucune vignette. Capture du hero de
// l'accueil (sans le nav) en 1200x630, le format recommandé pour Open Graph.
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Pose le titre + les meta essentielles d'une page.
 * vite-react-ssg exécute chaque route côté Node à la build (via un DOM headless)
 * et capture le <head> résultant dans le HTML statique généré : ce hook tourne
 * donc aussi bien à la build (SEO/IA) qu'au runtime dans le navigateur.
 */
export function useHead({ title, description, path, noindex = false }: HeadOptions) {
  useLayoutEffect(() => {
    const fullTitle = path === '/' ? title : `${title} · ${SITE_NAME}`
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:url', `${SITE_URL}${path}`)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:locale', 'fr_FR')
    upsertMeta('property', 'og:image', DEFAULT_OG_IMAGE)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:image', DEFAULT_OG_IMAGE)
    // Pages sans contenu réel à indexer (02/09/2026) : sans ça, Google pouvait en
    // théorie indexer /404/ ou /maintenance/ comme de vraies pages du site.
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    if (!noindex) {
      upsertLink('canonical', `${SITE_URL}${path}`)
    }
  }, [title, description, path, noindex])
}
