import { useHead } from '../lib/useHead'
import LegalPage from '../components/LegalPage'
import styles from './PolitiqueConfidentialite.module.css'

// Contenu repris du texte envoyé par Marine (29/08/2026, collé depuis lesmartines.app),
// quasi mot pour mot, même ton "fun et bienveillant" que Mentions Légales. Quelques
// coquilles évidentes de la version source corrigées silencieusement (fautes de frappe /
// mots coupés type "Applicatio" -> "Application", "légalese" -> "légales", en-tête du
// tableau final "Finalités" -> "Rectification" qui ne collait pas avec l'ordre des droits
// décrits juste au-dessus) — à repasser en revue si besoin. Le tableau "Destinataires /
// Finalités" (section 3) s'était retrouvé collé sous la section 7 dans le copier-coller de
// Marine ; remis à sa place logique ici. Pas de mini-footer "Mentions légales / CGU / Nous
// contacter" repris en bas de page : le site a déjà un Footer global avec ces liens.
const SECTIONS = [
  { id: 'donnees', label: 'Quelles données ?' },
  { id: 'pourquoi', label: 'Pourquoi on les utilise' },
  { id: 'qui-consulte', label: 'Qui peut les consulter' },
  { id: 'hors-eee', label: "Hors de l'UE" },
  { id: 'securite', label: 'Comment on les protège' },
  { id: 'duree', label: 'Durée de conservation' },
  { id: 'droits', label: 'Tes droits' },
  { id: 'maj', label: 'Mise à jour' },
]

