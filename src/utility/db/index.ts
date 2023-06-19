import { Pool } from 'pg';

const poolInstance = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});      

export default poolInstance;