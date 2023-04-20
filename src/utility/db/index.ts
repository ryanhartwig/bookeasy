import { Pool } from 'pg';

const poolInstance = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS || '',
  port: Number(process.env.PG_PORT),
});      

export default poolInstance;