---
name: chore
description: Démarre une tâche technique sans impact fonctionnel direct sur daily-dashboard (mise à jour de dépendances, config, refacto, nettoyage, outillage). À utiliser quand Caz demande ce type de tâche. Impose la discussion de l'objectif avant toute action, le travail sur une branche dédiée, et une PR relue par Caz avant tout merge.
---

# Chore

Suit le workflow défini dans `CONTRIBUTING.md` à la racine du dépôt — le lire si ce n'est pas déjà en contexte.

## 1. Clarifier avant d'agir

Même pour une tâche technique, confirmer avec Caz :
- **Objectif** : pourquoi cette tâche maintenant, quel problème ou risque elle adresse
- **Portée** : ce qui est touché, ce qui ne l'est pas
- **Risques** : impact potentiel sur l'existant (ex. montée de version qui casse une API, renommage qui touche plusieurs fichiers)

Pour une tâche très mécanique et sans ambiguïté (ex. "bump la version de tel package"), une confirmation rapide suffit — mais elle reste nécessaire.

## 2. Branche dédiée

```
git checkout main && git pull
git checkout -b chore/<slug-descriptif>
```

## 3. Exécution

Suivre les conventions de code du `CONTRIBUTING.md`.

## 4. Pull Request

Pousser la branche et ouvrir une PR vers `main` avec la description structurée (template du dépôt) :
- Ce qui a été fait
- Choix techniques
- Points d'attention / spécificités
- Comment tester

Ne jamais merger soi-même — attendre l'accord explicite de Caz.
