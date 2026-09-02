# CommentInputBar — Papotage

Composant de saisie de commentaire pour l'app Papotage. 5 états visuels, une state machine à 4 valeurs, expansion multiline automatique, gestion média (image et GIF).

> Corrections appliquées suite à review du 2026-09-01 : voir les notes marquées **[Correction]**.

## Design Tokens

### Pill

```
width:            100% - 2x marginHorizontal (9px each side)
height:           48px (min, expand with multiline)
borderRadius:     24
borderWidth:      1
backgroundColor:  #FFFFFF
```

### Border

```
idle:     #DADAFF
focused:  #6066D8
```

### Text

```
placeholder (default):        "Balance ton com..."
placeholder (media attached): "Ajoute un commentaire..."
placeholderColor:             #9395AE
inputColor:                   #2E2E38
fontFamily:                   Graphik-Regular
fontSize:                     15
```

**[Correction]** Le placeholder change de valeur en State 4 (média attaché). Les deux variantes sont listées ici explicitement au lieu d'une seule valeur générique.

### Icons (Photo + GIF)

```
color:        #6066D8
size:         24x24
touchTarget:  36x36
```

### Send button

```
size:             36x36
borderRadius:     18
background:       linear-gradient(135deg, #CEA0BC, #6066D8)
icon:             arrow, 18x18, #FFFFFF
opacity idle:     0.5   (text empty, no media)
opacity active:   1.0   (text or media)
```

**[Correction]** Angle du gradient précisé (135deg) ; à ajuster si le design final diffère, mais une direction doit être fixée pour que Photo/GIF picker et implémentation matchent le rendu attendu.

Le bouton doit être **fonctionnellement** désactivé (pas seulement visuellement à `opacity: 0.5`) dans tous les états où `!hasContent` (texte vide ET pas de média), pas uniquement en State 1. Concrètement : `disabled={!hasContent || state === 'submitting'}` et `pointerEvents: hasContent ? 'auto' : 'none'` doivent suivre `hasContent` dans tous les états, pas être codés en dur uniquement pour State 1.

### Thumbnail (image ou GIF)

```
size:          60x60
borderRadius:  8
objectFit:     cover
```

### Remove tag

```
size:          18x18
borderRadius:  9
background:    #2E2E38
icon:          X, #FFFFFF
position:      top-right, offset -6,-6 par rapport au thumbnail
```

### Spacing

```
pill paddingHorizontal:      6 (left), 6 (right)
gap icons <-> separator:     4
gap separator <-> textInput: 8
separator:                   vertical line, 20px height, #DADAFF
thumbnail marginBottom:      8   (entre thumbnail et pill)
thumbnail marginLeft:        9   (aligné sur le bord gauche du pill)
thumbnail marginTop:         12
```

**[Correction]** `thumbnail marginLeft` passe de `12` à `9` pour s'aligner sur le `marginHorizontal` du pill (9px), au lieu d'une valeur arbitraire qui désalignait visuellement le thumbnail par rapport au pill en dessous.

---

## State Machine

```ts
type InputState = 'idle' | 'focused' | 'media_attached' | 'submitting';

// mode determines which idle variant to show
type InputMode = 'default' | 'media';
```

