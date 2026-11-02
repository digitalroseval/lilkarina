# Agency Knowledge Base

Bibliothèque interne de SOP, formations et conseils, servie par Cloudflare Workers et Cloudflare D1. Les ressources sont affichées directement en texte sur le site : aucun PDF ou document externe n'est nécessaire.

## Stack

- Cloudflare Worker : application et API
- Cloudflare D1 : catégories et contenus textuels (Markdown)
- Secrets Worker : mots de passe partagés par section et signature des sessions

## Installation

```bash
npm install
npx wrangler d1 create knowledge-base
```

Copier le `database_id` retourné par Cloudflare dans `wrangler.toml`, puis initialiser la base :

```bash
npm run db:remote
```

Créer les secrets du Worker :

```bash
npx wrangler secret put SESSION_SECRET
npx wrangler secret put CHATTING_PASSWORD
npx wrangler secret put INSTAGRAM_PASSWORD
npx wrangler secret put MANAGEMENT_PASSWORD
npx wrangler secret put TRAINING_PASSWORD
```

Pour `SESSION_SECRET`, utiliser une longue valeur aléatoire. Chaque mot de passe de section est indépendant.

Lancer en local après avoir configuré une base D1 locale :

```bash
npm run dev
```

Déployer :

```bash
npm run deploy
```

## Contenus

Les catégories sont créées par la migration SQL. Les articles sont enregistrés dans la table `articles`, avec leur contenu en Markdown dans la colonne `content`.

Un article reste invisible tant que `is_published = 0`. Pour publier un article, renseigner `is_published = 1`.

## Routes API

- `GET /api/categories` : liste des catégories
- `POST /api/auth/:categoryId` : vérifie le mot de passe et ouvre une session limitée à cette catégorie
- `GET /api/categories/:categoryId/articles` : liste protégée des articles publiés
- `GET /api/articles/:articleId` : contenu protégé d'un article

Les sessions sont signées côté Worker, stockées dans des cookies HttpOnly/Secure/SameSite et expirent après 8 heures.

## Première version

Cette base constitue le socle technique. L'interface d'administration pour créer et modifier les SOP depuis le navigateur, la recherche et les fonctions de gestion seront ajoutées ensuite.
