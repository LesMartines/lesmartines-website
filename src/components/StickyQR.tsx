import { useEffect, useState } from 'react'
import styles from './StickyQR.module.css'
import qrCode from '../assets/qr/qr-scan-telecharger.png'

const DISMISS_KEY = 'stickyQRDismissed'

// QR "à blanc" en attendant les vrais liens App Store / Google Play définitifs
// (voir le TODO dans StoreButtons.tsx). Une fois ces liens fixés, à remplacer par un
// vrai QR qui pointe dessus (ou vers une smart-link qui redirige selon l'OS du téléphone).
// Masqué sur mobile (voir CSS) : scanner un QR sur le téléphone qu'on tient déjà n'a pas
// de sens, ce widget cible les visiteuses sur desktop.
// Visuel (27/08/2026) : asset réel fourni par Marine (QR + légende "Scan pour télécharger"
// intégrée à l'image). Le texte de la légende étant dans les pixels, on garde un alt
// descriptif sur l'image et l'aria-label sur le lien pour l'accessibilité.
// Apparition retardée + bouton de fermeture (05/09/2026, "on branche" — puis "le badge
// des partenaires on le voit plus") : branché tel quel (toujours visible, sans dismiss),
// ce widget fixe en bas à droite pouvait chevaucher du contenu selon la page (ex. le
// badge "Sur candidature uniquement" sur /partenaires/). Même recette que StickyAppBar :
// n'apparaît qu'après un premier scroll (jamais au tout premier écran, là où le contenu
// "au-dessus de la ligne de flottaison" a le plus de chances d'être important), et reste
// fermable si elle gêne malgré tout.
export default function StickyQR() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem(DISMISS_KEY) === '1',
  )

  useEffect(() => {
    if (dismissed) return
    const onScroll = () => {
      if (window.scrollY > 600) setVisible(true)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  if (dismissed || !visible) return null

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1')
    setDismissed(true)
  }

  return (
    <div className={styles.wrap}>
      <a
        href="#appli"
        className={styles.widget}
        aria-label="Scanner pour télécharger l'application Les Martines"
      >
        <img
          src={qrCode}
          alt="QR code : scan pour télécharger l'application Les Martines"
          className={styles.code}
        />
      </a>
      <button
        type="button"
        className={styles.close}
        onClick={handleDismiss}
        aria-label="Fermer ce widget"
      >
        ×
      </button>
    </div>
  )
}
