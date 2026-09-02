import { useHead } from '../lib/useHead'
import LegalPage from '../components/LegalPage'
import styles from './ConditionsGenerales.module.css'

// Contenu repris du texte envoyé par Marine (29/08/2026), quasi mot pour mot. Le texte
// collé contenait chaque paragraphe transformé en lien vers mailto:hello@lesmartines.app
// ou vers des URL d'admin WordPress/Elementor (wp-admin/post.php?...) — clairement un
// artefact de copier-coller depuis l'éditeur, pas de vrais liens voulus : retirés partout
// sauf pour les vraies adresses email. L'ARTICLE 18 était dupliqué en entier dans le texte
// source : gardé une seule fois. Voir le message à Marine pour la liste des points à
// vérifier (paragraphe dupliqué à tort en 6.1, phrase 17.8 inachevée, coquilles Marine/Martine
// et peur/peut).
const SECTIONS = [
  { id: 'preambule', label: 'Préambule' },
  { id: 'art1', label: '1. Définitions' },
  { id: 'art2', label: '2. Objet' },
  { id: 'art3', label: '3. Documents contractuels' },
  { id: 'art4', label: '4. Configuration requise' },
  { id: 'art5', label: '5. Inscription et acceptation' },
  { id: 'art6', label: '6. Durée et résiliation' },
  { id: 'art7', label: "7. Description de l'application" },
  { id: 'art8', label: '8. Modération' },
  { id: 'art9', label: '9. Autorisations' },
  { id: 'art10', label: "10. Limites d'utilisation" },
  { id: 'art11', label: '11. Maintenance' },
  { id: 'art12', label: '12. Responsabilité' },
  { id: 'art13', label: '13. Garantie' },
  { id: 'art14', label: '14. Confidentialité' },
  { id: 'art15', label: '15. Données personnelles' },
  { id: 'art16', label: '16. Réversibilité' },
  { id: 'art17', label: '17. Divers' },
  { id: 'art18', label: '18. Droit applicable' },
]

