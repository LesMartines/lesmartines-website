import StoreButtons from './StoreButtons'
import { SOCIALS } from './SocialIcons'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div>
            <p className={styles.logo}>Les Martines</p>
            <p className={styles.tagline}>Le club des meufs qui prennent toute la place.</p>
          </div>
          <StoreButtons size="small" />
        </div>

        <div className={styles.links}>
          {/* Rendue accessible hors QR code (05/09/2026, "on ajoute" — la page n'était
              reliée nulle part sur le site, seulement via le QR du widget StickyQR). */}
          <a href="/telecharger/">Télécharger l&rsquo;appli</a>
          <a href="/mentions-legales/">Mentions légales</a>
          <a href="/conditions-generales-dutilisation/">CGU</a>
          <a href="/politique-de-confidentialite/">Politique de confidentialité</a>
          <a href="/faq/">What the FAQ</a>
          <a href="/contact/">Nous contacter</a>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>Copyright © {year} Les Martines</p>
          <div className={styles.socials}>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
