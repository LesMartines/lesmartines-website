import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import heartIcon from '../assets/hero/heart.png'
import styles from './Blog.module.css'

// Page dédiée (05/09/2026, "il y a aussi un blog wordpress a recuperer donc il faudrait
// la page mais pas le menu") : le blog "Le Martine Mag" vit sur WordPress (21 articles,
// voir https://www.lesmartines.app/blog-les-martines/), avec son propre thème/menu. Les
// articles restent sur WordPress tel quel (pas migrés — gros chantier de contenu écarté
// pour l'instant, voir décision Marine) : cette page recrée juste la page d'ACCUEIL du
// mag avec notre nav/footer, et chaque carte renvoie vers l'article original sur
// WordPress (lien externe, cible _blank). Titres/dates/extraits copiés tels quels depuis
// le site en prod (ce sont les propres mots de Marine, pas un contenu tiers).
const BLOG_POSTS = [
  {
    category: 'Histoire',
    title: 'Histoire du 8 Mars',
    date: '06/03/2025',
    excerpt:
      'Tu sais que le 8 mars est la journée internationale pour les droits des femmes non ? Et sais-tu tout ce qu’il y a derrière…',
    href: 'https://www.lesmartines.app/le-8-mars-en-france/',
  },
  {
    category: 'Société',
    title: 'Pourquoi les hommes ne rappellent pas ?',
    date: '26/02/2025',
    excerpt:
      'Cet article humoristique explore ce grand classique des relations amoureuses modernes : l’homme qui disparaît sans un mot.',
    href: 'https://www.lesmartines.app/pourquoi-les-hommes-ne-rappellent-pas/',
  },
  {
    category: 'Société',
    title: 'La charge mentale : un poids invisible',
    date: '19/02/2025',
    excerpt:
      'La charge mentale désigne le poids de la gestion invisible des tâches domestiques, souvent supporté par les femmes.',
    href: 'https://www.lesmartines.app/charge-mentale-chez-les-femmes/',
  },
  {
    category: 'Témoignages',
    title: 'Trahison et sororité : le clash des titans',
    date: '12/02/2025',
    excerpt:
      'Cet article explore comment la sororité peut émerger de l’infidélité, transformant des blessures en force collective.',
    href: 'https://www.lesmartines.app/trahison-et-sororite/',
  },
  {
    category: 'Société',
    title: 'Voyager seule ou seul ?',
    date: '05/02/2025',
    excerpt: 'T’es déjà parti·e en vacances solo toi ? Moi oui, et depuis je me pose quelques questions.',
    href: 'https://www.lesmartines.app/voyager-seule-ou-seul/',
  },
  {
    category: 'Société',
    title: 'Toute seule ?',
    date: '29/01/2025',
    excerpt: 'Tous les garçons que je vois me demandent pourquoi je suis toute seule. Du coup, je me mets à chanter…',
    href: 'https://www.lesmartines.app/toute-seule/',
  },
  {
    category: 'Société',
    title: 'Le célibat pensé comme un « homme »',
    date: '22/01/2025',
    excerpt: 'Le détachement propre aux « hommes » est-il synonyme de liberté ?',
    href: 'https://www.lesmartines.app/detachement-et-solitude/',
  },
  {
    category: 'Société',
    title: 'Les Martines parlent Neuroatypie',
    date: '15/01/2025',
    excerpt:
      'Tu ne la connais peut-être pas encore, mais l’association Adopte un TDAH défend la neuroatypie au quotidien.',
    href: 'https://www.lesmartines.app/les-martines-parlent-neuroatypie/',
  },
  {
    category: 'Société',
    title: 'Le Retour',
    date: '08/01/2025',
    excerpt: 'Heureux qui comme… hooo ça va, ta gueule hein. Je rentre là, et c’est pas toujours les meilleurs souvenirs.',
    href: 'https://www.lesmartines.app/le-retour/',
  },
  {
    category: 'Société',
    title: 'Féministe ET hétéro ? Ouais !',
    date: '02/01/2025',
    excerpt:
      'Cet article explore la dynamique complexe entre féminisme et relations hétérosexuelles, sans jugement.',
    href: 'https://www.lesmartines.app/feministe-et-hetero-ouais/',
  },
]

export default function Blog() {
  useHead({
    title: 'Le Martine Mag',
    description:
      'Le QG des meufs qui ont des trucs à dire : récits du quotidien, coups de gueule, coups de cœur et réflexions, toujours sincères.',
    path: '/blog-les-martines/',
  })

  return (
    <section className={styles.section} aria-labelledby="blog-title">
      <div className="container">
        <Reveal immediate>
          <div className={styles.header}>
            <img src={heartIcon} alt="" className={styles.heart} />
            <h1 id="blog-title" className={styles.title}>
              <HighlightedText text="Le Martine Mag" highlight="Mag" />
            </h1>
            <p className={styles.subtitle}>
              Le QG des meufs qui ont des trucs à dire. Ici, tu trouveras des récits du
              quotidien, des coups de gueule, des coups de cœur, des réflexions profondes
              ou légères… <strong>mais toujours sincères</strong>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.grid}>
            {BLOG_POSTS.map((post, i) => (
              <a
                key={post.href}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                style={{ animationDelay: `${Math.min(i * 0.03, 0.3)}s` }}
              >
                <span className={styles.cardCategory}>{post.category}</span>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <span className={styles.cardDate}>{post.date}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
