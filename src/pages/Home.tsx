import { useHead } from '../lib/useHead'
import StructuredData from '../components/StructuredData'
import Hero from '../components/Hero'
import PressLogos from '../components/PressLogos'
import EventsPromo from '../components/EventsPromo'
import FeatureShowcase from '../components/FeatureShowcase'
import ValeursBloc from '../components/ValeursBloc'
import CommunityStats from '../components/CommunityStats'
import Avis from '../components/Avis'
import Partenaires from '../components/Partenaires'
import CtaFinal from '../components/CtaFinal'

export default function Home() {
  useHead({
    title: 'Les Martines — le club des meufs qui prennent toute la place',
    // Raccourcie à 159 caractères (02/09/2026, "niveau seo") : la version précédente
    // faisait 186 caractères, au-delà des ~155-160 que Google affiche avant de tronquer
    // en plein milieu de phrase dans les résultats de recherche.
    description:
      'Les Martines, le réseau social 100% féminin et sécurisé : sors de la solitude, prends confiance, libère la parole. Vérification par selfie, modération humaine.',
    path: '/',
  })

  return (
    <>
      <StructuredData />
      <Hero />
      <PressLogos />
      <EventsPromo />
      <FeatureShowcase />
      <ValeursBloc />
      <CommunityStats />
      <Avis />
      <Partenaires />
      <CtaFinal />
    </>
  )
}