export default function PolitiqueConfidentialite() {
  useHead({
    title: 'Politique de confidentialité',
    description: 'Comment Les Martines traite tes données personnelles et comment exercer tes droits.',
    path: '/politique-de-confidentialite/',
  })

  return (
    <LegalPage
      title="Politique de confidentialité"
      subtitle="Comment on traite tes données personnelles, et comment garder la main dessus."
      updated="26 janvier 2024"
      sections={SECTIONS}
    >
      <p className={styles.intro}>BIENVENUE CHEZ LES MARTINES&nbsp;! 🌟</p>
      <p className={styles.intro}>
        L&rsquo;application mobile Les Martines (ci-après l&rsquo;Appli), éditée avec amour par la société Les
        Martines (ci-après Les Martines), est bien plus qu&rsquo;un simple réseau social. C&rsquo;est un espace
        chaleureux où tu partages, échanges et célèbres autour de différentes thématiques.
      </p>
      <p className={styles.intro}>
        En utilisant cette Appli, tu seras amené à partager des données personnelles avec Les Martines. Pas
        d&rsquo;inquiétude, tes données sont entre de bonnes mains&nbsp;! 🤗 Les Martines, en tant que gardienne de
        tes précieuses informations, a mis en place des mesures de sécurité pour s&rsquo;assurer que tout reste
        confidentiel.
      </p>
      <p className={styles.intro}>
        Afin de t&rsquo;assurer une expérience extraordinaire, prends quelques instants pour découvrir notre
        politique détaillée. Elle t&rsquo;explique comment Les Martines utilisent tes données personnelles et
        comment tu peux exercer tes droits pour rester le maître de ton expérience. Cette politique s&rsquo;harmonise
        parfaitement avec nos Conditions Générales d&rsquo;Utilisation, ainsi qu&rsquo;avec tout autre document
        renvoyant à notre politique.
      </p>
      <p className={styles.intro}>
        Si jamais tu as la moindre question, n&rsquo;hésite pas à nous contacter directement en envoyant un email
        plein de bonne humeur à l&rsquo;adresse suivante&nbsp;:{' '}
        <a href="mailto:hello@lesmartines.app">hello@lesmartines.app</a>. Restons connectés et partageons
        ensemble le bonheur d&rsquo;être une Martine&nbsp;! 🌈💬
      </p>

      <section id="donnees" className={styles.section}>
        <h2>1. Les Martines&nbsp;: quelles données personnelles sont à l&rsquo;honneur&nbsp;?</h2>
        <p>Toutes les données que vous saisissez sur l&rsquo;Application ou lorsque vous communiquez avec Les Martines, à savoir&nbsp;:</p>
        <p>
          On a des données obligatoire et d&rsquo;autres qui sont plutôt du genre «&nbsp;si tu veux&nbsp;» pour
          profiter pleinement de tous les super services que notre Application propose. Quand une info est
          incontournable, on te le fait savoir bien fort dès la collecte des données. Et ouais, si tu fais la timide
          et que tu refuses de nous dire ces infos cruciales, ben on pourra pas s&rsquo;occuper de tes demande
          (genre créer un compte ou te mettre en contact).
        </p>
        <p>
          Ah, et au fait, l&rsquo;Application a ses petits détectives automatiques (c&rsquo;est nos cookies et
          autres traceurs) qui attrapent certaines infos en filature, tu vois&nbsp;? 🕵️‍♀️ Mais t&rsquo;inquiète,
          c&rsquo;est juste pour rendre tout encore plus génial. Voilà ce qu&rsquo;ils choppent en douce via ces
          petits gadgets magiques&nbsp;:
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Catégories de données</th>
                <th>Exemples de données</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Données d&rsquo;identification</td>
                <td>Prénom, date de naissance, photographie</td>
              </tr>
              <tr>
                <td>Coordonnées</td>
                <td>Adresse email</td>
              </tr>
              <tr>
                <td>Données relatives à votre profil</td>
                <td>
                  Pseudonyme, date d&rsquo;inscription, présentation, statut du profil (public ou privé), inscription
                  à un abonnement Premium, sujets d&rsquo;intérêts, abonnements et abonnés
                </td>
              </tr>
              <tr>
                <td>Données relatives à vos contributions sur l&rsquo;Application</td>
                <td>
                  Date, heure et contenu des publications, interactions avec les publications des autres
                  utilisatrices, date, heure et contenu des messages privés envoyés à d&rsquo;autres utilisatrices
                  (en conformité avec le secret des correspondances), inscriptions à des groupes
                </td>
              </tr>
              <tr>
                <td>Données relatives à votre participation à une opération promotionnelle</td>
                <td>
                  Date de l&rsquo;événement, objet de l&rsquo;événement, informations fournies dans le cadre de
                  votre participation à l&rsquo;événement, lot gagné le cas échéant
                </td>
              </tr>
              <tr>
                <td>Données relatives à vos interactions avec Les Martines</td>
                <td>
                  Date, objet et contenu de vos demandes d&rsquo;information / réclamations, échanges avec les
                  services de Les Martines
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Catégories de données</th>
                <th>Exemples de données</th>
                <th>Finalités</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Données d&rsquo;identification</td>
                <td>Prénom, date de naissance, photographie</td>
                <td>
                  Ces données sont nécessaires au bon fonctionnement technique de l&rsquo;Application et de ses
                  services, ainsi qu&rsquo;à des fins analytiques, publicitaires et de réseaux sociaux. Pour plus
                  d&rsquo;informations, tu peux te rendre dans la rubrique «&nbsp;Réglages&nbsp;» (sous-section
                  «&nbsp;Gérer mes consentements&nbsp;») accessible directement depuis l&rsquo;Application.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="pourquoi" className={styles.section}>
        <h2>2. Pourquoi Les Martines utilise tes données personnelles&nbsp;?</h2>
        <p>Les Martines traite tes données personnelles uniquement pour les raisons suivantes&nbsp;:</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Finalités</th>
                <th>Exemples d&rsquo;utilisation de tes données personnelles</th>
                <th>Fondements juridiques</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Création et gestion de ton compte</td>
                <td>
                  <ul>
                    <li>pour créer ton compte</li>
                    <li>pour te permettre de t&rsquo;authentifier sur l&rsquo;Appli</li>
                    <li>pour te permettre d&rsquo;accéder à tous les services</li>
                    <li>pour te permettre de mettre à jour ton compte</li>
                  </ul>
                </td>
                <td>Exécution des CGU</td>
              </tr>
              <tr>
                <td>Fourniture des services proposés sur l&rsquo;Application</td>
                <td>
                  <ul>
                    <li>
                      pour te permettre d&rsquo;échanger avec les autres utilisatrices (publications, inscriptions à
                      des groupes, messages privés, etc.)
                    </li>
                    <li>
                      pour te proposer des contenus personnalisés sur l&rsquo;Application (ex&nbsp;: publications des
                      autres utilisatrices, groupes, thématiques, sujets, etc.) adaptés aux thématiques choisies
                    </li>
                    <li>pour traiter tes demandes de contact / réclamations</li>
                  </ul>
                </td>
                <td>Exécution des CGU</td>
              </tr>
              <tr>
                <td>Gestion de la modération des publications</td>
                <td>
                  <ul>
                    <li>
                      pour mettre en place un dispositif de signalement des publications ou profil d&rsquo;une
                      personne litigieuses par les utilisatrices
                    </li>
                    <li>pour vérifier les publications signalées et les supprimer le cas échéant</li>
                    <li>pour sanctionner toute violation identifiée</li>
                  </ul>
                </td>
                <td>Obligations légales s&rsquo;imposant à Les Martines en tant qu&rsquo;éditeur de l&rsquo;Application</td>
              </tr>
              <tr>
                <td>
                  Organisation d&rsquo;opérations promotionnelles (jeu concours, loterie, cadeaux, événements, etc.)
                  accessibles depuis l&rsquo;opération
                </td>
                <td>
                  <ul>
                    <li>pour te permettre de participer aux opérations promotionnelles organisées par Les Martines ou ses partenaires</li>
                  </ul>
                </td>
                <td>
                  Intérêt légitime commercial (fidélisation) de Les Martines à proposer à ses utilisatrices de
                  participer à des opérations promotionnelles de ses partenaires
                </td>
              </tr>
              <tr>
                <td>Prospection commerciale par voie électronique</td>
                <td>
                  <ul>
                    <li>pour te permettre de participer aux opérations promotionnelles organisées par Les Martines ou ses partenaires</li>
                    <li>
                      pour t&rsquo;envoyer les bons plans de nos partenaires susceptibles de t&rsquo;intéresser
                      compte tenu notamment des thématiques que tu as choisies
                    </li>
                  </ul>
                </td>
                <td>Ton consentement</td>
              </tr>
              <tr>
                <td>
                  Amélioration de l&rsquo;Application et de ses services, ainsi que de ton expérience utilisateur sur
                  l&rsquo;Application
                </td>
                <td>
                  <ul>
                    <li>pour évaluer et améliorer l&rsquo;Application et ses services</li>
                    <li>pour faciliter ta navigation sur l&rsquo;Application</li>
                    <li>pour garantir ta sécurité sur l&rsquo;Application</li>
                    <li>pour recueillir et prendre en compte tes avis sur l&rsquo;Application et ses services via des questionnaires de satisfaction optionnels</li>
                    <li>
                      pour réaliser des analyses d&rsquo;audience et élaborer des statistiques depuis les
                      informations fournies sur l&rsquo;Application via des outils internes permettant notamment de
                      rechercher la volumétrie des mentions d&rsquo;un sujet, d&rsquo;un produit ou d&rsquo;une
                      marque sur l&rsquo;Application
                    </li>
                  </ul>
                </td>
                <td>
                  Intérêt légitime de Les Martines à améliorer l&rsquo;Application et ses services, ainsi que ton
                  expérience utilisateur sur l&rsquo;Application
                </td>
              </tr>
              <tr>
                <td>Gestion d&rsquo;un précontentieux ou d&rsquo;un contentieux</td>
                <td>
                  <ul>
                    <li>pour sanctionner toute violation identifiée</li>
                    <li>pour gérer tout différend ou litige</li>
                  </ul>
                </td>
                <td>Intérêt légitime de Les Martines à défendre ses droits et intérêts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="qui-consulte" className={styles.section}>
        <h2>3. Qui peut consulter tes données personnelles&nbsp;?</h2>
        <p>
          Pendant que tu te balades sur le Site et que tu profites de ses services, tes données personnelles
          pourraient être partagées avec les personnes suivantes&nbsp;:
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Destinataires</th>
                <th>Finalités</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Les Martines et son personnel autorisé</td>
                <td>
                  Pour assurer la gestion administrative, opérationnelle et commerciale de l&rsquo;Appli et de ses
                  services, conformément aux détails de la section 2 de cette politique.
                </td>
              </tr>
              <tr>
                <td>Autres utilisateurs de l&rsquo;Application</td>
                <td>
                  Uniquement s&rsquo;agissant des informations publiques par défaut ou rendues publiques par toi
                  (informations publiques sur ton profil, tes publications, tes interactions, tes inscriptions à des
                  groupes, les messages que tu envoies à d&rsquo;autres utilisatrices)
                </td>
              </tr>
              <tr>
                <td>Partenaires de Les Martines</td>
                <td>
                  À des fins de gestion des opérations promotionnelles organisées par les partenaires de Les
                  Martines ou d&rsquo;envoi de leurs bons plans par voie électronique
                </td>
              </tr>
              <tr>
                <td>Sous-traitants de Les Martines (hébergeur, prestataire de maintenance informatique, etc.)</td>
                <td>À des fins exclusivement techniques ou logistiques relatives à la gestion de l&rsquo;Application et de ses services</td>
              </tr>
              <tr>
                <td>Autorités administratives ou judiciaires</td>
                <td>
                  Uniquement dans l&rsquo;hypothèse d&rsquo;une demande expresse et motivée de leur part ou en cas
                  d&rsquo;infraction avérée à des dispositions légales ou réglementaires
                </td>
              </tr>
              <tr>
                <td>Conseils externes</td>
                <td>Uniquement dans le cadre de la gestion d&rsquo;éventuels différends et d&rsquo;autres sujets juridiques le cas échéant</td>
              </tr>
              <tr>
                <td>Autres tiers</td>
                <td>
                  En cas de restructuration, reconstitution, acquisition, financement par emprunt, fusion, vente
                  d&rsquo;actifs des Martines, ou toute transaction similaire, ainsi qu&rsquo;en situation
                  d&rsquo;insolvabilité, faillite ou mise sous séquestre, où des données personnelles sont
                  transférées à un ou plusieurs tiers en tant qu&rsquo;actifs des Martines.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="hors-eee" className={styles.section}>
        <h2>4. Est-ce que tes données personnelles sont envoyées en dehors de l&rsquo;Espace Économique Européen&nbsp;?</h2>
        <p>
          Dans la mesure du possible, on prend soin de traiter tes données au sein de l&rsquo;Espace Économique
          Européen (EEE). Cependant, comme certains des prestataires de service des Martines vivent dans des pays en
          dehors de l&rsquo;EEE, il se pourrait que tes données fassent un petit tour là-bas. Si on décide de faire
          des trucs avec des prestataires hors de l&rsquo;EEE, et qu&rsquo;on doit partager tes données, on te
          mettra au courant dès que tu t&rsquo;inscris à l&rsquo;événement. 🌍
        </p>
      </section>

      <section id="securite" className={styles.section}>
        <h2>5. Comment on prend soin de tes données personnelles chez Les Martines&nbsp;?</h2>
        <p>
          Chez Les Martines, on prend soin de tes données personnelles avec des mesures techniques et
          organisationnelles. On veut éviter tout problème comme la destruction, la perte, l&rsquo;altération ou un
          accès non autorisé. Ces précautions garantissent un niveau de sécurité adapté à la situation, en tenant
          compte de ce qu&rsquo;on sait, des coûts et du type de données.
        </p>
        <p>
          On t&rsquo;assure également que notre équipe respecte toutes les règles et procédures internes concernant
          le traitement des données personnelles. On vérifie régulièrement nos pratiques pour garder la
          confidentialité de tes infos et s&rsquo;assurer que tout le monde suit bien nos règles.
        </p>
        <p>
          Si tu découvres une vulnérabilité ou si tu veux signaler un incident de sécurité, n&rsquo;hésite pas à
          nous envoyer un email à <a href="mailto:hello@lesmartines.app">hello@lesmartines.app</a>.
        </p>
      </section>

      <section id="duree" className={styles.section}>
        <h2>6. Pendant combien de temps on garde tes infos chez Les Martines&nbsp;?</h2>
        <p>
          En général, on ne garde tes données personnelles que le temps qu&rsquo;il faut pour réaliser ce
          qu&rsquo;on avait prévu, ou pour respecter les règles légales.
        </p>
        <p>Sauf dans quelques situations sympas&nbsp;:</p>
        <ul className={styles.checkList}>
          <li>✅ Données liées à ton compte (publications, interactions)&nbsp;: conservées jusqu&rsquo;à ce que tu les supprimes ou que tu sois inactif(ve) pendant deux (2) ans.</li>
          <li>✅ Infos récupérées lors de ton inscription à la newsletter Les Martines&nbsp;: conservées jusqu&rsquo;à ce que tu te désinscrives de la liste de diffusion.</li>
          <li>✅ Données collectées lors d&rsquo;une opération promo&nbsp;: conservées jusqu&rsquo;à la fin de l&rsquo;opération.</li>
          <li>✅ Données issues de tes demandes de contact ou réclamations&nbsp;: conservées jusqu&rsquo;à ce qu&rsquo;on ait tout bien géré.</li>
          <li>✅ Résultats des enquêtes de satisfaction facultatives&nbsp;: conservés jusqu&rsquo;à ce qu&rsquo;on puisse en faire quelque chose de chouette.</li>
        </ul>
        <p>Une fois ces délais passés, on continue à prendre soin de tes données pendant&nbsp;:</p>
        <ul className={styles.checkList}>
          <li>✅ Deux (2) ans après notre dernier échange avec toi pour les données qu&rsquo;on garde pour te proposer des trucs cools&nbsp;;</li>
          <li>✅ Cinq (5) ans après la suppression de ton compte pour les données qu&rsquo;on garde juste au cas où&nbsp;;</li>
          <li>✅ Dix (10) ans après la fin de l&rsquo;exercice comptable pour les données qu&rsquo;on conserve pour garder les comptes en ordre, surtout si tu as pris un abonnement Premium sur l&rsquo;Appli.</li>
        </ul>
        <p>Et pour les cookies et traceurs sur l&rsquo;Appli&nbsp;:</p>
        <ul className={styles.checkList}>
          <li>✅ Les petites infos qu&rsquo;on collecte grâce à ces cookies et traceurs peuvent rester avec nous pendant vingt-cinq (25) ans au maximum.</li>
          <li>✅ Mais en général, on ne les garde pas plus de treize (13) mois.</li>
        </ul>
      </section>

      <section id="droits" className={styles.section}>
        <h2>7. Quels sont tes droits sur tes données personnelles&nbsp;?</h2>
        <p>En accord avec les lois sur la protection des données personnelles, voici les droits dont tu disposes sur tes données personnelles&nbsp;:</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Vos droits</th>
                <th>Étendue de vos droits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Droit d&rsquo;accès</td>
                <td>
                  <ul>
                    <li>La confirmation que Les Martines traitent tes données personnelles ou non</li>
                    <li>
                      Des informations claires, transparentes et compréhensibles sur la manière dont Les Martines
                      utilisent tes données personnelles, ainsi que sur tes droits (comme indiqué dans la présente
                      politique)
                    </li>
                    <li>Une copie de tes données personnelles.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Droit de rectification</td>
                <td>
                  Tu as le droit de demander la rectification de tes données personnelles, te permettant
                  d&rsquo;obtenir la modification de celles-ci si elles sont obsolètes, inexactes ou incomplètes.
                </td>
              </tr>
              <tr>
                <td>Droit à l&rsquo;effacement</td>
                <td>
                  Tu as le droit de demander à ce qu&rsquo;on efface toutes tes données personnelles (ou le droit à
                  l&rsquo;oubli), surtout quand l&rsquo;une de ces raisons s&rsquo;applique&nbsp;:
                  <ul>
                    <li>
                      Tu t&rsquo;opposes au traitement de tes données et il n&rsquo;y a pas de raison vraiment
                      nécessaire qui justifie qu&rsquo;on continue à les triturer (genre si Les Martines doit garder
                      certains documents avec tes infos)&nbsp;;
                    </li>
                    <li>Tu dis non à toutes ces pubs commerciales qui t&rsquo;embêtent&nbsp;;</li>
                    <li>Tu décides de retirer ton feu vert (ton consentement) pour qu&rsquo;on utilise tes infos&nbsp;;</li>
                    <li>
                      Quand tes données ne servent plus à rien pour ce pourquoi elles ont été prises au début, ou
                      pour un autre type de traitement&nbsp;;
                    </li>
                    <li>Si ce qu&rsquo;on fait avec tes données ne colle pas avec les lois en vigueur.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Droit à la limitation</td>
                <td>
                  T&rsquo;as le droit de demander à ce qu&rsquo;on freine un peu le traitement de tes données,
                  surtout quand&nbsp;:
                  <ul>
                    <li>
                      Tu te bats pour que tes infos soient exactes, histoire que Les Martines puisse checker si tout
                      est en ordre&nbsp;;
                    </li>
                    <li>
                      Si le traitement de tes données est un peu louche, et plutôt que de demander qu&rsquo;on les
                      supprime, tu préfères qu&rsquo;on se calme un peu sur leur utilisation&nbsp;;
                    </li>
                    <li>
                      Si Les Martines n&rsquo;a plus vraiment besoin de tes infos pour les traiter, mais
                      qu&rsquo;elles sont quand même utiles pour que tu puisses faire valoir tes droits en
                      justice&nbsp;;
                    </li>
                    <li>
                      Si tu dis non au traitement (parce que t&rsquo;as ce droit-là), pendant le temps qu&rsquo;on
                      vérifie si les raisons de Les Martines sont plus valables que les tiennes.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Droit à la portabilité</td>
                <td>
                  T&rsquo;as le droit de demander à emmener avec toi tes données personnelles, dans un format
                  informatique bien ordonné et qui se lit facilement, et même de les faire passer à un autre si
                  c&rsquo;est techniquement possible. Mais attention, ce droit a ses règles et ne marche pas à tous
                  les coups. Il faut que&nbsp;:
                  <ul>
                    <li>Ça concerne seulement tes infos personnelles, pas les trucs anonymes ou les données des autres&nbsp;;</li>
                    <li>Ça ne viole pas les droits et libertés de Les Martines ou des autres (surtout pas les droits de propriété intellectuelle)&nbsp;;</li>
                    <li>Ça touche aux infos persos qui sont traitées de façon automatique (donc pas les trucs sur papier)&nbsp;;</li>
                    <li>
                      Le traitement de ces infos est basé sur ton accord ou la réalisation d&rsquo;un contrat avec
                      Les Martines (pour vérifier, tu peux aller voir à la section 2 de cette politique).
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Droit d&rsquo;opposition</td>
                <td>
                  T&rsquo;as le droit de dire non au traitement de tes infos persos, surtout quand ça se base sur
                  l&rsquo;intérêt légitime de Les Martines. Du coup, Les Martines arrête de les triturer, à moins
                  qu&rsquo;il y ait des raisons vraiment importantes qui sont plus cruciales que tes droits,
                  intérêts et libertés (genre respecter une loi ou se battre pour un droit en justice).
                </td>
              </tr>
              <tr>
                <td>Droit au retrait du consentement</td>
                <td>
                  Tu as le droit de retirer ton accord quand Les Martines l&rsquo;a obtenu, mais ça ne change rien à
                  la légitimité du traitement déjà fait avant.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>On dit bien que tu peux exercer ces droits en fonction de la base légale du traitement, comme c&rsquo;est expliqué dans le tableau ci-dessous&nbsp;:</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Fondement juridique</th>
                <th>Accès</th>
                <th>Rectification</th>
                <th>Effacement</th>
                <th>Limitation</th>
                <th>Portabilité</th>
                <th>Opposition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Consentement</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Retrait du consentement</td>
              </tr>
              <tr>
                <td>Mesures précontractuelles</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Non</td>
              </tr>
              <tr>
                <td>Contrat</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Non</td>
              </tr>
              <tr>
                <td>Intérêt légitime</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Non</td>
                <td>Oui</td>
              </tr>
              <tr>
                <td>Obligations légales</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Non</td>
                <td>Oui</td>
                <td>Non</td>
                <td>Non</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          En tant que résidente française, tu as aussi le droit de définir des instructions, soit générales soit
          spécifiques, concernant tes données perso en cas de décès (comme leur suppression ou leur transmission à
          qui tu veux). Et tu peux changer d&rsquo;avis quand tu veux.
        </p>
        <p>
          Dans certaines situations, Les Martines pourrait te demander des infos spécifiques pour confirmer qui tu
          es, et s&rsquo;assurer que c&rsquo;est bien toi qui demandes ces droits. C&rsquo;est une autre mesure de
          sécurité pour être sûr que tes données perso ne finissent pas chez la mauvaise personne.
        </p>
        <p>
          Si tu as des questions ou que tu veux exercer tes droits, tu peux directement nous contacter en envoyant
          un email à&nbsp;: <a href="mailto:hello@lesmartines.app">hello@lesmartines.app</a>. Tu peux aussi
          contacter la déléguée à la protection des données de Les Martines en envoyant un email à&nbsp;:{' '}
          <a href="mailto:martine@lesmartines.app">martine@lesmartines.app</a>.
        </p>
        <p>
          Si jamais tu as un souci et que tu veux déposer une réclamation, tu peux le faire auprès de la Commission
          Nationale Informatique et Libertés (CNIL) sur leur site internet ou par courrier à l&rsquo;adresse
          suivante&nbsp;: 3, place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07. Tu peux exercer ce droit à tout
          moment sans frais, sauf si tu dois payer pour envoyer une lettre, et les éventuels frais si tu te fais
          aider par quelqu&rsquo;un d&rsquo;autre.
        </p>
      </section>

      <section id="maj" className={styles.section}>
        <h2>8. Mise à jour de la présente politique de confidentialité</h2>
        <p>
          Notre politique de confidentialité est datée avec précision, et de temps en temps, Les Martines peut la
          modifier pour la rendre encore meilleure, surtout si nos services sur l&rsquo;Appli évoluent ou si les
          règles changent. Donc, on te recommande de jeter un coup d&rsquo;œil à cette politique chaque fois que tu
          viens sur l&rsquo;Appli, histoire de rester dans la boucle&nbsp;! 😊
        </p>
        <p>À très bientôt&nbsp;! 🚀✨</p>
      </section>

    </LegalPage>
  )
}
