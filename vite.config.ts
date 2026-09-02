import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getEvents } from './src/data/events'

// vite-react-ssg reads this same config to prerender every route to static HTML at build time.
// https://github.com/userquin/vite-react-ssg
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    // includedRoutes (03/09/2026, page détail /events/:id/, "faire la page derrière"") :
    // par défaut vite-react-ssg exclut tout segment dynamique (":id") du pré-rendu — sans
    // ça, /events/:id/ resterait un fichier HTML littéral introuvable, invisible pour le
    // SEO comme pour un simple lien direct. On garde les routes statiques telles quelles
    // et on ajoute une entrée par event connu de getEvents() (même source de données que
    // la page /events/ elle-même, voir src/data/events.ts).
    async includedRoutes(paths) {
      const events = await getEvents()
      const staticPaths = paths.filter((p) => !p.includes(':'))
      const eventPaths = events.map((e) => `/events/${e.id}`)
      return [...staticPaths, ...eventPaths]
    },
  },
})
