import { useHead } from '../lib/useHead'
import LegalPage from '../components/LegalPage'
import styles from './MentionsLegales.module.css'

// Contenu repris quasi mot pour mot du texte envoyé par Marine (29/08/2026), ton "fun et
// bienveillant" de la marque conservé partout. Refonte du gabarit (29/08/2026, "c'est pas
// très moderne là") : passage au composant partagé LegalPage (sommaire collant + suivi de
// scroll), commun aux 3 pages légales — voir LegalPage.tsx pour le détail du layout.
const SECTIONS = [
  { id: 'apropos', label: 'À propos de nous' },
  { id: 'contact', label: 'Contact fort sympathique' },
  { id: 'hebergement', label: 'Hébergement' },
  { id: 'creation', label: 'Création du site' },
  { id: 'droits-auteur', label: "Droits d'auteur" },
  { id: 'cgu', label: 'CGU' },
  { id: 'editeur', label: 'Éditeur' },
  { id: 'propriete-intellectuelle', label: 'Propriété intellectuelle' },
  { id: 'donnees-personnelles', label: 'Données personnelles' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'liens', label: 'Liens hypertextes' },
  { id: 'loi-applicable', label: 'Loi applicable' },
  { id: 'modifications', label: 'Modifications' },
]

export default function MentionsLegales() {
  useHead({
    title: 'Mentions légales',
    description: 'Mentions légales du site et de l’application Les Martines.',
    path: '/mentions-legales/',
  })

  return (
    <LegalPage
      title="Mentions légales"
      subtitle="Qui on est, où nous trouver, et tout le tralala officiel."
      updated="26 janvier 2024"
      sections={SECTIONS}
    >
      <p className={styles.intro}>
        Salut à toi, exploratrice du web&nbsp;! Le site{' '}
        <a href="https://www.lesmartines.app">https://www.lesmartines.app</a> et l&rsquo;application «&nbsp;LES
        MARTINES&nbsp;» c&rsquo;est le fruit du travail passionné de l&rsquo;équipe de LES MARTINES qui est là pour
        te fournir une expérience en ligne incroyable.
      </p>

      <section id="apropos" className={styles.section}>
        <h2>À propos de nous</h2>
        <p>
          Capital de la société LES MARTINES&nbsp;: 15&nbsp;000&nbsp;€ (pas un centime de moins, pas un centime de
          plus, on aime la précision&nbsp;!).
        </p>
        <p>Immatriculée au RCS de Paris sous le numéro B&nbsp;978&nbsp;529&nbsp;444.</p>
        <p>Siège social&nbsp;: 61 rue de Lyon, 75012 Paris.</p>
        <p>Présidente&nbsp;: Madame Marine Defaux.</p>
        <p>
          Contacte-nous&nbsp;: <a href="mailto:hello@lesmartines.app">hello@lesmartines.app</a> — 07&nbsp;81&nbsp;05&nbsp;76&nbsp;62
        </p>
      </section>

      <section id="contact" className={styles.section}>
        <h2>Contact fort sympathique</h2>
        <p>
          Contact de la Directrice de Publication (aka Mar(t)ine)&nbsp;:{' '}
          <a href="mailto:martine@lesmartines.app">martine@lesmartines.app</a> (n&rsquo;hésite pas, même pour dire
          bonjour&nbsp;!)
        </p>
        <p>Loi du 6 janvier 1978&nbsp;: on la respecte comme des pros&nbsp;!</p>
      </section>

      <section id="hebergement" className={styles.section}>
        <h2>Hébergement</h2>
        <p>
          <strong>Site&nbsp;:</strong> hébergé par la société Google — siège social de Google France (R.C.S. Paris
          443&nbsp;061&nbsp;841), 8 rue de Londres, 75009 Paris.
        </p>
        <p>
          <strong>Application&nbsp;:</strong> hébergée par la société Google — siège social de Google France (R.C.S.
          Paris 443&nbsp;061&nbsp;841), 8 rue de Londres, 75009 Paris.
        </p>
      </section>

      <section id="creation" className={styles.section}>
        <h2>Création du site et de l&rsquo;application</h2>
        <p>Réalisé avec amour par la société LES MARTINES.</p>
        <p>Adresse&nbsp;: 61 rue de Lyon, 75012 Paris.</p>
      </section>

      <section id="droits-auteur" className={styles.section}>
        <h2>Droits d&rsquo;auteur et tout le tralala</h2>
        <p>
          Contenu de <a href="https://www.lesmartines.app">www.lesmartines.app</a> et de l&rsquo;application «&nbsp;LES
          MARTINES&nbsp;»&nbsp;: propriété de LES MARTINES. On aime partager, mais demandez avant de copier, svp&nbsp;!
        </p>
        <p>Interdiction formelle&nbsp;: pas touche à nos marques déposées sans notre feu vert&nbsp;!</p>
      </section>

      <section id="cgu" className={styles.section}>
        <h2>Conditions générales d&rsquo;utilisation</h2>
        <p>
          Lisez nos CGU pour tout savoir sur les aventures et services que propose LES MARTINES. C&rsquo;est notre
          mode d&rsquo;emploi, le guide de la Martine cool&nbsp;!
        </p>
        <p>
          <a href="/conditions-generales-dutilisation/" className={styles.cta}>
            Je lis les CGU
          </a>
        </p>
      </section>

      <section id="editeur" className={styles.section}>
        <h2>Éditeur du site et de l&rsquo;application</h2>
        <p>
          Ce site et cette application sont le fruit du travail passionné de Les Martines. Notre équipe dévouée,
          basée à Paris, est là pour te fournir une expérience en ligne géniale.
        </p>
      </section>

      <section id="propriete-intellectuelle" className={styles.section}>
        <h2>Propriété intellectuelle</h2>
        <p>
          Tout le contenu cool que tu vois sur lesmartines.app et sur l&rsquo;application LES MARTINES, comme les
          images, textes, vidéos et logos, c&rsquo;est à nous ou à nos partenaires. Donc, si tu veux les utiliser,
          demande-nous d&rsquo;abord, on est sympas&nbsp;!
        </p>
      </section>

      <section id="donnees-personnelles" className={styles.section}>
        <h2>Données personnelles</h2>
        <p>
          Tes données personnelles sont super importantes, et on les traite avec le plus grand soin. Si tu veux en
          savoir plus ou exercer tes droits, envoie-nous un p&rsquo;tit mot à{' '}
          <a href="mailto:hello@lesmartines.app">hello@lesmartines.app</a>. Pour plus d&rsquo;infos, jette un &oelig;il
          à notre <a href="/politique-de-confidentialite/">politique de confidentialité</a>.
        </p>
      </section>

      <section id="cookies" className={styles.section}>
        <h2>Cookies</h2>
        <p>
          Notre site utilise des cookies, mais pas les cookies du monstre sous ton lit. Ce sont juste de petits
          fichiers pour améliorer ton expérience.
        </p>
      </section>

      <section id="liens" className={styles.section}>
        <h2>Liens hypertextes</h2>
        <p>
          Il se peut qu&rsquo;on ait mis des liens vers d&rsquo;autres sites passionnants. On n&rsquo;a pas le
          contrôle sur eux, mais on espère qu&rsquo;ils sont tout aussi géniaux que nous&nbsp;!
        </p>
      </section>

      <section id="loi-applicable" className={styles.section}>
        <h2>Loi applicable et juridiction</h2>
        <p>
          Si jamais il y a un problème, on préfère rester cool. Les lois françaises sont les règles du jeu, et en cas
          de pépin, on règle ça devant les tribunaux français.
        </p>
      </section>

      <section id="modifications" className={styles.section}>
        <h2>Modifications des mentions légales</h2>
        <p>
          On se garde le droit de changer les règles du jeu à tout moment. Mais pas de panique, on te tiendra au jus
          de tout. Stay cool&nbsp;!
        </p>
      </section>

      <p className={styles.closing}>
        Et voilà&nbsp;! Ces mentions légales sont comme un bon café, meilleures lorsqu&rsquo;elles sont fraîches.
        Alors, reviens les voir de temps en temps&nbsp;!
      </p>
    </LegalPage>
  )
}
