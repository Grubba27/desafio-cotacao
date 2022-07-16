import Fastify from 'fastify'
// Observables do RXJS resolveria tb
import { EventEmitter } from 'events'
import { getServiceAUSD, getServiceBUSD, getServiceCUSD } from "./USD/index.js";
import { findLowestValue } from "./lib/index.js";
import fastifyCors from "@fastify/cors";

export const cEmitter = new EventEmitter();

const fastify = Fastify({
  logger: true
})

const fastifyHooks = Fastify(
  { logger: true },
);

fastify.get('/cotar-usd', async (request, reply) => {
  const data = await getBestUSD()
  return { data }
})

const getBestUSD = async () => {
  const A = await getServiceAUSD();
  const B = await getServiceBUSD();
  const C = await getServiceCUSD();


  console.log(A, B, C) // tracking
  return findLowestValue(A, B);
}

fastify.get('/foo', async (request, reply) => {
  return { hello: 'foo' }
})

// await for webhook in fastify
fastifyHooks.post('/service-c', async (request, reply) => {
  console.log(request.body);
  cEmitter.emit('service-c', request.body)
})

fastify.register(fastifyCors, {
  origin: '*',
})
fastifyHooks.register(fastifyCors, {
  origin: '*',
});
/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    await fastifyHooks.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
await start()
