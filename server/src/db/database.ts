import { drizzle } from 'drizzle-orm/postgres-js';
import { Client } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

export const client = new Client(connectionString);
// export const db = drizzle(client);
