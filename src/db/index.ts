import {Pool} from "pg";
import config from "../config";


export const pool = new Pool({
    connectionString: config.connection_string
});
// console.log(pool)

export const userTableDB = async() =>{
   try {
     
    await pool.query(`
         CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            age INTEGER,
            is_active BOOLEAN DEFAULT true,
            role VARCHAR(20) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
        );

        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS profile(
                id SERIAL PRIMARY KEY,
                user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
                bio TEXT,
                address TEXT,
                gender VARCHAR(15),
                 created_at TIMESTAMP DEFAULT now(),
                 updated_at TIMESTAMP DEFAULT now()
            )
            `);
        console.log("User + profile Table Created Successfully!!!");


    
   } catch (error) {
    console.log("Error Creating During Making UserTable", error);
    throw error;

   }
}


