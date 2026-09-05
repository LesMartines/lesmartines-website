import { useState } from 'react'
import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import { APP_STORE_URL } from '../components/StoreButtons'
import { StarRating } from './Events'
import headerIllustration from '../assets/blog/header-illustration.webp'
import image8Mars from '../assets/blog/8-mars.webp'
import imageHommes from '../assets/blog/pourquoi-les-hommes-ne-rappellent-pas.webp'
import imageChargeMentale from '../assets/blog/charge-mentale.webp'
import imageTrahison from '../assets/blog/trahison-sororite.webp'
import imageVoyager from '../assets/blog/voyager-seule.webp'
import imageTouteSeule from '../assets/blog/toute-seule.webp'
import imageCelibat from '../assets/blog/celibat.webp'
import imageNeuroatypie from '../assets/blog/neuroatypie.webp'
import imageRetour from '../assets/blog/le-retour.webp'
import imageFeministe from '../assets/blog/feministe-hetero.webp'
import imageAnniversaire from '../assets/blog/mauvais-anniversaire.webp'
import imageBeaute from '../assets/blog/privilege-beaute.webp'
import imageConsentement from '../assets/blog/consentement.webp'
import imagePizan from '../assets/blog/christine-de-pizan.webp'
import imageJupe from '../assets/blog/ma-jupe.webp'
import imageBlues from '../assets/blog/blues-brothers.webp'
import imageArrestation from '../assets/blog/arrestation.webp'
import imageGhosting from '../assets/blog/ghosting.webp'
import imageSororite from '../assets/blog/sororite.webp'
import imageMalBaisee from '../assets/blog/mal-baisee.webp'
import imageGenese from '../assets/blog/genese.webp'
import styles from './Blog.module.css'

