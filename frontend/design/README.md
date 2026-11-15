Dotboard est le design system d'un dashboard d'affichage utilisé au toucher, sans clavier, sur Surface Pro. Esprit Nothing et CMF : épuré, géométrique, léger. Il se réutilise tel quel sur plusieurs projets perso.

## Principes

- Un élément, un bloc : chaque information vit dans sa propre carte, avec sa zone de travail et sa zone de distinction.
- Noir, blanc et gris d'abord : pas de dégradés, pas d'effets décoratifs. Les blocs se distinguent par des aplats de gris (`surface-0` à `surface-3`), jamais par des bordures marquées. La seule ombre est `shadow-raised`, sous la modale.
- Tout se manipule au doigt : aucune interaction ne dépend du survol, du clavier ni d'un champ de saisie.
- La signature visuelle est le dot matrix : police `Ndot57` pour les titres et les chiffres clés, polices Nothing `NType82` et `NType82Mono` pour le texte et les libellés, icônes construites sur une grille de points.

## Couleurs

- Neutres : `surface-0` pour la page, `surface-1` pour les cartes et modales, `surface-2` pour les boutons secondaires et les zones encastrées, `surface-3` pour les points éteints et les séparations. Le thème clair ne contient aucun blanc pur.
- Texte : `ink` pour le texte principal, `ink-muted` pour les libellés et légendes. Pas d'autre gris pour le texte.
- Un seul accent, le cyan franc `sig-cyan` (#00A6D6). `accent` est un alias de `sig-cyan` : c'est la couleur du petit carré de repère quand aucun `tone` n'est précisé.
- Couleurs de signal : `sig-cyan` (#00A6D6, aussi l'accent), `sig-orange` (#FF5F1F), `sig-blue` (#15A3C7), `sig-yellow` (#F5C71A), plus le rouge `danger`. Ce sont les touches vives du système : le reste de l'écran reste en gris sobre. Donne une couleur à chaque menu ou catégorie et garde-la partout (par exemple ENERGIE toujours orange, LUMIERES toujours jaune). Pour colorer un menu, pose `tone` sur un `Button` ou une `DisplayCard`, ou la classe `db-tone-orange` (etc.) sur un conteneur : les carrés qu'il contient prennent la couleur.
- Le texte reste `ink` : n'écris pas en couleur. Si tu dois colorer un texte ou une icône (rare), utilise la version `-ink` de la couleur (`sig-orange-ink`…), qui tient 4,5:1 sur `surface-0` à `surface-2`. `sig-cyan` et `sig-blue` sont presque identiques : n'affecte pas ces deux couleurs à deux menus voisins.
- Dosage : quelques touches par écran, un seul carré de couleur par élément. Une couleur ne sert jamais de fond de carte, de bouton ou de page.
- Règle d'or : la couleur n'est qu'une petite touche, jamais un aplat. Le blanc, le noir et le gris portent tout l'écran ; aucune carte, aucun bouton et aucun fond de page n'est rempli d'une couleur. La couleur sert à cinq choses : un point ou un carré d'alerte, une étiquette de catégorie (`Tag`), un petit carré devant un libellé de menu ou de carte, un séparateur (`Divider`), un contour fin de 2 px (alerte). Un élément coloré ne dépasse pas 24 px de côté, contours exclus.
- `danger` est le rouge Nothing, gardé volontairement : il sert uniquement aux alertes, en point, en carré ou en contour de 2 px, jamais en fond de carte. Rouge en texte : `danger-ink`. Une alerte porte toujours un mot (« ALERTE ») ou l'icône `alert`, jamais la couleur seule. `warning` suit la même règle avec `warning-ink`.
- Thèmes : le clair est le thème principal, le sombre est son jumeau avec les mêmes noms de tokens. Pose `data-theme="dark"` sur un conteneur pour le basculer ; n'écris jamais de couleur en dur.
- Contraste : les paires texte/fond documentées dans les notes des tokens tiennent 4,5:1 dans les deux thèmes ; l'anneau de focus (`focus`) tient 3:1. `danger-ink` et `warning-ink` ne se posent pas sur `surface-3`.

## Typographie

- Titres et chiffres clés : famille `display` (`Ndot57`, dot matrix Nothing), styles `display-xl` (72), `display-lg` (48) et `display-md` (32). Libellés en capitales : famille `mono` (`NType82Mono`), style `label-mono` (15). Ce sont les seules tailles, toujours en graisse 400. La famille `caps` (`Ndot57Caps`) est disponible pour un titre en capitales.
- Texte courant : famille `sans` (`NType82`, police de texte Nothing), styles `text-lg`, `text` et `text-sm`. Le corps de texte tablette est `text` (18 px) ; `text-sm` (15 px) est le minimum.
- Les polices Nothing n'ont qu'une graisse (400) : n'utilise ni gras ni demi-gras. Écris les libellés en majuscules (« ENERGIE », « TEMPERATURE ») et vérifie les glyphes accentués dans `Ndot57` avant de les employer.
- Exemple : une valeur de carte s'écrit `21.4` en `display-lg`, son unité `°C` en `text-sm` à côté, sa légende « +0,6 °C depuis ce matin » en `text-sm` `ink-muted`.

## Formes et surfaces

- Géométrie nette, coins légèrement adoucis : `radius-md` (8 px) pour boutons et cartes, `radius-lg` (12 px) pour les modales, `radius-sm` (4 px) pour les pastilles, `radius-dot` pour les points. Jamais de pilule.
- Espacements sur une échelle de 4 px : `space-1` à `space-8`. Padding de carte : `space-5`. Écart entre cartes : `space-5`. Padding de modale : `space-6`.
- Les cartes et les boutons restent plats ; seule la modale porte l'ombre neutre `shadow-raised`. Pas de contour décoratif : la séparation entre deux blocs voisins vient d'une différence de nuance de gris, ou d'un `Divider`.

## Inspiration : le dos du Nothing Phone (3) blanc

- Le disque de points : la Glyph Matrix ronde, noire sur fond blanc, est la forme signature. Utilise `GlyphMatrix` pour les jauges (batterie, charge, niveau) et écris toujours la valeur en chiffres à côté.
- Les trois colonnes : le dos est organisé en trois colonnes décalées, avec des éléments qui ne sont pas parfaitement alignés. Compose les écrans larges avec `db-grid--tri` (3 colonnes) et fais occuper deux rangées à une carte (`gridRow: span 2`) pour casser la régularité, comme les caméras du Phone (3).
- Le fond en points : applique `db-dotfield` à un fond d'écran pour la texture de points discrète, en `surface-3` sur `surface-0`. Une seule texture, jamais sous du texte long.
- Le blanc cassé mat : le thème clair reste en gris pâle chaud (`surface-0`, `surface-1`), jamais blanc pur.
- Un seul point rouge : comme le pixel rouge du Nothing, le rouge `danger` reste rare et minuscule, sauf alerte.
- Écran de référence : `ScreenTri`.
- Écran de référence : Surface Pro à 1440 × 960 px CSS (2880 × 1920 à 200 %), en paysage. Ajuste si ton affichage diffère.

## Tactile

- Toute zone tactile fait au moins `touch-min` (44 px) de côté ; vise `touch-comfort` (56 px) pour les boutons principaux et la fermeture de modale. Laisse au moins `space-4` entre deux zones tactiles.
- Aucun état ne dépend du survol. Quatre états tactiles, toujours visibles :
  - repos : aplat de la variante ;
  - pressé (`:active`, ou `pressed` pour la documentation) : aplat `surface-3` et contour noir de 2 px ;
  - actif ou sélectionné (`active`) : contour noir de 2 px et petit carré de couleur devant le libellé, sans changer le fond ;
  - focus : contour plein de 3 px en `focus`, décalé de 2 px.
- Un bouton désactivé reste lisible mais n'a plus de réaction.

## Icônes

- Les pictogrammes sont des matrices de 7 × 7 points rendues par le composant `Icon`, en une seule encre (`currentColor`) : ils prennent la couleur du texte qui les entoure.
- Taille minimale : 24 px. Utilise 24 px dans un bouton, 32 px dans une carte, 48 px en affichage seul. Ne les réduis pas : le détail se perd.
- Reste sur des formes simples. Pour ajouter une icône, dessine-la en 7 × 7 points dans `bundle.js` et vérifie qu'elle reste lisible à 24 px.
- La bibliothèque est présentée dans le composant `Icon` (24 icônes : home, grid, clock, calendar, sun, moon, bolt, wifi, battery, thermometer, drop, check, close, plus, minus, arrow-up, arrow-down, arrow-right, bell, gear, play, pause, alert, chart).

## Composants

- `Button` : action au toucher. Une variante `primary` (noire) au plus par écran ; `secondary` par défaut ; `ghost` pour les actions discrètes ; `danger` (contour rouge fin) pour les actions destructrices. `active` et `tone` pour un menu : contour noir et carré de couleur.
- `DisplayCard` : carte d'affichage d'une mesure. Ouvre une `Modal` de détail quand on la touche.
- `Modal` : modale de détail ouverte au toucher sur une carte, fermée par le bouton de fermeture ou un toucher sur le voile.
- `Icon` : pictogramme dot matrix.
- `GlyphMatrix` : disque de points qui s'allument de bas en haut selon un niveau de 0 à 100.
- `Tag` : étiquette de catégorie, petit carré de couleur et un mot sur un aplat gris. Non tactile.
- `Divider` : séparateur, ligne fine précédée d'un petit carré de couleur.
- Pas de champ de saisie ni de clavier dans ce système.

## Écrans de référence

- `ScreenOverview` (clair), `ScreenDetail` (clair, modale ouverte) et `ScreenNight` (sombre) montrent l'ensemble en situation. `ScreenTri` montre la composition en trois colonnes inspirée du dos du Phone (3). `SignalColors` montre les cinq couleurs de signal en petites touches (carrés, étiquettes, séparateurs, alerte), en clair et en sombre.
- Compose un écran avec la grille `db-grid` (4 colonnes, écart `space-5`) : une carte occupe une colonne, une carte large deux (`db-span-2`).

## Utiliser le système

Charge `components/bundle.css` (qui importe les polices Google `Silkscreen` et `DM Sans`) puis `components/bundle.js`, qui expose `window.Dotboard`. Le système attend React 18 dans la page et les tokens compilés (`tokens.css`).
