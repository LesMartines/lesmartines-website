import puissante from '../assets/partenaires/puissante.png'
import siSiLaPaillette from '../assets/partenaires/si-si-la-paillette.webp'
import minaStorm from '../assets/partenaires/mina-storm.png'
import boku from '../assets/partenaires/boku.png'
import boucheBee from '../assets/partenaires/bouche-bee.png'
import maholi from '../assets/partenaires/maholi.png'
import womanizer from '../assets/partenaires/womanizer.png'
import beauteInee from '../assets/partenaires/beaute-inee.png'
import mouchéParis from '../assets/partenaires/mouche-paris.png'
import wure from '../assets/partenaires/wure.png'
import gourgandine from '../assets/partenaires/gourgandine.png'
import guidly from '../assets/partenaires/guidly.png'
import osco from '../assets/partenaires/osco.png'
import elia from '../assets/partenaires/elia.png'
import bonneDose from '../assets/partenaires/bonne-dose.png'
import weVibe from '../assets/partenaires/we-vibe.png'
import ageParis from '../assets/partenaires/age-paris.png'
import sisterFeel from '../assets/partenaires/sister-feel.png'
import maisonBrava from '../assets/partenaires/maison-brava.png'
import pomponne from '../assets/partenaires/pomponne.png'
import lessIsMore from '../assets/partenaires/less-is-more.png'
import anara from '../assets/partenaires/anara.png'
import rejouis from '../assets/partenaires/rejouis.png'
import floconRebel from '../assets/partenaires/flocon-rebel.png'
import feny from '../assets/partenaires/feny.png'
import tiaraInfusions from '../assets/partenaires/tiara-infusions.webp'
import elsee from '../assets/partenaires/elsee.png'
import flatte from '../assets/partenaires/flatte.png'
import jho from '../assets/partenaires/jho.png'
import reusses from '../assets/partenaires/reusses.png'

export interface Partenaire {
  name: string
  href?: string
  logo: string
  description?: string
}

