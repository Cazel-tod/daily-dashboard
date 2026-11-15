# Design system Dotboard

Dotboard est le design system du dashboard : usage tactile sur Surface Pro (sans clavier, sans souris), esprit Nothing/CMF — sobre, noir/blanc/gris, géométrique.

Sources : `frontend/design/` (README, `tokens.css`, `bundle.css`, `bundle.js` — ce dernier est en React, à ne jamais importer dans l'app, seulement comme référence pour écrire l'équivalent Angular). Intégration Angular : `frontend/src/styles/dotboard/` (`tokens.css`, `components.css`, déclarés dans `angular.json`) et composants standalone dans `frontend/src/app/ui/dotboard/` (`DbButton`, `DbDisplayCard`, `DbTag`, `DbDivider`, `DbModal`, `DbGlyphMatrix`, `DbIcon`).

## Règles impératives

- **La couleur n'est qu'une petite touche, jamais un aplat.** Le blanc, le noir et le gris portent tout l'écran. Aucune carte, aucun bouton, aucun fond de page n'est rempli d'une couleur. Un élément coloré (carré, point, contour) ne dépasse pas **24 px de côté**, contours exclus. Pose la couleur via `tone` sur `DbButton`/`DbDisplayCard`, ou la classe `db-tone-*` sur un conteneur.
- **Un seul accent** : `sig-cyan` (#00A6D6), alias `accent`. Quatre autres couleurs de signal (`orange`, `blue`, `yellow`, `red`) pour distinguer des menus/catégories — une couleur = une catégorie, gardée partout. `danger` (rouge) est réservé aux alertes, toujours accompagné d'un mot ou de l'icône `alert`, jamais la couleur seule.
- **Le texte reste `ink`** (ou `ink-muted`). N'écris jamais de texte en couleur, sauf la variante `-ink` d'une couleur de signal (rare).
- **Cibles tactiles ≥ 44 px** (`touch-min`), 56 px (`touch-comfort`) pour les boutons principaux et la fermeture de modale. Au moins `space-4` (16 px) entre deux zones tactiles voisines.
- **Pas de hover.** Aucune interaction ne dépend du survol, du clavier ni d'un champ de saisie (ce système n'a pas de champ de saisie). Quatre états tactiles seulement, toujours visibles : repos, pressé (`:active` → `surface-3` + contour noir 2 px), actif/sélectionné (contour noir 2 px + carré de couleur), focus (contour 3 px `focus`, décalé de 2 px).
- **Polices Nothing uniquement**, une seule graisse (400) : `Ndot57` (display, titres/chiffres clés), `Ndot57Caps` (titres en capitales), `NType82` (texte courant), `NType82Mono` (libellés en capitales). Jamais de gras. Pas d'autre police.
- **Pas de dégradé, pas d'ombre** à part `shadow-raised` sous la modale. Les cartes et boutons restent plats ; la séparation entre blocs vient d'une nuance de gris (`surface-0` à `surface-3`) ou d'un `Divider`.
- **Thème sombre** actif via l'attribut `data-theme="dark"` (posé sur `<html>` dans `index.html`). N'écris jamais de couleur en dur : passe toujours par les tokens CSS (`var(--ink)`, `var(--surface-1)`, etc.), jamais de hex en dur dans un composant.

## Composants disponibles

`DbButton`, `DbDisplayCard`, `DbTag`, `DbDivider`, `DbModal`, `DbGlyphMatrix`, `DbIcon` — tous standalone, à importer depuis `frontend/src/app/ui/dotboard`. Pas de composant de champ de saisie : ce système n'en a pas.

Les événements de clic se bind nativement sur le composant hôte (`<db-button (click)="...">`), les clics remontent par bulle DOM — pas besoin d'`@Output` dédié sauf pour `DbModal` (`closed`, émis par le bouton de fermeture, la touche Échap ou un clic sur le voile).
