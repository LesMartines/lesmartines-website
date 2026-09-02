import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles/tokens.css'
import './styles/global.css'

// Point d'entrée unique, utilisé aussi bien pour le dev (npm run dev)
// que pour la génération statique (npm run build).
// Doc du package : https://github.com/userquin/vite-react-ssg
export const createRoot = ViteReactSSG({ routes })