// Vrais logos (31/08/2026, fournis directement par Marine en fichiers carrés, remplacent
// le 1er lot récupéré le même jour depuis lesmartines.app/nos-partenaires — bannières
// 768x498 avec beaucoup de vide, moins lisibles une fois réduites en grille). F'Latté,
// Jho et Reusses sont nouveaux dans ce lot (absents de la page /nos-partenaires) : pas de
// lien ni de description connus pour l'instant.
// Descriptions reprises telles quelles de la page /nos-partenaires du site en prod
// (01/09/2026, "fais la page partenaire en t'inspirant de cette page") : centralisées ici
// pour être utilisées à la fois par le bandeau défilant de l'accueil (Partenaires.tsx,
// qui n'utilise que logo/name/href) et par la page dédiée /partenaires/ (qui affiche tout).
export const PARTENAIRES: Partenaire[] = [
  {
    name: 'Puissante',
    href: 'https://puissante.co/',
    logo: puissante,
    description: 'La marque française qui libère le plaisir féminin, audacieuse, sensuelle et sans tabou.',
  },
  {
    name: 'Si Si La Paillette',
    href: 'https://sisilapaillette.fr/',
    logo: siSiLaPaillette,
    description:
      "Les paillettes éthiques qui font danser ta peau et pas les océans ! Biodégradables, véganes et pleines d'amour pour la planète.",
  },
  {
    name: 'Mina Storm',
    href: 'https://minastorm.com',
    logo: minaStorm,
    description:
      'Marque française de lingerie éthique qui invite chaque femme à se sentir forte, libre et désirable dans son corps.',
  },
  {
    name: 'BOKU',
    href: 'https://www.helloboku.com/',
    logo: boku,
    description: 'Transforme ton trône en spa pour fessiers : sans travaux, sans électricité, juste un jet parfait.',
  },
  {
    name: 'Bouche Bée',
    href: 'https://bouchebeelove.com/',
    logo: boucheBee,
    description:
      'La marque française qui fait rimer plaisir avec design. Des sextoys beaux, des lubrifiants clean, et zéro gêne à se faire du bien.',
  },
  {
    name: 'Maholi',
    href: 'https://maholi.fr/',
    logo: maholi,
    description: 'La cryothérapie qui fait du bien là où ça fait mal. Poches de froid périnéales fabriquées en France.',
  },
  {
    name: 'Womanizer',
    href: 'https://www.womanizer.com/',
    logo: womanizer,
    description: "Le sextoy qui a mis tout le monde d'accord : zéro frottement, et une montée d'adrénaline digne d'un feu d'artifice.",
  },
  {
    name: 'Beauté INÉE',
    href: 'https://beauteinee.fr/lp',
    logo: beauteInee,
    description: 'Transforme le soin de la peau en expérience ultra-connectée : diagnostic pro, routine sur-mesure & suivi intelligent.',
  },
  {
    name: 'Mouché Paris',
    href: 'https://mouche-paris.com/',
    logo: mouchéParis,
    description: 'Réinvente le mouchoir en tissu zéro jetable, 100% chic. Coton GOTS ultra-doux, pochette stylée.',
  },
  {
    name: 'Wuré',
    href: 'https://www.wurecosmetics.com/',
    logo: wure,
    description: 'Marque française de maquillage-soin minimaliste, pensée pour sublimer les peaux mates à foncées.',
  },
  {
    name: 'Gourgandine Bougies',
    href: 'https://gourgandinebougies.com',
    logo: gourgandine,
    description: 'Des bougies artisanales made in France qui libèrent un message caché quand la cire fond.',
  },
  {
    name: 'Guidly',
    href: 'https://guidly.fr/',
    logo: guidly,
    description: "Le compagnon de voyage IA qui réinvente la découverte : des audioguides personnalisés, générés selon tes centres d'intérêt.",
  },
  {
    name: 'OSCO',
    href: 'https://www.oscodrinks.com/',
    logo: osco,
    description: 'Des apéritifs et pétillants sans alcool bio qui sentent bon le Sud : 0,0% alcool et 100% plaisir.',
  },
  {
    name: 'Elia',
    href: 'https://www.elia-lingerie.com/collections/notre-collection-de-lingerie-menstruelle',
    logo: elia,
    description: "La lingerie menstruelle qui fait rimer éco-responsable avec désirable.",
  },
  {
    name: 'Bonne Dose',
    href: 'https://www.bonnedose.co',
    logo: bonneDose,
    description: "L'hydratation pensée pour les femmes : des sticks vitaminés, naturels et made in France.",
  },
  {
    name: 'We-Vibe',
    href: 'https://www.we-vibe.com',
    logo: weVibe,
    description: 'Conçoit des sextoys innovants et puissants, pensés pour sublimer le plaisir des femmes en solo ou à deux.',
  },
  {
    name: 'ÂGE Paris',
    href: 'https://ageparis.fr/',
    logo: ageParis,
    description: 'Deux amies qui transforment des vêtements existants en pièces exclusives. Une mode artisanale, durable et française.',
  },
  {
    name: 'Sister Feel',
    href: 'https://sisterfeel.fr/',
    logo: sisterFeel,
    description: "Transforme l'intime en self-care : des kits naturels, beaux et réconfortants.",
  },
  {
    name: 'Maison Brava',
    href: 'https://maisonbrava.com',
    logo: maisonBrava,
    description: 'Marque française de soins naturels développés pour répondre aux besoins de la peau adulte.',
  },
  {
    name: 'Pomponne',
    href: 'https://www.pomponne-makeup.com/',
    logo: pomponne,
    description: 'Makeup-soin clean et vegan : des produits naturels qui subliment les visages tout en prenant soin de leur peau.',
  },
  {
    name: 'Less is More',
    href: 'https://lessismore.co/',
    logo: lessIsMore,
    description: 'Réinvente la salle de bain avec des soins lavants en poudre à diluer chez soi.',
  },
  {
    name: 'Anara',
    href: 'https://www.anara-care.com/',
    logo: anara,
    description: 'Soins naturels pensés pour accompagner les femmes dès 40 ans face aux symptômes de la préménopause et de la ménopause.',
  },
  {
    name: 'Rejouis',
    href: 'https://rejouis.fr/',
    logo: rejouis,
    description: 'La première boutique française de jouets intimes reconditionnés : un plaisir plus durable, inclusif et accessible.',
  },
  {
    name: 'Flocon Rebel',
    href: 'https://floconrebel.fr',
    logo: floconRebel,
    description: 'Des overnight oats bio, riches en fibres et protéines, sans sucres ajoutés.',
  },
  {
    name: 'Feny',
    href: 'https://boutique-feny.com/',
    logo: feny,
    description: 'Des lavabos Montessori mobiles pour enfants de 18 mois à 8 ans, pour encourager l’autonomie et l’hygiène par le jeu.',
  },
  {
    name: 'Tiara Infusions',
    href: 'https://tiarainfusions.fr/',
    logo: tiaraInfusions,
    description: 'Des infusions à base de plantes, pensées pour accompagner les petits déséquilibres du quotidien féminin.',
  },
  {
    name: 'Elsee',
    href: 'https://www.elsee.care/',
    logo: elsee,
    description: "1ère solution pensée pour faciliter l'accès à la santé et au bien-être des femmes.",
  },
  {
    name: "F'Latté",
    href: 'https://f-latte.com/',
    logo: flatte,
    description: "Le soutien-gorge d'allaitement absorbant anti-fuite de lait, pour vivre l'allaitement plus sereinement.",
  },
  {
    name: 'Jho',
    href: 'https://www.jho.fr/',
    logo: jho,
    description:
      'Tampons bio, culottes menstruelles et protections en coton bio, marque française et engagée : 1 achat = 1 don à des associations qui soutiennent les femmes en précarité.',
  },
  {
    name: 'Reusses',
    href: 'https://reusses.com/',
    logo: reusses,
    description:
      'Confie tes vêtements à une Reusse près de chez toi : elle trie, met en vente et te reverse jusqu’à 70% des ventes. Vendre sans rien faire, ça existe.',
  },
]