**[Correction — note d'implémentation]** `InputState` a 4 valeurs, mais l'état `idle` recouvre deux rendus visuels différents : un idle "vierge" (pas de texte) et un idle "post-blur avec texte préservé" (voir *Blur avec texte non-vide*, State 3). Ces deux rendus ne sont **pas** distingués par `InputState` seul : l'implémentation doit dériver un flag supplémentaire, par exemple `const hasPreservedText = state === 'idle' && inputText.length > 0`, pour savoir si les icônes Photo/GIF doivent réapparaître (mode media) ou rester masquées tant qu'un texte est présent. Sans ce flag, le risque est que les icônes clignotent en réapparaissant à chaque blur alors qu'un texte reste affiché.

**[Correction — clarification mode/média]** Les transitions vers `media_attached` (`onPickImage`, `onPickGif`) restent valides même en `mode='default'`, où les icônes Photo/GIF ne sont pas affichées dans l'UI du composant. Cela suppose qu'un média peut être attaché par un canal externe au composant (ex: partage depuis une autre app, drag&drop). Si ce n'est pas un cas d'usage réel pour Papotage, restreindre ces transitions à `mode='media'` uniquement et le documenter.

### Transitions

```
idle            + onFocus                          --> focused
focused         + onBlur (text empty, no media)    --> idle
focused         + onBlur (text not empty)          --> idle (keep text, visual only)
focused         + onPickImage                       --> media_attached
focused         + onPickGif                         --> media_attached
idle            + onPickImage                       --> media_attached
idle            + onPickGif                         --> media_attached
media_attached  + onRemoveMedia                     --> focused
media_attached  + onBlur                            --> media_attached (bordure visuelle idle #DADAFF, thumbnail et texte préservés, texte optionnel)
media_attached  + onSubmit                          --> submitting
focused         + onSubmit                          --> submitting
submitting      + onSuccess                         --> idle (reset all)
submitting      + onError (media attaché)           --> media_attached (restore text + media, show toast)
submitting      + onError (pas de média)            --> focused (restore text, show toast)
```

**[Correction]** Ajout de la transition manquante `media_attached + onBlur`, qui n'était pas décrite. Comportement retenu par analogie avec le blur de State 3 : le média et le texte restent affichés, seule la bordure repasse visuellement en idle (`#DADAFF`), le state logique reste `media_attached`.

**[Correction]** La transition `submitting + onError` est désormais scindée en deux lignes pour matcher le comportement réel du code (`setState(attachedMedia ? 'media_attached' : 'focused')`), qui ne renvoyait pas systématiquement vers `focused` comme l'affirmait la version précédente de la table.

---

## STATE 1 — DEFAULT (`idle`, `mode=default`)

Champ de saisie simple. Aucune icône visible.

### Layout

```
[Pill: borderColor=#DADAFF]
  [TextInput placeholder="Balance ton com..."]
  [SendButton opacity=0.5 disabled]
```

### Comportement

* Tap sur le pill → focus, transition vers STATE 3
* SendButton disabled (`opacity 0.5`, `pointerEvents: none`)
* Pas d'icônes Photo/GIF

### Quand l'afficher

* Contexte où les médias ne sont pas disponibles
* Écran où seul le texte est autorisé

---

## STATE 2 — DEFAULT + MÉDIAS (`idle`, `mode=media`)

Même chose que STATE 1 mais avec les icônes Photo et GIF.

### Layout

```
[Pill: borderColor=#DADAFF]
  [TouchableOpacity > Icon/Photos 24x24 #6066D8]
  [TouchableOpacity > Icon/Gif 24x24 #6066D8]
  [Separator: vertical line 20px #DADAFF]
  [TextInput placeholder="Balance ton com..."]
  [SendButton opacity=0.5 disabled]
```

### Comportement

* Tap Photo → ouvre image picker
* Tap GIF → ouvre GIF picker
* Tap sur le TextInput → focus, transition vers STATE 3
* Les icônes sont dans un frame `inner-actions` à gauche du separator

---

## STATE 3 — FOCUSED / TYPING

L'utilisatrice tape son commentaire. Bordure violette, icônes masquées.

### Layout

```
[Pill: borderColor=#6066D8 borderWidth=1]
  [inner-actions: HIDDEN]
  [TextInput value={text} color=#2E2E38]
  [SendButton opacity={text.length > 0 ? 1.0 : 0.5}]
```

### Comportement

* Bordure passe de `#DADAFF` à `#6066D8` (animation spring)
* Icônes Photo/GIF masquées (`visible: false`) pour laisser toute la largeur au texte
* SendButton s'active (`opacity 1.0`, fonctionnellement cliquable) dès qu'il y a du texte ; désactivé (`opacity 0.5`, non cliquable) tant que le texte est vide
* Tap Send → STATE 5 (submitting)

### Multiline (comportement automatique, pas un état séparé)

* `multiline={true}`
* `maxHeight: 120` (environ 5 lignes)
* Le pill grandit en hauteur automatiquement
* Au-delà de `maxHeight` : scroll interne
* Le `borderRadius` reste 24 même en multiline

```ts
// Multiline auto-expand
const inputHeight = Math.min(
  Math.max(48, contentHeight),
  120 // maxHeight ~5 lines
);
```

### Blur (perte de focus)

* Si text vide et pas de média → retour à STATE 1 ou 2 (selon `mode`)
* Si text non-vide → visuellement retour à idle (bordure `#DADAFF`) MAIS le texte reste affiché. Re-tap → retour en focused avec le texte. Les icônes Photo/GIF (`mode=media`) ne réapparaissent volontairement PAS tant que du texte est présent (voir note sur `hasPreservedText` plus haut), pour éviter un flash visuel disgracieux.

---

## STATE 4 — IMAGE / GIF ATTACHMENT

Un média (image ou GIF) est attaché au commentaire. Miniature au-dessus du pill.

### Layout

```
[Container]
  [ThumbnailWrap: position=relative]
    [Image 60x60 borderRadius=8 objectFit=cover]
    [RemoveTag 18x18 position=absolute top=-6 right=-6]
      [X icon #FFFFFF sur fond #2E2E38 borderRadius=9]
  [Pill: borderColor=#6066D8 marginTop=8]
    [inner-actions: HIDDEN]
    [TextInput value={text} placeholder="Ajoute un commentaire..."]
    [SendButton opacity=1.0]
```

### Comportement

* La miniature s'affiche au-dessus du pill, alignée sur le bord gauche du pill (`marginLeft: 9`, voir Spacing)
* GIF et image ont le même rendu 60x60
* Tap sur RemoveTag → supprime le média, transition vers STATE 3 (focused)
* SendButton actif (`opacity 1.0`) car il y a un média
* Le texte est optionnel (on peut envoyer juste le média)
* Le pill reste en mode focused (bordure `#6066D8`) tant que l'input a le focus ; passe visuellement en idle (`#DADAFF`) sur blur sans changer de state logique (voir transition `media_attached + onBlur`)

### Remplacement de média

* Si l'utilisatrice sélectionne un nouveau média alors qu'il y en a déjà un, remplacer directement
* Afficher un feedback léger (animation de swap sur la miniature)

### Validation du média (où et quand)

**[Correction]** La validation (taille, format) a lieu **dans le composant**, immédiatement après réception de la valeur retournée par `onPickImage` / `onPickGif`, avant tout `setAttachedMedia`. Ni `onPickImage` ni `onPickGif` ne doivent faire cette validation eux-mêmes (ils ne connaissent pas `maxMediaSizeMB`, qui est une prop du composant) :

```ts
const handleMediaPicked = (asset: MediaAsset | null) => {
  if (!asset) return;

  const sizeMB = (asset.fileSize ?? 0) / (1024 * 1024);
  if (asset.fileSize != null && sizeMB > maxMediaSizeMB) {
    Toast.show(`Fichier trop lourd (max ${maxMediaSizeMB} MB)`);
    return;
  }
  if (!['image', 'gif'].includes(asset.type)) {
    Toast.show('Format non supporté');
    return;
  }

  setAttachedMedia(asset);
  setState('media_attached');
};
```

Si le chargement de l'aperçu échoue après coup (`<Image onError>`), afficher « Impossible de charger le média » et revenir à l'état précédent sans média attaché.

---

## STATE 5 — SUBMITTING

Envoi du commentaire en cours. Input verrouillé.

### Layout

```
[Pill: borderColor=#DADAFF]
  [inner-actions: HIDDEN]
  [Text "Envoi en cours..." color=#9395AE]
  [SendButton opacity=0.4 disabled]
    [LoadingSpinner 16x16 #FFFFFF strokeWidth=2]
```

### Comportement

* TextInput devient non-editable (`editable={false}`)
* SendButton désactivé, `opacity 0.4`, flèche remplacée par un spinner
* Bordure revient à idle (`#DADAFF`)
* Aucune interaction possible pendant l'envoi

### Succès

* Reset complet : `text=""`, `media=null`, `state --> idle`
* Animation de reset (pill shrink + fade du contenu)

### Erreur

* Retour à l'état précédent (`focused` si pas de média, `media_attached` si un média était attaché — voir table de transition corrigée ci-dessus) avec texte et média préservés
* Toast d'erreur au niveau app : « Impossible d'envoyer le commentaire. Réessaye. »
* L'utilisatrice peut re-tenter immédiatement

```ts
const SUBMIT_TIMEOUT_MS = 15000;

const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms)
    ),
  ]);

const handleSubmit = async () => {
  if (state === 'submitting') return;
  if (!hasContent) return; // guard fonctionnel, pas seulement visuel

  setState('submitting');

  try {
    await withTimeout(
      onSubmit({
        text: inputText,
        media: attachedMedia
          ? {
              type: attachedMedia.type, // 'image' | 'gif'
              uri: attachedMedia.uri,
              width: attachedMedia.width,
              height: attachedMedia.height,
            }
          : null,
      }),
      SUBMIT_TIMEOUT_MS
    );

    // Success: reset
    setState('idle');
    setInputText('');
    setAttachedMedia(null);
    Keyboard.dismiss();
  } catch (error) {
    // Error (y compris timeout): restore previous state
    setState(attachedMedia ? 'media_attached' : 'focused');
    Toast.show("Impossible d'envoyer le commentaire. Réessaye.");
  }
};
```

**[Correction]** Ajout de `withTimeout` : la version précédente promettait un timeout de 15s dans les edge cases sans qu'aucun mécanisme ne l'implémente dans `handleSubmit`. Comme `onSubmit` est fourni par le parent et peut ne jamais résoudre en cas de perte de connexion, le composant doit posséder son propre timeout via `Promise.race` plutôt que de dépendre du parent pour ça.

**[Correction]** Ajout du guard `if (!hasContent) return;` en début de fonction, pour que le blocage du Send soit fonctionnel et pas seulement visuel (opacité), cohérent avec la correction du bouton Send plus haut.

---

## Props inutilisées à câbler (`disabled`, `autoFocus`)

**[Correction]** Ces deux props existaient dans `CommentInputBarProps` sans qu'aucun comportement ne soit décrit. Comportement retenu :

* `disabled={true}` (prop du composant, distincte du state interne) : le pill entier passe en rendu "grisé" équivalent visuellement à State 5 (bordure `#DADAFF`, `opacity` réduite sur le texte et les icônes), `TextInput` non-éditable, icônes Photo/GIF non tappables, SendButton désactivé — quel que soit le state interne. Utile par exemple si le parent sait que l'utilisatrice n'a pas les droits de commenter (post verrouillé, modération).
* `autoFocus={true}` : au montage du composant, déclenche `onFocus` automatiquement (transition `idle --> focused`) et ouvre le clavier, comme un tap manuel sur le pill.

---

## Micro-animations

Toutes les animations utilisent react-native-reanimated v3 avec des spring configs.

```ts
// Spring config pour les transitions d'état
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
  mass: 0.8,
};

// Spring config pour le bouton Send
const SEND_SPRING = {
  damping: 15,
  stiffness: 400,
  mass: 0.5,
};
```

### Border color (idle ↔ focused)

```ts
const borderColor = useAnimatedStyle(() => ({
  borderColor: interpolateColor(
    focusProgress.value,
    [0, 1],
    ['#DADAFF', '#6066D8']
  ),
}));

// Sur focus:
focusProgress.value = withSpring(1, SPRING_CONFIG);

// Sur blur:
focusProgress.value = withSpring(0, SPRING_CONFIG);
```

### Send button opacity

```ts
const sendOpacity = useAnimatedStyle(() => ({
  opacity: withSpring(hasContent.value ? 1.0 : 0.5, SEND_SPRING),
}));
```

### Send button press (scale bounce)

```ts
const onSendPressIn = () => {
  sendScale.value = withSpring(0.85, SEND_SPRING);
};

const onSendPressOut = () => {
  sendScale.value = withSpring(1, SEND_SPRING);
};
```

### Thumbnail appear (media attach)

```ts
// Quand un média est attaché
thumbnailScale.value = 0;
thumbnailOpacity.value = 0;

thumbnailScale.value = withSpring(1, SPRING_CONFIG);
thumbnailOpacity.value = withTiming(1, { duration: 200 });
```

### Thumbnail remove

```ts
// Quand on tap X
thumbnailScale.value = withSpring(0.8, SPRING_CONFIG);
thumbnailOpacity.value = withTiming(0, { duration: 150 });

// callback après animation:
runOnJS(removeMedia)();
```

### Multiline pill expand

```ts
const pillHeight = useAnimatedStyle(() => ({
  height: withSpring(
    Math.min(Math.max(48, contentHeight.value), 120),
    { damping: 25, stiffness: 200 }
  ),
}));
```

### Icons hide/show (mode media → focused)

```ts
// Largeur de inner-actions = 2 x touchTarget (36) + gap icônes (4)
// = 36 + 4 + 36 = 76, PUIS le gap separator<->textInput (8) est géré
// séparément par le layout du separator, pas inclus dans ce chiffre.
const INNER_ACTIONS_WIDTH = 76;

const iconsStyle = useAnimatedStyle(() => ({
  opacity: withTiming(showIcons.value ? 1 : 0, { duration: 150 }),
  width: withSpring(showIcons.value ? INNER_ACTIONS_WIDTH : 0, SPRING_CONFIG),
}));

// inner-actions: overflow hidden, animated width + opacity
```

**[Correction]** La valeur `76` n'était pas justifiée dans la version précédente. Elle est maintenant explicitée comme `2 × touchTarget(36) + gap(4)`, basée sur les touch targets (pas les icônes visuelles de 24px), et nommée en constante pour que l'implémentation et le design token restent synchronisés si l'un des deux change.

### Submit spinner rotation

```ts
const spinRotation = useSharedValue(0);

useEffect(() => {
  if (state === 'submitting') {
    spinRotation.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1, // infinite
      false
    );
  } else {
    cancelAnimation(spinRotation);
    spinRotation.value = 0;
  }
}, [state]);
```

### Reset après envoi (success)

```ts
// Fade out du contenu
contentOpacity.value = withTiming(0, { duration: 150 }, () => {
  // Reset les valeurs
  runOnJS(resetAll)();
  // Fade in du placeholder
  contentOpacity.value = withTiming(1, { duration: 200 });
});
```

---

## Props du composant

```ts
interface CommentInputBarProps {
  mode: 'default' | 'media';
  placeholder?: string;
  onSubmit: (payload: {
    text: string;
    media: {
      type: 'image' | 'gif';
      uri: string;
      width: number;
      height: number;
    } | null;
  }) => Promise<void>;
  onPickImage?: () => Promise<MediaAsset | null>;
  onPickGif?: () => Promise<MediaAsset | null>;
  maxTextLength?: number;  // default 500
  maxMediaSizeMB?: number; // default 10
  autoFocus?: boolean;     // voir section "Props inutilisées à câbler"
  disabled?: boolean;      // voir section "Props inutilisées à câbler"
}

interface MediaAsset {
  type: 'image' | 'gif';
  uri: string;
  width: number;
  height: number;
  fileSize?: number;
}
```

---

## Accessibilité

```tsx
// Pill container
accessibilityRole="none"
accessibilityLabel="Champ de commentaire"

// TextInput
accessibilityRole="textbox"
accessibilityLabel="Écrire un commentaire"
accessibilityHint="Tape ton message puis appuie sur Envoyer"

// Send button
accessibilityRole="button"
accessibilityLabel={
  state === 'submitting'
    ? "Envoi en cours"
    : hasContent
      ? "Envoyer le commentaire"
      : "Envoyer (désactivé)"
}
accessibilityState={{ disabled: !hasContent || state === 'submitting', busy: state === 'submitting' }}

// Photo icon
accessibilityRole="button"
accessibilityLabel="Joindre une photo"

// GIF icon
accessibilityRole="button"
accessibilityLabel="Joindre un GIF"

// Remove tag
accessibilityRole="button"
accessibilityLabel="Supprimer le média joint"

// Thumbnail
accessibilityRole="image"
accessibilityLabel={`Aperçu ${media.type === 'gif' ? 'GIF' : 'image'} joint`}

// State 5 : annonce pour lecteur d'écran
accessibilityLiveRegion="polite" // sur le Text "Envoi en cours..."
```

**[Correction]** `accessibilityRole` du pill container passe de `"search"` (probable copier-coller, incorrect pour un champ de commentaire) à `"none"` (le rôle pertinent est porté par le `TextInput` enfant).

**[Correction]** Le label du Send button gère désormais explicitement l'état `submitting`, qui manquait — sans ça un lecteur d'écran continuait d'annoncer "Envoyer le commentaire" pendant l'envoi. `accessibilityState.busy` ajouté pour le même état.

**[Correction]** Ajout de `accessibilityLiveRegion="polite"` sur le texte "Envoi en cours..." de State 5, pour que le changement d'état soit annoncé automatiquement (rien ne le prévoyait auparavant).

---

## Edge Cases

### Texte très long

* `maxLength=500` sur le TextInput
* Afficher un compteur discret à partir de 450 caractères (optionnel)
* Au-delà de 5 lignes (~120px) : scroll interne, le pill ne grandit plus

### Média invalide

* Fichier trop lourd (> `maxMediaSizeMB`) : toast « Fichier trop lourd (max 10 MB) »
* Format non supporté : toast « Format non supporté »
* Erreur de chargement : toast « Impossible de charger le média »
* Dans tous les cas : ne pas attacher le média, rester dans l'état courant
* Voir la section *Validation du média* (STATE 4) pour l'implémentation

### Perte de connexion pendant submit

* Timeout après 15 secondes (voir `withTimeout` dans STATE 5)
* Retour à l'état précédent avec toast d'erreur
* Le texte et le média sont préservés

### Clavier

* Le composant doit utiliser `KeyboardAvoidingView` ou équivalent
* iOS : `behavior="padding"`
* Android : `windowSoftInputMode="adjustResize"` dans `AndroidManifest`

### Double tap Send

* Guard : `if (state === 'submitting') return;`
* Guard : `if (!hasContent) return;`
* Le bouton est désactivé visuellement ET fonctionnellement

### Rotation écran

* Le pill est en `width: 100%` (moins les margins)
* Le thumbnail reste 60x60 fixe
* Le multiline `maxHeight` reste 120

### Blur avec texte non-vide

* Visuellement retour à idle (bordure `#DADAFF`)
* MAIS le texte tapé reste visible dans le champ
* Re-focus → bordure repasse en `#6066D8`, curseur repositionné
* Les icônes Photo/GIF (`mode=media`) restent masquées tant que le texte est présent (voir `hasPreservedText`)
