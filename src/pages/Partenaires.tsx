import { useState } from 'react'
import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import { PARTENAIRES, type Partenaire } from '../data/partenaires'
import styles from './Partenaires.module.css'

// Page dédiée (01/09/2026, "fais moi la page partenaire en t'inspirant de cette page [...]
// tu peux la rendre bcp plus sympa, il faut qu'elles donnent envie") reprenant le contenu
// de https://www.lesmartines.app/nos-partenaires/ (titre, intro, descriptif de chaque
// marque) mais habillée en grille de cartes cliquables plutôt qu'en simple liste de texte
// : chaque carte associe logo + descriptif, se soulève au survol (pas de lien "Découvrir"
// explicite, retiré le 01/09/2026 : "on comprend quand on passe sur la card que c'est
// cliquable", le soulèvement + l'ombre suffisent à le signaler).
// Logos en niveaux de gris au repos, couleur au survol (même recette que le bandeau
// défilant de l'accueil, voir Partenaires.module.css du dossier components) : un mur de
// 30 logos très colorés se bat visuellement à plat, la couleur redevient une vraie
// récompense au survol plutôt qu'un effet de plus qui s'ajoute au reste de la page.
// Toutes les catégories utilisées par les cartes (voir data/partenaires.ts), dédupliquées
// et dans leur ordre de première apparition (05/09/2026, "placer à un endroit toutes les
// catégories qu'on a pour qu'elles soient visibles au début") : calculé depuis les
// données plutôt que recopié à la main, pour ne jamais désynchroniser cette liste des
// catégories réellement posées sur les cartes.
const ALL_CATEGORIES = Array.from(new Set(PARTENAIRES.flatMap((p) => p.category ?? [])))

// Icônes locales (même recette que Contact.tsx : petites icônes en traits, pas de lib
// externe) réutilisées pour les 3 profils d'affiliation ci-dessous.
function TagIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.6 2.5H16a1 1 0 0 1 1 1v5.4a1 1 0 0 1-.3.7l-6.6 6.6a1 1 0 0 1-1.4 0l-5.4-5.4a1 1 0 0 1 0-1.4l6.6-6.6a1 1 0 0 1 .7-.3Z" />
      <circle cx="13" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4" width="15" height="13" rx="2" />
      <path d="M6 2.5v3M14 2.5v3M2.5 8h15" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 18s6-5.2 6-10a6 6 0 0 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="10" cy="8" r="2.2" />
    </svg>
  )
}

// 3 profils d'affiliation (05/09/2026, "on parle pas que des marques c'est de
// l'affiliation [...] faudrait pas un espace pro ?") : cette page ne montrait jusqu'ici
// que le profil "marque" (30 logos + candidature), sans aucune visibilité pour les 2
// autres façons de s'associer à Les Martines — personne n'a de raison de deviner que
// /contact/?type=event ou ?type=lieu existent.
// Reformulé (05/09/2026, "c'est plus pour les personnes qui organisent déjà des
// événements [...] pour qu'on les pousse à notre communauté" + "c'est pas prêté, c'est
// proposé [...] on propose ce lieu" quand une Martine organise une Martinade, puis "faut
// que ce soit plus vendeur et en plus de ça c'est nous qui décidons s'ils rentrent dans
// l'appli, on sélectionne", puis "si on peut co-organiser aussi carrément") : "event"
// couvre 2 cas — référencer des events qui tournent déjà, OU co-organiser un nouvel
// event avec Les Martines — pas l'un à l'exclusion de l'autre ; "lieu" reste un lieu que
// LES MARTINES proposent ensuite aux organisatrices de Martinades, pas un prêt actif du
// lieu par sa gérante. Les 3 profils sont sur sélection, pas seulement la marque : "on
// choisit" explicite plutôt qu'implicite pour rester vendeur (exclusivité =
// désirabilité) sur les 3 cartes, pas juste celle des marques.
const AFFILIATION_PROFILES = [
  {
    Icon: TagIcon,
    title: 'Tu es une marque',
    text: 'Rejoins nos 30+ marques partenaires, choisies une à une.',
    href: '/contact/?type=marque',
    cta: 'Je candidate',
  },
  {
    Icon: CalendarIcon,
    title: 'Tu organises des events',
    text: 'On sélectionne ceux qu’on relaie à la communauté, ou qu’on co-organise avec toi.',
    href: '/contact/?type=event',
    cta: 'Je me fais connaître',
  },
  {
    Icon: PinIcon,
    title: 'Tu as un lieu safe',
    text: 'On choisit les meilleurs lieux à proposer aux Martines qui organisent une Martinade.',
    href: '/contact/?type=lieu',
    cta: 'Je propose mon lieu',
  },
]

