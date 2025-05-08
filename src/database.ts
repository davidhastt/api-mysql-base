import {createPool} from 'mysql2/promise'
import dotenv from 'dotenv';


export async function connect(){
	dotenv.config()

    const connection= await createPool({
	host: 'localhost',
	user:  process.env.DB_USER,
	database: process.env.DATABASE,
	password: process.env.DB_PASSWORD,
	connectionLimit: 10        
    });
	return connection;

}
