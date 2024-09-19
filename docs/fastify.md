
## Gérer une API théorique

- Cas : Application de reservation de restaurant

## Installation (Fastify)

Dans un terminal, exécuter la commande suivante :

### Etapes 1

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

### Etapes 2

Ajouter le code suivant dans le fichier `package.json` :

```json
{
  "type": "module"
}
```

### Etapes 3

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

### Etape 4 - Lancer le serveur

Dans un terminal, exécuter la commande suivante :

```bash
# Version 20+
node --watch server.js # Hot reload, redémarre le serveur à chaque modification

# Version  >20
node server.js # Vous devez relancer le serveur à chaque modification
```

### Etape 5 - Tester le serveur

Sur POSTMAN, aller sur l'URL suivante : `http://localhost:3000/`

## Authentification

### 1 - Créer une route login

```js
fastify.post('/login', async (request, reply) => {
  const {email, password} = request.body;

  if (email !== "alex@mail.com" || password !== "mot de passe compliqué") {
    return {
      error: "Identifiants invalides",
      url: {
        signup: "http://localhost:3000/signup",
      }
    }
  }

  return {data: "ok"}
});
```

### 2 - Importer le module jwt

```bash
npm i @fastify/jwt
```

```js
import FastifyJWT from '@fastify/jwt';
```

```js
fastify.register(jwt, {
  secret: "supersecret"
})
```

## Swagger

### 1 - Installer le module swagger

```bash
npm i @fastify/swagger
npm i @fastify/swagger-ui
```

```js
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' }
    ],
    definitions: {
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: {type: 'string', format: 'email' }
        }
      }
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  }
})
```

```js
fastify.register(fastifySwaggerUI), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
};
```

```js
fastify.addSchema({
  $id: 'some',
  type: 'object',
  properties: {
    some: { type: 'string' }
  }
})
```

```js
fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      type: 'object',
      required: ['fields'],
      additionalProperties: false,
      properties: {
        fields: {
          type: 'array',
          items: {
            type: 'string'
          },
          minItems: 1,
        }
      }
    }
  },
  handler (request, reply) {
    reply.send(request.query.fields)
  }
})
```

```js
fastify.register(async function (fastify) {
  fastify.put('/route/:id', {
    schema: {
      description: 'post some data',
      tags: ['user', 'code'],
      summary: 'qwerty',
      security: [{ apiKey: [] }],
      body: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
          obj: {
            type: 'object',
            properties: {
              some: { type: 'string' }
            }
          }
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        },
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            foo: { type: 'string' }
          }
        }
      }
    }
  }, (req, reply) => { reply.send({ hello: `Hello ${req.body.hello}` }) })
```
