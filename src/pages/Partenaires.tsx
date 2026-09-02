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
            <a href="/contact/?type=marque" className={styles.becomeButton}>
              Je candidate pour être sur Les Martines
            </a>
          </div>
        </Reveal>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {PARTENAIRES.map((p, i) => (
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
