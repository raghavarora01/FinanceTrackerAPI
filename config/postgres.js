import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configure PostgreSQL connection pool
const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: false, // Required for Clever Cloud SSL
  },
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout after 2 seconds
});

// Log successful connection
pool.on('connect', () => {
  console.log('🟢 Connected to PostgreSQL (Clever Cloud)');
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err.stack);
});

export default pool;