import HighlightedText from './HighlightedText'
import Reveal from './Reveal'
import styles from './ValeursBloc.module.css'

// Vrais mots de la maquette Figma (28/08/2026), lus sur la capture d'écran envoyée par
// Marine ("faudrait que ça ressemble à ça mais en mouvement comme tu as fait"). Remplace
// la liste inventée du 27/08/2026. La capture est coupée sur le bord droit (des mots
// continuent hors-cadre sur chacune des 4 lignes de la maquette, ex. "Pa…", "Affi…",
// "Empowermen…") : seuls les mots entièrement lisibles ont été repris, donc cette liste
// est probablement incomplète.
// La maquette a 4 lignes statiques ; regroupées en 2 lignes ici pour garder le défilement
// sur 2 lignes déjà demandé par Marine le 27/08/2026 (lignes Figma 1+2 → ROW_1, 3+4 → ROW_2).
// "Leasership" (dernier mot de la ligne 4, probable coquille Figma pour "Leadership")
// retiré le 28/08/2026 sur demande de Marine ("Leasership enlève, on va mettre d'autres
// mots"). Mots ajoutés à sa demande, dans le même esprit que le reste de la liste
// (sororité / bienveillance / safe space) — à valider avec elle, à ajuster librement.
// Casse corrigée le 28/08/2026 ("tu mets des majuscules à chaque mot [...] même quand il y
// a trois mots dans une pills") : les expressions à plusieurs mots repassées en casse de
// phrase (seule la 1re lettre en majuscule), comme en typographie française — plus de
// Title Case à l'anglaise. Les mots seuls (Sororité, Dialogue, etc.) n'étaient pas concernés,
// déjà corrects tels quels.
const ROW_1 = [
  'Sororité',
  '100% meufs',
  'Dialogue',
  'Safe place vérifiée',
  'Zéro relou',
  'Solidarité',
  'Partage',
  'Empowerment',
  'Soutien',
  'Empowerment',
  'Des thématiques pour toutes',
  'Confidentialité',
  'Affirmation',
  'Affirmation',
  'Solidarité',
  'Bienveillance',
  'Authenticité',
  'Non-jugement',
  'Entraide',
  'Fierté',
]

const ROW_2 = [
  '100% safe',
  'Sécurité',
  'Zéro algo toxique',
  'Liberté de parole',
  'Diversité',
  "Ouverture d'esprit",
  'Partage',
  'Des good vibes',
  'Courage',
  'Modération humaine',
  'Respect',
  'Communauté',
  'Partage',
  'Soutien mutuel',
  'Écoute active',
  'Inclusivité',
  'Créativité',
  'Complicité',
  'Ambition',
]

function PillList({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul className={styles.list} aria-hidden={hidden ? 'true' : undefined}>
      {items.map((valeur, i) => (
        <li key={`${valeur}-${i}`} className={styles.pill}>
          {valeur}
        </li>
      ))}
    </ul>
  )
}

// Une ligne de marquee = 3 copies de sa moitié de liste (pas 2, voir le bug corrigé sur
// PressLogos le 27/08/2026 : avec seulement 2 copies, le "tampon" de contenu qui doit
// couvrir la largeur de l'écran pendant la boucle est limité à la largeur d'UNE SEULE
// copie). `reverse` inverse le sens de défilement pour casser la symétrie entre les 2 lignes.
function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={styles.marqueeWrap}>
      <div className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        <PillList items={items} />
        <PillList items={items} hidden />
        <PillList items={items} hidden />
      </div>
    </div>
  )
}

// Titre ajouté le 27/08/2026 : la maquette Figma a bien un titre au-dessus des tags
// ("Nos green flags", avec "green" souligné en citron vert), oublié dans la 1re passe.
// Défilement horizontal sur 2 lignes, sens opposés, ajouté le même jour à la demande de
// Marine.
export default function ValeursBloc() {
  return (
    <section className={styles.section} aria-labelledby="valeurs-title">
      <Reveal>
        <h2 id="valeurs-title" className={styles.title}>
          <HighlightedText text="Nos green flags" highlight="green" />
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <div className={styles.rows}>
          <MarqueeRow items={ROW_1} />
          <MarqueeRow items={ROW_2} reverse />
        </div>
      </Reveal>
    </section>
  )
}
