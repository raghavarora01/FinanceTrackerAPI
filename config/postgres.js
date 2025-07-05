import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: false, 
  },
  max: 20, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000, 
});

pool.on('connect', () => {
  console.log('🟢 Connected to PostgreSQL (Clever Cloud)');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err.stack);
});

export default pool;
