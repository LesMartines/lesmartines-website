// Petites icônes discrètes réutilisées dans les formulaires/cartes du site (Contact.tsx,
// Partenaires.tsx) : même famille visuelle en traits que SocialIcons.tsx, plutôt que des
// icônes importées d'une lib externe pour rester cohérent avec le reste du site.
// Mutualisées ici (05/09/2026, revue) : TagIcon/CalendarIcon/PinIcon étaient dupliquées
// à l'identique dans les 2 fichiers, un vrai risque de divergence silencieuse si l'une
// des 2 copies était modifiée sans l'autre.
export function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="6.5" r="3.5" />
      <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 6l7 5 7-5" />
    </svg>
  )
}

export function MessageIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 5.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8l-4 3v-3H4.5a2 2 0 0 1-2-2v-6Z" />
    </svg>
  )
}

export function LinkIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 11.5 11.5 8.5" />
      <path d="M9.5 5.5 11 4a3 3 0 0 1 4.2 4.2l-1.5 1.5" />
      <path d="M10.5 14.5 9 16a3 3 0 0 1-4.2-4.2l1.5-1.5" />
    </svg>
  )
}

export function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4" width="15" height="13" rx="2" />
      <path d="M6 2.5v3M14 2.5v3M2.5 8h15" />
    </svg>
  )
}

export function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 18s6-5.2 6-10a6 6 0 0 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="10" cy="8" r="2.2" />
    </svg>
  )
}

export function TagIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.6 2.5H16a1 1 0 0 1 1 1v5.4a1 1 0 0 1-.3.7l-6.6 6.6a1 1 0 0 1-1.4 0l-5.4-5.4a1 1 0 0 1 0-1.4l6.6-6.6a1 1 0 0 1 .7-.3Z" />
      <circle cx="13" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function AtIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10.5" r="3.2" />
      <path d="M13.2 10.5V12a2 2 0 0 0 4 0V10a7.2 7.2 0 1 0-3 5.85" />
    </svg>
  )
}
