import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import { getEvents, type EventItem } from '../data/events'
import photoCafeNetworking from '../assets/events/card/photo-cafe-networking.jpg'
import photoYogaTartines from '../assets/events/card/photo-yoga-tartines.webp'
import photoMainsTerre from '../assets/events/card/photo-mains-terre.webp'
import avatarOrganizer from '../assets/events/card/avatar-organizer.png'
import avatar1 from '../assets/events/card/avatar-1.png'
import avatar2 from '../assets/events/card/avatar-2.png'
import avatar3 from '../assets/events/card/avatar-3.png'
import iconCalendar from '../assets/events/card/icon-calendar.svg'
import iconSparkle from '../assets/events/card/icon-sparkle-partner.svg'
import iconCrown from '../assets/events/card/icon-crown-martinade.svg'
import heartIcon from '../assets/hero/heart.png'
import styles from './Events.module.css'

// ============================================================================
// CHECKLIST DE PUBLICATION — à faire le jour où Marine donne le feu vert (pas avant) :
//   1. Nav.tsx        — remplacer l'entrée "Events" (href: null, badge "Bientôt") par
//                        un vrai lien vers "/events/".
//   2. EventsPromo.tsx — changer le CTA "Je découvre les events" (pointe vers "#appli")
//                        pour qu'il pointe vers "/events/".
//   3. Events.tsx (ici) — retirer `noindex: true` du useHead() plus bas, sinon Google
//                        continuera d'ignorer la page même une fois publiée.
//   4. sitemap.xml     — ajouter l'entrée https://www.lesmartines.app/events/ (elle a
//                        été volontairement laissée de côté, voir le commentaire dans
//                        le fichier).
//   5. src/data/events.ts — brancher getEvents() sur le vrai back-office (voir le
//                        commentaire en tête de ce fichier pour la forme attendue).
// ============================================================================

// Page préparée mais pas branchée dans le menu (02/09/2026, "il faudrait la créer, mais
// pas l'afficher tout de suite [...] elle va être branchée à un back-office [...] il va
// falloir la réfléchir de façon à ce que ma développeuse derrière puisse brancher le
// back-office") : le Nav garde volontairement "Events" en "Bientôt" (voir Nav.tsx), cette
// page existe déjà à /events/ pour que tout soit prêt côté front le jour où Marine décide
// de la publier — il suffira alors d'ajouter le lien dans Nav.tsx et de changer le CTA de
// EventsPromo.tsx (qui pointe encore vers #appli).
//
// Toute la logique de récupération des données vit dans src/data/events.ts (voir les
// commentaires là-bas pour le point de branchement exact) : cette page ne fait qu'appeler
// getEvents() et afficher ce qu'elle reçoit, sans aucune connaissance de si ça vient d'un
// mock ou d'un vrai back-office.
//
// Chargement au build via `loader` (02/09/2026, "il va falloir que ça ressorte dans les
// recherches IA [...] et google SEO") : un premier essai appelait getEvents() dans un
// useEffect (uniquement côté client, après hydratation) — jamais capturé dans le HTML
// pré-rendu par vite-react-ssg, donc invisible pour Google/les crawlers IA (vérifié :
// dist/events.html ne contenait que "Chargement des events…", aucune vraie donnée).
// `loader` (react-router, supporté par vite-react-ssg — voir son README, section
// "Data fetch") s'exécute À LA BUILD et son résultat est injecté dans le HTML statique.
// Le useEffect ci-dessous reste en plus, pour rafraîchir en silence côté client si le
// back-office a du nouveau depuis le dernier déploiement du site — mais le contenu
// initial (SEO) ne dépend plus de lui.
export async function loader() {
  return getEvents()
}

// Une photo distincte par event (02/09/2026, "change les photos aussi pour donner plus de
// réalisme" / "là on a les 3 mêmes") : le fichier Figma d'origine ne contenait qu'une
// seule vraie photo pour ce type de carte (réutilisée sur toutes ses variantes) — Marine a
// fourni les 2 autres directement.
// export (03/09/2026, "faire la page derrière en reprenant les elements de la card") :
// EventDetail.tsx réutilise ces mêmes maps + PinIcon plutôt que de redéfinir sa propre
// version qui pourrait diverger de celle des cards.
export const IMAGES: Record<string, string> = {
  'cafe-networking': photoCafeNetworking,
  'yoga-tartines': photoYogaTartines,
  'mains-terre': photoMainsTerre,
}

