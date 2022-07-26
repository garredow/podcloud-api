import { db } from '../database/db';
import { User } from '../models';

async function getUserById(id: string): Promise<User | undefined> {
  let user = await db.getUserById(id);

  if (!user) {
    await db.addUser({ id });
    user = await db.getUserById(id);
  }

  return user;
}

export const userService = {
  getUserById,
};
