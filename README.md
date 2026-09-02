# Site Les Martines

Nouveau site vitrine, en React (Vite + TypeScript + [vite-react-ssg](https://github.com/userquin/vite-react-ssg)
pour générer du HTML statique par page, indispensable pour le SEO et pour être lu par les
crawlers IA type GPTBot/PerplexityBot/ClaudeBot).

## Démarrer

```bash
npm install
npm run dev       # serveur de dev local
npm run build     # génère le site statique dans dist/
npm run preview   # prévisualise le build de prod
```

> **Important** : `npm install` doit être lancé depuis un Terminal normal sur ta machine, pas
> depuis Claude. La session Cowork n'a pas d'accès aux registres de paquets (npm/pip bloqués
> par la politique réseau de l'organisation), donc tout ce projet a été écrit à la main sans
> jamais pouvoir exécuter `npm install` ni `npm run dev` moi-même. Tout le code a été relu
> attentivement, mais un premier `npm install` + `npm run dev` de ton côté (ou de Rebeca) pour
> vérifier que ça tourne bien est une bonne idée avant d'aller plus loin.

## Ce qui est fait

- Page d'accueil complète : nav, hero, 5 feature cards, bloc valeurs, avis, partenaires, CTA final, footer.
- Pages `/mentions-legales/`, `/conditions-generales-dutilisation/`, `/politique-de-confidentialite/`.
- SEO technique : une page = un titre + une meta description, données structurées schema.org
  (Organization + MobileApplication), `robots.txt` qui autorise explicitement les crawlers IA,
  `sitemap.xml`, `llms.txt` (résumé texte pour les IA).
- Animations légères : CSS pour l'essentiel, [Motion](https://motion.dev) en LazyMotion pour les
  apparitions au scroll (~15ko), respecte `prefers-reduced-motion`.
- Visuels Figma exportés (hero, 5 illustrations des feature cards, logos partenaires, badges
  stores, presse).
- Polices : Gazpacho Black (`src/assets/fonts/`, `@font-face` dans `src/styles/global.css`) pour
  les titres, Inter (Google Fonts, chargée dans `index.html`) pour le texte courant en
  remplacement de Graphik (payante, jamais fournie).
- Vrais avis (`src/components/Avis.tsx`, 27/08/2026), vrai chiffre d'avis 4,8/5 · 450+ arrondi
  depuis 439 notes réelles (28/08/2026), vrais liens App Store / Google Play
  (`src/components/StoreButtons.tsx`, 30/08/2026), vrais comptes réseaux sociaux
  (`src/components/Footer.tsx`, 29/08/2026).

## Ce qu'il reste à faire

1. **Vérifier le contenu de la carte 5** ("Map'Tine, pour trouver ses Martines") : son texte
   parle de modération et de zéro jugement, ce qui ressemble à un copier-coller de l'ancienne
   carte "safe place" plutôt qu'une vraie description de la Map'Tine. Vu avec Marine le
   27/08/2026, en attente d'un texte définitif.
2. Pages pas encore construites (affichées en "Bientôt" dans la nav et le footer) : Events, Le
   Martine Mag, What the FAQ.
3. **Compo mobile du Hero** (`src/components/Hero.tsx`, `.mobilePhones` sous 640px) : version
   temporaire codée le 30/08/2026 (3 écrans d'appli en éventail, agrandis à la main) en
   attendant que Marine refasse une vraie compo mobile côté Figma. À remplacer quand elle sera
   prête — voir le commentaire dans Hero.tsx pour le détail du pourquoi.

## Stack

- Vite + React 18 + TypeScript
- vite-react-ssg (rendu statique par page)
- CSS Modules (pas de Tailwind, pas de framework CSS)
- Motion (LazyMotion) pour les animations
