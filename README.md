# daily-dashboard

![Build and deploy](https://github.com/Cazel-tod/daily-dashboard/actions/workflows/deploy.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Backend](https://img.shields.io/badge/backend-Symfony-000000.svg)
![Frontend](https://img.shields.io/badge/frontend-Angular-DD0031.svg)
![Database](https://img.shields.io/badge/database-SQLite-003B57.svg)

Dashboard personnel, auto-hébergé, qui montre les tâches accomplies au jour le jour, par semaine et par mois — pour suivre la progression dans le temps et garder une trace motivante du travail fait.

Le projet sert aussi de terrain d'apprentissage : certaines parties sont volontairement codées à la main plutôt que générées, pour progresser sur la stack.

## Stack

- **Backend** : [Symfony](https://symfony.com/) (PHP), [Doctrine](https://www.doctrine-project.org/) ORM, base [SQLite](https://www.sqlite.org/)
- **Frontend** : [Angular](https://angular.dev/)
- **Hébergement** : auto-hébergé sur une Raspberry Pi, servi par nginx + PHP-FPM
- **CI/CD** : GitHub Actions — build sur push/merge vers `main`, déploiement automatique via [Tailscale](https://tailscale.com/)

## Fonctionnalités

- `/status` — état de santé du serveur en temps réel (température CPU, mémoire, swap, disque, réseau, uptime)
- *(à venir)* suivi des tâches accomplies par jour / semaine / mois

## Développement

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour le workflow de développement (branches, Pull Requests, conventions de code).

## Licence

[MIT](./LICENSE)
