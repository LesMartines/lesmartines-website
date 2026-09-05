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
        <h2 className={styles.name}>{p.name}</h2>
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
    title: 'Nos partenaires',
    description:
      'Des marques engagées qui ont rejoint l’aventure Les Martines. Découvre-les toutes, et pourquoi pas la tienne bientôt ?',
    path: '/partenaires/',
  })

  return (
    <section className={styles.section} aria-labelledby="partenaires-title">
      <div className={styles.hero}>
        <Reveal immediate>
          <div className={styles.heroInner}>
            <span className={styles.badge}>Sur candidature uniquement</span>
            <h1 id="partenaires-title" className={styles.title}>
              <HighlightedText text="Nos partenaires" highlight="partenaires" />
            </h1>
            {/* Écusson (02/09/2026, "mettre une sorte d'écusson pour dire qu'on a plus
                de 30 marques partenaires") : donne un chiffre concret et mémorisable,
                en plus de la phrase déjà présente dans le sous-titre juste en dessous. */}
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
            {/* Critère de sélection sorti du sous-titre (05/09/2026, "il faudrait aussi
                dire qu'on accepte les marques s'il y a au moins une femme à la tête du
                projet" puis "faut le mettre en avant dans une bande lilas avec un coeur
                svg au début qui clignote") : un vrai critère de candidature mérite mieux
                qu'une phrase noyée dans un paragraphe — bande à part pour qu'il saute aux
                yeux avant même de lire le reste. */}
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
                    {/* "×" toujours présent mais masqué au repos (05/09/2026, "faut
                        comprendre que ça se désélectionne" puis "ça fait sauter sur 3
                        lignes quand on sélectionne") : afficher/masquer un texte en plus
                        changeait la largeur de la pill au clic, ce qui décalait tout le
                        wrap sur une ligne de plus. En réservant toujours sa place (juste
                        invisible au repos), la largeur ne bouge jamais. */}
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
      </div>

      <div className="container">
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
            <h2 className={styles.closingTitle}>Tu es une marque qui a envie de nous rejoindre&nbsp;?</h2>
            <p className={styles.closingText}>
              On ne retient pas toutes les candidatures mais on les lit toutes, avec la
              même attention.
              <br />
              Les projets qui changent la donne, ça commence souvent par un
              p&rsquo;tit message.
            </p>
            <a href="/contact/?type=marque" className={styles.becomeButton}>
              Je candidate pour être sur Les Martines
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
