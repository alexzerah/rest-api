# REST API ORSYS

## Qu'est-ce qu'une API ?

Une API (Application Programming Interface) est un ensemble de fonctions et de procédures qui permet à des applications de communiquer entre elles.
Elle définit les règles à respecter pour la communication entre deux applications.
Elle permet de faciliter le travail des développeurs en leur évitant de réécrire des fonctions déjà existantes.

Interface de programmation d'applications : Comment programmer une application.

Je veux donner l'ordre à un serveur de reserver une table.
Je peux le faire :

- depuis un navigateur
- depuis une application mobile
- depuis une application desktop
- depuis un objet connecté

Je peux être une agence de voyage et vouloir réserver une table pour un client.

HTTP

Requête / réponse
HTTP
Envoi d'une requête
Réception d'une réponse

Sources :

- [Redhat - what are application programming interface](https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces)

## Gérer une API théorique

- Cas : Application de reservation de restaurant

## Installation (Fastify)

Dans un terminal, exécuter la commande suivante :

```js
npm i fastify
```

- `npm` : Node Package Manager, permet d'installer des packages (modules) Node.js
- `i` (raccourcis pour `install`) : install, permet d'installer un package
- `fastify` : nom du package à installer, ici c'est le framework Node.js.

2 fichiers et 1 dossier sont créés :

- `package.json` : contient les informations du projet et les dépendances
- `package-lock.json` : contient les informations des dépendances
- `node_modules` : contient les modules installés

## Créer un serveur

Dans le fichier `server.js`, ajouter le code suivant :

```js
// ESM
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  };
};

start();
```

- `import` : Importer un module ESM (ECMAScript Module)
- `Fastify` : Nom de l'objet à importer
- `logger: true` : Activer le logger (affichage de messages dans la console)
- `fastify.get` : Méthode pour créer une route HTTP de type GET
- `async` / `await` : Traitement de fonction asynchrone
- `(request, reply) => {}` : Paramètres de la fonction (syntaxe ES6)
- `fastify.listen` : Méthode pour démarrer le serveur
- `port: 3000` : Port d'écoute du serveur

## Lancer le serveur

Dans un terminal, exécuter la commande suivante :

```bash
node --watch server.js # Hot reload, redémarre le serveur à chaque modification
```
```