function PartnerCard({ p }: { p: Partenaire }) {
  // Deux zones distinctes (02/09/2026, "on voit les carrés blancs des logos [...] on va
  // faire la partie logo avec un fond blanc et la partie texte en glassmorphisme") :
  // les logos ont chacun leur propre fond blanc (beaucoup viennent déjà avec un carré
  // blanc dans leur fichier source), qui jurait sur le fond translucide de la carte —
  // séparé en 2 blocs plutôt que de forcer un fond transparent sur des logos qui n'en
  // ont pas.
  const content = (
    <>
      <div className={styles.logoWrap}>
        <img src={p.logo} alt={p.name} className={styles.logo} loading="lazy" />
      </div>
      <div className={styles.textZone}>
        {/* Catégorie(s) en discret au-dessus du nom (05/09/2026, "pour qu'on comprenne
            direct ce que c'est [...] discret et premium") : petit texte capitalisé plutôt
            qu'un badge/pill coloré, pour rester au niveau d'un repère visuel léger et pas
            d'un élément qui capte l'oeil autant que le nom de la marque. */}
        {p.category && p.category.length > 0 && (
          <span className={styles.category}>{p.category.join(' · ')}</span>
        )}
        <h3 className={styles.name}>{p.name}</h3>
        {p.description && <p className={styles.description}>{p.description}</p>}
      </div>
    </>
  )

  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={styles.card}>
      {content}
    </a>
  ) : (
    <div className={styles.card}>{content}</div>
  )
}

