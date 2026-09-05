import { useEffect, useState } from 'react'
import styles from './StickyAppBar.module.css'

const DISMISS_KEY = 'stickyAppBarDismissed'

// Barre sticky mobile globale (05/09/2026, "je me demande si il faut pas ajouter un
// bouton sticky pour telecharger l'app en responsive") : même recette que la barre
// sticky mobile déjà en place sur /events/:id/ (EventDetail.tsx, inspirée de Meetup),
// mais posée au niveau du Layout pour couvrir tout le site plutôt qu'une seule page.
// N'apparaît qu'après un scroll minimal, pour ne jamais doubler les boutons App
// Store/Google Play déjà visibles dans le Hero de la home au premier écran. Masquée sur
// desktop (voir CSS) : StickyQR fait déjà ce travail là-bas.
export default function StickyAppBar() {
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
    <div className={styles.bar}>
      {/* Vers le bloc App Store/Google Play du Hero (05/09/2026, "doit rediriger vers le
          haut de la home là où il y a les boutons de téléchargement") plutôt que
          directement vers l'App Store : "/#appli" fonctionne depuis n'importe quelle
          page du site (id="appli" posé sur la section Hero, voir Hero.tsx), pas
          seulement la home. */}
      <a href="/#appli" className={styles.button}>
        <span aria-hidden="true">💜</span> Je veux rejoindre Les Martines
      </a>
      <button
        type="button"
        className={styles.close}
        onClick={handleDismiss}
        aria-label="Fermer ce bandeau"
      >
        ×
      </button>
    </div>
  )
}
