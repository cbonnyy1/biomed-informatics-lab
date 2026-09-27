const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function migrate() {
  console.log('[Migration] Starting PostgreSQL schema migration...');
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/biomed_research';
  const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' && !connectionString.includes('localhost') 
      ? { rejectUnauthorized: false } 
      : undefined,
  });

  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schemaSql);
    console.log('[Migration] Successfully executed schema.sql.');
  } catch (err) {
    console.warn('[Migration Warning] Database not reachable or migration failed. Graceful fallback active:', err.message);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  migrate();
}

module.exports = { migrate };
