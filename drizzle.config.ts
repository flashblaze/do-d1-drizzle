import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.dev.vars' });

export default process.env.LOCAL_DB_PATH
    ? {
        schema: './src/db/schema.ts',
        dialect: 'sqlite',
        dbCredentials: {
            url: process.env.LOCAL_DB_PATH,
        },
    }
    : defineConfig({
        schema: './src/db/schema.ts',
        dialect: 'sqlite',
        out: './drizzle/migrations',
        driver: 'd1-http',
        dbCredentials: {
            accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
            databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
            token: process.env.CLOUDFLARE_D1_TOKEN!,
        },
    });
