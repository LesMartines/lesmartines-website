import { useState, type ReactNode } from 'react'
import { useParams, useLoaderData, Link, type LoaderFunctionArgs } from 'react-router-dom'
import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import { APP_STORE_URL } from '../components/StoreButtons'
import { getEvents, type EventItem } from '../data/events'
import { IMAGES, AVATARS, EventCard, OrganizerRow, PinIcon, StarRating } from './Events'
import iconCalendar from '../assets/events/card/icon-calendar.svg'
import iconSparkle from '../assets/events/card/icon-sparkle-partner.svg'
import iconCrown from '../assets/events/card/icon-crown-martinade.svg'
import eventsStyles from './Events.module.css'
import styles from './EventDetail.module.css'

// Page détail par event (03/09/2026, "t es capable de faire la page derrière en reprenant
// les elements de la cards, le but c est de telecharger l'appli [...] c'est un moyen
// d'acquistion mais faut garder le mm design surtout la forme de la photo qui donne tout
// le style") : réutilise directement les classes CSS de la card (eventsStyles) pour la
// photo/les badges/la ligne organisatrice — même style, en plus grand — plutôt que de
// redessiner un 2e système visuel pour la même info. IMAGES/AVATARS/PinIcon importés
// depuis Events.tsx (pas redéfinis ici) pour ne jamais diverger de ce qui est utilisé
// sur les cards.
//
// Route dynamique /events/:id/ (03/09/2026, confirmé avec Marine — pas un simple template
// unique) : voir vite.config.ts pour includedRoutes, qui énumère les ids de getEvents()
// au moment du build pour que chaque page soit bien pré-rendue en HTML statique (SEO),
// exactement comme /events/ elle-même.
//
// Pas encore reliée depuis les cards de la liste (03/09/2026, "Non, pas tout de suite") :
// cette page existe déjà à /events/[id]/, prête à être branchée quand Marine le décide.
// Fichier servi tel quel depuis public/ (03/09/2026, preuve sociale dans le CTA) : pas un
// import de module (Vite déconseille d'importer depuis public/), juste l'URL absolue,
// comme le favicon lui-même dans index.html.
const APP_ICON_URL = '/favicon.png'

// Renvoie aussi les autres events (03/09/2026, "en dessous de tout ça, tu peux me
// suggérer d'autres événements ? Et pas t'arrêter là") : un seul appel à getEvents() au
// build, pas un 2e aller-retour séparé juste pour la section suggestions plus bas.
export async function loader({ params }: LoaderFunctionArgs) {
  const events = await getEvents()
  const event = events.find((e) => e.id === params.id) ?? null
  const otherEvents = event ? events.filter((e) => e.id !== event.id) : []
  return { event, otherEvents }
}

// Cadenas plutôt que le pin des cards (03/09/2026, "inspire toi de vibes [...] par contre
// tu n'affiche pas l'adresse, met un petit cadenas qui indique juste la ville ou
// l'arrondissment mais c'est tout") : vibes.lgbt affiche l'adresse complète ("Promenade
// des Anglais, 06200 Nice") — chez Les Martines, la donnée elle-même ne contient déjà que
// la ville (voir EventItem.city dans events.ts, jamais de rue), mais avec une simple
// icône pin ça pouvait juste ressembler à une adresse tronquée par erreur. Le cadenas
// rend le choix explicite : l'adresse précise est volontairement gardée pour l'appli.
// Redescendu dans le hint, pas sur l'icône principale (03/09/2026, "pour l'icône à côté
// de Lyon, tu peux reprendre le PIN [...] mets un petit cadenas à côté de la phrase") :
// l'icône principale de la ligne "Où" redevient le PinIcon standard (même icône que sur
// les cards), le cadenas se déplace en petite puce devant le texte d'explication.
function LockIcon() {
  return (
    <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="6.2" width="9" height="6.3" rx="1.5" />
      <path d="M4.3 6.2V4.3a2.7 2.7 0 0 1 5.4 0v1.9" />
    </svg>
  )
}