export const AVATARS: Record<string, string> = {
  organizer: avatarOrganizer,
  'avatar-1': avatar1,
  'avatar-2': avatar2,
  'avatar-3': avatar3,
}

// Icône pin maison, en un seul tracé (02/09/2026, bug rapporté "problème avec le visuel
// à côté de Paris 10e, Lyon 2e, Bordeaux") : la version reprise de Figma combinait 2 SVG
// exportés séparément (contour + point central) superposés en CSS, qui ne s'alignaient
// pas et rendaient un badge/bouclier au lieu d'un pin — remplacée par une icône simple
// dans le même style que celles de Contact.tsx plutôt que de retenter un alignement
// pixel-perfect de 2 assets Figma distincts.
// viewBox élargi d'1px de marge de chaque côté (02/09/2026, "ton pin est un peu coupé en
// haut") : le sommet de l'arrondi + la moitié du trait (strokeWidth 1.4) dépassait tout
// juste au-dessus de y=0, donc rogné par le viewBox d'origine ("0 0 14 14").
// Violet comme l'icône calendrier juste à côté (03/09/2026, "le pin de la card doit etre
// violet comme l icone calendrier") : icon-calendar.svg a sa couleur figée dans le SVG
// (#6066D8, soit --color-primary), le PinIcon dessiné à la main doit donc fixer la même
// couleur en dur plutôt que d'hériter du gris de .metaItem via currentColor.
export function PinIcon() {
  return (
    <svg viewBox="-1 -1 16 16" width="13" height="13" fill="none" stroke="var(--color-primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 13S2 8.6 2 5.4a5 5 0 0 1 10 0C12 8.6 7 13 7 13Z" />
      <circle cx="7" cy="5.4" r="1.7" />
    </svg>
  )
}

// Carte reprise du composant Figma "Card/Event" (02/09/2026, "il va falloir que tu
// utilise ce composant pour les cards", node 9787:36210 du fichier "Product Les
// Martines") : structure, textes et proportions fidèles à la maquette, convertis de
// React+Tailwind vers CSS Modules pour coller aux conventions du projet.
// Bouton "favori" retiré (02/09/2026, "on n'a pas de compte pour enregistrer les likes
// [...] je pense qu'il faut les supprimer") : sans compte utilisatrice pour le persister,
// c'était un bouton qui ne fait rien de réel une fois la page rafraîchie — le genre de
// fausse promesse que le site évite ailleurs (voir le formulaire Contact et son mailto).
// Sticker "Martinade" retiré (02/09/2026, "enlève le badge martinade") : en revérifiant
// les coordonnées exactes du Figma, ce texte est en fait un calque situé DERRIÈRE la
// carte en verre (rendu avant card-a-glass dans l'ordre des enfants), donc jamais visible
// dans le design réel — repris par erreur lors de la 1ère implémentation.
//
// Chaque bloc ci-dessous est gardé par sa propre condition, indépendamment des autres
// (02/09/2026, "il faut que tu fasses ce composant event de façon à ce que chaque élément
// soit découpé pour les brancher au back et personnaliser le texte et l'apparition
// d'éléments ou non suivant le use case") : le back-office peut faire apparaître/
// disparaître n'importe quel bloc event par event juste en renseignant ou en omettant le
// champ correspondant dans EventItem (voir src/data/events.ts) — aucune de ces conditions
// ne dépend d'une autre.
// export (03/09/2026, "en dessous de tout ça, tu peux me suggérer d'autres événements" —
// EventDetail.tsx) : même carte que la grille /events/, pas une 2e version, pour la
// section "Autres events" en bas de la page détail.
// Libellé conditionnel (03/09/2026, bug rapporté "ce n'est pas une Martine qui organise,
// mais c'est un partenaire [...] tu as le partenaire là-haut sur la photo" — le ruban de
// la photo dit déjà "Partenaire" pour ces events, mais la ligne organisatrice affichait
// toujours "Une Martine" sans distinction, ce qui se contredisait) : "Une Martine" reste
// vrai pour les Martinades (organisées par un membre de la communauté), mais un event
// partenaire est organisé PAR LE LIEU, pas par une Martine — même prénom masqué,
// même avatar flouté (reste potentiellement une vraie personne côté lieu partenaire),
// mais le mot juste change. export (même raison que EventCard) : réutilisé par
// EventDetail.tsx pour ne jamais diverger de la carte.
// Étoiles maison, pas l'emoji ⭐ (03/09/2026, "les étoiles que tu as mises là, ce n'est
// pas les étoiles qu'on a sur la home page [...] on ne va pas utiliser les emojis") :
// même recette que .stars sur Hero/Avis (caractère ★, citron vert + fin contour violet),
// pas le glyphe emoji jaune du système qui rend différemment selon l'OS et la plateforme.
// `className` optionnel pour que EventDetail.tsx puisse ajuster la taille dans son propre
// contexte (carte plus grande) sans dupliquer ce composant.
export function StarRating({ count = 5, className }: { count?: number; className?: string }) {
  return <span className={`${styles.starRating} ${className ?? ''}`}>{'★'.repeat(count)}</span>
}

