import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { userAuthType } from "./auth.interface";
import  jwt, { type JwtPayload }  from 'jsonwebtoken';
import config from "../../config";

const loginUserIntoDB = async(payload : userAuthType) =>{

    const {email, password} = payload;

    const user = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `,[email]);

        if(user.rowCount === 0){
            throw new Error("Invalid Email!")
        }

        const matchPassword = await bcrypt.compare(password, user.rows[0].password)

        if(!matchPassword){
            throw new Error("Invalid Password!!!")
        }

        delete user.rows[0].password;

        const userBody = user.rows[0];
        const jwtPayload = {
            id: userBody.id,
            name: userBody.name,
            email: userBody.email,
            phone: userBody.phone,
            age: userBody.age,
            gender: userBody.gender,
            is_active: userBody.is_active,
            role: userBody.role
          
        }
        const accessToken = jwt.sign(jwtPayload, config.secret_key, {expiresIn : "1h"});

        //!create refresh token START
        const refreshToken = jwt.sign(jwtPayload, config.refresh_key, {expiresIn : "10d"});
        //!create refresh token END
 
        console.log(user.rows[0]);  
        
        return {accessToken, refreshToken, user : user.rows[0]}
    
}

//!generate New Access TOKEN START
const generateNewAccessToken = async(token : string) =>{

     if(!token){
     throw new Error("Unauthorized Access Without TOKEN!!")
    }

    const decode = jwt.verify(token as string, config.refresh_key) as JwtPayload;

    // console.log("decode:", decode)

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[decode.email])

        if(user.rowCount === 0){
          throw new Error("User Not Found")
        }

        if(!user.rows[0].is_active){
            throw new Error("Forbidden!!!")
        }

        delete user.rows[0].password;

        //?Create New Access TOKEN AGAIN By Refresh Token START
        
        const userBody = user.rows[0];
        const jwtPayload = {
            id: userBody.id,
            name: userBody.name,
            email: userBody.email,
            phone: userBody.phone,
            age: userBody.age,
            gender: userBody.gender,
            is_active: userBody.is_active,
            role: userBody.role
          
        }
        const accessToken = jwt.sign(jwtPayload, config.secret_key, {expiresIn : "1h"});

        return {accessToken}

         //?Create New Access TOKEN AGAIN By Refresh Token END

}
//!generate New Access TOKEN END
export const authService = {
    loginUserIntoDB,
    generateNewAccessToken
}