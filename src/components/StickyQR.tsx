import styles from './StickyQR.module.css'
import qrCode from '../assets/qr/qr-scan-telecharger.png'

// QR "à blanc" en attendant les vrais liens App Store / Google Play définitifs
// (voir le TODO dans StoreButtons.tsx). Une fois ces liens fixés, à remplacer par un
// vrai QR qui pointe dessus (ou vers une smart-link qui redirige selon l'OS du téléphone).
// Masqué sur mobile (voir CSS) : scanner un QR sur le téléphone qu'on tient déjà n'a pas
// de sens, ce widget cible les visiteuses sur desktop.
// Visuel (27/08/2026) : asset réel fourni par Marine (QR + légende "Scan pour télécharger"
// intégrée à l'image). Le texte de la légende étant dans les pixels, on garde un alt
// descriptif sur l'image et l'aria-label sur le lien pour l'accessibilité.
export default function StickyQR() {
  return (
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
  )
}
