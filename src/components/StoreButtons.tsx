import type { MouseEvent } from 'react'
import appStoreBadge from '../assets/store/app-store-badge.png'
import googlePlayBadge from '../assets/store/google-play-badge.png'
import { burstConfetti } from '../lib/confetti'
import styles from './StoreButtons.module.css'

interface StoreButtonsProps {
  size?: 'default' | 'small' | 'large'
}

// Vrais liens envoyés par Marine (30/08/2026), remplacent les placeholders.
// export (03/09/2026, "On va avoir un deep link. Donc pas obligé de mettre les logos
// partout") : réutilisé par EventDetail.tsx pour son bouton unique de la barre sticky
// mobile, en attendant le deep link — plutôt que de dupliquer l'URL à un 2e endroit.
export const APP_STORE_URL = 'https://apps.apple.com/fr/app/les-martines/id6472043220'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.lesmartines.prod&hl=fr'

// Vrais badges envoyés par Marine (28/08/2026), remplacent les boutons SVG+texte codés à
// la main qui les approximaient. Le texte ("Dispo sur l'App Store" / "Dispo sur Google
// play") est intégré aux pixels de l'image, d'où l'alt descriptif sur chaque <img> en plus
// de l'aria-label sur le lien.
export default function StoreButtons({ size = 'default' }: StoreButtonsProps) {
  // Petit burst de confettis au clic (28/08/2026, "un petit élément cool qui donne du
  // dynamisme") : purement décoratif, ne bloque jamais la navigation (les liens
  // s'ouvrent dans un nouvel onglet, cette page reste affichée pour voir l'effet).
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    burstConfetti(e.clientX, e.clientY)
  }

  return (
    <div
      className={`${styles.wrap} ${size === 'small' ? styles.sizeSmall : ''} ${size === 'large' ? styles.sizeLarge : ''}`}
    >
      <a
        href={APP_STORE_URL}
        className={styles.button}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Télécharger Les Martines sur l'App Store"
        onClick={handleClick}
      >
        <img src={appStoreBadge} alt="Disponible sur l'App Store" className={styles.badge} />
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        className={styles.button}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Télécharger Les Martines sur Google Play"
        onClick={handleClick}
      >
        <img src={googlePlayBadge} alt="Disponible sur Google Play" className={styles.badge} />
      </a>
    </div>
  )
}
