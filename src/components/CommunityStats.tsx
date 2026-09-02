import { useCountUp } from '../lib/useCountUp'
import styles from './CommunityStats.module.css'
import phoneCommentaires from '../assets/community/phone-commentaires.webp'
import commentAmira from '../assets/community/comment-amira.webp'
import flowers from '../assets/community/flowers.webp'
import heartIcon from '../assets/hero/heart.png'

interface Stat {
  id: string
  target: number
  suffix: string
  label: string
}

// Chiffres à confirmer par Marine (placeholders cohérents avec la maquette Figma :
// 400K likes / 120K commentaires / 25K posts). `target` reste un nombre "brut" (400,
// 120, 25) : le K est ajouté à l'affichage, ça permet au compteur d'animer des valeurs
// lisibles (0 → 400) plutôt que 0 → 400000.
const STATS: Stat[] = [
  { id: 'likes', target: 400, suffix: 'K', label: 'Likes' },
  { id: 'commentaires', target: 120, suffix: 'K', label: 'Commentaires' },
  { id: 'posts', target: 25, suffix: 'K', label: 'Posts' },
]

function StatItem({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp<HTMLParagraphElement>(stat.target)
  return (
    <div className={styles.stat}>
      <p ref={ref} className={styles.statNumber}>
        {value} {stat.suffix}
      </p>
      <p className={styles.statLabel}>{stat.label}</p>
    </div>
  )
}

// Bandeau indigo "communauté" (maquette Figma, juste après "Nos green flags") : oublié
// dans la 1re passe, ajouté le 27/08/2026. Visuel commentaires à gauche, titre + chiffres
// qui s'animent au scroll à droite — symétrique du bandeau EventsPromo (texte à gauche,
// visuel à droite) pour casser la répétition visuelle entre les deux bandeaux indigo.
// Vrais visuels reçus de Marine le 31/08/2026 (remplacent le téléphone placeholder à
// bulles grises) : le vrai screen "Commentaires" (fil Leïla_Queen), une carte de
// commentaire (Amira_Sol) qui flotte par-dessus, un bouquet de fleurs qui déborde par le
// haut du bandeau. Demande explicite : le téléphone dépasse du bandeau "pour casser la
// monotonie du feed", et lui seul reste fixe — les fleurs, le cœur et la carte flottent
// (voir les animations float* dans le CSS), jamais le téléphone.
export default function CommunityStats() {
  return (
    <section className={styles.section} aria-labelledby="community-title">
      <div className={`container ${styles.inner}`}>
        <div
          className={styles.visual}
          role="img"
          aria-label="Aperçu de l'appli : fil de commentaires bienveillants entre Martines, avec un commentaire d'Amira_Sol mis en avant"
        >
          <img src={flowers} alt="" className={styles.flowers} />
          <img src={phoneCommentaires} alt="" className={styles.phone} />
          <img src={heartIcon} alt="" className={styles.heart} />
          <img src={commentAmira} alt="" className={styles.floatingComment} />
        </div>

        <div className={styles.text}>
          <h2 id="community-title" className={styles.title}>
            Une commu ultra engagée
          </h2>

          <div className={styles.stats}>
            {STATS.map((stat) => (
              <StatItem key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
