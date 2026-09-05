import { useEffect, useState } from 'react'
import styles from './StickyQR.module.css'
import qrCode from '../assets/qr/qr-scan-telecharger.png'

const DISMISS_KEY = 'stickyQRDismissed'

// Masqué sur mobile (voir CSS) : scanner un QR sur le téléphone qu'on tient déjà n'a pas
// de sens, ce widget cible les visiteuses sur desktop.
// QR régénéré (05/09/2026, "je voudrais que le QR code ramène vers une page où il y a les
// deux logos [...] parce que là, ça ramène que sur Android, c'est un problème") : l'ancien
// visuel encodait un lien Google Play en dur, invisible/cassé pour toute personne sur
// iPhone. Pointe maintenant vers /telecharger/ (les 2 badges App Store + Google Play, voir
// Telecharger.tsx), régénéré via le script Python qrcode/Pillow en reprenant exactement la
// même couleur que le reste du site (var(--color-primary)).
// Légende sortie du PNG (05/09/2026, "tu peux mettre un truc mieux que 'scan pour
// télécharger'" puis "le faire plus premium") : au lieu de re-cuire du texte dans les
// pixels du QR à chaque changement de wording, la légende est du vrai texte HTML en
// --font-hand (Caveat, déjà chargée par le site) — plus net qu'un texte rasterisé, et
// éditable sans repasser par le script Python.
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
      {/* Pas un lien (05/09/2026, "je veux pas que le QR soit cliquable, c'est que en
          flashant") : un <a> ici laissait n'importe qui atterrir sur /telecharger/ d'un
          simple clic sur desktop, alors que ce widget doit fonctionner UNIQUEMENT au
          scan depuis un téléphone — un <div> neutre, sans href ni curseur cliquable. */}
      <div className={styles.widget}>
        <span className={styles.codeFrame}>
          <img
            src={qrCode}
            alt="QR code à flasher avec ton téléphone pour télécharger l'application Les Martines"
            className={styles.code}
          />
        </span>
        {/* "Flashe/Scan" retiré (05/09/2026, "on est obligé de specifier le flash ou
            scan, on comprend non ?") : le QR code porte déjà l'instruction visuellement,
            inutile de la répéter en légende — ne garde que l'invitation. Une flèche à la
            main vers le QR a été essayée puis retirée le même jour. */}
        <span className={styles.caption}>Rejoins-nous</span>
      </div>
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
