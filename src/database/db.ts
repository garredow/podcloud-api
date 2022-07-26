import knex from 'knex';
import pg from 'pg';
import { config } from '../lib/config';
import { Palette, Subscription, User } from '../models';

pg.types.setTypeParser(pg.types.builtins.INT8, (value: string) => {
  return parseInt(value);
});

enum Table {
  User = 'user',
  Subscription = 'subscription',
  Progress = 'progress',
  Palette = 'palette',
}

export class Database {
  private db;

  constructor() {
    this.db = knex({
      client: 'pg',
      connection: {
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        application_name: config.meta.appName,
        ssl: config.database.ssl
          ? {
              rejectUnauthorized: false,
            }
          : false,
      },
    });
  }

  // User

  async getUserById(id: string): Promise<User | undefined> {
    const result = await this.db<User>(Table.User).where({ id }).first();
    return result;
  }

  async addUser(user: Omit<User, 'created_at' | 'updated_at'>): Promise<void> {
    await this.db<User>(Table.User)
      .insert({
        ...user,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .onConflict()
      .ignore();
  }

  async updateUser(userId: string, data: Partial<User>): Promise<void> {
    return this.db<User>(Table.User).where({ id: userId }).update(data);
  }

  // Subscriptions

  async addSubscription(userId: string, podcastId: number): Promise<number> {
    const res = await this.db<Subscription>(Table.Subscription)
      .insert({
        user_id: userId,
        podcast_id: podcastId,
        created_at: new Date().valueOf(),
        updated_at: new Date().valueOf(),
      })
      .onConflict()
      .ignore();
    return res[0];
  }

  async deleteSubscription(userId: string, podcastId: number): Promise<number> {
    const res = await this.db<Subscription>(Table.Subscription)
      .where({ user_id: userId, podcast_id: podcastId })
      .delete();

    return res;
  }

  getSubscription(userId: string, podcastId: number): Promise<Subscription | undefined> {
    return this.db<Subscription>(Table.Subscription)
      .where({ user_id: userId, podcast_id: podcastId })
      .first();
  }

  getSubscriptionsByUserId(userId: string): Promise<Subscription[]> {
    return this.db<Subscription>(Table.Subscription).where({ user_id: userId });
  }

  // Palette

  async addPalette(palette: Omit<Palette, 'created_at' | 'updated_at'>): Promise<void> {
    await this.db<Palette>(Table.Palette)
      .insert({
        ...palette,
        created_at: new Date().valueOf(),
        updated_at: new Date().valueOf(),
      })
      .onConflict('podcast_id')
      .merge();
  }

  async getPaletteByPodcastId(podcastId: number): Promise<Palette | undefined> {
    return this.db<Palette>(Table.Palette).where({ podcast_id: podcastId }).first();
  }

  // Health

  async testLatency() {
    try {
      const before = Date.now();
      await this.db.raw('SELECT 1');
      return Date.now() - before;
    } catch (err: any) {
      console.error('Failed to connect to the database', err?.message);
      return 0;
    }
  }
}

export const db = new Database();
