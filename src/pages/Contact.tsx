import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import heartIcon from '../assets/hero/heart.png'
import { SOCIALS } from '../components/SocialIcons'
import styles from './Contact.module.css'

// Contenu repris de la page /contact/ du site en prod (31/08/2026, "faut que tu me fasses
// une page 'on papote' qui est en fait la page contact"), habillé avec un vrai design
// (formulaire "trendy et premium") plutôt que le gabarit LegalPage (pensé pour du texte
// juridique long avec sommaire, pas pour un formulaire).
// Le site est 100% statique (pas de backend/API pour recevoir les soumissions) : plutôt
// que de prétendre à un envoi qu'on ne peut pas garantir, le formulaire construit un
// e-mail pré-rempli (mailto:) et ouvre la messagerie de la visiteuse — honnête sur ce qui
// se passe réellement, et fonctionne sans aucune infra côté serveur.
const CONTACT_EMAIL = 'hello@lesmartines.app'

// Deux publics, deux formulaires (01/09/2026, "il faudrait avoir une partie pour les
// partenaires (pro) et une partie classique, pas le même formulaire") : une meuf qui
// papote n'a pas besoin de renseigner un site web ou un nom de marque, et une marque qui
// candidate (voir /partenaires/, "Candidater pour être sur Les Martines") a besoin de
// pouvoir présenter son projet, pas juste écrire 3 lignes. Onglets plutôt que 2 pages
// séparées : ça reste "un p'tit mot" pour les deux, seul le contenu du formulaire change.
type Mode = 'meuf' | 'marque'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_RE = /^https?:\/\/.+\..+/

// Petites icônes discrètes dans chaque champ (01/09/2026, "améliore le formulaire" — après
// avoir proposé "des petites icônes à l'intérieur de chaque champ [...] signal premium
// classique") : même famille visuelle en traits que SocialIcons.tsx, plutôt que des icônes
// importées d'une lib externe pour rester cohérent avec le reste du site.
function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="6.5" r="3.5" />
      <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 6l7 5 7-5" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 5.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8l-4 3v-3H4.5a2 2 0 0 1-2-2v-6Z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 11.5 11.5 8.5" />
      <path d="M9.5 5.5 11 4a3 3 0 0 1 4.2 4.2l-1.5 1.5" />
      <path d="M10.5 14.5 9 16a3 3 0 0 1-4.2-4.2l1.5-1.5" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.6 2.5H16a1 1 0 0 1 1 1v5.4a1 1 0 0 1-.3.7l-6.6 6.6a1 1 0 0 1-1.4 0l-5.4-5.4a1 1 0 0 1 0-1.4l6.6-6.6a1 1 0 0 1 .7-.3Z" />
      <circle cx="13" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Confettis en CSS pur (01/09/2026, "un petit message cool [...] avec une animation sympa
// de félicitation") : une poignée de spans colorés qui tombent en tournant, délais et
// positions différents pour ne pas avoir l'air d'un pattern répété. Remplace le formulaire
// entier plutôt qu'un simple message ajouté sous le bouton — un vrai moment "c'est fait !"
// plutôt qu'une ligne de texte en plus.
const CONFETTI = [
  { left: '10%', color: 'var(--color-primary)', delay: '0s' },
  { left: '25%', color: 'var(--color-lime)', delay: '0.15s' },
  { left: '45%', color: 'var(--color-primary)', delay: '0.05s' },
  { left: '60%', color: 'var(--color-lime)', delay: '0.25s' },
  { left: '75%', color: 'var(--color-primary)', delay: '0.1s' },
  { left: '90%', color: 'var(--color-lime)', delay: '0.2s' },
]

function SuccessCelebration({ onReset }: { onReset: () => void }) {
  return (
    <div className={styles.success}>
      <div className={styles.confettiWrap} aria-hidden="true">
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className={styles.confetti}
            style={{ left: c.left, background: c.color, animationDelay: c.delay }}
          />
        ))}
      </div>
      <span className={styles.successHeart} aria-hidden="true">
        💌
      </span>
      <p className={styles.successTitle}>C&rsquo;est envoyé&nbsp;!</p>
      <p className={styles.successText}>
        Ta messagerie s&rsquo;est ouverte avec le message déjà prêt, y&rsquo;a plus qu&rsquo;à
        appuyer sur envoyer&nbsp;!
      </p>
      <button type="button" className={styles.successReset} onClick={onReset}>
        J&rsquo;envoie un autre message
      </button>
    </div>
  )
}

function AtIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10.5" r="3.2" />
      <path d="M13.2 10.5V12a2 2 0 0 0 4 0V10a7.2 7.2 0 1 0-3 5.85" />
    </svg>
  )
}

// Messages d'erreur maison affichés sous chaque champ (01/09/2026, "un peu les rendre plus
// beaux" — après avoir personnalisé le texte des bulles de validation natives du
// navigateur via setCustomValidity, Marine a demandé un rendu plus beau, or ces bulles
// sont une UI système qu'aucun CSS ne peut restyler). `noValidate` sur les <form>
// désactive complètement ce système natif, remplacé par une validation JS maison dont le
// résultat s'affiche dans le style du site, sous le champ concerné.

export default function Contact() {
  const [searchParams] = useSearchParams()
  const initialMode: Mode = searchParams.get('type') === 'marque' ? 'marque' : 'meuf'
  const [mode, setMode] = useState<Mode>(initialMode)

  useHead({
    title: 'On papote ?',
    description:
      "Une question, une idée, un coucou, ou une marque qui veut candidater ? Écris aux Martines, on te répond dès que possible.",
    path: '/contact/',
  })

  // Formulaire "meuf"
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // Optionnel (01/09/2026, "ajouter en optionnel le pseudo dans l'appli si c'est déjà une
  // Martine") : utile pour retrouver plus vite la bonne personne/le bon compte quand la
  // question porte sur un truc précis dans l'appli, mais tout le monde n'est pas encore
  // inscrite au moment d'écrire.
  const [appPseudo, setAppPseudo] = useState('')
  const [message, setMessage] = useState('')

  // Formulaire "marque" : champs propres à une candidature partenaire (voir la page
  // /partenaires/ pour le ton "sur candidature uniquement").
  const [brand, setBrand] = useState('')
  const [contactName, setContactName] = useState('')
  const [brandEmail, setBrandEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [instagram, setInstagram] = useState('')
  const [pitch, setPitch] = useState('')

  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const clearError = (id: string) => {
    setErrors((prev) => {
      if (!(id in prev)) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const handleSubmitMeuf = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!name.trim()) nextErrors['contact-name'] = 'Comment on t’appelle ?'
    if (!EMAIL_RE.test(email)) nextErrors['contact-email'] = 'Ton mail, sinon comment on te répond ?'
    if (!message.trim()) nextErrors['contact-message'] = 'Vas-y, dis-nous tout !'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    const subject = `Un p'tit mot de ${name}`
    const body = `${message}\n\n— ${name} (${email})${appPseudo ? ` — @${appPseudo.replace(/^@/, '')} sur l'appli` : ''}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const handleSubmitMarque = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!brand.trim()) nextErrors['brand-name'] = 'Elle s’appelle comment, ta marque ?'
    if (website && !URL_RE.test(website)) nextErrors['brand-website'] = 'Un vrai lien stp (avec https://)'
    if (!instagram.trim()) nextErrors['brand-instagram'] = 'On veut pouvoir te stalker un peu !'
    if (!contactName.trim()) nextErrors['brand-contact-name'] = 'Ton petit nom ?'
    if (!EMAIL_RE.test(brandEmail)) nextErrors['brand-email'] = 'Ton mail pro, pour qu’on puisse te répondre !'
    if (!pitch.trim()) nextErrors['brand-pitch'] = 'Raconte-nous en quelques mots !'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    const instagramUrl = `https://www.instagram.com/${instagram.trim().replace(/^@/, '')}`
    const subject = `Candidature partenaire — ${brand}`
    const body = [
      `Marque : ${brand}`,
      `Site web : ${website || 'non renseigné'}`,
      `Instagram : ${instagramUrl}`,
      `Contact : ${contactName} (${brandEmail})`,
      '',
      pitch,
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <Reveal immediate>
          <div className={styles.header}>
            <img src={heartIcon} alt="" className={styles.heart} />
            <h1 id="contact-title" className={styles.title}>
              <HighlightedText text="Un p'tit mot ?" highlight="p'tit mot" />
            </h1>
            <p className={styles.subtitle}>
              Une question pour Les Martines&nbsp;? T&rsquo;es une marque qui veut nous
              rejoindre&nbsp;? Écris-nous et on te répond dès que possible&nbsp;!
            </p>
          </div>
        </Reveal>

        <Reveal immediate delay={0.1}>
          <div className={styles.cardWrap}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.card}>
              {sent ? (
                <SuccessCelebration onReset={() => setSent(false)} />
              ) : (
                <>
              <div className={styles.tabs} role="tablist" aria-label="Type de message">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'meuf'}
                  className={`${styles.tab} ${mode === 'meuf' ? styles.tabActive : ''}`}
                  onClick={() => setMode('meuf')}
                >
                  Une question, un coucou
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'marque'}
                  className={`${styles.tab} ${mode === 'marque' ? styles.tabActive : ''}`}
                  onClick={() => setMode('marque')}
                >
                  Je suis une marque
                </button>
              </div>

              {mode === 'meuf' ? (
                <form onSubmit={handleSubmitMeuf} noValidate>
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Ton nom et prénom
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={styles.inputIcon} aria-hidden="true">
                        <UserIcon />
                      </span>
                      <input
                        id="contact-name"
                        type="text"
                        className={`${styles.input} ${styles.hasIcon} ${errors['contact-name'] ? styles.inputError : ''}`}
                        placeholder="Martine Queen"
                        value={name}
                        onChange={(e) => {
                          clearError('contact-name')
                          setName(e.target.value)
                        }}
                        aria-invalid={Boolean(errors['contact-name'])}
                      />
                    </div>
                    {errors['contact-name'] && <p className={styles.fieldError}>{errors['contact-name']}</p>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Ton mail
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={styles.inputIcon} aria-hidden="true">
                        <MailIcon />
                      </span>
                      <input
                        id="contact-email"
                        type="email"
                        className={`${styles.input} ${styles.hasIcon} ${errors['contact-email'] ? styles.inputError : ''}`}
                        placeholder="martine.queen@gmail.com"
                        value={email}
                        onChange={(e) => {
                          clearError('contact-email')
                          setEmail(e.target.value)
                        }}
                        aria-invalid={Boolean(errors['contact-email'])}
                      />
                    </div>
                    {errors['contact-email'] && <p className={styles.fieldError}>{errors['contact-email']}</p>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-pseudo" className={styles.label}>
                      Ton pseudo dans l&rsquo;appli si t&rsquo;es déjà une Martine{' '}
                      <span className={styles.labelOptional}>(optionnel)</span>
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={styles.inputIcon} aria-hidden="true">
                        <AtIcon />
                      </span>
                      <input
                        id="contact-pseudo"
                        type="text"
                        className={`${styles.input} ${styles.hasIcon}`}
                        placeholder="bad.assmeuf"
                        value={appPseudo}
                        onChange={(e) => setAppPseudo(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-message" className={styles.label}>
                      Message
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={`${styles.inputIcon} ${styles.inputIconTop}`} aria-hidden="true">
                        <MessageIcon />
                      </span>
                      <textarea
                        id="contact-message"
                        className={`${styles.textarea} ${styles.hasIcon} ${errors['contact-message'] ? styles.inputError : ''}`}
                        placeholder="Une question, une idée, un coucou ? Les Martines sont à l'écoute !"
                        value={message}
                        onChange={(e) => {
                          clearError('contact-message')
                          setMessage(e.target.value)
                        }}
                        aria-invalid={Boolean(errors['contact-message'])}
                      />
                    </div>
                    {errors['contact-message'] && <p className={styles.fieldError}>{errors['contact-message']}</p>}
                  </div>

                  <button type="submit" className={styles.submit}>
                    J&rsquo;envoie <span aria-hidden="true">💌</span>
                  </button>
                  <p className={styles.hint}>Ça ouvre ta messagerie, avec le message déjà rempli.</p>
                </form>
              ) : (
                <form onSubmit={handleSubmitMarque} noValidate>
                  <p className={styles.tabIntro}>
                    On lit chaque candidature avec attention, mais on ne dit pas oui à
                    tout le monde&nbsp;: raconte-nous ce qui rend ta marque unique.
                  </p>

                  <div className={styles.field}>
                    <label htmlFor="brand-name" className={styles.label}>
                      Nom de la marque
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={styles.inputIcon} aria-hidden="true">
                        <TagIcon />
                      </span>
                      <input
                        id="brand-name"
                        type="text"
                        className={`${styles.input} ${styles.hasIcon} ${errors['brand-name'] ? styles.inputError : ''}`}
                        placeholder="Pomponne, Bouche Bée..."
                        value={brand}
                        onChange={(e) => {
                          clearError('brand-name')
                          setBrand(e.target.value)
                        }}
                        aria-invalid={Boolean(errors['brand-name'])}
                      />
                    </div>
                    {errors['brand-name'] && <p className={styles.fieldError}>{errors['brand-name']}</p>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="brand-website" className={styles.label}>
                      Site web
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={styles.inputIcon} aria-hidden="true">
                        <LinkIcon />
                      </span>
                      <input
                        id="brand-website"
                        type="url"
                        className={`${styles.input} ${styles.hasIcon} ${errors['brand-website'] ? styles.inputError : ''}`}
                        placeholder="https://tamarque.com"
                        value={website}
                        onChange={(e) => {
                          clearError('brand-website')
                          setWebsite(e.target.value)
                        }}
                        aria-invalid={Boolean(errors['brand-website'])}
                      />
                    </div>
                    {errors['brand-website'] && <p className={styles.fieldError}>{errors['brand-website']}</p>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="brand-instagram" className={styles.label}>
                      Instagram
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={styles.inputIcon} aria-hidden="true">
                        <AtIcon />
                      </span>
                      <input
                        id="brand-instagram"
                        type="text"
                        className={`${styles.input} ${styles.hasIcon} ${errors['brand-instagram'] ? styles.inputError : ''}`}
                        placeholder="tamarque.co"
                        value={instagram}
                        onChange={(e) => {
                          clearError('brand-instagram')
                          setInstagram(e.target.value)
                        }}
                        aria-invalid={Boolean(errors['brand-instagram'])}
                      />
                    </div>
                    {errors['brand-instagram'] && <p className={styles.fieldError}>{errors['brand-instagram']}</p>}
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="brand-contact-name" className={styles.label}>
                        Ton nom
                      </label>
                      <div className={styles.inputIconWrap}>
                        <span className={styles.inputIcon} aria-hidden="true">
                          <UserIcon />
                        </span>
                        <input
                          id="brand-contact-name"
                          type="text"
                          className={`${styles.input} ${styles.hasIcon} ${errors['brand-contact-name'] ? styles.inputError : ''}`}
                          placeholder="Martine Queen"
                          value={contactName}
                          onChange={(e) => {
                            clearError('brand-contact-name')
                            setContactName(e.target.value)
                          }}
                          aria-invalid={Boolean(errors['brand-contact-name'])}
                        />
                      </div>
                      {errors['brand-contact-name'] && <p className={styles.fieldError}>{errors['brand-contact-name']}</p>}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="brand-email" className={styles.label}>
                        Ton mail
                      </label>
                      <div className={styles.inputIconWrap}>
                        <span className={styles.inputIcon} aria-hidden="true">
                          <MailIcon />
                        </span>
                        <input
                          id="brand-email"
                          type="email"
                          className={`${styles.input} ${styles.hasIcon} ${errors['brand-email'] ? styles.inputError : ''}`}
                          placeholder="martine.queen@tamarque.com"
                          value={brandEmail}
                          onChange={(e) => {
                            clearError('brand-email')
                            setBrandEmail(e.target.value)
                          }}
                          aria-invalid={Boolean(errors['brand-email'])}
                        />
                      </div>
                      {errors['brand-email'] && <p className={styles.fieldError}>{errors['brand-email']}</p>}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="brand-pitch" className={styles.label}>
                      Ta marque en quelques mots
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={`${styles.inputIcon} ${styles.inputIconTop}`} aria-hidden="true">
                        <MessageIcon />
                      </span>
                      <textarea
                        id="brand-pitch"
                        className={`${styles.textarea} ${styles.hasIcon} ${errors['brand-pitch'] ? styles.inputError : ''}`}
                        placeholder="Ce que vous faites, pourquoi ça collerait avec Les Martines..."
                        value={pitch}
                        onChange={(e) => {
                          clearError('brand-pitch')
                          setPitch(e.target.value)
                        }}
                        aria-invalid={Boolean(errors['brand-pitch'])}
                      />
                    </div>
                    {errors['brand-pitch'] && <p className={styles.fieldError}>{errors['brand-pitch']}</p>}
                  </div>

                  <button type="submit" className={styles.submit}>
                    Je candidate <span aria-hidden="true">🤝</span>
                  </button>
                  <p className={styles.hint}>Ça ouvre ta messagerie, avec le message déjà rempli.</p>
                </form>
              )}
                </>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className={styles.socials}>
            <p className={styles.socialsLabel}>Retrouve Les Martines sur les réseaux&nbsp;!</p>
            <div className={styles.socialLinks}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Icon />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
