// Couche de données des events (02/09/2026, "il faudrait la créer [la page events] mais
// pas l'afficher tout de suite [...] elle va être branchée à un back-office [...] il va
// falloir la réfléchir de façon à ce que ma développeuse derrière puisse brancher le
// back-office").
//
// Le seul point de contact entre la page et les données, c'est getEvents() ci-dessous.
// Aujourd'hui elle renvoie les 3 events d'exemple codés en dur (MOCK_EVENTS). Le jour où
// le back-office existe, il suffit de remplacer SON CONTENU par un vrai appel réseau —
// aucune autre ligne de ce fichier ni de Events.tsx n'a besoin de changer, du moment que
// la forme des données renvoyées respecte l'interface EventItem.
//
// Exemple de ce que sera ce fichier une fois branché :
//
//   export async function getEvents(): Promise<EventItem[]> {
//     const res = await fetch('https://api.lesmartines.app/events')
//     if (!res.ok) throw new Error('Impossible de charger les events')
//     return res.json()
//   }
//
// Champs optionnels (02/09/2026, "il faut que tu fasses ce composant event de façon à ce
// que chaque élément soit découpé pour les brancher au back et personnaliser le texte et
// l'apparition d'éléments ou non suivant le use case") : chaque bloc visuel de la carte
// (badge d'urgence, ruban partenaire, catégorie, pile de participantes, ligne
// organisatrice) ne s'affiche QUE si sa donnée est présente — le back-office peut donc
// faire apparaître ou disparaître chaque élément indépendamment, event par event, sans
// qu'aucune ligne de Events.tsx n'ait à changer. Voir EventCard dans Events.tsx pour le
// détail de chaque condition d'affichage.
export interface EventItem {
  id: string
  title: string
  /** Format ISO (YYYY-MM-DD), pour trier/formatter facilement côté back-office. */
  date: string
  /** Libellé déjà formaté pour l'affichage, ex. "Sam 7 juin · 10h00". */
  dateLabel: string
  city: string
  mode: 'présentiel' | 'en ligne'
  image: string
  /** Absent/vide = pas de descriptif affiché. Version courte, utilisée sur la card
      (3 lignes max, voir .cardDescription dans Events.module.css). */
  description?: string
  /** Absent = la page détail retombe sur `description` (03/09/2026, "tu peux faire des
      descriptions plus grande" pour /events/:id/, voir EventDetail.tsx) : un texte plus
      long et plus vendeur, pas contraint par la hauteur fixe d'une card dans une grille. */
  longDescription?: string
  /** Absent/vide = pas de tag catégorie affiché. */
  category?: string
  /** Calculé automatiquement (capacity - participantCount), jamais saisi à la main — voir
      showUrgencyBadge et getEvents() plus bas. null = pas de badge d'urgence "Plus que N
      places" affiché (03/09/2026, bug rapporté "le nombre de places [...] c'est pas les
      mêmes nombres" : avant, spotsLeft était un champ saisi séparément de
      capacity/participantCount, et pouvait donc raconter une histoire différente du
      "3/12" affiché juste à côté sur la même carte — ex. spotsLeft: 7 alors que
      12 - 3 = 9. Calculer la seule vraie source du nombre de places élimine la
      possibilité même de cette incohérence, plutôt que de compter sur deux nombres
      saisis à la main qui restent synchronisés par vigilance). */
  spotsLeft?: number | null
  /** Ruban en haut à gauche de la photo (02/09/2026, Figma "Tag/Event Type", node
      11586:707 : un seul composant à 2 variantes, mutuellement exclusives — jamais les
      deux en même temps). "martinade" = organisé par Les Martines elles-mêmes (icône
      couronne), "partenaire" = event chez un lieu partenaire (icône étincelle, voir
      /partenaires/). Absent = pas de ruban du tout. */
  eventType?: 'martinade' | 'partenaire'
  /** Absentes/vides = pas de pile d'avatars ni de compteur affichés. */
  participantAvatars?: string[]
  participantCount?: number
  capacity?: number
  /** Saisi à la main, contrairement à spotsLeft (voir plus haut) : décide juste SI le
      badge d'urgence doit apparaître, jamais le chiffre qu'il affiche — évite de devoir
      montrer le badge sur tous les events dès qu'il reste moins de places que la
      capacité totale (ex. Papote & Thé en visio garde 6 places sur 20, mais ce n'est pas
      assez tendu pour justifier un "Plus que 6 places !"). */
  showUrgencyBadge?: boolean
  /** Absent = pas de ligne organisatrice affichée. */
  organizerName?: string
  organizerAvatar?: string
  organizerEventsCount?: number
  organizerRating?: number
}

