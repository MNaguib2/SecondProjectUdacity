import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_Test_DB,
  POSTGRES_Test_USER,
  POSTGRES_Test_PASSWORD
} = process.env;
let client = new Pool();

// console.log(process.env.ENV);

if (process.env.ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT as unknown as number
  });
} else {
  // console.log(POSTGRES_Test_DB);
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_Test_DB,
    user: POSTGRES_Test_USER,
    password: POSTGRES_Test_PASSWORD,
    port: POSTGRES_PORT as unknown as number
  });
}
export default client;
