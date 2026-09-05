import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useHead } from '../lib/useHead'
import Reveal from '../components/Reveal'
import HighlightedText from '../components/HighlightedText'
import heartIcon from '../assets/hero/heart.png'
import { SOCIALS } from '../components/SocialIcons'
import StoreButtons from '../components/StoreButtons'
import { UserIcon, MailIcon, MessageIcon, LinkIcon, CalendarIcon, PinIcon, TagIcon, AtIcon } from '../components/FormIcons'
import { StarRating } from './Events'
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

// Quatre publics, quatre formulaires, mais 2 registres bien différents (01/09/2026 puis
// 05/09/2026, "je sais pas si c'est bien parce que je mélange le pro et le petit mot") :
// une meuf qui papote un p'tit mot n'a rien à voir avec une marque/organisatrice/lieu qui
// candidate ou propose un partenariat. Mettre les 4 à plat sur la même ligne d'onglets
// laissait croire que "dire coucou" est une option équivalente à "candidater comme
// marque". Structure à 2 niveaux à la place : `audience` choisit d'abord le registre
// (perso/pro), et seul le registre "pro" affiche un 2e sélecteur pour préciser le type
// (marque/event/lieu) — `mode` reste la source de vérité fine utilisée par le formulaire.
type Audience = 'perso' | 'pro'
type Mode = 'meuf' | 'marque' | 'event' | 'lieu'
const PRO_MODES: Mode[] = ['marque', 'event', 'lieu']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_RE = /^https?:\/\/.+\..+/

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
      {/* Deuxième geste pendant l'attente (03/09/2026, "après 'C'est envoyé !', le seul
          bouton est 'envoyer un autre message' [...] c'est le moment idéal pour proposer
          un deuxième geste pendant que la personne attend une réponse") : plutôt qu'un
          cul-de-sac, on garde la visiteuse engagée le temps qu'on lui réponde. */}
      <div className={styles.successNext}>
        <p className={styles.successNextText}>En attendant notre réponse&nbsp;:</p>
        <div className={styles.successNextLinks}>
          {SOCIALS.slice(0, 1).map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Icon />
              Suis-nous sur {label}
            </a>
          ))}
        </div>
        <StoreButtons size="small" />
      </div>
    </div>
  )
}