export default function ConditionsGenerales() {
  useHead({
    title: 'Conditions générales d’utilisation',
    description: 'Conditions générales d’utilisation de l’application Les Martines.',
    path: '/conditions-generales-dutilisation/',
  })

  return (
    <LegalPage
      title="Conditions générales d’utilisation"
      subtitle="Le mode d'emploi complet de l'appli, pour tout savoir avant de te lancer."
      updated="25 janvier 2024"
      sections={SECTIONS}
    >
      <section id="preambule" className={styles.section}>
        <h2>Préambule</h2>
        <p>
          La société Les Martines (ci-après la «&nbsp;Société&nbsp;») est une société par actions simplifiée au
          capital de 15&nbsp;000&nbsp;€, immatriculée au registre du commerce et des sociétés de Paris sous le
          n°978&nbsp;529&nbsp;444 et dont le siège social est situé 61, rue de Lyon, 75012 Paris. Son numéro de TVA
          intracommunautaire est le FR3597852944. Elle exploite l&rsquo;application communautaire pour smartphone
          «&nbsp;Les Martines&nbsp;» (ci-après «&nbsp;l&rsquo;Application&nbsp;»). L&rsquo;installation et
          l&rsquo;utilisation de l&rsquo;Application est soumise aux présentes conditions générales
          d&rsquo;utilisation ou «&nbsp;CGU&nbsp;».
        </p>
        <p>
          Contact&nbsp;: 07&nbsp;81&nbsp;05&nbsp;76&nbsp;62 — <a href="mailto:hello@lesmartines.app">hello@lesmartines.app</a>
        </p>
        <p>Directrice de la publication&nbsp;: Mme Marine Defaux.</p>
        <p>
          L&rsquo;Application est hébergée par l&rsquo;hébergeur Google France (R.C.S. Paris 443&nbsp;061&nbsp;841),
          8 rue de Londres, 75009 Paris.
        </p>
      </section>

      <section id="art1" className={styles.section}>
        <h2>Article 1. Définitions</h2>
        <p>Les termes débutant par une majuscule ont la signification qui leur est donnée ci-après.</p>
        <ol className={styles.definitions}>
          <li><strong>Abonnement&nbsp;:</strong> fonctionnalité de l&rsquo;Application permettant de suivre les Contributions d&rsquo;une Martine. Les Abonnements apparaissent sous la forme d&rsquo;un fil d&rsquo;actualité accessible depuis le Compte de la Martine.</li>
          <li><strong>Anomalie&nbsp;:</strong> dysfonctionnement reproductible ou indisponibilité du Service, non imputable à un cas d&rsquo;exclusion de Maintenance.</li>
          <li><strong>Application&nbsp;:</strong> l&rsquo;application «&nbsp;Les Martines&nbsp;», téléchargée à partir d&rsquo;un magasin d&rsquo;application en ligne pour téléphones mobiles. L&rsquo;Application comprend 5 fonctionnalités&nbsp;: les Papotages, le Profil, la Messagerie, le Journal et la Maptine. Elle permet la mise en relation des Martines entre elles et avec des tiers (entreprises ou associations).</li>
          <li><strong>Authentification&nbsp;:</strong> processus d&rsquo;authentification qui permet d&rsquo;accéder à ou de valider un choix dans l&rsquo;Application.</li>
          <li><strong>Code d&rsquo;Authentification&nbsp;:</strong> code de vérification envoyé par la Société aux fins d&rsquo;Authentification.</li>
          <li><strong>Compte&nbsp;:</strong> espace personnel d&rsquo;une Martine sur l&rsquo;Application. Le Compte comprend l&rsquo;accès au Profil et à la Messagerie ainsi qu&rsquo;aux paramètres de l&rsquo;Application.</li>
          <li><strong>CGU&nbsp;:</strong> les présentes conditions générales d&rsquo;utilisation.</li>
          <li><strong>Changement&nbsp;:</strong> toute modification de l&rsquo;Application.</li>
          <li><strong>Contribution&nbsp;:</strong> tout contenu mis en ligne sur l&rsquo;Application par une Martine depuis son Compte.</li>
          <li><strong>Contrat&nbsp;:</strong> ensemble des accords relatifs à l&rsquo;Application, constitué par (i) les CGU et (ii) leurs annexes et avenants, à l&rsquo;exclusion de tout autre document.</li>
          <li><strong>Données&nbsp;:</strong> données des Martines, hébergées sur l&rsquo;Infrastructure de l&rsquo;Application dans le respect du Contrat.</li>
          <li><strong>Maptine&nbsp;:</strong> fonctionnalité de l&rsquo;Application permettant de localiser et interagir avec les Martines à proximité.</li>
          <li><strong>Infrastructure&nbsp;:</strong> infrastructure du sous-traitant hébergeur utilisé par la Société pour héberger et fournir l&rsquo;Application.</li>
          <li><strong>Journal&nbsp;:</strong> fonctionnalité de l&rsquo;Application permettant d&rsquo;accéder à des contenus tiers personnalisés. Le Journal peut référencer des contenus promotionnels, qui sont alors clairement identifiés en tant que tels.</li>
          <li><strong>Message&nbsp;:</strong> message privé uniquement échangé et visible entre deux Martines dans la Messagerie.</li>
          <li><strong>Messagerie&nbsp;:</strong> messagerie privée, unique et personnelle pour chaque Martine et accessible depuis le Compte.</li>
          <li><strong>Maintenance&nbsp;:</strong> service de rétablissement ou de correction des éventuelles Anomalies de l&rsquo;Application.</li>
          <li><strong>Mise à Jour&nbsp;:</strong> nouvelle version fonctionnelle ou technique de l&rsquo;Application, déployée auprès des Martines.</li>
          <li><strong>Papotage&nbsp;:</strong> fonctionnalité de l&rsquo;Application où les Martines peuvent communiquer publiquement entre elles sur des thématiques sociétales personnalisables. Toute Martine peut accéder aux Papotages. Les Papotages peuvent contenir des contenus promotionnels, qui sont alors clairement identifiés en tant que tels.</li>
          <li><strong>Profil&nbsp;:</strong> page publique du Compte sur l&rsquo;Application, présentant la Martine et ses Contributions publiques dans l&rsquo;ordre antéchronologique. Chaque Martine peut accéder au Profil des autres Martines et paramétrer les informations visibles sur son Profil à partir de son Compte.</li>
          <li><strong>Résiliation&nbsp;:</strong> la suppression ou désinscription du Compte.</li>
          <li><strong>Signalement&nbsp;:</strong> notification par une Martine d&rsquo;une Contribution potentiellement contraire aux CGU.</li>
          <li><strong>Suspension&nbsp;:</strong> procédure consistant à rendre une Contribution faisant l&rsquo;objet d&rsquo;un Signalement indisponible à titre provisoire pendant la phase de modération.</li>
          <li><strong>Martines&nbsp;:</strong> individu s&rsquo;identifiant comme femme ayant accès à l&rsquo;Application après avoir accepté les présentes CGU lors de leur inscription. Les Martines doivent être majeures (18 ans révolus).</li>
        </ol>
      </section>

      <section id="art2" className={styles.section}>
        <h2>Article 2. Objet</h2>
        <p>
          Les CGU définissent les conditions selon lesquelles chaque Martine bénéficie de l&rsquo;Application et de
          ses fonctionnalités en contrepartie de l&rsquo;acceptation du Contrat.
        </p>
      </section>

      <section id="art3" className={styles.section}>
        <h2>Article 3. Documents contractuels</h2>
        <p>
          Le Contrat se compose des présentes CGU et de leurs annexes, notamment la politique de confidentialité, à
          l&rsquo;exclusion de tout autre document. En cas de contradiction entre les documents contractuels, les
          CGU prévalent sur les annexes. En cas d&rsquo;évolution d&rsquo;un document contractuel, la dernière
          version validée par les Parties prévaut sur sa version antérieure.
        </p>
      </section>

      <section id="art4" className={styles.section}>
        <h2>Article 4. Configuration requise</h2>
        <p>
          L&rsquo;Application est disponible sur les magasins d&rsquo;application Apple et Android, pour les
          téléphones utilisant les systèmes d&rsquo;exploitation iOS 17 et suivants ou Android OS 8 et suivants.
        </p>
        <p>
          Il appartient à chaque Martine de disposer d&rsquo;un accès à Internet via son forfait téléphonique et de
          s&rsquo;assurer du bon fonctionnement et de la compatibilité de son téléphone (matériels, logiciels,
          protections techniques et connexions réseau) avec l&rsquo;Application, sous sa propre responsabilité. La
          Société dégage toute responsabilité ou garantie en cas de dysfonctionnement ou non-conformité de ces
          éléments. L&rsquo;Application ne peut être utilisée que sur une configuration d&rsquo;utilisation
          respectant les recommandations de la Société et acceptant les cookies inhérents à l&rsquo;Application. En
          cas d&rsquo;inéligibilité du téléphone, l&rsquo;Application ne peut pas être utilisée et aucune obligation
          n&rsquo;incombe à la Société.
        </p>
      </section>

      <section id="art5" className={styles.section}>
        <h2>Article 5. Inscription et acceptation</h2>
        <p>
          L&rsquo;Application fonctionne sur l&rsquo;Infrastructure et chaque Martine y accède grâce à ses
          terminaux mobiles et sa connexion à Internet. Après le téléchargement de l&rsquo;Application et son
          installation sur le terminal mobile d&rsquo;une Martine, celle-ci est invitée à créer un Compte et à
          accepter sans réserves le Contrat.
        </p>
        <h3>5.1 Authentification du Compte</h3>
        <p>
          L&rsquo;utilisation de l&rsquo;Application est conditionnée à l&rsquo;inscription de la Martine et à la
          création de son Compte. Cette inscription se fait en renseignant les champs obligatoires du formulaire
          d&rsquo;inscription, qui comprennent notamment le pseudo du Profil et un courriel valide. À ce titre, la
          Martine garantit la véracité des Données communiquées pour valider son inscription.
        </p>
        <p>
          La création du Compte est validée par l&rsquo;Authentification&nbsp;: la Martine est invitée à réaliser
          deux selfies depuis son téléphone en respectant des instructions spécifiques et aléatoires dans un temps
          maximum imparti. Si ces selfies sont validés par l&rsquo;Application, un courriel de validation est
          envoyé à la Martine. Une fois l&rsquo;Authentification du Compte réalisée, la Martine peut accéder
          directement à son Compte en ouvrant l&rsquo;Application à tout moment sur son téléphone portable.
        </p>
        <h3>5.2 Acceptation du Contrat</h3>
        <p>
          L&rsquo;acceptation du Contrat et notamment des présentes CGU se fait en cochant les cases correspondantes
          dans le parcours d&rsquo;inscription avant l&rsquo;Authentification, et en acceptant de renoncer à son
          droit de rétractation pour pouvoir accéder immédiatement à l&rsquo;Application. À défaut de cocher ces
          cases, la Martine n&rsquo;accepte pas les présentes CGU et ne peut pas finaliser son inscription ni
          accéder ou utiliser l&rsquo;Application.
        </p>
        <p>
          Chaque Martine est automatiquement inscrite à la newsletter de la Société lors de la création de son
          compte. Elle peut cependant se désinscrire à tout moment via le lien de désinscription figurant en bas de
          chaque newsletter.
        </p>
        <p>
          La dernière version des CGU acceptée par la Martine s&rsquo;applique, les journaux d&rsquo;évènement de
          l&rsquo;Application faisant foi. La Société a le droit de modifier le Contrat ou les présentes CGU à tout
          moment sans préavis&nbsp;; dans ce cas, la Martine sera invitée à procéder à une nouvelle Authentification
          dans les mêmes conditions que lors de la création de compte. De la même manière, la Martine peut devoir
          passer par une nouvelle Authentification pour toute nouvelle tentative d&rsquo;accès à l&rsquo;Application
          (i) après l&rsquo;avoir désinstallée de son téléphone, (ii) après s&rsquo;être déconnectée de
          l&rsquo;Application ou (iii) en cas de Mise à Jour de l&rsquo;Application (notamment en cas de nouvelles
          fonctionnalités nécessitant l&rsquo;autorisation de Les Martines).
        </p>
      </section>

      <section id="art6" className={styles.section}>
        <h2>Article 6. Durée et résiliation</h2>
        <p>Le Contrat s&rsquo;applique à compter de la création du Compte par la Martine pour une durée indéterminée.</p>
        <h3>6.1 Résiliation par la Martine</h3>
        <p>
          Chaque Martine peut mettre fin au Contrat à tout moment et sans préavis en désinstallant l&rsquo;Application
          ou à l&rsquo;issue d&rsquo;une période d&rsquo;inactivité de trois (3) ans sur l&rsquo;Application.
        </p>
        <h3>6.2 Résiliation par la Société</h3>
        <p>
          La Société peut mettre fin au Contrat et supprimer le Compte d&rsquo;une Martine à tout moment et sans
          préavis ou indemnité en cas (i) de violation des présentes CGU, (ii) de diffusion de contenu contraire au
          droit applicable ou à l&rsquo;ordre public ou (iii) de mise en danger ou d&rsquo;atteinte de quelque
          manière que ce soit à l&rsquo;intégrité du Service, aux droits de propriété intellectuelle de la Société
          ou à l&rsquo;image de marque de la Société ou de l&rsquo;Application.
        </p>
      </section>

      <section id="art7" className={styles.section}>
        <h2>Article 7. Description de l&rsquo;application</h2>
        <p>L&rsquo;Application est mise à disposition des Martines gratuitement.</p>
        <h3>7.1 Papotages</h3>
        <p>
          Les Papotages sont une partie de l&rsquo;Application qui fonctionne comme un forum en ligne, organisé par
          thématiques et où les Utilisatrices peuvent créer et contribuer à des fils de discussion. Certains fils de
          discussion peuvent être créés ou alimentés par la Société qui y apporte des contenus, dont des contenus
          sponsorisés conformément à l&rsquo;Article 7.6 ci-dessous. Chaque Contribution d&rsquo;une Martine dans
          les Papotages est publique et visible par toutes les autres Martines. Par défaut, cette Contribution est
          associée au Profil de la Martine, mais chaque Martine a la possibilité, pour permettre la libération de la
          parole et respecter l&rsquo;intimité des autres Martines (i) de publier sa Contribution de manière
          anonyme (le Profil n&rsquo;est pas visible pour les autres Martines, mais la Société peut identifier la
          Martine en cas de Signalement) et/ou (ii) de flouter le contenu de la Contribution (les autres Martines
          cliquent volontairement sur la zone floutée pour démasquer et lire la Contribution).
        </p>
        <p>
          Les Martines peuvent approuver ou désapprouver des Contributions en utilisant des boutons représentant
          des émoticônes sous chaque Contribution. Elles peuvent également épingler des Contributions qui
          deviennent alors également accessibles depuis une catégorie dédiée des Papotages, personnalisée pour
          chaque Martine.
        </p>
        <h3>7.2 Profils et Abonnements</h3>
        <p>
          Les Martines peuvent accéder aux Profils de chacune d&rsquo;entre elles et, depuis une page dédiée de
          leurs comptes respectifs, à leurs Abonnements. Ces fonctionnalités de l&rsquo;Application permettent aux
          Martines d&rsquo;interagir, de partager et de réagir aux Contributions des autres Martines. Les
          informations et le contenu partagé ou publié par les Martines sur ces suivis d&rsquo;actualité et fils
          d&rsquo;actualités peuvent être vus par d&rsquo;autres Martines. Lorsque des paramètres sont disponibles,
          la Société respecte les choix faits par les Martines concernant les personnes qui peuvent voir le Profil
          ou les Contributions. Pour les activités de consultation des Abonnements, la Société a choisi de ne pas
          faire apparaître ces interactions sur votre propre Profil. Ainsi, si vous consultez un fil de discussion
          très sensible dans Papotages, cette consultation ou vos interactions n&rsquo;apparaissent pas sur votre
          Profil, sauf si vous publiez une Contribution.
        </p>
        <h3>7.3 Messagerie</h3>
        <p>
          Une Messagerie est fournie aux Martines afin de permettre un échange d&rsquo;informations à caractère
          privé. Les Martines restent responsables des forfaits téléphoniques pris avec leurs opérateurs
          téléphoniques pour accéder et utiliser l&rsquo;Application, des frais d&rsquo;accès à Internet ainsi que
          de tous les autres frais et taxes associés à l&rsquo;utilisation de l&rsquo;Application. Cette Messagerie
          ne peut être assimilée à un moyen ou réseau de télécommunication fourni par votre opérateur téléphonique
          et ne permet pas de contacter des centres d&rsquo;appel ou services d&rsquo;urgence, notamment la police,
          les pompiers ou les hôpitaux. Les Martines peuvent contacter ces derniers par l&rsquo;intermédiaire de
          leur téléphone ou de tout autre service.
        </p>
        <h3>7.4 Journal</h3>
        <p>
          Le Journal est une partie de l&rsquo;Application sur laquelle la Société propose des contenus tiers, qui
          peuvent contenir des liens hypertexte vers des sites tiers, en rapport avec les centres d&rsquo;intérêt
          des Martines, en général aux fins d&rsquo;approfondir les échanges qui ont lieu dans Papotages. La Société
          n&rsquo;exerce aucun contrôle sur les sites et contenus vers lesquels ces liens renvoient et qui restent
          sous la responsabilité des éditeurs respectifs de ces sites Internet. Malgré les vérifications effectuées
          par la Société avant le référencement de ces contenus tiers, la Société n&rsquo;exerce aucun contrôle
          actif sur les sources vers lesquelles redirige le Journal et décline toute responsabilité quant aux
          contenus de ces sites et de leurs mises à jour.
        </p>
        <h3>7.5 Map&rsquo;tine</h3>
        <p>
          Maptine est une fonctionnalité de l&rsquo;Application se présentant sous la forme d&rsquo;une carte sur
          laquelle sont géolocalisées toutes les Martines. Cela permet aux Martines d&rsquo;identifier les Martines
          à proximité de soi, de cliquer sur leurs Profils et d&rsquo;échanger avec elles, de convenir d&rsquo;un
          rendez-vous, de se retrouver, etc. La géolocalisation en temps réel des Martines est désactivée par
          défaut. Lorsqu&rsquo;une Martine ouvre Maptine, l&rsquo;Application lui demande d&rsquo;activer cette
          géolocalisation pour lui donner accès à la carte. Chaque Martine peut l&rsquo;activer ou la désactiver à
          tout moment dans les paramètres de son Compte. Cette géolocalisation est obtenue à partir des données GPS
          du terminal depuis lequel est consulté l&rsquo;Application. Lorsque la géolocalisation est désactivée, la
          Martine ne peut pas utiliser Maptine. La Société ne conserve pas la géolocalisation des Martines, mais
          conserve les évènements créés sur la carte et les Martines inscrites comme participantes. Les Martines
          peuvent également désactiver les autorisations de géolocalisation depuis les paramètres de leurs
          terminaux.
        </p>
        <h3>7.6 Contenus sponsorisés</h3>
        <p>
          De manière ponctuelle, les thématiques des Papotages et le Journal peuvent contenir des contenus
          sponsorisés. Ces contenus sponsorisés permettent à des tiers de promouvoir des produits et services en
          lien avec les centres d&rsquo;intérêt des Martines. Ces tiers paient des commissions à la Société lorsque
          les Martines consultent les contenus sponsorisés et/ou cliquent sur les renvois introduits au sein
          desdits contenus. Lorsque la Société publie un contenu sponsorisé dans les Papotages et/ou le Journal,
          elle identifie ce contenu comme «&nbsp;collaboration commerciale&nbsp;», l&rsquo;existence d&rsquo;un
          partenariat rémunéré pour la Société et l&rsquo;identité de l&rsquo;annonceur tiers pour le compte duquel
          le contenu est publié.
        </p>
      </section>

      <section id="art8" className={styles.section}>
        <h2>Article 8. Modération</h2>
        <p>
          Conformément à l&rsquo;article 6 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans
          l&rsquo;économie numérique, la responsabilité de la Société est strictement limitée à son rôle
          d&rsquo;hébergeur des Données et Contributions des Martines. Par conséquent, la Société décline toute
          responsabilité sur les Contributions, qui relèvent de la liberté d&rsquo;expression et de la
          responsabilité exclusive de chaque Martine.
        </p>
        <h3>8.1 Contributions, Messages et Profils</h3>
        <p>
          Les Martines forment une communauté inclusive et respectueuse les unes des autres. En conséquence, les
          Martines sont responsables de leurs Contributions et s&rsquo;engagent à respecter la vie privée, la
          sécurité et le bien-être des autres Martines ainsi que l&rsquo;intégrité de la Communauté.
        </p>
        <p>Ainsi, les Martines s&rsquo;engagent à&nbsp;:</p>
        <ul>
          <li>(i) ne pas publier de Contributions ou charger de Données sur l&rsquo;Application qui soient contraires aux lois, aux règlements ou à l&rsquo;ordre public, et notamment tout contenu à caractère raciste, xénophobe, sectaire, prosélyte, diffamatoire, injurieux, obscène, pornographique, violent, ainsi que toute atteinte à la protection de la vie privée, de l&rsquo;image des personnes ou des droits des tiers (notamment par stockage de fichiers obtenus en violation des droits de leurs auteurs)&nbsp;;</li>
          <li>(ii) ne pas partager ou révéler des informations confidentielles sur les autres Martines ou divulguer leur identité hors ligne&nbsp;;</li>
          <li>(iii) ne pas adopter de comportements illégaux, trompeurs, déloyaux, discriminatoires ou frauduleux, notamment ne pas adopter de comportements nuisant au bon déroulement des échanges, incompréhensibles ou redondants&nbsp;;</li>
          <li>(iv) ne pas importer de virus ou de code malveillant, ni envoyer des spams ni agir d&rsquo;une autre manière qui pourrait désactiver, surcharger, entraver ou empêcher le bon fonctionnement, l&rsquo;intégrité, l&rsquo;exploitation ou l&rsquo;apparence de l&rsquo;Application&nbsp;;</li>
          <li>(v) ne pas commercialiser ou proposer à la vente de produits ou de services, ni publier de contenus à visée publicitaire, promotionnelle ou commerciale&nbsp;;</li>
          <li>(vi) ne pas détourner la procédure de Signalement ou effectuer tout recours frauduleux ou infondé&nbsp;;</li>
          <li>(vii) ou apporter leur concours à d&rsquo;autres Martines aux mêmes fins.</li>
        </ul>
        <h3>8.2 Modération a postériori</h3>
        <p>
          En application de ses obligations légales, la Société a mis en place une procédure de signalement des
          contenus manifestement illicites. Chaque Martine peut signaler un Profil ou une Contribution qui lui
          semble contraire aux présentes CGU. Tout Signalement conduit (i) à la Suspension immédiate et à titre
          préventif de la Contribution ou du Profil signalé jusqu&rsquo;à dix (10) jours ouvrés maximum et (ii) au
          démarrage d&rsquo;une procédure de revue du contenu signalé, en vertu de laquelle la Société détermine
          discrétionnairement si le contenu signalé a enfreint les présentes CGU. En cas d&rsquo;infraction aux
          CGU, la Société se réserve le droit de prendre les mesures appropriées, telle que l&rsquo;avertissement,
          la suppression ou la restriction du contenu signalé, la Suspension pour une durée déterminée du Compte, la
          résiliation du Contrat avec la ou les Martines concernées et/ou le signalement des faits aux forces de
          l&rsquo;ordre. Cette décision et les mesures correspondantes sont expliquées et communiquées aux Martines
          à l&rsquo;origine et cible du Signalement, qui peuvent engager une procédure de réclamation dans les
          conditions de l&rsquo;Article 18.
        </p>
      </section>

      <section id="art9" className={styles.section}>
        <h2>Article 9. Autorisations</h2>
        <h3>9.1 Licence sur les contenus des Martines</h3>
        <p>
          Chaque Martine reste propriétaire de ses Contributions et peut les partager librement avec quiconque.
          Pour pouvoir publier et héberger la Contribution et le Profil dans l&rsquo;Application, chaque Martine
          concède à la Société une licence d&rsquo;utilisation à titre gratuit, non exclusive, transférable, dans
          le monde entier et pour la durée des droits de propriété intellectuelle, avec droit de sous-licence, sur
          tous les contenus et Données chargés ou saisis dans l&rsquo;Application. Cette licence d&rsquo;utilisation
          comprend les droits de reproduction et de représentation en public ou en privé, y compris
          l&rsquo;utilisation dans et en dehors de l&rsquo;Application, l&rsquo;hébergement, la modification, la
          traduction, l&rsquo;adaptation.
        </p>
        <p>
          L&rsquo;Application ne comprend aucune prestation de contrôle, surveillance ou nettoyage des Données,
          dont l&rsquo;intégrité, la licéité et l&rsquo;utilisation restent sous la responsabilité exclusive de
          chaque Martine. Les Contributions privées sont supprimées en cas de désinscription de l&rsquo;Application.
          Les Contributions publiques ne peuvent pas être supprimées, mais elles ne sont plus rattachées au Compte
          de la Martine désinscrite. En sus, chaque Martine autorise la Société à utiliser ses informations de
          Profil sur l&rsquo;Application et à charger automatiquement toute Mise à Jour dans l&rsquo;Application.
          Chaque Martine garantit la Société contre tout recours, réclamation, éviction, action ou condamnation qui
          serait prononcée contre la Société du fait des contenus ou des Données de cette Martine, en ce compris
          tous dommages et intérêts, indemnités, frais de procédure et de conseil inclus.
        </p>
        <h3>9.2 Propriété intellectuelle de la Société</h3>
        <p>
          La Société est titulaire de l&rsquo;ensemble des droits relatifs à l&rsquo;Application, en ce compris sa
          marque et son logo, ainsi que tout logiciel, applicatif, base de données ou contenus mis en œuvre dans le
          cadre de l&rsquo;Application. Les Martines demeurent quant à elles seules propriétaires de leurs Données.
          Le droit d&rsquo;utilisation de l&rsquo;Application concédé aux Martines ne peut avoir pour effet de
          transférer quelque propriété intellectuelle que ce soit sur tout ou partie de l&rsquo;Application, autres
          que ceux strictement nécessaires à l&rsquo;utilisation à distance de l&rsquo;Application par les Martines.
          La Société conserve la propriété intellectuelle exclusive de tous plans, spécifications, ébauche, script,
          code, maquette ou document préparatoire créé par la Société, à l&rsquo;exception des Données du Client.
        </p>
        <h3>9.3 Licence d&rsquo;utilisation de l&rsquo;Application</h3>
        <p>
          La Société concède à chaque Martine un droit personnel, non exclusif, non cessible et non transmissible
          d&rsquo;accès et d&rsquo;utilisation de l&rsquo;Application, dans le respect du Contrat, dans le monde
          entier et pour la durée de l&rsquo;inscription de la Martine. Toute Mise à Jour du Service est soumise à
          la licence du présent article. Chaque Martine s&rsquo;engage à utiliser l&rsquo;Application conformément
          aux présentes CGU et à respecter les lois et réglementations en vigueur. En conséquence, chaque Martine
          s&rsquo;engage à stocker et traiter des Données et contenus strictement licites. Chaque Martine est seule
          responsable de ses Contributions et des contenus qu&rsquo;elle consulte sur l&rsquo;Application. La
          Société n&rsquo;exerce aucun contrôle actif sur les sources vers lesquelles redirigent les Contributions
          des Martines et décline toute responsabilité quant aux contenus de ces sources et leurs mises à jour.
        </p>
        <p>
          En conséquence, toute autre utilisation de l&rsquo;Application, non autorisée expressément par la
          Société, est interdite. À ce titre, chaque Martine s&rsquo;interdit de procéder à (i) toute reproduction
          provisoire ou permanente de tout ou partie de l&rsquo;Application, par quelque moyen que ce soit, (ii)
          tout accès ou tentative d&rsquo;accès non autorisé à l&rsquo;Application, (iii) toute décompilation ou
          ingénierie inverse de l&rsquo;Application notamment en vue de la création d&rsquo;un service similaire,
          (iv) toute interfaçage ou intégration avec d&rsquo;autres services ou logiciels sans autorisation
          préalable de la Société, (v) toute diffusion, distribution, mise à disposition gratuite ou payante de
          l&rsquo;Application au bénéfice d&rsquo;une autre entreprise, du public ou de tiers, (vi) toute
          adaptation ou modification de l&rsquo;Application quelle qu&rsquo;elle soit, ou (vii) toute introduction
          ou tentative d&rsquo;introduction frauduleuse ou non autorisée sur l&rsquo;Infrastructure. De même, sont
          interdites l&rsquo;extraction ou la réutilisation d&rsquo;une partie qualitativement ou quantitativement
          substantielle de l&rsquo;Application et des librairies propres à l&rsquo;Application.
        </p>
        <h3>9.4 Liens hypertexte</h3>
        <p>
          La Société autorise la mise en place de liens hypertextes ou de tout renvoi de toute nature vers toute
          page ou document de l&rsquo;Application, à condition que la mise en place de ces liens ne soit pas
          réalisée à des fins commerciales ou publicitaires. Cette mise en place de renvois ne peut se faire que
          sous réserve que la Société et l&rsquo;Application soient clairement identifiés et que leurs auteurs en
          aient préalablement informé la Société. La Société se réserve le droit de faire supprimer à tout moment
          un renvoi pointant vers tout ou partie de l&rsquo;Application si elle l&rsquo;estime non conforme aux
          présentes CGU. Les renvois vers les parties de l&rsquo;Application réservées aux Martines nécessitent
          pour les utilisateurs éventuels de s&rsquo;inscrire ou de se connecter à l&rsquo;Application pour
          consulter les contenus visés par les renvois.
        </p>
      </section>

      <section id="art10" className={styles.section}>
        <h2>Article 10. Limites d&rsquo;utilisation</h2>
        <h3>10.1 Sécurité des Données</h3>
        <p>
          L&rsquo;utilisation de l&rsquo;Application s&rsquo;entend de son exploitation par les Martines dans le
          cadre de la licence d&rsquo;utilisation prévue à l&rsquo;article 9 des CGU. Chaque Martine reste seule
          responsable des Données chargées, des traitements, instructions et procédures qu&rsquo;elle active, ainsi
          que des résultats obtenus. Elle s&rsquo;engage à ne pas faire de l&rsquo;Application un usage contraire à
          la règlementation applicable, à ne pas promouvoir ou exercer d&rsquo;activité professionnelle ou
          commerciale sur l&rsquo;Application, ni apporter son concours à un tel usage.
        </p>
        <p>
          Séparément de la modération des Contributions publiques, en cas de stockage de Données contraires aux
          présentes CGU ou d&rsquo;utilisation de l&rsquo;Application à d&rsquo;autres fins, la Société se réserve
          le droit (i) de supprimer la Donnée litigieuse en cas d&rsquo;urgence ou de menace sur
          l&rsquo;Infrastructure, (ii) d&rsquo;interrompre l&rsquo;accès à l&rsquo;Application sans délai ni
          préavis et (iii) de résilier le Contrat de la Martine contrevenante. Cette résiliation ne donnera lieu à
          aucune indemnité quelle qu&rsquo;elle soit, sans préjudice des dommages et intérêts que la Société pourra
          réclamer à la Martine pour ses agissements ou ceux des tiers par son entremise.
        </p>
        <h3>10.2 Disponibilité de l&rsquo;Application</h3>
        <p>
          La Société met en place des mesures de sécurité conformes aux meilleurs standards en vigueur dans le
          cadre d&rsquo;une obligation de moyens, contre les accès non autorisés ou atteintes aux Données.
          Toutefois, chaque Martine est seule responsable de la sécurisation de son propre système informatique et
          de ses accès web, et en particulier de la mise en œuvre de pare-feu et d&rsquo;antivirus pour protéger
          son terminal et ses Données. La Société effectue des sauvegardes des Données de l&rsquo;Application et
          assure l&rsquo;accessibilité de l&rsquo;Application selon les conditions et modalités définies au
          Contrat. La Société s&rsquo;engage à une disponibilité mensuelle raisonnable de l&rsquo;Application sous
          réserve (i) des plages de Maintenance planifiée de l&rsquo;Application et de l&rsquo;Infrastructure, (ii)
          de toute mise à jour de sécurité, (iii) des indisponibilités de moins de cinq (5) minutes consécutives à
          compter de l&rsquo;ouverture d&rsquo;un ticket d&rsquo;incident et (iv) des Suspensions consécutives à un
          manquement d&rsquo;une Martine. En outre, les Martines sont averties des aléas techniques inhérents à
          internet et des ralentissements ou interruptions d&rsquo;accès qui peuvent en résulter. En outre, chaque
          Martine est seule responsable de l&rsquo;effectivité de sa connexion web. En conséquence, la Société ne
          peut en aucun cas garantir la disponibilité permanente et optimale de l&rsquo;Application et fournit
          l&rsquo;Application dans le cadre d&rsquo;un engagement général de moyens, ce que le Client reconnaît.
        </p>
        <h3>10.3 Sécurité de l&rsquo;Application</h3>
        <p>
          Toute utilisation de l&rsquo;Application en violation du droit applicable en vigueur, des droits des
          Martines et des droits des tiers est interdite. À ce titre, la Société interdit aux Martines et à tout
          tiers de procéder à (i) toute reproduction provisoire ou permanente de tout ou partie de
          l&rsquo;Application, par quelque moyen que ce soit, (ii) tout accès ou tentative d&rsquo;accès non
          autorisé à l&rsquo;Application, (iii) toute décompilation ou ingénierie inverse de l&rsquo;Application
          notamment en vue de la création d&rsquo;un service similaire, (iv) tout interfaçage ou intégration avec
          d&rsquo;autres services ou logiciels sans autorisation préalable de la Société, (v) toute diffusion,
          distribution, mise à disposition gratuite ou payante de l&rsquo;Application au bénéfice d&rsquo;une autre
          entreprise, du public ou de tiers, (vi) toute adaptation ou modification de l&rsquo;Application quelle
          qu&rsquo;elle soit, (vii) toute introduction ou tentative d&rsquo;introduction frauduleuse ou non
          autorisée sur l&rsquo;Infrastructure, (viii) toute collecte automatisée ou non des Données ou des
          Contributions sur l&rsquo;Application par tout moyen ou dispositif et notamment via tout robot dit «&nbsp;crawler&nbsp;»,
          (ix) toute revente, commercialisation ou distribution des Données de l&rsquo;Application ou des contenus
          obtenus à partir de l&rsquo;Application, y compris sous forme de licences et (x) toute tentative
          d&rsquo;accéder à des données auxquelles les Martines ne sont pas autorisées à accéder.
        </p>
      </section>

      <section id="art11" className={styles.section}>
        <h2>Article 11. Maintenance</h2>
        <h3>11.1 Principes généraux</h3>
        <p>
          La Société ne peut garantir que l&rsquo;Application fonctionne toujours sans perturbation, retard ou
          erreur. De nombreux facteurs en dehors de son contrôle peuvent perturber ou empêcher votre utilisation de
          l&rsquo;Application, notamment toute panne ou congestion du réseau local, du pare-feu, de
          l&rsquo;opérateur ou du forfait de téléphonie mobile, ou encore de l&rsquo;alimentation électrique ou de
          la batterie du téléphone.
        </p>
        <p>
          En cas d&rsquo;Anomalie affectant l&rsquo;Application, une Martine peut la signaler à la Société. Dans son
          signalement, la Martine indique les circonstances de l&rsquo;Anomalie constatée. La Société met en œuvre
          le diagnostic de l&rsquo;Anomalie pour définir si elle relève d&rsquo;un problème logiciel ou de
          connexion, ou si elle est étrangère à l&rsquo;Application. Si la cause du dysfonctionnement n&rsquo;est
          pas imputable à l&rsquo;Application, il ne relève pas de la Maintenance.
        </p>
        <h3>11.2 Maintenance corrective</h3>
        <p>
          En cas d&rsquo;Anomalie de l&rsquo;Application diagnostiquée par la Société, la Société détermine sa
          sévérité et procède à sa correction dans les meilleurs délais, dans le cadre d&rsquo;une obligation de
          moyens. En toute hypothèse, la Société ne peut être tenue responsable ni prendre en charge au titre de la
          Maintenance, toute Anomalie qui serait liée à (i) une utilisation de l&rsquo;Application non conforme à
          sa destination, à sa documentation ou aux préconisations de la Société, (ii) une panne matérielle ou
          logicielle du terminal ou du réseau des Martines, (iii) une défaillance des réseaux de communications
          électroniques, un ralentissement ou engorgement du réseau internet ou tout autre cas de force majeure
          impactant la Société ou ses sous-traitants, (iv) un paramétrage du terminal de la Martine, (v) une
          incompatibilité entre l&rsquo;Application et de nouveaux matériels ou logiciels tiers mis en œuvre par une
          Martine, (vi) une contamination du système informatique du terminal des Martines par un virus
          informatique, (vii) un acte de piratage ou une intrusion frauduleuse dans le système informatique des
          Martines, (viii) l&rsquo;intervention d&rsquo;un tiers sur l&rsquo;Application non autorisée par la
          Société et plus généralement à tout acte volontaire de dégradation, malveillance, sabotage d&rsquo;une
          Martine ou d&rsquo;un tiers, ou détérioration due à un cas de force majeure.
        </p>
        <h3>11.3 Maintenance évolutive</h3>
        <p>
          Les Martines ne peuvent s&rsquo;opposer à une montée de version de l&rsquo;Application sauf à perdre le
          bénéfice de la Maintenance. En cas de Mise à Jour majeure de l&rsquo;Application, entendue comme
          introduisant une actualisation substantielle de ses fonctionnalités ou interfaces, la Société peut
          solliciter une nouvelle Authentification des Martines lors de leur première utilisation de
          l&rsquo;Application passé la Mise à Jour. La Société installe les Mises à Jour directement sur
          l&rsquo;Infrastructure, sans régression fonctionnelle. La Maintenance exclut toute éventuelle demande
          spécifique des Martines, toute mise à niveau de logiciels tiers ou toute compatibilité ascendante de
          l&rsquo;Application en cas d&rsquo;évolution des logiciels tiers.
        </p>
        <h3>11.4 Feedbacks</h3>
        <p>
          La Société conserve les droits de propriété, dont notamment tous les droits de propriété intellectuelle,
          les secrets d&rsquo;affaires et le savoir-faire sur toutes les Mises à Jour, modifications, améliorations
          et œuvres dérivées de l&rsquo;Application créés ou développés par la Société, y compris à partir des
          retours et feedbacks des Martines et ce sans compensation, ce que les Martines reconnaissent. Les
          Martines qui transmettent un retour à la Société lui concèdent une licence d&rsquo;utilisation non
          exclusive et irrévocable, à titre gratuit et dans le monde entier, pour la durée de protection des droits
          de propriété intellectuelle.
        </p>
      </section>

      <section id="art12" className={styles.section}>
        <h2>Article 12. Responsabilité</h2>
        <h3>12.1 Gratuité</h3>
        <p>
          L&rsquo;utilisation de l&rsquo;Application est gratuite. En cas de facturation d&rsquo;un nouveau produit
          ou service sur l&rsquo;Application, des conditions particulières comprenant les mentions obligatoires
          relatives au paiement, y compris aux délais de paiement, aux intérêts de retard et au recouvrement, vous
          seront fournies.
        </p>
        <h3>12.2 Exclusions de responsabilité</h3>
        <p>
          La Société décline et ne peut être tenue responsable (i) de toute obligation ou garantie
          d&rsquo;adéquation aux besoins, les Martines ayant pris pleine connaissance des fonctionnalités standards
          de l&rsquo;Application, (ii) de tout évènement de force majeure au sens du droit applicable, (iii) des
          Contributions envoyées grâce ou via l&rsquo;Application, dont les Martines sont seules responsables,
          notamment au regard du droit applicable à la prospection et aux communications non sollicitées, (iv) en
          cas d&rsquo;utilisation frauduleuse d&rsquo;un Compte ou d&rsquo;autres violations du droit applicable
          commises par une Martine au moyen de l&rsquo;Application, sauf si une défaillance technique est
          imputable à la Société, (v) en cas de défaillance technique de l&rsquo;Application ou de détérioration
          des Données induite par un logiciel ou service tiers avec lequel l&rsquo;Application interagit, (vi) en
          cas d&rsquo;atteinte à l&rsquo;image ou à la vie privée d&rsquo;une Martine, y compris en cas
          d&rsquo;accès ou d&rsquo;utilisation des Contributions non autorisée ou en dehors de l&rsquo;Application,
          (vii) en cas de dysfonctionnement de l&rsquo;Application induit par le fournisseur d&rsquo;accès à
          Internet des Martines, (viii) des évènements et rencontres organisés par les Martines via
          l&rsquo;Application, la Société déclinant notamment toute obligation de vérifier l&rsquo;identité des
          Martines ou la nature de l&rsquo;évènement, (ix) en cas de manquement aux conditions de licence de
          l&rsquo;article 9.3, (x) des exclusions de maintenance de l&rsquo;article 11.2, (xi) en cas de demande
          d&rsquo;interruption temporaire ou définitive, partielle ou totale, de l&rsquo;Application émanant
          d&rsquo;une autorité administrative ou judiciaire et plus généralement (xii) de tout manquement,
          négligence ou faute intentionnelle d&rsquo;une Martine ou d&rsquo;un tiers en dehors du contrôle de la
          Société.
        </p>
        <p>
          En toute hypothèse, en aucun cas la Société ne peut être tenue responsable des dommages indirects qui
          seraient subis par les Martines ou les tiers (incluant notamment perte, fuite, inexactitude ou
          corruption de Données, perte d&rsquo;exploitation, de clientèle, de prospect, perte commerciale ou
          financière, perte d&rsquo;image, manque à gagner, coût de substitution de service, etc.) consécutifs à
          l&rsquo;utilisation de l&rsquo;Application ou à la survenance d&rsquo;Anomalies, même si la Société a été
          prévenue ou pouvait raisonnablement prévoir lesdits dommages.
        </p>
        <h3>12.3 Limitation de responsabilité</h3>
        <p>
          Chacune des Parties assure sa responsabilité selon le droit commun, les Parties reconnaissant que (i) la
          responsabilité des Martines peut être engagée pour leur utilisation de l&rsquo;Application au regard du
          droit applicable, notamment en tant qu&rsquo;éditeur des Données, et (ii) la responsabilité de la Société
          ne peut être engagée qu&rsquo;en tant qu&rsquo;hébergeur et opérateur de plateforme. Toutefois, de
          convention expresse entre les Parties, la responsabilité encourue par la Société en cas de manquement à
          ses obligations prouvé par une Martine est limitée à un montant de mille euros (1.000,00&nbsp;€). La
          présente limitation est stipulée au regard des prix et redevances consentis et fait partie de
          l&rsquo;équilibre économique du Contrat. En tout état de cause, les Martines renoncent à tout recours
          contre la Société au-delà d&rsquo;une durée d&rsquo;un (1) an à compter de la survenance du fait
          générateur du dommage. Les Martines sont seules responsables des Données chargées et traitées via
          l&rsquo;Application et notamment de leur licéité et leur innocuité technique. En conséquence, les
          Martines sont responsables de tout dommage quel qu&rsquo;il soit qui serait subi par la Société et/ou son
          sous-traitant hébergeur et/ou les tiers en raison des Données chargées et/ou des actions effectuées par
          les Martines via l&rsquo;Application.
        </p>
      </section>

      <section id="art13" className={styles.section}>
        <h2>Article 13. Garantie</h2>
        <p>
          La Société garantit qu&rsquo;elle dispose des autorisations et droits de propriété intellectuelle lui
          permettant de fournir l&rsquo;Application aux Martines. En conséquence, la Société accepte de défendre et
          d&rsquo;indemniser les Martines dans les conditions du Contrat pour les dommages liés à des réclamations,
          poursuites ou condamnations, intentés par un tiers alléguant que tout ou partie de l&rsquo;Application
          contrefait un droit de propriété intellectuelle, sous réserve que les Martines concernées lui notifient
          immédiatement par écrit l&rsquo;existence de la poursuite, lui apportent leur totale coopération et ne
          transigent pas sans avoir au préalable recueilli l&rsquo;accord écrit de la Société. La présente garantie
          ne concerne que les éléments de l&rsquo;Application développés et fournis par la Société, et ne
          s&rsquo;applique pas en cas de manquement aux conditions de licence de l&rsquo;article 9.3 ou en cas
          d&rsquo;exclusion de maintenance de l&rsquo;article 11.2. En outre, cette garantie ne s&rsquo;applique pas
          aux composants open source qui seraient intégrés ou utilisés au sein de l&rsquo;Application.
        </p>
        <p>
          Dans la mesure où la Société reconnaît qu&rsquo;un composant litigieux de l&rsquo;Application est
          contrefaisant, elle pourra à son choix et à ses frais&nbsp;: (i) modifier le composant en cause de sorte
          que l&rsquo;Application ne soit plus contrefaisante ou (ii) remplacer le composant par un composant non
          contrefaisant aux fonctionnalités globalement équivalentes. À défaut, la Société pourra prononcer la
          résiliation du Contrat, sans compensation pour les Martines (la fourniture de l&rsquo;Application étant
          gratuite).
        </p>
        <p>
          La Société fournit l&rsquo;Application en l&rsquo;état et n&rsquo;accorde aucune autre garantie expresse
          ou implicite sur l&rsquo;Application. Elle ne garantit pas que l&rsquo;Application sera fournie sans
          interruption ou que les Contributions sont conformes au droit applicable, mais pallie à toute Anomalie
          via la fourniture de la Maintenance dans les conditions des présentes CGU.
        </p>
        <p>
          De leur côté, les Martines apportent à la Société la même garantie sur les Données stockées et traitées
          via l&rsquo;Application, et tiennent la Société indemne de toute réclamation ou condamnation poursuivie
          par un tiers et fondée sur ses droits de propriété intellectuelle. Cette garantie vaut en particulier
          pour les Contributions publiques qui sont publiées par les Martines sur l&rsquo;Application sous leur
          seule responsabilité. Les Martines garantissent et tiennent indemne la Société contre toute action
          émanant de tout tiers en cas de violation des conditions de modération prévues à l&rsquo;article 8 des
          présentes CGU.
        </p>
      </section>

      <section id="art14" className={styles.section}>
        <h2>Article 14. Confidentialité</h2>
        <p>
          La Société s&rsquo;assure de respecter la vie privée des Martines. Les Données, les codes sources de
          l&rsquo;Application et les éléments de l&rsquo;Infrastructure constituent pour les Parties des
          informations confidentielles. Chacune des Parties s&rsquo;oblige à (i) tenir confidentielles toutes les
          informations qu&rsquo;elle recevra de l&rsquo;autre Partie&nbsp;; (ii) ne pas divulguer les informations
          confidentielles de l&rsquo;autre Partie à un tiers quelconque&nbsp;; et (iii) n&rsquo;utiliser les
          informations confidentielles de l&rsquo;autre Partie qu&rsquo;à l&rsquo;effet d&rsquo;exécuter ses
          obligations aux termes du Contrat. L&rsquo;engagement de confidentialité d&rsquo;une Partie dure tant que
          l&rsquo;autre Partie entend maintenir ses informations confidentielles, sauf en cas de demande de
          transmission émanant d&rsquo;une autorité légale ou judiciaire.
        </p>
      </section>

      <section id="art15" className={styles.section}>
        <h2>Article 15. Données personnelles</h2>
        <p>
          Dans le cadre du présent Contrat, les Parties s&rsquo;engagent à respecter le droit applicable à la
          protection des données personnelles, et notamment le Règlement européen de protection des données
          n°2016/679 («&nbsp;RGPD&nbsp;»). Au sens du RGPD, chaque Partie est responsable du traitement des Données
          qu&rsquo;elle effectue pour ses besoins respectifs dans le cadre du Contrat. Les Martines sont
          responsables de traitement et seules bénéficiaires des traitements qu&rsquo;elles engagent et contrôlent
          sur l&rsquo;Application (la Société ayant alors la qualité de sous-traitant), tandis que la Société est
          responsable de traitement pour certains traitements dont notamment le suivi de la modération et des
          réclamations ou recours ainsi que la personnalisation des communications dans le Journal. Les traitements
          identifiés sont recensés de manière plus détaillée dans la{' '}
          <a href="/politique-de-confidentialite/">politique de confidentialité</a> de la Société.
        </p>
        <p>
          Les Parties feront leur affaire du respect des obligations qui leur incombent en application du RGPD.
          Elles s&rsquo;engagent en particulier à (i) mettre en œuvre des mesures techniques et organisationnelles
          de sécurité et de confidentialité appropriées pour assurer la protection des données personnelles au
          regard notamment des risques inhérents aux traitements et à la nature des données à protéger, (ii)
          traiter les données personnelles aux fins, à titre principal, d&rsquo;exécution du Contrat, (iii)
          s&rsquo;assurer, le cas échéant, que leur personnel et éventuels sous-traitants se conforment à ces
          obligations et respectent le RGPD&nbsp;; (iv) informer les personnes concernées des traitements
          qu&rsquo;elles réalisent et répondre à leurs demandes relatives au traitement des données personnelles
          dont elles sont respectivement responsables. La Société conserve les données personnelles au sein des
          Données pendant la durée d&rsquo;exécution du Contrat, après quoi ces données personnelles sont
          archivées séparément à titre de preuve pour la durée de la prescription en droit applicable.
        </p>
        <p>
          Toute Martine concernée par le traitement de données personnelles effectué par la Société en exécution
          du Contrat peut exercer ses droits (accès, rectification, effacement et portabilité des données,
          limitation et opposition au traitement, définir des directives relatives au sort de ses données après
          son décès), en adressant sa réclamation par mail à <a href="mailto:hello@lesmartines.app">hello@lesmartines.app</a>{' '}
          ou par courrier à l&rsquo;adresse suivante&nbsp;: Service juridique, Société Les Martines, 61 rue de Lyon,
          75012 Paris.
        </p>
      </section>

      <section id="art16" className={styles.section}>
        <h2>Article 16. Réversibilité</h2>
        <p>
          Avant la désinscription de l&rsquo;Application ou en cas de résiliation pour quelque motif que ce soit,
          la Société peut transmettre à la Martine, sur demande de cette dernière, une copie de l&rsquo;ensemble
          des Contributions et Données en format standard, pour une durée de trente (30) jours après la date
          effective de résiliation du Contrat. Cette transmission se fait sans frais et dans un délai raisonnable.
        </p>
      </section>

      <section id="art17" className={styles.section}>
        <h2>Article 17. Divers</h2>
        <p>
          17.1. Le Contrat constitue l&rsquo;intégralité de l&rsquo;accord entre les Parties relatif à
          l&rsquo;Application et annule et remplace tous documents antérieurs conclus entre elles à cet égard. La
          Société peut céder ou transférer le Contrat à tout tiers ou successeur.
        </p>
        <p>
          17.2. Dans l&rsquo;hypothèse où une ou plusieurs stipulations des présentes seraient considérées nulles,
          inapplicables ou inopposables par toute juridiction compétente, les autres stipulations des présentes
          resteront valables sauf disposition contraire de ladite juridiction. Le cas échéant, une clause
          litigieuse sera supprimée et remplacée par une clause licite conforme à l&rsquo;intention initiale des
          Parties.
        </p>
        <p>
          17.3. En cas de force majeure, les obligations des Parties seront suspendues pendant la durée de cette
          cause. De façon expresse, sont considérés comme cas de force majeure ceux habituellement retenus par la
          jurisprudence des cours et tribunaux français.
        </p>
        <p>
          17.4. La Société assure, en sa qualité d&rsquo;employeur, la gestion administrative, comptable et sociale
          de ses salariés qui restent en toutes circonstances sous son autorité hiérarchique et disciplinaire. Les
          collaborateurs de la Société affectés à l&rsquo;exécution du Contrat demeurent sous la responsabilité
          entière et exclusive de la Société, seule habilitée à leur adresser des directives.
        </p>
        <p>
          17.5. Le fait pour l&rsquo;une des Parties de ne pas se prévaloir d&rsquo;un engagement par l&rsquo;autre
          Partie à l&rsquo;une quelconque des obligations visées par les présentes, ne saurait être interprété pour
          l&rsquo;avenir comme une renonciation à l&rsquo;obligation en cause.
        </p>
        <p>
          17.6. En cas de litige, la Société pourra valablement administrer la preuve des actions des Martines, ou
          encore d&rsquo;un accès frauduleux par un tiers, à l&rsquo;aide des logs de connexion et de transmission
          relevés par la Société qui seuls feront foi, notamment en ce qui concerne la date, la nature et le
          contenu des Données, Contributions, Signalements, traitements et Anomalies, ce que les Martines
          reconnaissent.
        </p>
        <p>
          17.7. La Société peut sous-traiter tout ou partie de l&rsquo;Application, notamment à son sous-traitant
          hébergeur, mais demeure responsable de l&rsquo;ensemble des prestations sous-traitées par ses soins.
        </p>
        <p>
          17.8. En fonction notamment des technologies auxquelles elle recourt dans le cadre de l&rsquo;Application,
          la Société se réserve le droit de modifier à tout moment et sans préavis la teneur des présentes CGU. En
          cas de modification substantielle du Service, les Martines doivent procéder à [phrase incomplète dans le
          texte source — à compléter].
        </p>
      </section>

      <section id="art18" className={styles.section}>
        <h2>Article 18. Droit applicable et juridiction compétente</h2>
        <p>
          Les CGU sont soumises au droit français. Tout litige en relation avec le service ou relatif à la
          formation, la validité, l&rsquo;interprétation ou l&rsquo;exécution des CGU fait l&rsquo;objet
          d&rsquo;une négociation amiable d&rsquo;une durée minimale de trente (30) jours à compter de la première
          notification du différend. Après cette démarche préalable écrite, les Martines peuvent saisir un
          médiateur de la consommation compétent. La Société informe les Martines de l&rsquo;existence de la
          plateforme «&nbsp;Online Dispute Resolution&nbsp;» de l&rsquo;Union européenne. Si une Martine souhaite
          introduire sa demande de règlement extrajudiciaire de litige en ligne, elle peut le faire via{' '}
          <a href="http://ec.europa.eu/odr" target="_blank" rel="noopener noreferrer">
            ec.europa.eu/odr
          </a>
          . Cette plateforme facilite le règlement du litige en ligne et met la Martine en contact avec
          l&rsquo;entité qualifiée compétente. À défaut de réussite de la négociation ou de la médiation, les
          Parties soumettent le litige à la compétence exclusive du tribunal compétent de Paris.
        </p>
      </section>

    </LegalPage>
  )
}
