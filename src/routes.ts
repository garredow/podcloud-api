import { FastifyInstance } from 'fastify';
import { getHealth } from './controllers/health';

export async function routes(fastify: FastifyInstance) {
  // Health
  fastify.get('/health', {
    handler: getHealth,
  });
}
