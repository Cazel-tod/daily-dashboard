---
name: feature
description: Démarre le développement d'une nouvelle fonctionnalité sur daily-dashboard. À utiliser quand Caz demande d'ajouter une feature, même en apparence triviale ("ajoute un bouton ici", "affiche X sur la page Y"). Impose la discussion de specs avant tout code, le travail sur une branche dédiée, et une PR relue par Caz avant tout merge.
---

# Feature

Suit le workflow défini dans `CONTRIBUTING.md` à la racine du dépôt — le lire si ce n'est pas déjà en contexte.

## 1. Specs d'abord, toujours

Avant d'écrire la moindre ligne de code, poser les questions nécessaires pour clarifier :
- **Utilité / raison** : pourquoi cette feature, quel problème elle résout
- **Comportement attendu** : ce que ça fait exactement, les cas limites
- **Règles associées** : droits/permissions si pertinent, actions déclenchées, contraintes de design si UI
- **Périmètre** : ce qui est explicitement hors scope pour cette itération

Ne pas supposer les réponses évidentes à partir d'une demande courte ("ajoute un bouton ici" n'est pas une spec). Si Caz donne déjà toutes ces réponses spontanément, ne pas reposer inutilement les questions déjà répondues — mais ne jamais sauter l'étape sans au moins confirmer la compréhension.

Ne pas commencer à coder tant que Caz n'a pas validé les specs.

## 2. Branche dédiée

Une fois les specs validées, créer une branche depuis `main` à jour :
```
git checkout main && git pull
git checkout -b feature/<slug-descriptif>
```

## 3. Développement

Suivre les conventions de code du `CONTRIBUTING.md` (PSR-12/Symfony côté backend, Angular style guide côté frontend, commentaires minimaux).

## 4. Pull Request

Pousser la branche et ouvrir une PR vers `main` avec la description structurée imposée par le template du dépôt (rempli, pas laissé vide) :
- Ce qui a été fait
- Choix techniques
- Points d'attention / spécificités
- Comment tester

Ne jamais merger soi-même, même après une relecture qui semble favorable — attendre l'accord explicite de Caz.
