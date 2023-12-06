import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

fastify.get('/', async (request, reply) => {
  console.log(request);
  return { hello: 'world' }
});

fastify.get('/users', async (request, reply) => {
  // console.log(request);
  return { users: ["Alex", "Cedric"] }
});

fastify.post('/reservation', async (request, reply) => {
  console.log(request.body);
  return { data: "ok" }
});

fastify.post('/auth', async (request, reply) => {
  const { username, password } = request.body;
  console.log(request.body);

  if (username !== "Alex" || password !== "mot de passe compliqué") {
    return { error: "Identifiants invalides" }
  }
  return {
    data: "ok",
    url : {"reservation": "http://localhost:3000/reservation"}
  }
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
