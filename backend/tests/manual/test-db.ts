import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not defined in .env');
  process.exit(1);
}

console.log('Testing connection to:', connectionString.replace(/:[^:@]+@/, ':****@'));

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // Temporary for testing
  }
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Successfully connected to Aiven via PG client!');
    const res = await client.query('SELECT NOW()');
    console.log('Database time:', res.rows[0].now);
    client.release();
  } catch (err: any) {
    console.error('❌ Failed to connect to Aiven:', err.message || err);
  } finally {
    await pool.end();
  }
}

testConnection();
