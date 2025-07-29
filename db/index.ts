import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: ReturnType<typeof neon> | undefined;
};
config({ path: ".env" }); // or .env.local

const conn = globalForDb.conn ?? neon(process.env.DATABASE_URL!);

export const db = drizzle(conn, { schema });