const MOCK_EVENTS: EventItem[] = [
  {
    id: 'cafe-networking',
    title: 'Café & Networking',
    date: '2026-05-17',
    dateLabel: 'Ven 17 mai · 18h30',
    city: 'Paris 10e',
    mode: 'présentiel',
    image: 'cafe-networking',
    category: 'Pro',
    description:
      "Un café convivial pour papoter réseau, projets et opportunités entre meufs qui entreprennent (ou qui en rêvent).",
    longDescription:
      "Envie de parler business sans avoir à te justifier ou à prendre une voix plus grave ? Ce café réunit des Martines qui entreprennent, freelancent ou rêvent de se lancer, dans un cadre convivial, sans pitch forcé ni carte de visite obligatoire. On papote projets, galères, victoires, contacts utiles, et on repart souvent avec plus qu'un café : une vraie idée, un coup de main, ou une nouvelle pote qui comprend exactement ce que tu traverses.",
    showUrgencyBadge: true,
    participantCount: 3,
    capacity: 12,
    eventType: 'partenaire',
    organizerName: 'Manon L.',
    organizerAvatar: 'organizer',
    organizerEventsCount: 12,
    organizerRating: 4.8,
    participantAvatars: ['avatar-1', 'avatar-2', 'avatar-3'],
  },
  {
    id: 'yoga-tartines',
    title: 'Yoga & Tartines',
    date: '2026-06-07',
    dateLabel: 'Sam 7 juin · 10h00',
    city: 'Lyon 2e',
    mode: 'présentiel',
    image: 'yoga-tartines',
    category: 'Brunch',
    description:
      "Une séance de yoga douce suivie d'un brunch entre meufs, végé et fait maison. Ambiance chill garantie.",
    longDescription:
      "On commence par une heure de yoga doux, accessible même si tu n'as jamais touché un tapis de ta vie (les profs adaptent, personne ne juge personne). Puis direction la table : brunch végé fait maison, café qui coule à flots, et cette bonne fatigue du corps qui rend les discussions encore plus vraies. Le genre de matinée où tu arrives sur les rotules d'une semaine chargée et tu repars légère, entourée, et avec le ventre plein.",
    showUrgencyBadge: true,
    participantCount: 9,
    capacity: 12,
    eventType: 'martinade',
    organizerName: 'Sarah K.',
    organizerAvatar: 'avatar-2',
    organizerEventsCount: 8,
    organizerRating: 4.9,
    participantAvatars: ['avatar-1', 'avatar-3', 'organizer'],
  },
  {
    id: 'mains-terre',
    title: 'Mains dans la terre',
    date: '2026-06-21',
    dateLabel: 'Sam 21 juin · 14h00',
    city: 'Bordeaux',
    mode: 'présentiel',
    image: 'mains-terre',
    category: 'Atelier créatif',
    eventType: 'martinade',
    description:
      "Atelier jardinage/poterie en extérieur, pour se reconnecter à la terre (et se salir les mains sans culpabiliser).",
    longDescription:
      "Entre le jardinage et la poterie, on passe l'après-midi les mains dans la terre, littéralement : pas d'écran, pas de notifications, juste la matière sous les doigts et le rythme lent de ce qui pousse. Tout le matériel est fourni, aucune expérience requise : certaines repartent avec un pot fait main, d'autres avec juste les ongles sales et la tête vidée. Les deux sont un bon résultat.",
    participantCount: 5,
    capacity: 10,
    organizerName: 'Camille R.',
    organizerAvatar: 'avatar-3',
    organizerEventsCount: 4,
    organizerRating: 5,
    participantAvatars: ['avatar-2', 'organizer', 'avatar-1'],
  },
  {
    id: 'papote-en-ligne',
    title: 'Papote & Thé en visio',
    date: '2026-06-12',
    dateLabel: 'Ven 12 juin · 20h00',
    city: 'En ligne',
    mode: 'en ligne',
    // Pas de 4e photo dédiée pour l'instant (02/09/2026) : réutilise celle de Café &
    // Networking en attendant un vrai visuel pour cet event en ligne.
    image: 'cafe-networking',
    category: 'Papotage',
    eventType: 'partenaire',
    description:
      "Un rendez-vous visio thé/tisane pour papoter de tout et de rien entre meufs, où que tu sois. Zéro pression, juste du lien.",
    longDescription:
      "Pas besoin de te déplacer ni de te maquiller : tu te fais un thé, tu ouvres l'appli, et tu retrouves d'autres Martines en visio pour papoter de tout et de rien. Idéal si t'es loin d'une grande ville, si tu gardes les enfants ce soir-là, ou juste si t'as pas envie de sortir mais besoin de voir des visages (même flous, on y vient). Zéro pression, zéro obligation de parler si t'as juste envie d'écouter.",
    participantCount: 14,
    capacity: 20,
    organizerName: 'Nadia B.',
    organizerAvatar: 'avatar-1',
    organizerEventsCount: 6,
    organizerRating: 4.7,
    participantAvatars: ['avatar-3', 'avatar-2', 'organizer'],
  },
]

// spotsLeft calculé ici, jamais saisi dans MOCK_EVENTS (03/09/2026, "le nombre de places
// [...] c'est pas les mêmes nombres" — voir le commentaire détaillé sur spotsLeft dans
// EventItem) : une seule formule (capacity - participantCount), utilisée par TOUT ce qui
// affiche un nombre de places (badge d'urgence, "3/12" sur la photo, puce de la
// checklist, carte de droite, barre sticky mobile) — impossible que ces nombres se
// contredisent puisqu'ils viennent tous du même calcul, pas de 2 champs saisis à part.
export async function getEvents(): Promise<EventItem[]> {
  return MOCK_EVENTS.map((event) => {
    const spotsLeft =
      event.showUrgencyBadge && event.capacity != null && event.participantCount != null
        ? event.capacity - event.participantCount
        : null
    return { ...event, spotsLeft }
  })
}
