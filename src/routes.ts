import { FastifyInstance } from 'fastify';
import { getHealth } from './controllers/health';
import { getCurrentUser } from './controllers/user';

export async function routes(fastify: FastifyInstance) {
  // User
  fastify.get('/me', {
    preValidation: fastify.authenticate,
    handler: getCurrentUser,
  });

  // Health
  fastify.get('/health', {
    handler: getHealth,
  });
}
