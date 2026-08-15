import { Pool } from "pg";

/**
 * Shared Postgres pool.
 *
 * Cached on globalThis because Next's dev server re-evaluates modules on every
 * hot reload; without this each reload would open a new pool and eventually
 * exhaust the database's connection limit.
 */
const globalForDb = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Supabase's pooler terminates TLS with a certificate this client does not
    // have a local root for; the connection is still encrypted.
    ssl: { rejectUnauthorized: false },
    // Small: this runs behind a connection pooler already, and serverless
    // instances each hold their own pool.
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") globalForDb.pgPool = pool;