// Page dédiée (05/09/2026, "il y a aussi un blog wordpress a recuperer donc il faudrait
// la page mais pas le menu") : le blog "Le Martine Mag" vit sur WordPress (21 articles,
// voir https://www.lesmartines.app/blog-les-martines/), avec son propre thème/menu. Les
// articles restent sur WordPress tel quel (décision Marine, "je veux garder wordpress, je
// verrais plus tard" pour le souci de menu WordPress visible en cliquant un article) :
// cette page recrée la page d'ACCUEIL du mag avec notre nav/footer, et chaque carte
// renvoie vers l'article original sur WordPress (lien externe). Les 21 articles (pas
// juste les 10 premiers, "pourquoi il y a que 8 articles") + l'illustration du header
// ("t'as pas utilisé la photo de la fille avec un crayon") sont repris tels quels du site
// en prod, images optimisées en webp. Titres/dates/extraits/catégories = mots et méta de
// Marine (récupérés via og:title/og:description/article:published_time de chaque page).
const BLOG_POSTS = [
  {
    category: 'Histoire',
    title: 'Histoire du 8 Mars',
    date: '06/03/2025',
    excerpt:
      'Tu sais que le 8 mars est la journée internationale pour les droits des femmes non ? Et sais-tu tout ce qu’il y a derrière…',
    href: 'https://www.lesmartines.app/le-8-mars-en-france/',
    image: image8Mars,
  },
  {
    category: 'Amour',
    title: 'Pourquoi les hommes ne rappellent pas ?',
    date: '26/02/2025',
    excerpt:
      'Cet article humoristique explore ce grand classique des relations amoureuses modernes : l’homme qui disparaît sans un mot.',
    href: 'https://www.lesmartines.app/pourquoi-les-hommes-ne-rappellent-pas/',
    image: imageHommes,
  },
  {
    category: 'Société',
    title: 'La charge mentale : un poids invisible',
    date: '19/02/2025',
    excerpt:
      'La charge mentale désigne le poids de la gestion invisible des tâches domestiques, souvent supporté par les femmes.',
    href: 'https://www.lesmartines.app/charge-mentale-chez-les-femmes/',
    image: imageChargeMentale,
  },
  {
    category: 'Amitié',
    title: 'Trahison et sororité : le clash des titans',
    date: '12/02/2025',
    excerpt:
      'Cet article explore comment la sororité peut émerger de l’infidélité, transformant des blessures en force collective.',
    href: 'https://www.lesmartines.app/trahison-et-sororite/',
    image: imageTrahison,
  },
  {
    category: 'Société',
    title: 'Voyager seule ou seul ?',
    date: '05/02/2025',
    excerpt: 'T’es déjà parti·e en vacances solo toi ? Moi oui, et depuis je me pose quelques questions.',
    href: 'https://www.lesmartines.app/voyager-seule-ou-seul/',
    image: imageVoyager,
  },
  {
    category: 'Société',
    title: 'Toute seule ?',
    date: '29/01/2025',
    excerpt: 'Tous les garçons que je vois me demandent pourquoi je suis toute seule. Du coup, je me mets à chanter…',
    href: 'https://www.lesmartines.app/toute-seule/',
    image: imageTouteSeule,
  },
  {
    category: 'Amour',
    title: 'Le célibat pensé comme un « homme »',
    date: '22/01/2025',
    excerpt: 'Le détachement propre aux « hommes » est-il synonyme de liberté ?',
    href: 'https://www.lesmartines.app/detachement-et-solitude/',
    image: imageCelibat,
  },
  {
    category: 'Société',
    title: 'Les Martines parlent Neuroatypie',
    date: '15/01/2025',
    excerpt:
      'Tu ne la connais peut-être pas encore, mais l’association Adopte un TDAH défend la neuroatypie au quotidien.',
    href: 'https://www.lesmartines.app/les-martines-parlent-neuroatypie/',
    image: imageNeuroatypie,
  },
  {
    category: 'Témoignages',
    title: 'Le Retour',
    date: '08/01/2025',
    excerpt: 'Heureux qui comme… hooo ça va, ta gueule hein. Je rentre là, et c’est pas toujours les meilleurs souvenirs.',
    href: 'https://www.lesmartines.app/le-retour/',
    image: imageRetour,
  },
  {
    category: 'Société',
    title: 'Féministe ET hétéro ? Ouais !',
    date: '02/01/2025',
    excerpt:
      'Cet article explore la dynamique complexe entre féminisme et relations hétérosexuelles, sans jugement.',
    href: 'https://www.lesmartines.app/feministe-et-hetero-ouais/',
    image: imageFeministe,
  },
  {
    category: 'Société',
    title: 'Un très mauvais anniversaire',
    date: '26/12/2024',
    excerpt:
      'T’as passé un très mauvais anniversaire ? Cet article te dit pourquoi c’est ok de faire la gueule le jour de son anniversaire.',
    href: 'https://www.lesmartines.app/un-tres-mauvais-anniversaire/',
    image: imageAnniversaire,
  },
  {
    category: 'Société',
    title: 'Privilège de la beauté',
    date: '19/12/2024',
    excerpt: 'La beauté rend vraiment privilégiée ? Pas si sûr ! Ça ouvre des portes, mais renforce aussi les inégalités.',
    href: 'https://www.lesmartines.app/privilege-de-la-beaute/',
    image: imageBeaute,
  },
  {
    category: 'Société',
    title: 'De l’importance du consentement',
    date: '11/12/2024',
    excerpt:
      'Des phrases séduisantes qui favorisent un dialogue ouvert et le consentement, pour une séduction plus enrichissante.',
    href: 'https://www.lesmartines.app/de-limportance-du-consentement/',
    image: imageConsentement,
  },
  {
    category: 'Histoire',
    title: 'Christine de Pizan',
    date: '05/12/2024',
    excerpt: 'Christine de Pizan, pionnière du féminisme, a pris sa plume et ses ovaires pour briser les codes au 14ème siècle.',
    href: 'https://www.lesmartines.app/christine-de-pizan/',
    image: imagePizan,
  },
  {
    category: 'Histoire',
    title: 'Ma jupe',
    date: '27/11/2024',
    excerpt: 'Gladiator, Troie, Highlander… T’as trouvé le point commun ? La jupe pardi ! Née il y a 5300 ans.',
    href: 'https://www.lesmartines.app/ma-jupe/',
    image: imageJupe,
  },
  {
    category: 'Cinéma',
    title: 'The Blues Brothers',
    date: '21/11/2024',
    excerpt: 'The Blues Brothers mais vu par Les Martines. Une approche toute neuve de ce grand classique !',
    href: 'https://www.lesmartines.app/the-blues-brothers/',
    image: imageBlues,
  },
  {
    category: 'Société',
    title: 'Arrestation dans le Morbihan',
    date: '14/11/2024',
    excerpt: 'Arrestation d’une jeune femme pour avoir utilisé les mots « parfoite » et « attachiante ». On te dit tout !',
    href: 'https://www.lesmartines.app/arrestation-morbihan/',
    image: imageArrestation,
  },
  {
    category: 'Société',
    title: 'Ghosting',
    date: '31/10/2024',
    excerpt: 'Le ghosting a un impact émotionnel lourd, voulu ou non. Pourquoi et surtout comment ne pas le banaliser ?',
    href: 'https://www.lesmartines.app/ghosting/',
    image: imageGhosting,
  },
  {
    category: 'Témoignages',
    title: 'Sororité',
    date: '24/10/2024',
    excerpt:
      'Témoignage d’une histoire de sororité, et de Coquillette. 5 femmes qui se rencontrent et s’entraident.',
    href: 'https://www.lesmartines.app/sororite/',
    image: imageSororite,
  },
  {
    category: 'Société',
    title: 'Mal baisée !',
    date: '25/09/2024',
    excerpt: 'Hé salope, tu m’écoutes ? J’ai pris le temps d’argumenter avec un bonhomme, petit résumé pour le plaisir.',
    href: 'https://www.lesmartines.app/mal-baisee-2/',
    image: imageMalBaisee,
  },
  {
    category: 'Histoire',
    title: 'Les Martines : la genèse',
    date: '09/09/2024',
    excerpt: 'L’histoire badass et inspirante de M, la fondatrice discrète derrière Les Martines.',
    href: 'https://www.lesmartines.app/les-martines-la-genese/',
    image: imageGenese,
  },
]

