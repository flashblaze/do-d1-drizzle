/// <reference types="@cloudflare/workers-types" />
import { DurableObject } from 'cloudflare:workers';
import { type DrizzleSqliteDODatabase, drizzle } from 'drizzle-orm/durable-sqlite';
import { migrate } from 'drizzle-orm/durable-sqlite/migrator';

import { userTable } from './db/schema';
import type { Env } from './types';

// @ts-expect-error
import migrations from '../drizzle/migrations/migrations.js';

export class SampleObject extends DurableObject {
    storage: DurableObjectStorage;
    db: DrizzleSqliteDODatabase;

    constructor(ctx: DurableObjectState, env: Env) {
        super(ctx, env);
        this.storage = ctx.storage;
        this.db = drizzle(this.storage, { logger: false });
    }

    async migrate() {
        await migrate(this.db, migrations);
    }

    async insert({ name }: { name: string }) {
        return await this.db.insert(userTable).values({ name }).returning();
    }

    async getUsers() {
        return await this.db.select().from(userTable);
    }
}