export function OrganizerRow({ event }: { event: EventItem }) {
  if (!event.organizerName) return null
  const label = event.eventType === 'partenaire' ? 'Lieu partenaire' : 'Une Martine'

  return (
    <div className={styles.organizerRow}>
      {event.organizerAvatar && (
        <img
          src={AVATARS[event.organizerAvatar]}
          alt=""
          className={`${styles.organizerAvatar} ${styles.blurredPhoto}`}
        />
      )}
      <p className={styles.organizerText}>
        <span className={styles.organizerName}>{label}</span>
        {event.organizerEventsCount != null && event.organizerRating != null && (
          <>
            {' '}
            <span className={styles.organizerStats}>
              <strong>{event.organizerEventsCount} events</strong> · <StarRating count={1} />{' '}
              <strong>{event.organizerRating}</strong>
            </span>
          </>
        )}
      </p>
    </div>
  )
}

export function EventCard({ event }: { event: EventItem }) {
  const hasParticipants = !!event.participantAvatars?.length

  return (
    <article className={styles.card}>
      <div className={styles.photoContainer}>
        <img src={IMAGES[event.image]} alt="" className={styles.photo} />
        <div className={styles.gradientOverlay} />

        {hasParticipants && (
          <div className={styles.topBadges}>
            <div className={styles.avatarStack}>
              {/* Photos floutées, pas remplacées (02/09/2026, "il faut être inscrite
                  [...] pour voir les identités [...] tu floutes les photos" — après un
                  aller-retour par des pastilles génériques jugées trop éloignées de la
                  demande : "non je veux du flou mais moins flou pour distinguer quand
                  même le rond") : flou léger, sans scale ni filtre supplémentaire, pour
                  qu'on devine encore que c'est une vraie photo ronde plutôt qu'un blob ou
                  une icône plate. Cette page est publique (pas de compte visiteur sur ce
                  site vitrine statique), donc toujours dans l'état "pas connectée" — les
                  vrais visages ne doivent jamais être identifiables ici. */}
              {event.participantAvatars!.map((key, i) => (
                <img
                  key={i}
                  src={AVATARS[key]}
                  alt=""
                  className={`${styles.avatarRing} ${styles.blurredPhoto}`}
                  style={{ zIndex: event.participantAvatars!.length - i }}
                />
              ))}
            </div>
            {event.participantCount != null && event.capacity != null && (
              <span className={styles.participantCount}>
                {event.participantCount}/{event.capacity}
              </span>
            )}
          </div>
        )}

        {event.spotsLeft != null && (
          <span className={styles.urgencyBadge}>Plus que {event.spotsLeft} places&nbsp;!</span>
        )}
        {event.category && <span className={styles.categoryTag}>{event.category}</span>}

        {/* Sur la photo, pas en dessous (02/09/2026, bug rapporté "le badge partenaire
            [...] devrait être sur la photo" — re-vérifié sur les coordonnées exactes du
            Figma : le ruban est à l'intérieur de la zone photo, en bas à gauche, sur la
            même ligne que le tag catégorie en bas à droite). Position absolute plutôt
            que dans le flux : sa présence ou son absence ne doit jamais décaler le bloc
            info qui suit (bug précédent : dates/lieu pas alignés entre cartes).
            2 variantes mutuellement exclusives (02/09/2026, Figma "Tag/Event Type", node
            11586:707 : "il y a 2 badges possibles, partenaire ou martinade") — jamais
            les deux en même temps, un seul ruban dont le contenu change selon
            event.eventType. */}
        {event.eventType && (
          <span className={styles.partnerTag}>
            <img src={event.eventType === 'martinade' ? iconCrown : iconSparkle} alt="" />
            {event.eventType === 'martinade' ? 'Martinade' : 'Partenaire'}
          </span>
        )}
      </div>

      <div className={styles.infoBlock}>
        <h2 className={styles.cardTitle}>{event.title}</h2>
        {/* Hauteur fixe, comme .card sur la page Partenaires (02/09/2026, "les dates et
            le lieu [...] toujours alignés avec les autres cards") : les descriptifs
            n'ont pas tous la même longueur, sans ça la ligne date/lieu se retrouvait à
            une hauteur différente sur chaque carte. */}
        {event.description && <p className={styles.cardDescription}>{event.description}</p>}
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <img src={iconCalendar} alt="" />
            {event.dateLabel}
          </span>
          <span className={styles.metaItem}>
            <PinIcon />
            {event.city}
          </span>
        </div>
      </div>

      {/* Pseudo masqué (02/09/2026, "on ne peut même pas voir les pseudos, donc tu mets
          une Martine à la place") : `event.organizerName` reste dans la donnée (utile
          côté back-office/organisatrice elle-même), mais jamais affiché tel quel ici —
          remplacé par un label générique (voir OrganizerRow plus haut pour la logique
          martinade/partenaire). */}
      <OrganizerRow event={event} />
    </article>
  )
}

