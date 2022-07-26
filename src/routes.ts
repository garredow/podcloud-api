import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getHealth } from './controllers/health';
import { getCurrentUser } from './controllers/user';

const handleErrors =
  (controllerFn: (request: FastifyRequest, reply: FastifyReply) => any) =>
  (request: FastifyRequest, reply: FastifyReply) =>
    controllerFn(request, reply).catch((err: any) => {
      request.log.error(err);
      reply.code(500).send({
        statusCode: 500,
        error: 'API Error',
        message: '',
      });
    });

export async function routes(fastify: FastifyInstance) {
  // User
  fastify.get('/me', {
    preValidation: fastify.authenticate,
    handler: handleErrors(getCurrentUser),
  });

  // Health
  fastify.get('/health', {
    handler: handleErrors(getHealth),
  });
}
