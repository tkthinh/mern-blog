import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './db';

async function main() {
  await migrate(db, {
    migrationsFolder: './src/drizzle/migrations',
  });
}

main();