// JSON-LD (02/09/2026, "ca doit ressortir [...] google SEO evidemment") : balise
// schema.org/Event par event, pour les rich results Google et pour donner aux crawlers
// IA une version structurée du contenu, en plus du texte visible dans la carte.
//
// organizer volontairement générique (03/09/2026, bug trouvé en travaillant le SEO de
// cette page) : mettre e.organizerName ici aurait republié en clair, dans une donnée
// LISIBLE PAR LES MACHINES, le vrai prénom qu'on masque exprès à l'écran derrière "Une
// Martine" (voir organizerRow plus bas et sa note du 02/09/2026, "on ne peut même pas
// voir les pseudos [...] tu mets une Martine à la place") — Google/les IA l'auraient
// indexé et pu le ressortir tel quel dans une réponse, contournant l'anonymisation
// visuelle. Organizer = Les Martines (la structure), jamais la personne.
function EventsJsonLd({ events }: { events: EventItem[] }) {
  const json = events.map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    startDate: e.date,
    eventAttendanceMode:
      e.mode === 'en ligne' ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    description: e.description,
    location:
      e.mode === 'en ligne'
        ? { '@type': 'VirtualLocation', url: 'https://www.lesmartines.app/events' }
        : { '@type': 'Place', name: e.city, address: e.city },
    organizer: { '@type': 'Organization', name: 'Les Martines', url: 'https://www.lesmartines.app' },
  }))

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

// Mini-FAQ propre à cette page (03/09/2026, "le but de cette page, c'est aussi qu'on
// remonte en SEO [...] pour le SEO IA que pour le SEO classique Google") : un bloc
// question/réponse en langage naturel se fait mieux reprendre tel quel par une IA
// (ChatGPT, Perplexity...) qui répond à "est-ce qu'il y a des events entre femmes near
// me" qu'une simple liste de cartes — même principe que FaqJsonLd dans Faq.tsx,
// dupliqué ici avec des questions propres aux events plutôt que d'y renvoyer, pour que
// cette page se suffise à elle-même aux yeux d'un crawler qui ne visite qu'elle.
const EVENTS_FAQ = [
  {
    question: 'Comment participer à un event Les Martines ?',
    answer:
      "Tu réserves ta place directement dans l'appli Les Martines, dans l'onglet Events. Certains events sont organisés par Les Martines elles-mêmes (les Martinades), d'autres chez des lieux partenaires, tous réservés aux femmes vérifiées par selfie.",
  },
  {
    question: 'Les events sont-ils vraiment réservés aux femmes ?',
    answer:
      "Oui. Comme tout Les Martines, l'accès aux events passe par une vérification d'identité par selfie : ce sont des rencontres 100% entre femmes, en ligne ou en présentiel (brunchs, ateliers créatifs, yoga, coaching, cafés networking...), partout en France.",
  },
  {
    question: "Y a-t-il des events en ligne si je ne peux pas me déplacer ?",
    answer:
      "Oui, une partie des events (Martinades comme partenaires) se déroule en visio pour papoter entre femmes où que tu sois, en plus des rencontres en présentiel dans des villes comme Paris, Lyon ou Bordeaux.",
  },
]

function EventsFaqJsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: EVENTS_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

