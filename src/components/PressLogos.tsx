import styles from './PressLogos.module.css'
import bfmTechCo from '../assets/press/bfm-tech-and-co.png'
import theBodyOptimist from '../assets/press/the-body-optimist.png'
import leptidigital from '../assets/press/leptidigital.png'
import lesEchos from '../assets/press/les-echos.png'
import herStory from '../assets/press/her-story.png'
import cosmopolitan from '../assets/press/cosmopolitan.png'

// Vrais logos presse envoyés par Marine (28/08/2026), en niveaux de gris ("passe tout en
// gris" — voir .item en CSS, filter: grayscale(1)). Remplace la liste texte provisoire.
// Liens vers les articles ajoutés le 28/08/2026 ("les liens a ajouter sur les logos").
// Cosmopolitan n'a pas de lien fourni pour l'instant : reste un logo simple, non cliquable.
const PRESS = [
  {
    name: 'BFM Tech&Co',
    src: bfmTechCo,
    url: 'https://www.bfmtv.com/tech/actualites/reseaux-sociaux/meuf-les-martines-le-boom-des-reseaux-sociaux-dedies-aux-femmes_AV-202405050033.html',
  },
  {
    name: 'The Body Optimist',
    src: theBodyOptimist,
    url: 'https://www.ma-grande-taille.com/societe/feminisme/reseaux-sociaux-dedies-femmes-plein-boom-pourquoi-ca-compte-386586',
  },
  {
    name: 'Leptidigital',
    src: leptidigital,
    url: 'https://www.leptidigital.fr/actualites/reseaux-sociaux-meufs-les-martines-57489/',
  },
  {
    name: 'Les Echos',
    src: lesEchos,
    url: 'https://www.lesechos.fr/start-up/ecosysteme/ces-reseaux-sociaux-pour-femmes-a-loppose-dinstagram-2087388',
  },
  {
    name: 'Her Story',
    src: herStory,
    url: 'https://www.herstory-media.com/societe/reseaux-sociaux-dedies-aux-femmes-dmi',
  },
  { name: 'Cosmopolitan', src: cosmopolitan, url: undefined },
]

// Une seule copie de cette liste de logos fait un peu moins de 1000px de large. Sur un
// écran large, une boucle à 2 copies laissait un trou visible sans logo côté droit pendant
// le défilement — bug remonté par Marine le 27/08/2026. Cause : avec seulement 2 copies
// (translateX -50%), le "tampon" de contenu qui doit couvrir la largeur de l'écran pendant
// la boucle est limité à la largeur d'UNE SEULE copie, qui doit donc être ≥ largeur d'écran
// pour ne jamais montrer de trou. 5 copies (translateX -20%, même principe) donnent large-
// ment assez de tampon, même sur un très grand écran.
const COPIES = 5

function LogoList({ hidden }: { hidden?: boolean }) {
  return (
    <ul className={styles.list} aria-hidden={hidden ? 'true' : undefined}>
      {PRESS.map((logo) => {
        // Recoloré en bleu via un masque CSS plutôt qu'un filter (05/09/2026, "au lieu de
        // les passer en noir [...] plutôt les passer en bleu, mais il ne faut pas de
        // carré") : grayscale+sepia+hue-rotate tintait aussi le fond quasi-transparent de
        // certains PNG (halo/ombre douce cuits dans l'image, jamais tout à fait à
        // alpha 0), ce qui faisait apparaître un carré teinté autour du logo. Un masque
        // (même recette que le cœur de CommunityStats.tsx) peint une couleur plate
        // derrière la silhouette du PNG : tout ce qui est transparent dans le fichier
        // source reste transparent, quelle que soit sa teinte d'origine — aucun carré
        // possible. <img> gardée invisible (visibility:hidden) uniquement pour donner sa
        // largeur intrinsèque au conteneur (mask ne calcule pas de ratio tout seul).
        const img = (
          <span className={styles.logoBox}>
            <img src={logo.src} alt={logo.name} loading="lazy" className={styles.logoGhost} />
            <span
              className={styles.logoMask}
              style={{ WebkitMaskImage: `url(${logo.src})`, maskImage: `url(${logo.src})` }}
              aria-hidden="true"
            />
          </span>
        )
        return (
          <li key={logo.name} className={styles.item}>
            {logo.url ? (
              // tabIndex=-1 sur les copies dupliquées (hidden) pour ne pas piéger le focus
              // clavier sur des liens invisibles/aria-hidden.
              <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={hidden ? -1 : undefined}
              >
                {img}
              </a>
            ) : (
              img
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function PressLogos() {
  // La liste est dupliquée pour créer une boucle de défilement continue et sans à-coup :
  // l'animation ne fait que translater de -20% (1 copie sur 5), donc la copie suivante prend
  // exactement le relais de la précédente. aria-hidden sur toutes les copies sauf la 1re pour
  // ne pas dupliquer l'annonce lecteur d'écran.
  return (
    <section className={styles.section} aria-label="Ils parlent de nous dans la presse">
      {/* Petits traits de part et d'autre (05/09/2026, "rendre la barre media plus
          premium") : traitement éditorial ("— titre —") plutôt qu'un simple label plat. */}
      <p className={styles.title}>
        <span className={styles.titleLine} aria-hidden="true" />
        On parle de nous
        <span className={styles.titleLine} aria-hidden="true" />
      </p>

      <div className={styles.marqueeWrap}>
        <div className={styles.track}>
          {Array.from({ length: COPIES }, (_, i) => (
            <LogoList key={i} hidden={i > 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
