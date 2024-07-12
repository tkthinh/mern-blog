import 'dotenv/config';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const migrationClient = neon(process.env.DATABASE_URL!);
const db = drizzle(migrationClient);

async function main() {
  await migrate(db, {
    migrationsFolder: './src/drizzle/migrations',
  });
}

main();
