const fastify = require('fastify')()

fastify.register(require('@fastify/swagger'), {
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

fastify.register(require('@fastify/swagger-ui'), {
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
})

fastify.addSchema({
  $id: 'some',
  type: 'object',
  properties: {
    some: { type: 'string' }
  }
})

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
          //
          // Note that this is an Open API version 2 configuration option.  The
          // options changed in version 3. The plugin currently only supports
          // version 2 of Open API.
          //
          // Put `collectionFormat` on the same property which you are defining
          // as an array of values. (i.e. `collectionFormat` should be a sibling
          // of the `type: "array"` specification.)
        }
      }
    }
  },
  handler (request, reply) {
    reply.send(request.query.fields)
  }
})

fastify.post('/route', {
  schema: {
    description: 'post some data',
    summary: 'qwerty',
    security: [{ apiKey: [] }],
    body: {
      type: 'object',
      properties: {
        hello: { type: 'string' },
      }
    },
    response: {
      201: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}, (req, reply) => { reply.send({ hello: `Hello ${req.body.hello}` })
})

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

  fastify.post('/route/:id', {
    schema: {
      description: 'post some data',
      summary: 'qwerty',
      security: [{ apiKey: [] }],
      body: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  }, (req, reply) => { reply.send({ hello: `Hello ${req.body.hello}` }) 
  })

  fastify.get('/route/:id', {
    schema: {
      description: 'post some data',
      summary: 'qwerty',
      security: [{ apiKey: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  }, (req, reply) => { reply.send({ hello: `Hello ${req.params.id}` }) 
  })
})


fastify.post('/login', {
  schema: {
    description: 'Login endpoint',
    tags: ['auth'],
    summary: 'Login a user',
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 1 }
      }
    },
    response: {
      200: {
        description: 'Successful login',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      400: {
        description: 'Invalid email or password',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}, async (request, reply) => {
  const { email, password } = request.body;
  if (email === 'alex@mail.com' && password === 'azerty') {
    return reply.code(200).send({ message: 'OK' });
  } else {
    return reply.code(400).send({ message: 'Invalid email or password' });
  }
});

fastify.ready().then(
  () => {
    fastify.swagger()
  }
)

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    console.log(`Server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error({"err": err})
    process.exit(1)
  }
}

start();
