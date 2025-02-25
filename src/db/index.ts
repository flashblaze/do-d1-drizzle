import { drizzle } from 'drizzle-orm/d1';

import type { Env } from '../types';
import * as schema from './schema';

export function createDB(env: Env['Bindings']) {
    /**
     * Adding schema allowed me to use db.query.users.findMany()
     * Else, I was getting a $drizzleTypeError
     * Even though I would be using leftJoin, I thought I should still add the schema
     */
    const db = drizzle(env.DO_D1_DB, { schema });
    return db;
}