// Ligne meta façon vibes.lgbt (03/09/2026, "tu t es pas inspiré de vobes la" — la vraie
// signature visuelle de leur page event, ce sont ces lignes icône-en-rond + libellé au-
// dessus d'une valeur en gras, pas la mise en page 2 colonnes que Marine a explicitement
// écartée avec "on garde la photo au centre par contre"). Générique : sert pour la date
// ET le lieu, chacune avec sa propre icône/libellé/valeur.
// `hint` (03/09/2026, bug rapporté "je ne comprends pas pourquoi [...] je dévoile le
// lieu [...] reste secret si on n'est pas inscrite" — sous-entendu : ça ne se voit pas
// assez) : un `title` HTML seul ne s'affiche qu'au survol (invisible au clavier, sur
// mobile, et pour qui ne pense pas à survoler une icône) — le cadenas doit s'expliquer
// tout seul, en texte visible, pas seulement en tooltip.
function MetaRow({ icon, label, value, hint }: { icon: ReactNode; label: string; value: string; hint?: string }) {
  return (
    <div className={styles.metaRow}>
      <span className={styles.metaIcon}>{icon}</span>
      <span>
        <span className={styles.metaLabel}>{label}</span>
        <span className={styles.metaValue}>{value}</span>
        {hint && (
          <span className={styles.metaHint}>
            <LockIcon /> {hint}
          </span>
        )}
      </span>
    </div>
  )
}

// Aperçu de carte flouté (03/09/2026, inspiré de Luma : "Inscrivez-vous pour voir
// l'adresse exacte" sur fond de carte réelle) : PAS de vraie carte chargée (aucun appel à
// un service de cartographie) — un fond de carte réel, même flouté visuellement en CSS,
// enverrait quand même les coordonnées exactes au fournisseur de la carte, contraire à
// l'idée même de garder le lieu secret tant que l'inscription n'est pas faite. Motif
// décoratif de rues stylisées : même sensation visuelle, aucune vraie donnée géo.
function MapTeaser() {
  return (
    <div className={styles.mapTeaser}>
      <svg viewBox="0 0 200 90" className={styles.mapTeaserStreets} preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 20 H200 M0 55 H200 M30 0 V90 M100 0 V90 M160 0 V90" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className={styles.mapTeaserPin} aria-hidden="true">
        <PinIcon />
      </span>
      <span className={styles.mapTeaserLabel}>
        <LockIcon /> Emplacement révélé après réservation
      </span>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.2 0-.3 0-.5s-.6-1.5-.9-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 3 4.7 4.1.7.3 1.2.4 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M14 8.5h-1.5A1.5 1.5 0 0 0 11 10v1.5H9V14h2v6h2.5v-6H15l.5-2.5h-2V10c0-.3.2-.5.5-.5H15z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 7l1.3-1.3a3.5 3.5 0 0 1 5 5L16 12M13 17l-1.3 1.3a3.5 3.5 0 0 1-5-5L8 12" />
    </svg>
  )
}

// Partage regroupe dans la carte sticky (03/09/2026, "Je trouve qu'on ne met pas bien en
// avant le partage [...] il est un peu perdu en haut" + "on devrait rappeler les reseaux
// sociaux et egalement avoir le lien de partage. Si tu fais ca, tu l'enleves la-haut") :
// icones directes (WhatsApp/Facebook/X + copier le lien) plutot qu'un seul bouton
// generique en haut de page, regroupees avec l'action telecharger dans .sideCard.
function ShareRow({ event }: { event: EventItem }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `https://www.lesmartines.app/events/${event.id}/`
  const shareText = `${event.title}, ${event.dateLabel} à ${event.city}, avec Les Martines`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Presse-papiers indisponible : le lien reste visible dans la barre d'adresse.
    }
  }

  return (
    <div className={styles.shareRow}>
      <span className={styles.shareLabel}>Partager</span>
      <div className={styles.shareIcons}>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Partager sur WhatsApp"
        >
          <WhatsAppIcon />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Partager sur Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Partager sur X"
        >
          <XIcon />
        </a>
        <button type="button" onClick={handleCopy} aria-label="Copier le lien">
          <LinkIcon />
        </button>
      </div>
      {copied && <span className={styles.shareCopied}>Lien copié&nbsp;!</span>}
    </div>
  )
}

