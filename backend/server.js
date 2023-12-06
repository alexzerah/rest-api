import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

fastify.get('/', async (request, reply) => {
  console.log(request);
  return { hello: 'world' }
});

fastify.post('/reservation', async (request, reply) => {
  // const {nbOfSeats} = request.body;
  const nbOfSeats = request.body.nbOfSeats;

  return {
    data: {
      dates: {
        "6-12-2023": [
          "12h00-14h00",
          "13h00-15h00"
        ],
        "7-12-2023": [
          "13h00-15h00"
        ]
      }
    }
  }
});

// TODO: Implement signup
fastify.post('/signup', async (request, reply) => {
  return {"msg": "WIP"}
});

fastify.post('/auth', async (request, reply) => {
  const { username, password } = request.body;

  if (username !== "Alex" || password !== "mot de passe compliqué") {
    return {
      error: "Identifiants invalides",
      url: {
        signup: "http://localhost:3000/signup",
      }
    }
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
