import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
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

fastify.post("/reservation", (request, reply) => {
  const { tableId, nbOfSeats, userId, schedule, comment} = request.body;

  return {"reservation": "ok"};

});

fastify.get('/ingredients', async (request, reply) => {

  const ingredients = [
    "Pain",
    "Viande",
    "Salade",
    "Tomate",
    "Oignon",
    "Cornichon",
  ]

const sort = request.query.sort;

if (sort === "alpha") {
  return {ingredients: ingredients.sort()};
}

console.log(request);

return {request: ingredients};
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
