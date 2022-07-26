import cors from '@fastify/cors';
import Fastify from 'fastify';
import verify from 'fastify-auth0-verify';
import { config } from './lib/config';
import { routes } from './routes';

export function configureServer(options = {}) {
  const fastify = Fastify(options);

  fastify.register(cors, {
    origin: [/\.podcloud\.social$/],
  });

  fastify.register(verify, {
    domain: config.auth0.domain,
    audience: config.auth0.audience,
  });

  fastify.register(routes);

  return fastify;
}
