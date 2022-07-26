import { FastifyRequest } from 'fastify';

export function getUserId(request: FastifyRequest) {
  return (request.user as any).sub;
}
