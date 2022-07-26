import { FastifyReply, FastifyRequest } from 'fastify';
import { healthService } from '../services/health';

export async function getHealth(request: FastifyRequest, reply: FastifyReply) {
  const status = healthService.getHealth();
  reply.send(status);
}
