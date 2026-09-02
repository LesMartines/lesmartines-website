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
