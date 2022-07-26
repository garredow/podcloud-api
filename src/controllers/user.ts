import { FastifyReply, FastifyRequest } from 'fastify';
import { userService } from '../services/user';
import { getUserId } from '../utils/getUserId';

export async function getCurrentUser(request: FastifyRequest, reply: FastifyReply) {
  const userId = getUserId(request);

  const user = await userService.getUserById(userId);
  reply.send(user);
}