export default function Partenaires() {
  // Filtre par catégorie (05/09/2026, "il faut que tu fasses des filtres finalement [...]
  // par défaut on voit tout, et sinon on voit ce qu'on a envie de voir"). Tableau vide =
  // état initial ET état "aucun filtre" : on voit tout et aucun bouton n'a l'air
  // sélectionné (05/09/2026, "tant qu'on n'a pas cliqué une première fois"). Multi-sélection
  // (05/09/2026, "on peut en sélectionner plusieurs si on veut") : une carte matche si elle
  // porte AU MOINS UNE des catégories cochées (union, pas intersection — sélectionner
  // "Beauté & soin" + "Mode & lingerie" élargit la vue, ne la réduit pas à 0 résultat).
  // Pas de bouton "Toutes" séparé (retiré le 05/09/2026) : re-cliquer une catégorie déjà
  // active la retire de la sélection, sur mobile comme sur desktop.
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const toggleCategory = (c: string) =>
    setActiveCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))
  const visiblePartenaires =
    activeCategories.length === 0
      ? PARTENAIRES
      : PARTENAIRES.filter((p) => p.category?.some((cat) => activeCategories.includes(cat)))

  useHead({
    title: 'Deviens partenaire',
    description:
      'Marque, organisatrice d’events (existants ou à co-organiser avec nous), ou lieu à proposer pour une Martinade : 3 façons de rejoindre Les Martines, sur sélection.',
    path: '/partenaires/',
  })

  return (
    <section className={styles.section} aria-labelledby="partenaires-title">
      <div className={styles.hero}>
        {/* Hero neutre (05/09/2026, "en pro tout est sur Sur candidature uniquement" —
            la page ne parlait QUE de marques ici : badge "sur candidature", écusson "30+
            marques", sous-titre "30 marques choisies"... alors que la page couvre
            maintenant 3 profils d'affiliation, dont 2 (event, lieu) ne sont pas des
            "candidatures" compétitives. Tout ce qui est spécifique aux marques (badge,
            écusson, critère femme, bouton, filtres) est descendu juste au-dessus de la
            grille, comme intro du profil "marque" plutôt que du haut de toute la page. */}
        <Reveal immediate>
          <div className={styles.heroInner}>
            <h1 id="partenaires-title" className={styles.title}>
              <HighlightedText text="Deviens partenaire" highlight="partenaire" />
            </h1>
            <p className={styles.subtitle}>
              Marques engagées, organisatrices d&rsquo;events, lieux qui accueillent des
              Martinades&nbsp;: Les Martines, ça se construit à plusieurs.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="container">
        {/* Hub affiliation (05/09/2026, "on parle pas que les marques c'est de
            l'affiliation [...] faudrait pas un espace pro ?") : présente les 3 façons de
            s'associer à Les Martines AVANT la grille (qui ne couvre que le profil
            marque), pour qu'une organisatrice d'events ou une gérante de lieu comprenne
            tout de suite que cette page la concerne aussi. */}
        <Reveal>
          <div className={styles.affiliationBlock}>
            <h2 className={styles.affiliationTitle}>Plusieurs façons de rejoindre l&rsquo;aventure</h2>
            <div className={styles.affiliationGrid}>
              {AFFILIATION_PROFILES.map(({ Icon, title, text, href, cta }) => (
                <div key={title} className={styles.affiliationCard}>
                  <span className={styles.affiliationIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className={styles.affiliationCardTitle}>{title}</h3>
                  <p className={styles.affiliationCardText}>{text}</p>
                  <a href={href} className={styles.affiliationCardLink}>
                    {cta} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Intro du profil "marque" (descendue du hero, voir plus haut) : le badge
            "sur candidature uniquement", l'écusson, le critère féminin et le bouton
            candidater ne concernent QUE ce profil, pas les 2 autres juste au-dessus. */}
        <Reveal>
          <div className={styles.brandSectionIntro}>
            <span className={styles.badge}>Sur candidature uniquement</span>
            <h2 className={styles.brandSectionTitle}>Nos marques</h2>
            <span className={styles.seal} aria-hidden="true">
              <span className={styles.sealNumber}>{PARTENAIRES.length}+</span>
              <span className={styles.sealLabel}>
                marques
                <br />
                partenaires
              </span>
            </span>
            <p className={styles.subtitle}>
              On ne dit pas oui à tout le monde&nbsp;: {PARTENAIRES.length} marques ont été
              choisies une à une, pour ce qu&rsquo;elles apportent vraiment à notre
              communauté.
            </p>
            <p className={styles.womenLedBanner}>
              <svg
                className={styles.womenLedHeart}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 21s-6.716-4.35-9.428-8.03C.29 10.106.796 6.61 3.343 4.87c2.02-1.38 4.66-1.02 6.24.86L12 8.2l2.417-2.47c1.58-1.88 4.22-2.24 6.24-.86 2.547 1.74 3.053 5.236.771 8.1C18.716 16.65 12 21 12 21z" />
              </svg>
              L&rsquo;entrepreneuriat féminin à l&rsquo;honneur&nbsp;: au moins une femme
              aux commandes de ta marque
            </p>
            <a href="/contact/?type=marque" className={styles.becomeButton}>
              Je candidate pour être sur Les Martines
            </a>
            {/* Filtres par catégorie (05/09/2026, "il faut que tu fasses des filtres
                finalement [...] par défaut on voit tout, et sinon on voit ce qu'on a envie
                de voir") : une pill par catégorie, multi-sélection possible (05/09/2026,
                "on peut en sélectionner plusieurs si on veut"). Pas de bouton "Toutes"
                (voir commentaire sur activeCategories plus haut) : re-cliquer une
                catégorie déjà active la retire de la sélection. */}
            <div className={styles.categoryLegend} role="group" aria-label="Filtrer par catégorie">
              {ALL_CATEGORIES.map((c) => {
                const isActive = activeCategories.includes(c)
                return (
                  <button
                    key={c}
                    type="button"
                    className={`${styles.categoryLegendItem} ${isActive ? styles.categoryLegendItemActive : ''}`}
                    aria-pressed={isActive}
                    onClick={() => toggleCategory(c)}
                  >
                    {c}
                    <span className={styles.categoryLegendItemClose} aria-hidden="true">
                      {' '}
                      ×
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {visiblePartenaires.map((p, i) => (
            <Reveal key={p.name} delay={Math.min(i * 0.03, 0.3)}>
              <PartnerCard p={p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className={styles.closing}>
            <span className={styles.badge}>Places limitées</span>
            {/* Généralisé aux 3 profils (05/09/2026, "je me dis qu'on peut aussi avoir un
                lieu safe et organiser des events") : ce bloc de clôture ne parlait que de
                "marque", alors qu'on peut très bien être organisatrice ET avoir un lieu —
                les 3 liens plutôt qu'un seul bouton qui présuppose lequel des 3 profils
                correspond à la lectrice arrivée jusqu'ici. */}
            <h2 className={styles.closingTitle}>Envie de nous rejoindre&nbsp;?</h2>
            <p className={styles.closingText}>
              On ne dit pas oui à tout le monde, mais on lit chaque message avec la même
              attention.
              <br />
              Les projets qui changent la donne, ça commence souvent par un
              p&rsquo;tit message.
            </p>
            {/* Icône + titre du profil affichés (05/09/2026, "on comprend pas bien à
                quoi correspond les boutons") : "Je candidate →" seul ne dit pas à quel
                profil ça correspond une fois sorti du contexte du hub plus haut — même
                icône + même titre que les cartes d'affiliation pour rester identifiable. */}
            <div className={styles.closingLinks}>
              {AFFILIATION_PROFILES.map(({ Icon, title, href, cta }) => (
                <a key={title} href={href} className={styles.closingLink}>
                  <Icon />
                  <span className={styles.closingLinkLabel}>
                    <strong>{title}</strong>
                    <span>{cta} →</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
