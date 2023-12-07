import Fastify from 'fastify';
import jwt from '@fastify/jwt';

const fastify = Fastify({
  logger: true
});

fastify.register(jwt, {
  secret: "supersecret"
})

// TODO: Implement signup
fastify.post('/signup', async (request, reply) => {
  return {"msg": "WIP"}
});

fastify.post('/login', async (request, reply) => {
  const {password} = request.body;

  const email = request.body.email.toLowerCase();

  if (email !== "alex@mail.com" || password !== "mot de passe compliqué") {
    return {
      error: "Identifiants invalides",
      url: {
        signup: "http://localhost:3000/signup",
      }
    }
  }

  const token = fastify.jwt.sign({email});

  return {data: token}
});

fastify.addHook("onRequest", async (request, reply) => {

  if (request.url === "/login" || request.url === "/signup") {
    return;
  }

  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
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
