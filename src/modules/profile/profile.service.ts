import { pool } from "../../db";
import type { IProfile } from "./profile.interface";

const createProfileInDB = async(payload:IProfile) =>{

    const {user_id, bio, address, gender} = payload;

    const user = await pool.query(`
        SELECT * FROM users WHERE id=$1
        `,[user_id])

        if(user.rowCount === 0){
            throw new Error("User Not Exist In The DataBase Table")
        }

    const result = await pool.query(`
        INSERT INTO profile(user_id, bio, address, gender) VALUES($1, $2, $3, $4) RETURNING *
        `,[user_id, bio, address, gender])

        return result;

}
export const profileService = {
    createProfileInDB
}