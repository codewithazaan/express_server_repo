import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = async(req: Request, res: Response, next: NextFunction ) =>{

    console.log("This Is Protected Route");

    // console.log("Headers:", req.headers.authorization)

    //? Checking Authorization Steps 
    //!1.If Token exists
    //! 2. Checking Token Is Verified or Not
    //! 3. User exist or not
    //! 4. User Status Active Or not

    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({
            success: false,
            message: "Unauthorized Access!!!"
        })
    }

    const decode = jwt.verify(token as string, config.secret_key) as JwtPayload;

    // console.log("decode:", decode)

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[decode.email])

        if(user.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        if(!user.rows[0].age){
            res.status(403).json({
                success: false,
                message: "Forbidden!!!"
            })
        }

        delete user.rows[0].password;



// console.log("USER:", user)

    next();

}
export default auth;