// Accordéon (03/09/2026, "on fait pas un accordéon ?") : même mécanique que Faq.tsx
// (grid-template-rows 0fr -> 1fr pour un dépliage animé sans mesurer de hauteur en JS),
// simplifiée sans la colonne image puisque ces 3 questions n'ont pas d'illustration
// dédiée comme sur /faq/.
function EventsFaqItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof EVENTS_FAQ)[number]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const panelId = `events-faq-panel-${index}`
  const buttonId = `events-faq-button-${index}`

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
      <h3 className={styles.faqQuestionHeading}>
        <button
          id={buttonId}
          type="button"
          className={styles.faqQuestion}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {item.question}
          <span className={`${styles.faqToggle} ${isOpen ? styles.faqToggleOpen : ''}`} aria-hidden="true" />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.faqAnswerWrap}>
        <div className={styles.faqAnswerInner}>
          <p className={styles.faqAnswer}>{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function Events() {
  useHead({
    // "meufs" ET "femmes" dans le title (03/09/2026, "SEO IA [...] et SEO classique
    // Google") : "meufs" porte la voix de marque, "femmes" porte le volume de recherche
    // réel ("events entre femmes", "sorties entre femmes" — personne ne tape "meufs"
    // dans Google, mais Marine tient à ce mot partout ailleurs sur le site).
    title: 'Events entre femmes (meufs) : brunchs, ateliers, yoga...',
    description:
      "Tous les events 100% entre femmes organisés par Les Martines ou chez des lieux partenaires : brunchs, ateliers créatifs, yoga, cafés networking, papotage en visio... En présentiel à Paris, Lyon, Bordeaux et ailleurs, ou en ligne.",
    path: '/events/',
    // Page pas encore publiée (voir routes.tsx) : à retirer quand Marine décide de la
    // sortir, en même temps que l'ajout du lien dans Nav.tsx et de la route dans
    // sitemap.xml — sinon Google pourrait l'indexer avant l'heure.
    noindex: true,
  })

  const initialEvents = useLoaderData() as EventItem[]
  const [events, setEvents] = useState<EventItem[]>(initialEvents)
  // Pastilles de filtre (02/09/2026, "Tout voir / Martinades / Partenaires [...] dans
  // chaque catégorie, un mélange d'events en ligne et en présentiel") : filtre sur
  // event.eventType, pas sur event.mode — en ligne/présentiel reste un détail affiché sur
  // chaque carte (ville + type de lieu), pas un filtre séparé, comme décidé ensemble.
  const [filter, setFilter] = useState<'all' | 'martinade' | 'partenaire'>('all')
  const filteredEvents = filter === 'all' ? events : events.filter((e) => e.eventType === filter)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Pastille qui glisse entre les filtres (03/09/2026, "tu peux mettre un petit effet
  // cool quand je slide entre les boutons") : même recette que l'indicateur du menu
  // (Nav.tsx, "soulignement animé qui glisse sous le lien") — une seule pastille
  // repositionnée en JS (left/width mesurés depuis le bouton actif, relatifs à la piste)
  // plutôt que de simplement basculer le fond de chaque bouton, pour avoir un vrai
  // glissement d'un filtre à l'autre au lieu d'une apparition/disparition instantanée.
  const filterTrackRef = useRef<HTMLDivElement | null>(null)
  const filterButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [filterIndicator, setFilterIndicator] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const btn = filterButtonRefs.current[filter]
    const track = filterTrackRef.current
    if (!btn || !track) return
    const btnRect = btn.getBoundingClientRect()
    const trackRect = track.getBoundingClientRect()
    setFilterIndicator({ left: btnRect.left - trackRect.left, width: btnRect.width })
  }, [filter])

  // Rafraîchissement silencieux côté client (voir le commentaire au-dessus de `loader`) :
  // le contenu affiché au premier rendu vient déjà du loader (build), ceci vient juste
  // remplacer par des données plus fraîches si le back-office a bougé depuis.
  useEffect(() => {
    let cancelled = false
    getEvents().then((data) => {
      if (!cancelled) setEvents(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className={styles.section} aria-labelledby="events-title">
      <EventsJsonLd events={events} />
      <EventsFaqJsonLd />

      <div className={styles.hero}>
        <div className="container">
          <Reveal immediate>
            <div className={styles.heroInner}>
              {/* Vrai coeur de la maison, pas un SVG maison (03/09/2026, "le coeur n est
                  pas le meme" — le SVG dessiné à la main ne matchait ni la couleur ni la
                  forme du coeur utilisé partout ailleurs sur le site) + remis au-dessus
                  du titre (même message, "il faudrait le mettre plus haut, au dessus de
                  les events" — annule le passage à côté du titre fait juste avant).
                  display:block + margin:auto (pas de compter sur un text-align hérité
                  pour le centrage) : fiable quelle que soit la structure autour. */}
              <img src={heartIcon} alt="" className={styles.heroHeart} />
              <h1 id="events-title" className={styles.title}>
                <HighlightedText text="Les events" highlight="events" />
              </h1>
              {/* Écusson repris du style de /partenaires/ (03/09/2026, "reprend l
                  ecussion des partenaire +30 marques" — même look que .seal
                  (Partenaires.module.css) : cercle blanc à bordure pointillée qui
                  flotte doucement, plutôt que la pilule pleine citron vert du 1er essai).
                  Remplace l'eyebrow taquin retiré à la demande de Marine ("( pas besoin
                  d'être extravertie ) enelever, aujouter un ecussion pour mredire que
                  c est 100% entre meufs"). */}
              <span className={styles.seal} aria-hidden="true">
                <span className={styles.sealNumber}>100%</span>
                <span className={styles.sealLabel}>
                  entre
                  <br />
                  meufs
                </span>
              </span>
              {/* Texte allégé (03/09/2026, "ca fait gros pavé la [...] plus agreable et
                  sympa a lire") : phrases plus courtes, la parenthèse qui explique
                  "Martinade" reste (demandée juste avant) mais le reste va à l'essentiel
                  plutôt qu'une seule longue phrase à rallonge.
                  Gras sur les 3 familles (03/09/2026, "rendre ce texte plus joli
                  graphiquement [...] peut etre en mettant du gras") : fait ressortir les
                  3 options d'un coup d'œil dans la phrase plutôt qu'un bloc de texte
                  uniforme. "À toi de choisir !" détaché en tagline à part (couleur +
                  taille), comme une signature plutôt qu'une fin de phrase parmi
                  d'autres. */}
              <p className={styles.subtitle}>
                Des <strong>Martinades</strong> (organisées par des Martines), des{' '}
                <strong>papotages en visio</strong>, ou des sorties chez nos{' '}
                <strong>partenaires</strong>.
                <br />
                Bref, des events entre meufs, près de chez toi ou en ligne.
              </p>
              <p className={styles.tagline}>À toi de choisir&nbsp;!</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container">
        <div className={styles.filterPills} role="tablist" aria-label="Filtrer les events">
          <div className={styles.filterPillsTrack} ref={filterTrackRef}>
            <span
              className={styles.filterIndicator}
              aria-hidden="true"
              style={{ transform: `translateX(${filterIndicator.left}px)`, width: filterIndicator.width }}
            />
            {(
              [
                ['all', 'Tout voir'],
                ['martinade', 'Martinades'],
                ['partenaire', 'Partenaires'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                ref={(el) => {
                  filterButtonRefs.current[value] = el
                }}
                type="button"
                role="tab"
                aria-selected={filter === value}
                className={`${styles.filterPill} ${filter === value ? styles.filterPillActive : ''}`}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <p className={styles.loading}>Pas d&rsquo;event dans cette catégorie pour le moment&nbsp;!</p>
        ) : (
          <div className={styles.grid}>
            {/* Cards cliquables (03/09/2026, "Pourquoi les Events ne sont pas cliquables
                depuis la page événements ?" — jusqu'ici volontairement laissées à part,
                voir la checklist de publication en tête de fichier et EventDetail.tsx,
                "Non, pas tout de suite" le 02/09/2026 ; Marine a changé d'avis) : même
                <Link> autour de <EventCard> que pour la section "Autres events" sur la
                page détail, pas un 2e traitement. */}
            {filteredEvents.map((event, i) => (
              <Reveal key={event.id} delay={Math.min(i * 0.05, 0.3)}>
                <Link to={`/events/${event.id}`} className={styles.cardLink}>
                  <EventCard event={event} />
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* Mini-FAQ visible (03/09/2026, voir EVENTS_FAQ plus haut) : même contenu que le
            JSON-LD, affiché en clair — utile aux visiteuses ET c'est aussi ce texte-là,
            en langage naturel, qu'une IA de recherche reprend le plus facilement dans une
            réponse (contrairement à une carte event, plus visuelle que textuelle). */}
        <div className={styles.faqBlock}>
          <h2 className={styles.faqTitle}>Questions fréquentes sur les events</h2>
          {EVENTS_FAQ.map((item, i) => (
            <EventsFaqItem
              key={item.question}
              item={item}
              index={i}
              isOpen={openFaqIndex === i}
              onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
