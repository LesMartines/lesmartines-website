// Données structurées schema.org (JSON-LD). C'est ce que la plupart des moteurs de
// recherche IA (et Google) utilisent pour extraire des faits fiables sur Les Martines
// plutôt que de deviner à partir du texte de la page. À tenir à jour si les chiffres
// (avis, adresse) changent.
const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Les Martines',
  url: 'https://www.lesmartines.app',
  description:
    "Les Martines est un réseau social français réservé aux femmes, pensé pour sortir de la solitude, prendre confiance et libérer la parole en toute sécurité.",
  slogan: 'Le club des meufs qui prennent toute la place',
  // Corrigé (02/09/2026, "ça doit ressortir dans les recherches IA [...] et google
  // SEO") : ces URLs ne correspondaient pas aux vrais comptes utilisés dans
  // Footer.tsx/SocialIcons.tsx (handle, casse, préfixe différents) — un `sameAs` qui
  // pointe vers le mauvais compte n'aide ni Google ni les IA à vérifier l'identité de
  // la marque, ça peut même semer le doute.
  sameAs: [
    'https://www.instagram.com/lesmartines.app/',
    'https://www.tiktok.com/@lesmartines.app',
    'https://fr.linkedin.com/company/lesmartines-app',
  ],
}

const APP = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Les Martines',
  applicationCategory: 'SocialNetworkingApplication',
  operatingSystem: 'iOS, Android',
  description:
    "Application sociale 100% féminine avec vérification par selfie, modération humaine et politique anti-capture d'écran, pour papoter en sécurité et se retrouver en vrai.",
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '400',
  },
}

export default function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP) }} />
    </>
  )
}
