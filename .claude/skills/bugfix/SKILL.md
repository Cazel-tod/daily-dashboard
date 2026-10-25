---
name: bugfix
description: Démarre la correction d'un bug sur daily-dashboard. À utiliser quand Caz signale un comportement cassé ou inattendu. Impose la clarification du bug (reproduction, comportement attendu) avant toute correction, le travail sur une branche dédiée, et une PR relue par Caz avant tout merge.
---

# Bugfix

Suit le workflow défini dans `CONTRIBUTING.md` à la racine du dépôt — le lire si ce n'est pas déjà en contexte.

## 1. Clarifier le bug avant de corriger

Avant de toucher au code, s'assurer d'avoir :
- **Reproduction** : les étapes ou conditions précises qui déclenchent le bug
- **Comportement observé vs attendu** : ce qui se passe réellement, ce qui devrait se passer
- **Portée** : depuis quand, sur quel périmètre (une page, une API, tout l'environnement)

Si la cause n'est pas évidente, investiguer (logs, reproduction locale) avant de proposer un correctif — ne pas corriger un symptôme sans avoir identifié la cause racine.

## 2. Branche dédiée

```
git checkout main && git pull
git checkout -b fix/<slug-descriptif>
```

## 3. Correction

Corriger la cause racine, pas seulement le symptôme. Suivre les conventions de code du `CONTRIBUTING.md`.

## 4. Pull Request

Pousser la branche et ouvrir une PR vers `main` avec la description structurée (template du dépôt) :
- Ce qui a été fait (la cause du bug, la correction)
- Choix techniques
- Points d'attention / spécificités
- Comment tester (y compris comment reproduire le bug initial pour vérifier qu'il n'apparaît plus)

Ne jamais merger soi-même — attendre l'accord explicite de Caz.
