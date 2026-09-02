import Reveal from './Reveal'
import styles from './FeatureCards.module.css'

// Textes repris tel quel de la maquette Figma (frame Homepage), typos évidentes corrigées
// ("IIci" -> "Ici"). Un point à vérifier avec Marine : la carte 5 a un titre "Map'Tine"
// mais une description qui parle de modération et de zéro jugement (probablement un
// copier-coller de la carte "safe place" de l'ancien site). Laissé tel quel en attendant
// son arbitrage, voir la conversation du 27/08/2026.
const FEATURES = [
  {
    title: 'La sororité dans ta poche',
    text: "Papoter 24h/24 & 7j/7, c'est possible. Y'a toujours une Martine connectée pour t'écouter, te soutenir ou juste rigoler avec toi.",
  },
  {
    title: 'Des thématiques pour toutes',
    text: "Ici, tu papotes santé, sexualité, société, love, amitiés, loisirs, voyages… Peu importe ce que t'as en tête : y'a une conversation pour ça (et si y'en a pas, tu la lances !)",
  },
  {
    title: 'Des good vibes à volonté',
    text: "Ici, on s'encourage, on rigole et on se relève ensemble. Entre Martines, c'est love, sororité et gros boost d'estime.",
  },
  {
    title: 'Glisse dans les DM de tes Martines sûres',
    text: 'Pour papoter en one-to-one, et surtout, te sentir entourée. Même à distance.',
  },
  {
    title: "Map'Tine, pour trouver ses Martines",
    text: 'Zéro relou, zéro jugement, modération au taquet. Tu peux enfin respirer et parler de ce que tu veux.',
  },
]

export default function FeatureCards() {
  return (
    <section className={styles.section} aria-labelledby="features-title">
      <div className="container">
        <Reveal>
          <h2 id="features-title" className={styles.sectionTitle}>
            Les Martines késako&nbsp;?
          </h2>
        </Reveal>

        <div className={styles.grid}>
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.06} className={styles.cardWrap}>
              <article className={styles.card}>
                <div className={styles.mockup} aria-hidden="true" />
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardText}>{feature.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
