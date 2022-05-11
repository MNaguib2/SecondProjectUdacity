import { Pool } from 'pg';
import * as dotenv from "dotenv";

dotenv.config();


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT
} = process.env;
let client = new Pool;

//console.log(process.env.POSTGRES_DB);

if(process.env.ENV ==='dev'){
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: (POSTGRES_PORT as unknown) as number
    }); 
} else {
    client = new Pool({
        host: "127.0.0.1",
        database: "storefront_test",
        user: "test_udacity",
        password: "password123",
        port: 5432
    }); 
}
export default client;