function EventDetailJsonLd({ event }: { event: EventItem }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    eventAttendanceMode:
      event.mode === 'en ligne'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    description: event.description,
    location:
      event.mode === 'en ligne'
        ? { '@type': 'VirtualLocation', url: `https://www.lesmartines.app/events/${event.id}/` }
        : { '@type': 'Place', name: event.city, address: event.city },
    // Organisation générique, jamais la personne (voir la même note dans EventsJsonLd,
    // Events.tsx) : la confidentialité de l'organisatrice ne doit pas être contournable
    // via une donnée structurée que l'écran, lui, masque bien derrière "Une Martine".
    organizer: { '@type': 'Organization', name: 'Les Martines', url: 'https://www.lesmartines.app' },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

export default function EventDetail() {
  const { id } = useParams()
  const { event, otherEvents } = useLoaderData() as { event: EventItem | null; otherEvents: EventItem[] }

  useHead({
    title: event ? `${event.title} · Events entre femmes` : 'Event introuvable',
    description: event
      ? `${event.title}, ${event.dateLabel} à ${event.city}. ${event.description ?? ''} Réserve ta place dans l'appli Les Martines.`
      : "Cet event n'existe pas ou plus.",
    path: `/events/${id}/`,
    // Photo propre à l'event plutôt que le Hero générique de la home (05/09/2026,
    // "og:image par event") : un lien partagé ("regarde ce Yoga & Tartines !") donne
    // envie de CET event précis, pas de l'appli en général.
    image: event ? IMAGES[event.image] : undefined,
    // Page pas encore publiée (03/09/2026, "Non, pas tout de suite" pour brancher les
    // cards) : même logique de checklist que /events/ elle-même, voir Events.tsx.
    noindex: true,
  })

  if (!event) {
    return (
      <section className={eventsStyles.section}>
        <div className="container">
          <p className={eventsStyles.loading}>
            Cet event n&rsquo;existe pas ou plus. <Link to="/events/">Retour aux events</Link>
          </p>
        </div>
      </section>
    )
  }


  return (
    <section className={eventsStyles.section} aria-labelledby="event-detail-title">
      <EventDetailJsonLd event={event} />

      <div className="container">
        <Reveal immediate>
          {/* Partage retiré d'ici (03/09/2026, "il est un peu perdu en haut [...] si tu
              fais ça, tu l'enlèves là-haut") : déplacé dans .sideCard avec les icônes de
              réseaux sociaux, voir ShareRow plus bas. */}
          <Link to="/events/" className={styles.backLink}>
            &larr; Tous les events
          </Link>

          {/* 2e refonte (03/09/2026, "je ne comprends pas pourquoi tu ne separes pas en
              deux [...] comme sur vibes [...] je trouve ca vieillot [...] la preuve
              sociale sur vibes elle est a droite") : la 1ère version (tout dans une seule
              carte à ombre + CTA encadré pêche) a été jugée datée. Repris de plus près sur
              vibes.lgbt : la photo reste seule, pleine largeur, en haut (photo au centre,
              toujours vrai) ; le titre est seul juste en dessous ; à PARTIR de là, ça se
              sépare en 2 colonnes — infos/description à gauche SANS boîte ni fond coloré
              (comme les lignes meta de vibes, posées à même le fond de page), preuve
              sociale + téléchargement dans une carte à droite (.sideCard), pas au milieu
              d'un gros bloc encadré. Empile en 1 colonne sous ~860px (voir le CSS). */}
          <div className={styles.layout}>
            {/* Photo au même ratio/border-radius que la card (03/09/2026, "la forme de la
                photo qui donne tout le style") : classes de eventsStyles réutilisées
                telles quelles, seule .heroPhotoContainer (EventDetail.module.css) change
                la hauteur pour une page détail plus grande qu'une carte de grille. */}
            <div className={`${eventsStyles.photoContainer} ${styles.heroPhotoContainer}`}>
              <img src={IMAGES[event.image]} alt="" className={eventsStyles.photo} />
              <div className={eventsStyles.gradientOverlay} />

              {event.participantAvatars && event.participantAvatars.length > 0 && (
                <div className={eventsStyles.topBadges}>
                  <div className={eventsStyles.avatarStack}>
                    {event.participantAvatars.map((key, i) => (
                      <img
                        key={i}
                        src={AVATARS[key]}
                        alt=""
                        className={`${eventsStyles.avatarRing} ${eventsStyles.blurredPhoto}`}
                        style={{ zIndex: event.participantAvatars!.length - i }}
                      />
                    ))}
                  </div>
                  {event.participantCount != null && event.capacity != null && (
                    <span className={eventsStyles.participantCount}>
                      {event.participantCount}/{event.capacity}
                    </span>
                  )}
                </div>
              )}

              {event.spotsLeft != null && (
                <span className={eventsStyles.urgencyBadge}>Plus que {event.spotsLeft} places&nbsp;!</span>
              )}
              {event.category && <span className={eventsStyles.categoryTag}>{event.category}</span>}
              {event.eventType && (
                <span className={eventsStyles.partnerTag}>
                  <img src={event.eventType === 'martinade' ? iconCrown : iconSparkle} alt="" />
                  {event.eventType === 'martinade' ? 'Martinade' : 'Partenaire'}
                </span>
              )}
            </div>

            <h1 id="event-detail-title" className={styles.title}>
              {event.title}
            </h1>

            <div className={styles.contentGrid}>
              <div className={styles.mainCol}>
                {/* Explique la marque (03/09/2026, "Faudrait quand même expliquer ce que
                    c'est les Martines [...] elles ne connaissent pas les Martines alors
                    qu'elles veulent aller à l'événement") : cette page est justement
                    pensée pour être partagée à des gens qui n'ont jamais entendu parler
                    du site (voir ShareButton plus haut) — sans cette ligne, "réserve dans
                    l'appli" n'a aucun sens pour elles. Même texte de base que
                    StructuredData.tsx (ORGANIZATION.description), reformulé plus court
                    pour tenir en une phrase de contexte. */}
                <p className={styles.brandIntro}>
                  Cet event a lieu sur <strong>Les Martines</strong>, le réseau social 100% féminin vérifié par
                  selfie.
                </p>

                {/* Hint retiré d'ici (03/09/2026, "ça fait deux fois la même info" —
                    doublon avec le badge de MapTeaser juste en dessous, qui porte
                    maintenant seul le message "adresse cachée") : la ligne "Où" redevient
                    juste ville + pin, sans texte d'explication en plus. */}
                <div className={styles.metaList}>
                  <MetaRow icon={<img src={iconCalendar} alt="" />} label="Quand" value={event.dateLabel} />
                  <MetaRow icon={<PinIcon />} label="Où" value={event.city} />
                </div>

                <MapTeaser />

                {/* Arguments concrets pour pousser à réserver (03/09/2026, "Il faut
                    vraiment avoir des infos pour pousser à réserver et donc à télécharger
                    l'application" + "recheck tous les textes [...] des trucs qui sont un
                    peu chiants") : allégé pour ne pas répéter 3x "100% femmes/vérifié"
                    (déjà dans .brandIntro et dans .sideCard) — chaque puce dit maintenant
                    quelque chose de nouveau plutôt que de paraphraser les 2 autres blocs. */}
                <ul className={styles.highlights}>
                  {event.capacity != null && (
                    <li>
                      <strong>Groupe limité à {event.capacity} personnes</strong>, assez petit pour se parler
                      vraiment, pas juste se croiser.
                    </li>
                  )}
                  {event.participantCount != null && event.capacity != null && (
                    <li>
                      <strong>
                        Déjà {event.participantCount} inscrite{event.participantCount > 1 ? 's' : ''}
                      </strong>{' '}
                      sur {event.capacity} places, ça se remplit vite.
                    </li>
                  )}
                  <li>
                    <strong>{event.eventType === 'martinade' ? 'Organisé par Les Martines elles-mêmes' : 'Lieu partenaire vérifié'}</strong>
                    , pas une inconnue derrière l&rsquo;event.
                  </li>
                </ul>

                {/* Label de section (03/09/2026, "va voir les meilleures plateformes
                    [...] tu en regardes plein" — Luma ET Eventbrite ont chacun un titre
                    au-dessus du descriptif, "À propos de l'événement"/"Overview" : signal
                    fort que ça structure mieux la lecture qu'un paragraphe qui tombe sans
                    prévenir après la checklist). */}
                {(event.longDescription || event.description) && (
                  <>
                    <h2 className={styles.sectionLabel}>À propos de cet event</h2>
                    <p className={styles.description}>{event.longDescription ?? event.description}</p>
                  </>
                )}

                {/* Même composant que la card (03/09/2026, bug rapporté "ce n'est pas
                    une Martine qui organise, mais c'est un partenaire" — voir
                    OrganizerRow dans Events.tsx pour la logique martinade/partenaire,
                    plus de 2e copie qui pourrait diverger). */}
                <OrganizerRow event={event} />

                {/* Réassurance confidentialité (03/09/2026, "on expliqye bien pourquoi on
                    cache les photos aussi et on floute. rappeler la confidentialité, ce
                    qui est sur Les Martines reste chez Les Martines") : texte simple, pas
                    de boîte colorée (03/09/2026, "je trouve ca vieillot") — posé à même
                    la page comme les lignes meta de vibes, juste un séparateur fin au-
                    dessus. */}
                <p className={styles.privacyNote}>
                  <LockIcon /> <strong>Visages floutés, prénoms masqués&nbsp;:</strong> pour voir qui participe vraiment
                  (et papoter avec elles avant l&rsquo;event), il faut être une Martine vérifiée par selfie dans
                  l&rsquo;appli. Ce qui est sur Les Martines reste chez Les Martines.
                </p>
              </div>

              {/* Carte à droite façon "Rejoins Vibes" sur vibes.lgbt (03/09/2026, "la
                  preuve sociale sur vibes elle est a droite") : plus une carte encadrée
                  au milieu de la page — la seule carte à fond de toute la colonne
                  gauche, en sidebar, sticky pour rester visible en scrollant la
                  description. */}
              <div className={styles.sideCol}>
                <div className={styles.sideCard}>
                  {/* Petit mot manuscrit (03/09/2026, "tu peux aussi utliser la typo
                      caveat" + "rajoute des petits éléments en plus [...] pour donner
                      envie de télécharger") : même esprit que les légendes à la main sur
                      les photos du Hero, cette fois en vrai texte (pas cuit dans une
                      image) pour rester dynamique event par event. */}
                  <span className={styles.ctaHandwritten}>on t&rsquo;attend&nbsp;!</span>
                  <img src={APP_ICON_URL} alt="" className={styles.ctaAppIcon} />
                  <div className={styles.ctaRating}>
                    <StarRating className={styles.starRating} /> 4,8/5{' '}
                    <span className={styles.ctaRatingSep}>·</span> 450+ avis
                  </div>
                  {/* Séparateur fin (03/09/2026, "arranger un peu la structure pour la
                      rendre un peu plus premium") : distingue clairement le bloc
                      "identité/preuve sociale" du bloc "action" juste en dessous, plutôt
                      qu'un enchaînement continu de texte. */}
                  <div className={styles.ctaDivider} />
                  {/* Titre + sous-texte réécrits (03/09/2026, "faut comprendre que quand
                      on telecharge l'application, c'est là où on peut réserver sa place
                      [...] tes textes [doivent amener] à réserver l'application") : le
                      lien télécharger→réserver doit être dit noir sur blanc, pas
                      seulement suggéré. */}
                  <h2 className={styles.ctaTitle}>Télécharge l&rsquo;appli pour réserver ta place</h2>
                  {/* Urgence détachée en sa propre ligne, en gras (03/09/2026, "est-ce
                      que tu peux mettre plus que neuf places en gras" + "essayer
                      d'arranger un peu la structure pour la rendre un peu plus
                      premium") : sortie de la phrase où elle était noyée, elle devient un
                      vrai repère visuel qu'on lit en un coup d'œil plutôt qu'un détail au
                      milieu d'une phrase. */}
                  {event.spotsLeft != null && (
                    <p className={styles.ctaUrgency}>Plus que {event.spotsLeft} places</p>
                  )}
                  <p className={styles.ctaText}>Ta réservation se fait en 2 min dans l&rsquo;appli Les Martines.</p>
                  {/* Bouton unique, pas les 2 logos (03/09/2026, "on va avoir un deep
                      link [...] pas besoin des logos" + "centre tout") : même bouton que
                      la barre sticky mobile, voir le commentaire détaillé plus bas. */}
                  <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
                    Télécharger l&rsquo;appli
                  </a>
                  {/* Petits badges de réassurance (03/09/2026, "rajoute des petits
                      éléments en plus [...] pour donner envie de télécharger") : lève 3
                      objections rapides (payant ? long ? mes données ?) juste sous le
                      bouton, là où elles se posent le plus. */}
                  <ul className={styles.ctaTrust}>
                    <li>Sécurisé</li>
                    <li>Gratuit</li>
                    <li>2 min chrono</li>
                  </ul>
                  <ShareRow event={event} />
                </div>
              </div>
            </div>
          </div>

          {/* Autres events (03/09/2026, "en dessous de tout ça, tu peux me suggérer
              d'autres événements ? Et pas t'arrêter là") : la page ne doit pas être un
              cul-de-sac — quelqu'une pas convaincue par CET event, ou qui vient de le
              réserver, doit pouvoir enchaîner sur un autre plutôt que de repartir du
              site. Même EventCard que la grille /events/ (pas de 2e composant), 3 events
              max pour ne pas transformer la fin de page en 2e liste complète. */}
          {otherEvents.length > 0 && (
            <div className={styles.otherEvents}>
              <h2 className={styles.otherEventsTitle}>D&rsquo;autres events pourraient te plaire</h2>
              {/* Slider, pas une grille figée (03/09/2026, "faut que ce soit un slider")
                  : même recette que .sliderOuter/.slider sur Avis.tsx (pleine largeur
                  d'écran via 100vw + translateX, scroll-snap, pas de flèches — "on
                  comprend qu'on peut scroller" selon Marine sur ce même composant) plutôt
                  qu'une boucle infinie à 3 copies comme Avis : avec seulement 3 cartes
                  ici, une boucle sans fin n'aurait presque rien à boucler. */}
              <div className={styles.otherEventsSliderOuter}>
                <div className={styles.otherEventsSlider}>
                  {otherEvents.slice(0, 3).map((other) => (
                    <div key={other.id} className={styles.otherEventsSlide}>
                      <Link to={`/events/${other.id}`} className={styles.otherEventLink}>
                        <EventCard event={other} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/events/" className={styles.otherEventsAllLink}>
                Voir tous les events &rarr;
              </Link>
            </div>
          )}

          {/* Barre sticky mobile (03/09/2026, "Le bouton sticky, c'est hyper bien pour
              telecharger l'application" — vu sur Meetup, leur barre "Participer" collée
              en bas) : uniquement en dessous de 860px (voir CSS), là où la carte de
              droite n'est plus sticky mais retombe dans le flux — sans ça, l'action
              principale disparaît de l'écran dès qu'on lit la description sur mobile. Sur
              desktop, .sideCard fait déjà ce travail (sticky dans la colonne de droite),
              cette barre y reste masquée pour ne pas doubler le message. */}
          <div className={styles.stickyBar}>
            <strong className={styles.stickyBarText}>
              {event.spotsLeft != null ? `Plus que ${event.spotsLeft} places` : 'Réserve ta place'}
            </strong>
            {/* Un seul bouton ici, pas les 2 logos App Store/Google Play (03/09/2026,
                "On va avoir un deep link. Donc pas obligé de mettre les logos partout") :
                une fois le deep link branché, ce lien ouvrira directement la fiche event
                dans l'appli (ou la bonne page de store si elle n'est pas installée) — en
                attendant cette infra, il pointe vers l'App Store. Les 2 badges complets
                restent dans .sideCard, LE seul endroit où on a besoin de montrer le choix
                entre les 2 plateformes. */}
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.stickyBarButton}>
              Télécharger l&rsquo;appli
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