// Fallback si le mailto échoue silencieusement (03/09/2026, "sur mobile, si aucune appli
// mail n'est configurée par défaut [...] la personne croit avoir un bug, abandonne") :
// l'adresse reste affichée en clair et copiable, pour ne pas perdre un contact à cause
// d'un client mail non configuré, sans dépendre d'un backend pour vérifier l'envoi.
function EmailFallback() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Presse-papier indisponible (permissions navigateur) : l'adresse reste visible et
      // sélectionnable à la main juste au-dessus, rien de plus à faire.
    }
  }

  return (
    <p className={styles.emailFallback}>
      Ta messagerie ne s&rsquo;ouvre pas&nbsp;? Écris-nous à{' '}
      <span className={styles.emailFallbackAddress}>{CONTACT_EMAIL}</span>
      <button type="button" className={styles.emailFallbackCopy} onClick={handleCopy}>
        {copied ? 'Copié !' : 'Copier'}
      </button>
    </p>
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
  const typeParam = searchParams.get('type')
  const initialMode: Mode =
    typeParam === 'marque' ? 'marque' : typeParam === 'event' ? 'event' : typeParam === 'lieu' ? 'lieu' : 'meuf'
  const [mode, setMode] = useState<Mode>(initialMode)
  const [audience, setAudience] = useState<Audience>(initialMode === 'meuf' ? 'perso' : 'pro')

  // Bascule "Un p'tit mot" / "Je suis pro" (05/09/2026) : passer en pro sélectionne le
  // dernier sous-type pro actif (ou 'marque' par défaut) plutôt que de laisser `mode` sur
  // 'meuf', ce qui afficherait un formulaire perso sous un onglet "pro" sélectionné.
  const handleAudienceChange = (next: Audience) => {
    setAudience(next)
    if (next === 'perso') {
      setMode('meuf')
    } else if (!PRO_MODES.includes(mode)) {
      setMode('marque')
    }
  }

  useHead({
    title: 'On papote ?',
    description:
      "Une question, une idée, un coucou, une marque qui veut candidater, une organisatrice d'events déjà active, ou un lieu à proposer ? Écris aux Martines, on te répond dès que possible.",
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

  // Formulaire "event" (05/09/2026, "un troisième onglet pour les gens qui veulent nous
  // contacter pour faire des orgas d'événements pour les femmes") : pas de site web/marque
  // à présenter comme pour une candidature partenaire, mais un projet d'event à décrire
  // (type d'event envisagé, pour qui, où/quand si déjà une idée).
  const [eventOrgName, setEventOrgName] = useState('')
  const [eventInstagram, setEventInstagram] = useState('')
  const [eventContactName, setEventContactName] = useState('')
  const [eventEmail, setEventEmail] = useState('')
  const [eventPitch, setEventPitch] = useState('')

  // Formulaire "lieu" (05/09/2026, "on peut faire un 4ème qui est : tu es lieu safe qui
  // peut accueillir des martinades") : un lieu (café, salle, appartement...) qui propose
  // d'accueillir une Martinade — besoin de savoir où c'est et ce que le lieu propose,
  // pas juste un contact.
  const [venueName, setVenueName] = useState('')
  const [venueCity, setVenueCity] = useState('')
  const [venueContactName, setVenueContactName] = useState('')
  const [venueEmail, setVenueEmail] = useState('')
  const [venuePitch, setVenuePitch] = useState('')
  // Case à cocher (05/09/2026, "la personne pourrait aussi organiser des événements dans
  // son lieu safe [...] faut peut-être mettre une option") : un lieu proposé n'est pas
  // forcément juste "prêté" passivement, sa gérante peut aussi être elle-même
  // organisatrice — utile de le savoir dès ce formulaire plutôt que de le découvrir après
  // coup, ça change qui on recontacte pour monter une Martinade dans ce lieu.
  const [venueOrganizesEvents, setVenueOrganizesEvents] = useState(false)
  // Champ conditionnel (05/09/2026, "il faudrait demander ce qu'elle organise comme sorte
  // d'event aussi [...] si elle coche, il faut que derrière ça crée un champ") : la case
  // seule ("Oui/Non" dans le mail) ne dit rien du TYPE d'event, cette précision est
  // justement ce qui permet de juger si ça colle avec une Martinade.
  const [venueEventsDetails, setVenueEventsDetails] = useState('')

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

  const handleSubmitEvent = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!eventContactName.trim()) nextErrors['event-contact-name'] = 'Comment on t’appelle ?'
    if (!EMAIL_RE.test(eventEmail)) nextErrors['event-email'] = 'Ton mail, pour qu’on puisse te répondre !'
    if (!eventPitch.trim()) nextErrors['event-pitch'] = 'Raconte-nous ce que tu organises !'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    const subject = `Proposition d'event — ${eventOrgName || eventContactName}`
    const body = [
      `Organisatrice / structure : ${eventOrgName || 'non renseigné'}`,
      `Instagram : ${eventInstagram || 'non renseigné'}`,
      `Contact : ${eventContactName} (${eventEmail})`,
      '',
      eventPitch,
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const handleSubmitVenue = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!venueName.trim()) nextErrors['venue-name'] = 'Il s’appelle comment, ton lieu ?'
    if (!venueCity.trim()) nextErrors['venue-city'] = 'Il est où, ton lieu ?'
    if (!venueContactName.trim()) nextErrors['venue-contact-name'] = 'Comment on t’appelle ?'
    if (!EMAIL_RE.test(venueEmail)) nextErrors['venue-email'] = 'Ton mail, pour qu’on puisse te répondre !'
    if (!venuePitch.trim()) nextErrors['venue-pitch'] = 'Raconte-nous ton lieu !'
    if (venueOrganizesEvents && !venueEventsDetails.trim()) {
      nextErrors['venue-events-details'] = 'Dis-nous en un mot ce que tu organises !'
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    const subject = `Lieu safe proposé — ${venueName}`
    const body = [
      `Lieu : ${venueName}`,
      `Ville : ${venueCity}`,
      `Contact : ${venueContactName} (${venueEmail})`,
      `Organise aussi des events dans ce lieu : ${venueOrganizesEvents ? `Oui — ${venueEventsDetails}` : 'Non'}`,
      '',
      venuePitch,
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
              Une question pour Les Martines&nbsp;? T&rsquo;es une marque, une
              organisatrice d&rsquo;events ou un lieu qui veut nous rejoindre&nbsp;?
              Écris-nous, on te répond sous 48h&nbsp;!
            </p>
            {/* Preuve sociale + délai de réponse (03/09/2026, "une visiteuse qui arrive
                directement sur /contact/ [...] n'a aucune raison de croire que c'est un
                vrai truc sérieux avant d'écrire") : cette page est souvent une porte
                d'entrée directe (lien partagé, recherche Google), sans être passée par la
                home et ses preuves sociales — on rappelle donc ici la note réelle plutôt
                que de supposer que la confiance est déjà acquise. */}
            <div className={styles.trustRow}>
              <StarRating className={styles.trustStars} />
              <strong>4,8/5</strong>
              <span className={styles.trustDot} aria-hidden="true">
                ·
              </span>
              450+ avis
            </div>
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
              {/* Niveau 1 (05/09/2026, "je mélange le pro et le petit mot [...] faudrait
                  pas un espace pro ?") : perso/pro d'abord, pour ne jamais mettre "dire
                  coucou" et "candidater comme marque" à plat sur la même ligne. */}
              <div className={styles.tabs} role="tablist" aria-label="Registre du message">
                <button
                  type="button"
                  role="tab"
                  aria-selected={audience === 'perso'}
                  className={`${styles.tab} ${audience === 'perso' ? styles.tabActive : ''}`}
                  onClick={() => handleAudienceChange('perso')}
                >
                  Un p&rsquo;tit mot
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={audience === 'pro'}
                  className={`${styles.tab} ${audience === 'pro' ? styles.tabActive : ''}`}
                  onClick={() => handleAudienceChange('pro')}
                >
                  Je suis pro
                </button>
              </div>

              {/* Niveau 2, seulement en pro : précise le type de partenariat. Même
                  famille visuelle que les onglets du dessus mais plus petite/discrète
                  (.subTabs), pour marquer que c'est un sous-choix, pas un 2e niveau
                  d'importance équivalente. */}
              {audience === 'pro' && (
                <div className={styles.subTabs} role="tablist" aria-label="Type de partenariat">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'marque'}
                    className={`${styles.subTab} ${mode === 'marque' ? styles.subTabActive : ''}`}
                    onClick={() => setMode('marque')}
                  >
                    Marque
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'event'}
                    className={`${styles.subTab} ${mode === 'event' ? styles.subTabActive : ''}`}
                    onClick={() => setMode('event')}
                  >
                    J&rsquo;organise des events
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'lieu'}
                    className={`${styles.subTab} ${mode === 'lieu' ? styles.subTabActive : ''}`}
                    onClick={() => setMode('lieu')}
                  >
                    J&rsquo;ai un lieu safe
                  </button>
                </div>
              )}

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
                  <EmailFallback />
                  {/* Incitation appli (03/09/2026, "quelqu'un qui écrit 'un coucou' n'est
                      peut-être même pas encore une Martine [...] rien n'invite celles qui
                      ne l'ont pas encore à la télécharger") : le champ pseudo optionnel
                      juste au-dessus suppose déjà l'appli installée, sans jamais proposer
                      de la télécharger à celles qui ne l'ont pas. */}
                  <div className={styles.appNudge}>
                    <p className={styles.appNudgeText}>Pas encore une Martine&nbsp;?</p>
                    <StoreButtons size="small" />
                  </div>
                </form>
              ) : mode === 'marque' ? (
                <form onSubmit={handleSubmitMarque} noValidate>
                  {/* Écusson repris de /partenaires/ (03/09/2026, "l'intro dit juste 'on
                      ne dit pas oui à tout le monde' en une ligne discrète [...] perdu au
                      milieu du formulaire, alors que c'est l'argument qui donne envie de
                      candidater sérieusement") : même badge que la page dédiée, pour que
                      l'exclusivité saute aux yeux avant même de lire le texte. */}
                  <span className={styles.exclusiveBadge}>Sur candidature uniquement · +30 marques déjà là</span>
                  <p className={styles.tabIntro}>
                    On lit chaque candidature avec attention, mais on ne dit pas oui à
                    tout le monde&nbsp;: raconte-nous ce qui rend ta marque unique.
                  </p>
                  {/* Même argument "pourquoi candidater" que /partenaires/ (05/09/2026) :
                      quelqu'une qui arrive directement sur ce formulaire (lien partagé,
                      ?type=marque) sans passer par la page dédiée n'a jamais vu cet
                      argument — répété ici, au moment exact où elle décide de remplir
                      le formulaire ou de repartir. */}
                  <p className={styles.brandBenefit}>
                    En échange&nbsp;: une visibilité directe auprès de notre communauté,
                    sur une appli notée <strong>4,8/5</strong> (450+ avis) et déjà repérée
                    par <strong>Les Echos</strong>, <strong>BFM Tech&amp;Co</strong> ou{' '}
                    <strong>Cosmopolitan</strong>.
                  </p>
                  {/* Repris de /partenaires/ (05/09/2026, "on peut le remettre dans le
                      formulaire aussi comme info") : même bande/même critère, pour que la
                      marque le sache dès le formulaire, pas seulement sur la page dédiée. */}
                  <p className={styles.womenLedBanner}>
                    <svg
                      className={styles.womenLedHeart}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 21s-6.716-4.35-9.428-8.03C.29 10.106.796 6.61 3.343 4.87c2.02-1.38 4.66-1.02 6.24.86L12 8.2l2.417-2.47c1.58-1.88 4.22-2.24 6.24-.86 2.547 1.74 3.053 5.236.771 8.1C18.716 16.65 12 21 12 21z" />
                    </svg>
                    L&rsquo;entrepreneuriat féminin à l&rsquo;honneur&nbsp;: au moins une
                    femme aux commandes de ta marque
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
                  <EmailFallback />
                </form>
              ) : mode === 'event' ? (
                <form onSubmit={handleSubmitEvent} noValidate>
                  {/* 2 cas couverts, pas l'un à l'exclusion de l'autre (05/09/2026,
                      "c'est plus pour les personnes qui organisent déjà des événements
                      [...] pour qu'on les pousse à notre communauté" puis "si on peut
                      co-organiser aussi carrément" et "c'est nous qui décidons s'ils
                      rentrent dans l'appli, on sélectionne") : référencer des events qui
                      tournent déjà OU co-organiser un nouvel event avec Les Martines —
                      la sélection reste réelle dans les 2 cas, pas automatique.
                      "On te répond dans tous les cas" (05/09/2026, envisagé puis retiré
                      un badge "Bientôt" — "les gens vont se dire on contact plus tard" —
                      remplacé par cette garantie de réponse, qui répond au vrai souci
                      (être laissée sans nouvelles) sans donner d'excuse pour attendre). */}
                  <p className={styles.tabIntro}>
                    Tu organises déjà des events 100% entre femmes, ou t&rsquo;as une idée
                    à monter avec nous (atelier, sortie, rencontre pro...)&nbsp;? On
                    sélectionne ceux qu&rsquo;on pousse à notre communauté, et on te
                    répond dans tous les cas&nbsp;: présente-nous ton projet.
                  </p>

                  <div className={styles.field}>
                    <label htmlFor="event-org-name" className={styles.label}>
                      Ton nom, ou celui de ton asso/entreprise{' '}
                      <span className={styles.labelOptional}>(optionnel)</span>
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={styles.inputIcon} aria-hidden="true">
                        <TagIcon />
                      </span>
                      <input
                        id="event-org-name"
                        type="text"
                        className={`${styles.input} ${styles.hasIcon}`}
                        placeholder="Les Copines du jeudi"
                        value={eventOrgName}
                        onChange={(e) => setEventOrgName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="event-instagram" className={styles.label}>
                      Instagram <span className={styles.labelOptional}>(optionnel)</span>
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={styles.inputIcon} aria-hidden="true">
                        <AtIcon />
                      </span>
                      <input
                        id="event-instagram"
                        type="text"
                        className={`${styles.input} ${styles.hasIcon}`}
                        placeholder="lescopinesdujeudi"
                        value={eventInstagram}
                        onChange={(e) => setEventInstagram(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="event-contact-name" className={styles.label}>
                        Ton nom
                      </label>
                      <div className={styles.inputIconWrap}>
                        <span className={styles.inputIcon} aria-hidden="true">
                          <UserIcon />
                        </span>
                        <input
                          id="event-contact-name"
                          type="text"
                          className={`${styles.input} ${styles.hasIcon} ${errors['event-contact-name'] ? styles.inputError : ''}`}
                          placeholder="Martine Queen"
                          value={eventContactName}
                          onChange={(e) => {
                            clearError('event-contact-name')
                            setEventContactName(e.target.value)
                          }}
                          aria-invalid={Boolean(errors['event-contact-name'])}
                        />
                      </div>
                      {errors['event-contact-name'] && (
                        <p className={styles.fieldError}>{errors['event-contact-name']}</p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="event-email" className={styles.label}>
                        Ton mail
                      </label>
                      <div className={styles.inputIconWrap}>
                        <span className={styles.inputIcon} aria-hidden="true">
                          <MailIcon />
                        </span>
                        <input
                          id="event-email"
                          type="email"
                          className={`${styles.input} ${styles.hasIcon} ${errors['event-email'] ? styles.inputError : ''}`}
                          placeholder="martine.queen@gmail.com"
                          value={eventEmail}
                          onChange={(e) => {
                            clearError('event-email')
                            setEventEmail(e.target.value)
                          }}
                          aria-invalid={Boolean(errors['event-email'])}
                        />
                      </div>
                      {errors['event-email'] && <p className={styles.fieldError}>{errors['event-email']}</p>}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="event-pitch" className={styles.label}>
                      Ton event, en quelques mots
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={`${styles.inputIcon} ${styles.inputIconTop}`} aria-hidden="true">
                        <CalendarIcon />
                      </span>
                      <textarea
                        id="event-pitch"
                        className={`${styles.textarea} ${styles.hasIcon} ${errors['event-pitch'] ? styles.inputError : ''}`}
                        placeholder="Le type d'event, pour qui, à quelle fréquence, ou ton idée si c'est à monter ensemble..."
                        value={eventPitch}
                        onChange={(e) => {
                          clearError('event-pitch')
                          setEventPitch(e.target.value)
                        }}
                        aria-invalid={Boolean(errors['event-pitch'])}
                      />
                    </div>
                    {errors['event-pitch'] && <p className={styles.fieldError}>{errors['event-pitch']}</p>}
                  </div>

                  <button type="submit" className={styles.submit}>
                    J&rsquo;envoie mon event <span aria-hidden="true">🎉</span>
                  </button>
                  <p className={styles.hint}>Ça ouvre ta messagerie, avec le message déjà rempli.</p>
                  <EmailFallback />
                </form>
              ) : (
                <form onSubmit={handleSubmitVenue} noValidate>
                  {/* Distinct du formulaire "event" (05/09/2026, "tu vois la différence
                      entre orga et lieux ?" puis "c'est pas prêté, c'est proposé [...]
                      quand une personne organise une Martinade, on propose ce lieu") :
                      ici on référence un ESPACE physique que LES MARTINES suggèrent
                      ensuite aux organisatrices de Martinades — la gérante du lieu ne
                      l'accueille pas elle-même, d'où le nom + la ville du lieu plutôt
                      qu'un pitch d'activité. */}
                  <p className={styles.tabIntro}>
                    T&rsquo;as un café, une salle, un espace pro ou un autre endroit
                    safe&nbsp;? On choisit les lieux qu&rsquo;on propose aux Martines qui
                    organisent une Martinade, et on te répond dans tous les
                    cas&nbsp;: présente-nous le tien.
                  </p>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="venue-name" className={styles.label}>
                        Nom du lieu
                      </label>
                      <div className={styles.inputIconWrap}>
                        <span className={styles.inputIcon} aria-hidden="true">
                          <TagIcon />
                        </span>
                        <input
                          id="venue-name"
                          type="text"
                          className={`${styles.input} ${styles.hasIcon} ${errors['venue-name'] ? styles.inputError : ''}`}
                          placeholder="Café des Copines"
                          value={venueName}
                          onChange={(e) => {
                            clearError('venue-name')
                            setVenueName(e.target.value)
                          }}
                          aria-invalid={Boolean(errors['venue-name'])}
                        />
                      </div>
                      {errors['venue-name'] && <p className={styles.fieldError}>{errors['venue-name']}</p>}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="venue-city" className={styles.label}>
                        Ville
                      </label>
                      <div className={styles.inputIconWrap}>
                        <span className={styles.inputIcon} aria-hidden="true">
                          <PinIcon />
                        </span>
                        <input
                          id="venue-city"
                          type="text"
                          className={`${styles.input} ${styles.hasIcon} ${errors['venue-city'] ? styles.inputError : ''}`}
                          placeholder="Lyon 2e"
                          value={venueCity}
                          onChange={(e) => {
                            clearError('venue-city')
                            setVenueCity(e.target.value)
                          }}
                          aria-invalid={Boolean(errors['venue-city'])}
                        />
                      </div>
                      {errors['venue-city'] && <p className={styles.fieldError}>{errors['venue-city']}</p>}
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="venue-contact-name" className={styles.label}>
                        Ton nom
                      </label>
                      <div className={styles.inputIconWrap}>
                        <span className={styles.inputIcon} aria-hidden="true">
                          <UserIcon />
                        </span>
                        <input
                          id="venue-contact-name"
                          type="text"
                          className={`${styles.input} ${styles.hasIcon} ${errors['venue-contact-name'] ? styles.inputError : ''}`}
                          placeholder="Martine Queen"
                          value={venueContactName}
                          onChange={(e) => {
                            clearError('venue-contact-name')
                            setVenueContactName(e.target.value)
                          }}
                          aria-invalid={Boolean(errors['venue-contact-name'])}
                        />
                      </div>
                      {errors['venue-contact-name'] && (
                        <p className={styles.fieldError}>{errors['venue-contact-name']}</p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="venue-email" className={styles.label}>
                        Ton mail
                      </label>
                      <div className={styles.inputIconWrap}>
                        <span className={styles.inputIcon} aria-hidden="true">
                          <MailIcon />
                        </span>
                        <input
                          id="venue-email"
                          type="email"
                          className={`${styles.input} ${styles.hasIcon} ${errors['venue-email'] ? styles.inputError : ''}`}
                          placeholder="martine.queen@gmail.com"
                          value={venueEmail}
                          onChange={(e) => {
                            clearError('venue-email')
                            setVenueEmail(e.target.value)
                          }}
                          aria-invalid={Boolean(errors['venue-email'])}
                        />
                      </div>
                      {errors['venue-email'] && <p className={styles.fieldError}>{errors['venue-email']}</p>}
                    </div>
                  </div>

                  {/* Case à cocher (05/09/2026, "la personne pourrait aussi organiser
                      des événements dans son lieu safe [...] faut peut-être mettre une
                      option") : une gérante de lieu peut être elle-même organisatrice,
                      pas seulement prêter un espace passif — utile de le savoir dès la
                      candidature plutôt que de le découvrir après coup. */}
                  <label className={styles.checkboxRow} htmlFor="venue-organizes">
                    <input
                      id="venue-organizes"
                      type="checkbox"
                      className={styles.checkbox}
                      checked={venueOrganizesEvents}
                      onChange={(e) => setVenueOrganizesEvents(e.target.checked)}
                    />
                    Je propose aussi d&rsquo;organiser des events dans ce lieu
                  </label>

                  {/* Champ conditionnel (05/09/2026, "il faudrait demander ce qu'elle
                      organise comme sorte d'event aussi [...] si elle coche, il faut que
                      derrière ça crée un champ") : n'apparaît que si la case juste
                      au-dessus est cochée, pas de champ vide à remplir pour tout le monde
                      quand la question ne concerne qu'une partie des lieux proposés. */}
                  {venueOrganizesEvents && (
                    <div className={styles.field}>
                      <label htmlFor="venue-events-details" className={styles.label}>
                        Quel type d&rsquo;events tu organises&nbsp;?
                      </label>
                      <div className={styles.inputIconWrap}>
                        <span className={styles.inputIcon} aria-hidden="true">
                          <CalendarIcon />
                        </span>
                        <input
                          id="venue-events-details"
                          type="text"
                          className={`${styles.input} ${styles.hasIcon} ${errors['venue-events-details'] ? styles.inputError : ''}`}
                          placeholder="Ateliers, brunchs, soirées jeux..."
                          value={venueEventsDetails}
                          onChange={(e) => {
                            clearError('venue-events-details')
                            setVenueEventsDetails(e.target.value)
                          }}
                          aria-invalid={Boolean(errors['venue-events-details'])}
                        />
                      </div>
                      {errors['venue-events-details'] && (
                        <p className={styles.fieldError}>{errors['venue-events-details']}</p>
                      )}
                    </div>
                  )}

                  <div className={styles.field}>
                    <label htmlFor="venue-pitch" className={styles.label}>
                      Ton lieu en quelques mots
                    </label>
                    <div className={styles.inputIconWrap}>
                      <span className={`${styles.inputIcon} ${styles.inputIconTop}`} aria-hidden="true">
                        <MessageIcon />
                      </span>
                      <textarea
                        id="venue-pitch"
                        className={`${styles.textarea} ${styles.hasIcon} ${errors['venue-pitch'] ? styles.inputError : ''}`}
                        placeholder="Capacité, ambiance, créneaux disponibles..."
                        value={venuePitch}
                        onChange={(e) => {
                          clearError('venue-pitch')
                          setVenuePitch(e.target.value)
                        }}
                        aria-invalid={Boolean(errors['venue-pitch'])}
                      />
                    </div>
                    {errors['venue-pitch'] && <p className={styles.fieldError}>{errors['venue-pitch']}</p>}
                  </div>

                  <button type="submit" className={styles.submit}>
                    Je propose mon lieu <span aria-hidden="true">🏠</span>
                  </button>
                  <p className={styles.hint}>Ça ouvre ta messagerie, avec le message déjà rempli.</p>
                  <EmailFallback />
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
