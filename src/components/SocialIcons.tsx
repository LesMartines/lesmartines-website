// Petit set d'icônes maison en traits (currentColor), extrait de Footer.tsx le 01/09/2026
// pour être réutilisé aussi sur la page Contact ("mettre les logos des réseaux sociaux") —
// même famille visuelle pour les 3 plutôt que de mélanger les logos officiels (styles
// hétérogènes entre marques), cohérent avec le reste du site.
export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/lesmartines.app/', Icon: InstagramIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@lesmartines.app', Icon: TikTokIcon },
  { label: 'LinkedIn', href: 'https://fr.linkedin.com/company/lesmartines-app', Icon: LinkedInIcon },
]

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* Silhouette pleine (fill) plutôt qu'en traits comme les 2 autres (01/09/2026, "le logo
   tiktok est pas terrible") : la note de musique caractéristique du logo TikTok ne se lit
   bien qu'en forme pleine, contrairement à Instagram/LinkedIn qui restent identifiables
   en contour. */
export function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.4 2.4 1.9 4 4.4 4.2v2.8c-1.5 0-2.9-.5-4.1-1.3v6.4c0 3.2-2.3 5.4-5.3 5.4-2.9 0-5.3-2.2-5.3-5.1 0-2.9 2.5-5.1 5.4-5.1.3 0 .6 0 .9.1v2.9a2.5 2.5 0 0 0-.9-.2c-1.4 0-2.5 1-2.5 2.3 0 1.3 1.1 2.2 2.5 2.2 1.5 0 2.6-1.1 2.6-2.7V3h2.3Z" />
    </svg>
  )
}

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
      <line x1="11.5" y1="10" x2="11.5" y2="17" />
      <path d="M11.5 17v-4.3c0-1.6 1-2.5 2.4-2.5s2.1.9 2.1 2.5V17" />
    </svg>
  )
}
