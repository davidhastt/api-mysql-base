import {createPool} from 'mysql2/promise'

export async function connect(){
    const connection= await createPool({
	host: 'localhost',
	user: 'root',
	database: 'post_db',
	connectionLimit: 10        
    });
	return connection;

}