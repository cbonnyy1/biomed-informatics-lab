// Database connection pool for PostgreSQL
import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/biomed_research';
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' && !connectionString.includes('localhost') 
        ? { rejectUnauthorized: false } 
        : undefined,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected PostgreSQL pool client error:', err);
    });
  }

  return pool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }> {
  const start = Date.now();
  const db = getDbPool();
  try {
    const res = await db.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[DB Query] ${text.slice(0, 60)}... (${duration}ms)`);
    }
    return { rows: res.rows, rowCount: res.rowCount || 0 };
  } catch (error) {
    console.error(`[DB Error] query execution failed:`, error);
    throw error;
  }
}