const [FEATURED, ...REST] = BLOG_POSTS
const PER_PAGE = 9
const PAGE_COUNT = Math.ceil(REST.length / PER_PAGE)

export default function Blog() {
  const [page, setPage] = useState(0)

  useHead({
    title: 'Le Martine Mag',
    description:
      'Le QG des meufs qui ont des trucs à dire : récits du quotidien, coups de gueule, coups de cœur et réflexions, toujours sincères.',
    path: '/blog-les-martines/',
    image: FEATURED.image,
  })

  const pagePosts = REST.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  const goToPage = (next: number) => {
    setPage(next)
    window.scrollTo({ top: document.getElementById('blog-grid')?.offsetTop ?? 0, behavior: 'smooth' })
  }

  return (
    <section className={styles.section} aria-labelledby="blog-title">
      <div className="container">
        <Reveal immediate>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <h1 id="blog-title" className={styles.title}>
                <HighlightedText text="Le Martine Mag" highlight="Mag" />
              </h1>
              <p className={styles.subtitle}>
                Le QG des meufs qui ont des trucs à dire. Récits du quotidien, coups de
                gueule, coups de cœur, réflexions profondes ou légères…{' '}
                <strong>mais toujours sincères</strong>.
              </p>
            </div>
            <img src={headerIllustration} alt="" className={styles.headerImage} />
          </div>
        </Reveal>

        {/* 2 colonnes façon EventDetail.tsx (05/09/2026, "il ne faut pas oublier que le
            but premier c'est qu'elle télécharge l'application [...] un peu comme on a
            fait sur la page événement") : colonne large pour les articles, colonne
            étroite sticky à droite pour le rappel téléchargement — jamais l'inverse, un
            blog dont le but final reste de convertir vers l'appli ne doit pas laisser le
            visiteur repartir vers WordPress sans avoir revu ce rappel. */}
        <div className={styles.contentGrid}>
          <div className={styles.mainCol}>
            {/* Refonte "mode et chic" (05/09/2026, "l'ensemble ne fait pas très blog, je
                voudrais un truc un peu mode et chic") : plus de cartes encadrées (bordure
                + ombre + coins arrondis, plutôt "app") — image nette sans badge dessus,
                légende catégorie en petites capitales italiques au-dessus du titre façon
                magazine, et un simple filet fin sous chaque article plutôt qu'une boîte.
                Images réduites le même jour ("je trouve les images trop grosse") : la
                2e colonne les rétrécit déjà mécaniquement, aspect-ratio resserré en plus. */}
            <Reveal delay={0.05}>
              <a
                href={FEATURED.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featured}
              >
                <span className={styles.featuredImageWrap}>
                  <img src={FEATURED.image} alt="" className={styles.featuredImage} />
                </span>
                <div className={styles.featuredText}>
                  <span className={styles.eyebrow}>Dernier article — {FEATURED.category}</span>
                  <h2 className={styles.featuredTitle}>{FEATURED.title}</h2>
                  <p className={styles.cardExcerpt}>{FEATURED.excerpt}</p>
                  <span className={styles.readMore}>
                    Lire l&rsquo;article <span aria-hidden="true">→</span>
                  </span>
                  <span className={styles.cardDate}>{FEATURED.date}</span>
                </div>
              </a>
            </Reveal>

            <div id="blog-grid" className={styles.grid}>
              {pagePosts.map((post, i) => (
                <Reveal key={post.href} delay={Math.min(i * 0.03, 0.24)}>
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                  >
                    <span className={styles.cardImageWrap}>
                      <img src={post.image} alt="" className={styles.cardImage} loading="lazy" />
                    </span>
                    <div className={styles.cardBody}>
                      <span className={styles.eyebrow}>{post.category}</span>
                      <h3 className={styles.cardTitle}>{post.title}</h3>
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      <span className={styles.cardDate}>{post.date}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Pagination (05/09/2026, "mets une pagination") : même volume de pages que
                l'ancien blog WordPress (21 articles, 9 par page -> 3 pages). */}
            {PAGE_COUNT > 1 && (
              <nav className={styles.pagination} aria-label="Pages du blog">
                <button
                  type="button"
                  className={styles.pageArrow}
                  onClick={() => goToPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  aria-label="Page précédente"
                >
                  ←
                </button>
                {Array.from({ length: PAGE_COUNT }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.pageNumber} ${i === page ? styles.pageNumberActive : ''}`}
                    onClick={() => goToPage(i)}
                    aria-current={i === page ? 'page' : undefined}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  className={styles.pageArrow}
                  onClick={() => goToPage(Math.min(PAGE_COUNT - 1, page + 1))}
                  disabled={page === PAGE_COUNT - 1}
                  aria-label="Page suivante"
                >
                  →
                </button>
              </nav>
            )}
          </div>

          {/* Carte de rappel téléchargement, même recette que .sideCard dans
              EventDetail.module.css (mot manuscrit, icône appli, note, CTA, badges de
              réassurance) : le blog est un contenu d'appel, pas une fin en soi. */}
          <div className={styles.sideCol}>
            <div className={styles.sideCard}>
              <span className={styles.ctaHandwritten}>viens papoter&nbsp;!</span>
              <img src="/favicon.png" alt="" className={styles.ctaAppIcon} />
              <div className={styles.ctaRating}>
                <StarRating className={styles.starRating} /> 4,8/5{' '}
                <span className={styles.ctaRatingSep}>·</span> 450+ avis
              </div>
              <div className={styles.ctaDivider} />
              <h2 className={styles.ctaTitle}>Rejoins la communauté Les Martines</h2>
              <p className={styles.ctaText}>
                Papote avec des milliers de meufs, en toute sécurité, directement dans
                l&rsquo;appli.
              </p>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
                Télécharger l&rsquo;appli
              </a>
              <ul className={styles.ctaTrust}>
                <li>Sécurisé</li>
                <li>Gratuit</li>
                <li>2 min chrono</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
