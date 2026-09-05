import { useState } from 'react'
import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import faqHero from '../assets/faq/faq-hero.webp'
import heartIcon from '../assets/hero/heart.png'
import card1 from '../assets/faq/card-1.webp'
import card2 from '../assets/faq/card-2.webp'
import card3 from '../assets/faq/card-3.webp'
import card4 from '../assets/faq/card-4.webp'
import card5 from '../assets/faq/card-5.webp'
import card6 from '../assets/faq/card-6.webp'
import card7 from '../assets/faq/card-7.webp'
import styles from './Faq.module.css'

// Contenu et visuels repris de la page /faq/ du site en prod (31/08/2026, "tu vas reprendre
// cette page pour récupérer les images et le texte"). Chaque question a sa PROPRE
// illustration sur le site en prod (pas des visuels décoratifs partagés au hasard) :
// vérifié en inspectant le DOM (chaque <h4> question est suivi d'un <img> dédié).
// Mise en page en quinconce (31/08/2026, "sur la page que je t'ai envoyé, il y avait un
// joli dégradé + les images et les textes étaient en quinconces") : image et texte
// alternant de côté à chaque question, comme sur le site en prod. Repassé en accordéon
// ensuite (même jour, "ok pour l'accordéon" : la question reste toujours visible, seuls le
// texte de réponse et l'illustration se déplient au clic) pour alléger la page — 7 blocs de
// texte long affichés en continu faisaient un trop gros pavé à lire d'une traite.
// `boldAnswer` (05/09/2026, "mets des mots en gras dans le texte et fait ça partout dans
// le site où on a des paragraphes") : phrases de `answer` à mettre en <strong> à
// l'affichage (voir boldPhrases dans src/lib/boldPhrases.tsx). `answer` reste un texte
// brut intact, seul champ utilisé par le JSON-LD schema.org/FAQPage plus bas — jamais du
// JSX, un moteur de recherche ne doit voir que du texte simple à cet endroit.
const FAQ_ITEMS = [
  {
    question: "C'est pour qui ce réseau social ?",
    answer:
      "Si tu te sens meuf, t'es une Martine. Peu importe ton genre assigné, ton étiquette ou ton parcours. Ici, c'est pour toi. Pour se confier, se rencontrer, créer, rire, pleurer, vibrer. Ici t'as ta place !",
    boldAnswer: ["Ici, c'est pour toi."],
    image: card1,
  },
  {
    question: "C'est vraiment safe, ou c'est du blabla marketing ?",
    answer:
      "C'est safe. Vraiment. Pas de relous, pas de DM chelou, pas d'algos qui décident à ta place. Tu choisis à qui tu parles, quand, comment. Et si quelqu'une dépasse les bornes ? Modération rapide, bienveillante, et sans blabla. Ta sécurité, c'est notre priorité.",
    boldAnswer: ['Ta sécurité, c’est notre priorité.'],
    image: card2,
  },
  {
    question: "Comment on est sûres d'être qu'entre meufs ?",
    answer:
      "Chez Les Martines, on ne joue pas avec la sécurité. À l'inscription, chaque Martine s'identifie comme femme (cis ou trans) et passe par un selfie de vérification. L'équipe veille au grain.",
    boldAnswer: ['un selfie de vérification'],
    image: card3,
  },
  {
    question: 'Comment ça papote par ici ?',
    answer:
      "Via des posts, des commentaires ou en messages privés. Envie de te confier, de râler ou de parler de ton ex ? Ici tu parles de tout, sans tabou. Pas de filtre. Pas de pression. Pas de relous. Juste des meufs qui se comprennent.",
    boldAnswer: ['Ici tu parles de tout, sans tabou.'],
    image: card4,
  },
  {
    question: "J'peux faire quoi sur Les Martines ?",
    answer:
      "Envie de parler d'un truc perso ? Poste en anonyme. Besoin d'un espace safe ? Mets un TW, pour que ça passe tout doux. Ici, tu peux filtrer ton feed, choisir tes sujets, créer ou répondre à des posts, papoter en privé... Tout ça, à ton rythme et entre meufs qui te comprennent vraiment.",
    boldAnswer: ['à ton rythme'],
    image: card5,
  },
  {
    question: "Comment on garde l'ambiance safe et cool ici ?",
    answer:
      "Ici, la modération veille au grain pour que ça reste chill et respectueux. On a un Sis Code clair : pas de haine, pas de relous, que du soutien. Chaque Martine peut signaler ce qui pose problème. Si ça part en vrille, on intervient rapido pour que tu restes en sécurité. Résultat : un espace où tu peux être toi, tranquille, sans stress.",
    boldAnswer: ['on intervient rapido'],
    image: card6,
  },
  {
    question: 'Dans quels pays Les Martines est dispo ?',
    answer:
      "Les Martines sont déjà installées en France, Belgique, Suisse, Luxembourg et Canada. Partout où tu vas, y'aura bientôt une Martine pour toi.",
    boldAnswer: ['France, Belgique, Suisse, Luxembourg et Canada'],
    image: card7,
  },
]

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof FAQ_ITEMS)[number]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
      <h2 className={styles.itemHeading}>
        <button
          id={buttonId}
          type="button"
          className={styles.question}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {item.question}
          <span className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ''}`} aria-hidden="true" />
        </button>
      </h2>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.answerWrap}>
        <div className={styles.answerInner}>
          <div className={styles.row}>
            <p className={styles.answer}>{item.answer}</p>
            <img src={item.image} alt="" className={styles.rowImage} loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Balisage schema.org/FAQPage (02/09/2026, "l'IA de contenu c'est pour tout le site [...]
// ça doit ressortir dans les recherches IA [...] et google SEO") : donne à Google (extraits
// enrichis FAQ dans les résultats) et aux IA (ChatGPT, Perplexity...) une version
// structurée des 7 questions/réponses, en plus du texte déjà visible dans l'accordéon —
// même contenu, présenté deux fois pour deux lecteurs différents (humain vs machine).
function FaqJsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useHead({
    title: 'What the FAQ ?',
    description:
      "Pour qui c'est fait, comment ça marche, c'est vraiment safe ? Toutes les réponses à tes questions sur Les Martines, sans tabou.",
    path: '/faq/',
  })

  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <FaqJsonLd />
      <div className="container">
        <div className={styles.hero}>
          <Reveal immediate>
            <div className={styles.heroText}>
              <img src={heartIcon} alt="" className={styles.heart} />
              <h1 id="faq-title" className={styles.title}>
                <HighlightedText text="What the FAQ ?" highlight="FAQ" />
              </h1>
              <span className={styles.eyebrow}>( sans tabou )</span>
              <p className={styles.subtitle}>
                Pour qui c&rsquo;est fait&nbsp;? Comment ça marche&nbsp;?
                <br />
                On t&rsquo;explique tout ici&nbsp;!
              </p>
              <svg
                className={styles.scrollArrow}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="M19 12l-7 7-7-7" />
              </svg>
            </div>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <img src={faqHero} alt="" className={styles.heroImage} />
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className={styles.list}>
            {FAQ_ITEMS.map((item, i) => (
              <FaqAccordionItem
                key={item.question}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.closing}>
            <p>
              Encore une question&nbsp;? <a href="/contact/">On papote</a>&nbsp;
              <span aria-hidden="true">💌</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
