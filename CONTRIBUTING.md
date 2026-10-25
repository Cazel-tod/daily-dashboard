# Workflow de développement

## Modèle de branches : GitHub Flow

- `main` est toujours déployable. Un merge sur `main` déclenche le déploiement CI/CD vers Protos.
- `main` est protégée : pas de push direct, toute modification passe par une Pull Request relue par Caz.
- Chaque tâche part de `main` sur une branche dédiée :
  - `feature/<slug>` — nouvelle fonctionnalité
  - `chore/<slug>` — tâche technique sans impact fonctionnel direct (dépendances, config, refacto)
  - `fix/<slug>` — correction de bug

## Avant de coder : toujours les specs d'abord

Aucune ligne de code n'est écrite avant d'avoir validé avec Caz :
- l'utilité et la raison de la tâche
- les règles associées (droits/permissions, actions déclenchées, comportement attendu, design si UI, cas limites)

Ça vaut aussi pour une demande en apparence triviale ("ajoute un bouton ici") : on clarifie avant d'implémenter.

## Pull Requests

- Une PR par tâche, ouverte dès le développement terminé sur la branche.
- Description structurée :
  - **Ce qui a été fait** — résumé fonctionnel
  - **Choix techniques** — pourquoi cette approche, alternatives écartées si pertinent
  - **Points d'attention / spécificités** — limites connues, suites possibles, impact sur l'existant
  - **Comment tester** — étapes pour vérifier manuellement
- Jamais de merge sans l'accord explicite de Caz, même après une relecture favorable.

## Conventions de code

### PHP / Symfony
- PSR-12 + standards Symfony (nommage des services, structure des contrôleurs/entités standard de l'écosystème).

### Angular
- Angular style guide officiel : kebab-case pour fichiers et sélecteurs, PascalCase pour les composants/classes, camelCase pour méthodes et variables.

### Commentaires
- Minimaux. Un commentaire n'explique jamais ce que le code dit déjà — seulement un **pourquoi** non évident (contrainte cachée, contournement d'un bug précis, comportement surprenant).
